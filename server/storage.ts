import { 
  users, type User, type InsertUser, 
  members, type Member, type InsertMember,
  memberBenefits, type MemberBenefit, type InsertMemberBenefit,
  memberDonations, type MemberDonation, type InsertMemberDonation,
  memberPayments, type MemberPayment, type InsertMemberPayment,
  type InsertContactMessage, type ContactMessage, 
  type InsertNewsletter, type Newsletter, 
  type InsertDonation, type Donation, 
  type InsertVolunteerApplication, type VolunteerApplication 
} from "@shared/schema";

// Modify the interface with any CRUD methods
// you might need
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Member management
  getMember(id: number): Promise<Member | undefined>;
  getMemberByUserId(userId: number): Promise<Member | undefined>;
  createMember(member: InsertMember): Promise<Member>;
  updateMember(id: number, member: Partial<InsertMember>): Promise<Member>;
  getMembers(): Promise<Member[]>;
  
  // Member Benefits
  getMemberBenefits(membershipLevel: string): Promise<MemberBenefit[]>;
  createMemberBenefit(benefit: InsertMemberBenefit): Promise<MemberBenefit>;
  updateMemberBenefit(id: number, benefit: Partial<InsertMemberBenefit>): Promise<MemberBenefit>;
  getAllMemberBenefits(): Promise<MemberBenefit[]>;
  
  // Member Recurring Donations
  getMemberDonations(memberId: number): Promise<MemberDonation[]>;
  getMemberDonation(id: number): Promise<MemberDonation | undefined>;
  createMemberDonation(donation: InsertMemberDonation): Promise<MemberDonation>;
  updateMemberDonation(id: number, donation: Partial<InsertMemberDonation>): Promise<MemberDonation>;
  
  // Member Payment History
  getMemberPayments(memberId: number): Promise<MemberPayment[]>;
  getMemberPayment(id: number): Promise<MemberPayment | undefined>;
  createMemberPayment(payment: InsertMemberPayment): Promise<MemberPayment>;
  
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
  private members: Map<number, Member>;
  private memberBenefits: Map<number, MemberBenefit>;
  private memberDonations: Map<number, MemberDonation>;
  private memberPayments: Map<number, MemberPayment>;
  private contactMessages: Map<number, ContactMessage>;
  private newsletters: Map<number, Newsletter>;
  private donations: Map<number, Donation>;
  private volunteerApplications: Map<number, VolunteerApplication>;
  
  private currentUserId: number;
  private currentMemberId: number;
  private currentMemberBenefitId: number;
  private currentMemberDonationId: number;
  private currentMemberPaymentId: number;
  private currentContactMessageId: number;
  private currentNewsletterId: number;
  private currentDonationId: number;
  private currentVolunteerApplicationId: number;

  constructor() {
    this.users = new Map();
    this.members = new Map();
    this.memberBenefits = new Map();
    this.memberDonations = new Map();
    this.memberPayments = new Map();
    this.contactMessages = new Map();
    this.newsletters = new Map();
    this.donations = new Map();
    this.volunteerApplications = new Map();
    
    this.currentUserId = 1;
    this.currentMemberId = 1;
    this.currentMemberBenefitId = 1;
    this.currentMemberDonationId = 1;
    this.currentMemberPaymentId = 1;
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
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const createdAt = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt, 
      email: insertUser.email || null,
      fullName: insertUser.fullName || null,
      role: insertUser.role || null 
    };
    this.users.set(id, user);
    return user;
  }
  
  // Member methods
  async getMember(id: number): Promise<Member | undefined> {
    return this.members.get(id);
  }
  
  async getMemberByUserId(userId: number): Promise<Member | undefined> {
    return Array.from(this.members.values()).find(
      (member) => member.userId === userId,
    );
  }
  
  async createMember(member: InsertMember): Promise<Member> {
    const id = this.currentMemberId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    const newMember: Member = { 
      ...member, 
      id, 
      createdAt, 
      updatedAt, 
      membershipStatus: member.membershipStatus || 'active',
      address: member.address || null,
      city: member.city || null,
      state: member.state || null,
      country: member.country || null,
      postalCode: member.postalCode || null,
      phoneNumber: member.phoneNumber || null,
      preferences: member.preferences || {} 
    };
    this.members.set(id, newMember);
    return newMember;
  }
  
  async updateMember(id: number, memberUpdate: Partial<InsertMember>): Promise<Member> {
    const existingMember = await this.getMember(id);
    if (!existingMember) {
      throw new Error("Member not found");
    }
    
    const updatedMember: Member = {
      ...existingMember,
      ...memberUpdate,
      updatedAt: new Date()
    };
    
    this.members.set(id, updatedMember);
    return updatedMember;
  }
  
  async getMembers(): Promise<Member[]> {
    return Array.from(this.members.values());
  }
  
  // Member Benefits methods
  async getMemberBenefits(membershipLevel: string): Promise<MemberBenefit[]> {
    return Array.from(this.memberBenefits.values()).filter(
      (benefit) => benefit.membershipLevel === membershipLevel && benefit.isActive,
    );
  }
  
  async createMemberBenefit(benefit: InsertMemberBenefit): Promise<MemberBenefit> {
    const id = this.currentMemberBenefitId++;
    const createdAt = new Date();
    const newBenefit: MemberBenefit = { 
      ...benefit, 
      id, 
      createdAt, 
      isActive: benefit.isActive === undefined ? true : benefit.isActive 
    };
    this.memberBenefits.set(id, newBenefit);
    return newBenefit;
  }
  
  async updateMemberBenefit(id: number, benefitUpdate: Partial<InsertMemberBenefit>): Promise<MemberBenefit> {
    const existingBenefit = this.memberBenefits.get(id);
    if (!existingBenefit) {
      throw new Error("Benefit not found");
    }
    
    const updatedBenefit: MemberBenefit = {
      ...existingBenefit,
      ...benefitUpdate,
    };
    
    this.memberBenefits.set(id, updatedBenefit);
    return updatedBenefit;
  }
  
  async getAllMemberBenefits(): Promise<MemberBenefit[]> {
    return Array.from(this.memberBenefits.values());
  }
  
  // Contact message methods
  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentContactMessageId++;
    const createdAt = new Date();
    const contactMessage: ContactMessage = { 
      ...message, 
      id, 
      createdAt,
      subject: message.subject || null 
    };
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
    
    // Simply use the amount as-is since it should be a string type
    // or convert it if somehow it's a number
    const amountValue = typeof donation.amount === 'number' ? 
      String(donation.amount) : (donation.amount || '0');
    
    const newDonation: Donation = { 
      ...donation, 
      id, 
      createdAt,
      amount: amountValue,
      address: donation.address || null,
      city: donation.city || null,
      country: donation.country || null,
      message: donation.message || null
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
    const volunteerApplication: VolunteerApplication = { 
      ...application, 
      id, 
      createdAt,
      message: application.message || null,
      city: application.city || null,
      country: application.country || null,
      phone: application.phone || null,
      availability: application.availability || null,
      experience: application.experience || null
    };
    this.volunteerApplications.set(id, volunteerApplication);
    return volunteerApplication;
  }
  
  async getVolunteerApplications(): Promise<VolunteerApplication[]> {
    return Array.from(this.volunteerApplications.values());
  }
  
  // Member Recurring Donation methods
  async getMemberDonations(memberId: number): Promise<MemberDonation[]> {
    return Array.from(this.memberDonations.values()).filter(
      (donation) => donation.memberId === memberId
    );
  }
  
  async getMemberDonation(id: number): Promise<MemberDonation | undefined> {
    return this.memberDonations.get(id);
  }
  
  async createMemberDonation(donation: InsertMemberDonation): Promise<MemberDonation> {
    const id = this.currentMemberDonationId++;
    const createdAt = new Date();
    const updatedAt = new Date();
    
    // Format amount value
    const amountValue = typeof donation.amount === 'number' ? 
      String(donation.amount) : (donation.amount || '0');
    
    const newDonation: MemberDonation = { 
      ...donation, 
      id, 
      createdAt, 
      updatedAt,
      amount: amountValue,
      status: donation.status || 'active',
      paymentMethod: donation.paymentMethod || 'card',
      transactionId: donation.transactionId || null,
      notes: donation.notes || null
    };
    
    this.memberDonations.set(id, newDonation);
    return newDonation;
  }
  
  async updateMemberDonation(id: number, donationUpdate: Partial<InsertMemberDonation>): Promise<MemberDonation> {
    const existingDonation = this.memberDonations.get(id);
    if (!existingDonation) {
      throw new Error("Member donation not found");
    }
    
    // Format amount value if it exists in the update
    let updatedAmount = existingDonation.amount;
    if (donationUpdate.amount !== undefined) {
      updatedAmount = typeof donationUpdate.amount === 'number' ? 
        String(donationUpdate.amount) : donationUpdate.amount;
    }
    
    const updatedDonation: MemberDonation = {
      ...existingDonation,
      ...donationUpdate,
      amount: updatedAmount,
      updatedAt: new Date()
    };
    
    this.memberDonations.set(id, updatedDonation);
    return updatedDonation;
  }
  
  // Member Payment History methods
  async getMemberPayments(memberId: number): Promise<MemberPayment[]> {
    return Array.from(this.memberPayments.values())
      .filter(payment => payment.memberId === memberId)
      .sort((a, b) => {
        // Sort by payment date, most recent first
        return new Date(b.paymentDate).getTime() - new Date(a.paymentDate).getTime();
      });
  }
  
  async getMemberPayment(id: number): Promise<MemberPayment | undefined> {
    return this.memberPayments.get(id);
  }
  
  async createMemberPayment(payment: InsertMemberPayment): Promise<MemberPayment> {
    const id = this.currentMemberPaymentId++;
    const createdAt = new Date();
    
    // Format amount value
    const amountValue = typeof payment.amount === 'number' ? 
      String(payment.amount) : (payment.amount || '0');
    
    const newPayment: MemberPayment = { 
      id, 
      createdAt,
      memberId: payment.memberId,
      donationId: payment.donationId || null,
      amount: amountValue,
      paymentDate: payment.paymentDate,
      status: payment.status || 'completed',
      paymentMethod: payment.paymentMethod,
      transactionId: payment.transactionId || null,
      receiptUrl: payment.receiptUrl || null,
      notes: payment.notes || null
    };
    
    this.memberPayments.set(id, newPayment);
    return newPayment;
  }
}

export const storage = new MemStorage();
