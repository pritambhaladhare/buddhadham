import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, donationSchema, memberSchema, memberBenefitSchema, newsletterSchema, volunteerSchema } from "@shared/schema";
import nodemailer from "nodemailer";

export async function registerRoutes(app: Express): Promise<Server> {
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
  
  // Create new member
  app.post('/api/members', async (req, res) => {
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
  
  // Get member by ID
  app.get('/api/members/:id', async (req, res) => {
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
  
  // Get member by user ID
  app.get('/api/members/user/:userId', async (req, res) => {
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
  
  // Update member
  app.patch('/api/members/:id', async (req, res) => {
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
  
  // Get all members
  app.get('/api/members', async (req, res) => {
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

  const httpServer = createServer(app);

  return httpServer;
}
