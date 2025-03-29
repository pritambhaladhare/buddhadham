import { pgTable, text, serial, integer, boolean, jsonb, timestamp, numeric, varchar, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").unique(),
  fullName: text("full_name"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  fullName: true,
  role: true
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Members table for recurring donors
export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  membershipLevel: text("membership_level").notNull(), // bronze, silver, gold, platinum
  membershipStatus: text("membership_status").notNull().default("active"), // active, inactive, pending
  startDate: date("start_date").notNull(),
  renewalDate: date("renewal_date").notNull(),
  donationAmount: numeric("donation_amount").notNull(),
  donationFrequency: text("donation_frequency").notNull(), // monthly, quarterly, annually
  address: text("address"),
  city: text("city"),
  state: text("state"),
  country: text("country"),
  postalCode: text("postal_code"),
  phoneNumber: text("phone_number"),
  preferences: jsonb("preferences").default({}),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const memberSchema = createInsertSchema(members).pick({
  userId: true,
  membershipLevel: true,
  membershipStatus: true,
  startDate: true,
  renewalDate: true,
  donationAmount: true,
  donationFrequency: true,
  address: true,
  city: true,
  state: true,
  country: true,
  postalCode: true,
  phoneNumber: true,
  preferences: true
});

export type InsertMember = z.infer<typeof memberSchema>;
export type Member = typeof members.$inferSelect;

// Member benefits table
export const memberBenefits = pgTable("member_benefits", {
  id: serial("id").primaryKey(),
  membershipLevel: text("membership_level").notNull(),
  benefitName: text("benefit_name").notNull(),
  benefitDescription: text("benefit_description").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const memberBenefitSchema = createInsertSchema(memberBenefits).pick({
  membershipLevel: true,
  benefitName: true,
  benefitDescription: true,
  isActive: true
});

export type InsertMemberBenefit = z.infer<typeof memberBenefitSchema>;
export type MemberBenefit = typeof memberBenefits.$inferSelect;

// Contact messages table
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const contactSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true
});

export type InsertContactMessage = z.infer<typeof contactSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Newsletter subscriptions table
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  interests: jsonb("interests").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const newsletterSchema = createInsertSchema(newsletters).pick({
  firstName: true,
  lastName: true,
  email: true,
  interests: true
});

export type InsertNewsletter = z.infer<typeof newsletterSchema>;
export type Newsletter = typeof newsletters.$inferSelect;

// Donations table
export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: numeric("amount").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  address: text("address"),
  city: text("city"),
  country: text("country"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const donationSchema = createInsertSchema(donations).pick({
  amount: true,
  name: true,
  email: true,
  address: true,
  city: true,
  country: true,
  message: true
});

export type InsertDonation = z.infer<typeof donationSchema>;
export type Donation = typeof donations.$inferSelect;

// Member recurring donations table
export const memberDonations = pgTable("member_donations", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id).notNull(),
  amount: numeric("amount").notNull(),
  frequency: text("frequency").notNull(), // monthly, quarterly, annually
  status: text("status").notNull().default("active"), // active, paused, cancelled
  paymentMethod: text("payment_method").notNull().default("card"), // card, bank, paypal
  lastPaymentDate: date("last_payment_date").notNull(),
  nextPaymentDate: date("next_payment_date").notNull(),
  transactionId: text("transaction_id"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const memberDonationSchema = createInsertSchema(memberDonations).pick({
  memberId: true,
  amount: true,
  frequency: true,
  status: true,
  paymentMethod: true,
  lastPaymentDate: true,
  nextPaymentDate: true,
  transactionId: true,
  notes: true
});

export type InsertMemberDonation = z.infer<typeof memberDonationSchema>;
export type MemberDonation = typeof memberDonations.$inferSelect;

// Member payment history table
export const memberPayments = pgTable("member_payments", {
  id: serial("id").primaryKey(),
  memberId: integer("member_id").references(() => members.id).notNull(),
  donationId: integer("donation_id").references(() => memberDonations.id),
  amount: numeric("amount").notNull(),
  paymentDate: date("payment_date").notNull(),
  status: text("status").notNull().default("completed"), // completed, failed, refunded
  transactionId: text("transaction_id"),
  paymentMethod: text("payment_method").notNull(),
  receiptUrl: text("receipt_url"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const memberPaymentSchema = createInsertSchema(memberPayments).pick({
  memberId: true,
  donationId: true,
  amount: true,
  paymentDate: true,
  status: true,
  transactionId: true,
  paymentMethod: true,
  receiptUrl: true,
  notes: true
});

export type InsertMemberPayment = z.infer<typeof memberPaymentSchema>;
export type MemberPayment = typeof memberPayments.$inferSelect;

// Volunteer applications table
export const volunteerApplications = pgTable("volunteer_applications", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  city: text("city"),
  country: text("country"),
  interests: jsonb("interests").notNull(),
  availability: text("availability"),
  experience: text("experience"),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const volunteerSchema = createInsertSchema(volunteerApplications).pick({
  name: true,
  email: true,
  phone: true,
  city: true,
  country: true,
  interests: true,
  availability: true,
  experience: true,
  message: true
});

export type InsertVolunteerApplication = z.infer<typeof volunteerSchema>;
export type VolunteerApplication = typeof volunteerApplications.$inferSelect;
