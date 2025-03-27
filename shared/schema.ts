import { pgTable, text, serial, integer, boolean, jsonb, timestamp, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

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
