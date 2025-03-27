import { users, type User, type InsertUser, type InsertContactMessage, type ContactMessage, type InsertNewsletter, type Newsletter, type InsertDonation, type Donation, type InsertVolunteerApplication, type VolunteerApplication } from "@shared/schema";

// Modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  // Newsletter
  createNewsletter(subscription: InsertNewsletter): Promise<Newsletter>;
  getNewsletterByEmail(email: string): Promise<Newsletter | undefined>;
  
  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonations(): Promise<Donation[]>;
  
  // Volunteer applications
  createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication>;
  getVolunteerApplications(): Promise<VolunteerApplication[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletters: Map<number, Newsletter>;
  private donations: Map<number, Donation>;
  private volunteerApplications: Map<number, VolunteerApplication>;
  
  private currentUserId: number;
  private currentContactMessageId: number;
  private currentNewsletterId: number;
  private currentDonationId: number;
  private currentVolunteerApplicationId: number;

  constructor() {
    this.users = new Map();
    this.contactMessages = new Map();
    this.newsletters = new Map();
    this.donations = new Map();
    this.volunteerApplications = new Map();
    
    this.currentUserId = 1;
    this.currentContactMessageId = 1;
    this.currentNewsletterId = 1;
    this.currentDonationId = 1;
    this.currentVolunteerApplicationId = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { ...message, id, createdAt };
    this.contactMessages.set(id, contactMessage);
    return contactMessage;
  }
  
  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  // Newsletter methods
  async createNewsletter(subscription: InsertNewsletter): Promise<Newsletter> {
    // Check if email already exists
    const existingSubscription = await this.getNewsletterByEmail(subscription.email);
    if (existingSubscription) {
      throw new Error("Email already subscribed to newsletter");
    }
    
    const id = this.currentNewsletterId++;
    const createdAt = new Date();
    const newsletter: Newsletter = { ...subscription, id, createdAt };
    this.newsletters.set(id, newsletter);
    return newsletter;
  }
  
  async getNewsletterByEmail(email: string): Promise<Newsletter | undefined> {
    return Array.from(this.newsletters.values()).find(
      (newsletter) => newsletter.email === email,
    );
  }
  
  // Donation methods
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.currentDonationId++;
    const createdAt = new Date();
    const newDonation: Donation = { 
      ...donation, 
      id, 
      createdAt,
      // Convert string amount to Decimal128 or similar (in a real implementation)
      amount: typeof donation.amount === 'string' ? parseFloat(donation.amount) : donation.amount
    };
    this.donations.set(id, newDonation);
    return newDonation;
  }
  
  async getDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }
  
  // Volunteer application methods
  async createVolunteerApplication(application: InsertVolunteerApplication): Promise<VolunteerApplication> {
    const id = this.currentVolunteerApplicationId++;
    const createdAt = new Date();
    const volunteerApplication: VolunteerApplication = { ...application, id, createdAt };
    this.volunteerApplications.set(id, volunteerApplication);
    return volunteerApplication;
  }
  
  async getVolunteerApplications(): Promise<VolunteerApplication[]> {
    return Array.from(this.volunteerApplications.values());
  }
}

export const storage = new MemStorage();
