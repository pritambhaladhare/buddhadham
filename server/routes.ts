import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { contactSchema, donationSchema, newsletterSchema, volunteerSchema } from "@shared/schema";
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

  const httpServer = createServer(app);

  return httpServer;
}
