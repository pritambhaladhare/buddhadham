import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  contactSchema, 
  donationSchema, 
  memberSchema, 
  memberBenefitSchema, 
  memberDonationSchema, 
  memberPaymentSchema, 
  newsletterSchema, 
  volunteerSchema, 
  insertUserSchema 
} from "@shared/schema";
import nodemailer from "nodemailer";
import session from "express-session";
import memorystore from "memorystore";
import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

// Extend the Session interface to include user property
declare module 'express-session' {
  interface Session {
    user?: {
      id: number;
      username: string;
      role: string;
    };
  }
}

// Type for authenticated requests
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
  const MemoryStore = memorystore(session);
  app.use(
    session({
      cookie: { maxAge: 86400000 }, // 24 hours
      store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || "buddha-dhaam-secret"
    })
  );
  
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Configure Google OAuth Strategy
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  
  if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: GOOGLE_CLIENT_ID,
          clientSecret: GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/auth/google/callback",
          scope: ["profile", "email"]
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            // Check if user exists with this Google ID
            let user = await storage.getUserByEmail(profile.emails?.[0]?.value || '');
            
            // If user doesn't exist, create a new one
            if (!user) {
              // Create a random username based on display name or id
              const username = `google_${profile.displayName?.replace(/\s+/g, '_').toLowerCase() || profile.id}`;
              
              // Create a new user
              user = await storage.createUser({
                username,
                // Generate a long random password since they'll be using Google OAuth
                password: Math.random().toString(36).slice(-16) + Math.random().toString(36).slice(-16),
                email: profile.emails?.[0]?.value,
                fullName: profile.displayName,
                googleId: profile.id,
                role: 'user'
              });
            }
            
            // Convert user to the format session expects
            return done(null, {
              id: user.id,
              username: user.username,
              role: user.role || 'user'
            });
          } catch (error) {
            return done(error as Error);
          }
        }
      )
    );
  }
  
  // Serialize and deserialize user for session management
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
    done(null, user as Express.User);
  });
  
  // Authentication middleware
  const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.session && req.session.user) {
      req.user = req.session.user;
      next();
    } else {
      res.status(401).json({ success: false, message: "Unauthorized" });
    }
  };
  
  // Authentication Routes
  
  // Register a new user
  app.post('/api/auth/register', async (req, res) => {
    try {
      // Validate the user data
      const userData = insertUserSchema.parse(req.body);
      
      // Check if username already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ success: false, message: "Username already taken" });
      }
      
      // Check if email already exists
      if (userData.email) {
        const existingEmail = await storage.getUserByEmail(userData.email);
        if (existingEmail) {
          return res.status(400).json({ success: false, message: "Email already registered" });
        }
      }
      
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      
      // Create the user with hashed password
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Return success without the password
      const { password, ...userWithoutPassword } = user;
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: userWithoutPassword
      });
    } catch (error: any) {
      console.error("Error registering user:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Login
  app.post('/api/auth/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      // Find the user
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(400).json({ success: false, message: "Invalid username or password" });
      }
      
      // Verify password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "Invalid username or password" });
      }
      
      // Create session
      (req as any).session.user = {
        id: user.id,
        username: user.username,
        role: user.role || 'user'
      };
      
      // Return user info without password
      const { password: _, ...userWithoutPassword } = user;
      return res.status(200).json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword
      });
    } catch (error: any) {
      console.error("Error logging in:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Get current user
  app.get('/api/auth/me', authenticate, (req: AuthenticatedRequest, res) => {
    return res.status(200).json({
      success: true,
      user: req.user
    });
  });
  
  // Google OAuth routes
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    // Route to initiate Google OAuth flow
    app.get('/api/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // Google OAuth callback route
    app.get('/api/auth/google/callback', 
      passport.authenticate('google', { failureRedirect: '/login?error=google-auth-failed' }),
      (req, res) => {
        // If authentication is successful, set user in session
        if (req.user) {
          (req as any).session.user = req.user;
        }
        
        // Redirect to the client-side app
        res.redirect('/member-dashboard');
      }
    );
  }
  
  // Logout
  app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ success: false, message: "Could not log out" });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ success: true, message: "Logged out successfully" });
    });
  });
  
  // Contact form submission
  app.post('/api/contact/send', async (req, res) => {
    try {
      const validatedData = contactSchema.parse(req.body);
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage(validatedData);
      
      // Send email notification (mock implementation)
      const transporter = nodemailer.createTransport({
        host: "smtp.example.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || "user@example.com",
          pass: process.env.EMAIL_PASSWORD || "password",
        },
      });
      
      // Email content
      const mailOptions = {
        from: '"Buddha Dhaam Website" <contact@buddhadhaam.org>',
        to: "info@buddhadhaam.org",
        subject: `New Contact: ${validatedData.subject || 'No Subject'}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Subject: ${validatedData.subject || 'No Subject'}
          
          Message:
          ${validatedData.message}
        `,
        html: `
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject || 'No Subject'}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
        `,
      };
      
      // In a real implementation, this would send the email
      // await transporter.sendMail(mailOptions);
      
      return res.status(200).json({ 
        success: true, 
        message: "Contact message sent successfully",
        id: contactMessage.id
      });
    } catch (error: any) {
      console.error("Error sending contact message:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Newsletter subscription
  app.post('/api/newsletter/subscribe', async (req, res) => {
    try {
      const validatedData = newsletterSchema.parse(req.body);
      
      // Store the newsletter subscription
      const subscription = await storage.createNewsletter(validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Newsletter subscription successful",
        id: subscription.id
      });
    } catch (error: any) {
      console.error("Error subscribing to newsletter:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Donation processing
  app.post('/api/donations/custom', async (req, res) => {
    try {
      const validatedData = donationSchema.parse(req.body);
      
      // Store the donation
      const donation = await storage.createDonation(validatedData);
      
      // In a real implementation, you would integrate with a payment gateway here
      
      return res.status(200).json({ 
        success: true, 
        message: "Donation processed successfully",
        id: donation.id,
        amount: donation.amount
      });
    } catch (error: any) {
      console.error("Error processing donation:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Volunteer application
  app.post('/api/volunteer/apply', async (req, res) => {
    try {
      const validatedData = volunteerSchema.parse(req.body);
      
      // Store the volunteer application
      const application = await storage.createVolunteerApplication(validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Volunteer application submitted successfully",
        id: application.id
      });
    } catch (error: any) {
      console.error("Error submitting volunteer application:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });

  // Member Portal API Routes
  
  // Create new member - must be authenticated
  app.post('/api/members', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const validatedData = memberSchema.parse(req.body);
      
      // Store the new member
      const member = await storage.createMember(validatedData);
      
      return res.status(201).json({ 
        success: true, 
        message: "Member created successfully",
        member
      });
    } catch (error: any) {
      console.error("Error creating member:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Get member by ID - authenticated
  app.get('/api/members/:id', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const memberId = parseInt(req.params.id);
      if (isNaN(memberId)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" });
      }
      
      const member = await storage.getMember(memberId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      return res.status(200).json({ 
        success: true, 
        member
      });
    } catch (error: any) {
      console.error("Error fetching member:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Get member by user ID - authenticated
  app.get('/api/members/user/:userId', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ success: false, message: "Invalid user ID" });
      }
      
      const member = await storage.getMemberByUserId(userId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      return res.status(200).json({ 
        success: true, 
        member
      });
    } catch (error: any) {
      console.error("Error fetching member by user ID:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Update member - authenticated
  app.patch('/api/members/:id', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const memberId = parseInt(req.params.id);
      if (isNaN(memberId)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" });
      }
      
      // Validate update data
      const validatedData = memberSchema.partial().parse(req.body);
      
      // Update the member
      const updatedMember = await storage.updateMember(memberId, validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Member updated successfully",
        member: updatedMember
      });
    } catch (error: any) {
      console.error("Error updating member:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Get all members - restricted to admin
  app.get('/api/members', authenticate, async (req: AuthenticatedRequest, res) => {
    // Check if user is admin
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Access denied" });
    }
    try {
      const members = await storage.getMembers();
      
      return res.status(200).json({ 
        success: true, 
        members
      });
    } catch (error: any) {
      console.error("Error fetching members:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Get member benefits by membership level
  app.get('/api/member-benefits/:membershipLevel', async (req, res) => {
    try {
      const { membershipLevel } = req.params;
      
      const benefits = await storage.getMemberBenefits(membershipLevel);
      
      return res.status(200).json({ 
        success: true, 
        benefits
      });
    } catch (error: any) {
      console.error("Error fetching member benefits:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Create member benefit
  app.post('/api/member-benefits', async (req, res) => {
    try {
      const validatedData = memberBenefitSchema.parse(req.body);
      
      // Store the new benefit
      const benefit = await storage.createMemberBenefit(validatedData);
      
      return res.status(201).json({ 
        success: true, 
        message: "Member benefit created successfully",
        benefit
      });
    } catch (error: any) {
      console.error("Error creating member benefit:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Update member benefit
  app.patch('/api/member-benefits/:id', async (req, res) => {
    try {
      const benefitId = parseInt(req.params.id);
      if (isNaN(benefitId)) {
        return res.status(400).json({ success: false, message: "Invalid benefit ID" });
      }
      
      // Validate update data
      const validatedData = memberBenefitSchema.partial().parse(req.body);
      
      // Update the benefit
      const updatedBenefit = await storage.updateMemberBenefit(benefitId, validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Member benefit updated successfully",
        benefit: updatedBenefit
      });
    } catch (error: any) {
      console.error("Error updating member benefit:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Get all member benefits
  app.get('/api/member-benefits', async (req, res) => {
    try {
      const benefits = await storage.getAllMemberBenefits();
      
      return res.status(200).json({ 
        success: true, 
        benefits
      });
    } catch (error: any) {
      console.error("Error fetching all member benefits:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Member Recurring Donations API Routes
  
  // Get all recurring donations for a member
  app.get('/api/members/:memberId/donations', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const memberId = parseInt(req.params.memberId);
      if (isNaN(memberId)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" });
      }
      
      // Check if user has access to this member's data (admin or own data)
      const member = await storage.getMember(memberId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      // Check if user is admin or the member belongs to the authenticated user
      if (req.user?.role !== 'admin' && member.userId !== req.user?.id) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      
      const donations = await storage.getMemberDonations(memberId);
      
      return res.status(200).json({ 
        success: true, 
        donations
      });
    } catch (error: any) {
      console.error("Error fetching member donations:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Get a specific recurring donation by ID
  app.get('/api/member-donations/:id', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const donationId = parseInt(req.params.id);
      if (isNaN(donationId)) {
        return res.status(400).json({ success: false, message: "Invalid donation ID" });
      }
      
      // Get the donation
      const donation = await storage.getMemberDonation(donationId);
      if (!donation) {
        return res.status(404).json({ success: false, message: "Donation not found" });
      }
      
      // Get the member to check permissions
      const member = await storage.getMember(donation.memberId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      // Check if user is admin or the member belongs to the authenticated user
      if (req.user?.role !== 'admin' && member.userId !== req.user?.id) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      
      return res.status(200).json({ 
        success: true, 
        donation
      });
    } catch (error: any) {
      console.error("Error fetching member donation:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Create a new recurring donation for a member
  app.post('/api/members/:memberId/donations', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const memberId = parseInt(req.params.memberId);
      if (isNaN(memberId)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" });
      }
      
      // Check if the member exists
      const member = await storage.getMember(memberId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      // Check if user is admin or the member belongs to the authenticated user
      if (req.user?.role !== 'admin' && member.userId !== req.user?.id) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      
      // Validate donation data
      const validatedData = memberDonationSchema.parse({
        ...req.body,
        memberId
      });
      
      // Create the donation
      const donation = await storage.createMemberDonation(validatedData);
      
      // In a real implementation, you would integrate with a payment gateway to set up recurring payments
      
      return res.status(201).json({ 
        success: true, 
        message: "Recurring donation created successfully",
        donation
      });
    } catch (error: any) {
      console.error("Error creating recurring donation:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Update a recurring donation
  app.patch('/api/member-donations/:id', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const donationId = parseInt(req.params.id);
      if (isNaN(donationId)) {
        return res.status(400).json({ success: false, message: "Invalid donation ID" });
      }
      
      // Get the existing donation
      const existingDonation = await storage.getMemberDonation(donationId);
      if (!existingDonation) {
        return res.status(404).json({ success: false, message: "Donation not found" });
      }
      
      // Get the member to check permissions
      const member = await storage.getMember(existingDonation.memberId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      // Check if user is admin or the member belongs to the authenticated user
      if (req.user?.role !== 'admin' && member.userId !== req.user?.id) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      
      // Validate the update data
      const validatedData = memberDonationSchema.partial().parse(req.body);
      
      // If memberId is provided, make sure it matches the existing donation's memberId
      if (validatedData.memberId && validatedData.memberId !== existingDonation.memberId) {
        return res.status(400).json({ success: false, message: "Cannot change the member of a donation" });
      }
      
      // Update the donation
      const updatedDonation = await storage.updateMemberDonation(donationId, validatedData);
      
      return res.status(200).json({ 
        success: true, 
        message: "Recurring donation updated successfully",
        donation: updatedDonation
      });
    } catch (error: any) {
      console.error("Error updating recurring donation:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });
  
  // Member Payment History API Routes
  
  // Get payment history for a member
  app.get('/api/members/:memberId/payments', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const memberId = parseInt(req.params.memberId);
      if (isNaN(memberId)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" });
      }
      
      // Check if the member exists
      const member = await storage.getMember(memberId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      // Check if user is admin or the member belongs to the authenticated user
      if (req.user?.role !== 'admin' && member.userId !== req.user?.id) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      
      // Get the payment history
      const payments = await storage.getMemberPayments(memberId);
      
      return res.status(200).json({ 
        success: true, 
        payments
      });
    } catch (error: any) {
      console.error("Error fetching payment history:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Get a specific payment by ID
  app.get('/api/member-payments/:id', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const paymentId = parseInt(req.params.id);
      if (isNaN(paymentId)) {
        return res.status(400).json({ success: false, message: "Invalid payment ID" });
      }
      
      // Get the payment
      const payment = await storage.getMemberPayment(paymentId);
      if (!payment) {
        return res.status(404).json({ success: false, message: "Payment not found" });
      }
      
      // Get the member to check permissions
      const member = await storage.getMember(payment.memberId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      // Check if user is admin or the member belongs to the authenticated user
      if (req.user?.role !== 'admin' && member.userId !== req.user?.id) {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      
      return res.status(200).json({ 
        success: true, 
        payment
      });
    } catch (error: any) {
      console.error("Error fetching payment:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  
  // Create a new payment record
  app.post('/api/members/:memberId/payments', authenticate, async (req: AuthenticatedRequest, res) => {
    try {
      const memberId = parseInt(req.params.memberId);
      if (isNaN(memberId)) {
        return res.status(400).json({ success: false, message: "Invalid member ID" });
      }
      
      // Check if the member exists
      const member = await storage.getMember(memberId);
      if (!member) {
        return res.status(404).json({ success: false, message: "Member not found" });
      }
      
      // Only admins can create payment records manually
      if (req.user?.role !== 'admin') {
        return res.status(403).json({ success: false, message: "Access denied" });
      }
      
      // Validate payment data
      const validatedData = memberPaymentSchema.parse({
        ...req.body,
        memberId
      });
      
      // Create the payment record
      const payment = await storage.createMemberPayment(validatedData);
      
      return res.status(201).json({ 
        success: true, 
        message: "Payment record created successfully",
        payment
      });
    } catch (error: any) {
      console.error("Error creating payment record:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
