import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  language: text("language").default("en"),
  progress: jsonb("progress").default({})
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  language: true
});

// Hajj Guide model
export const hajjGuides = pgTable("hajj_guides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  title_ar: text("title_ar").notNull(),
  description: text("description").notNull(),
  description_ar: text("description_ar").notNull(),
  content: jsonb("content").notNull(),
  content_ar: jsonb("content_ar").notNull(),
  order: integer("order").notNull(),
  image_url: text("image_url"),
  reference: text("reference").notNull(),
  scholar_id: integer("scholar_id"),
  is_essential: boolean("is_essential").default(false)
});

export const insertHajjGuideSchema = createInsertSchema(hajjGuides).omit({
  id: true
});

// Umrah Guide model
export const umrahGuides = pgTable("umrah_guides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  title_ar: text("title_ar").notNull(),
  description: text("description").notNull(),
  description_ar: text("description_ar").notNull(),
  content: jsonb("content").notNull(),
  content_ar: jsonb("content_ar").notNull(),
  order: integer("order").notNull(),
  image_url: text("image_url"),
  reference: text("reference").notNull(),
  scholar_id: integer("scholar_id"),
  is_essential: boolean("is_essential").default(false)
});

export const insertUmrahGuideSchema = createInsertSchema(umrahGuides).omit({
  id: true
});

// Masjid Nabawi Guide model
export const masjidGuides = pgTable("masjid_guides", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  title_ar: text("title_ar").notNull(),
  description: text("description").notNull(),
  description_ar: text("description_ar").notNull(),
  content: jsonb("content").notNull(),
  content_ar: jsonb("content_ar").notNull(),
  category: text("category").notNull(),
  location: text("location").notNull(),
  location_ar: text("location_ar").notNull(),
  image_url: text("image_url"),
  reference: text("reference").notNull()
});

export const insertMasjidGuideSchema = createInsertSchema(masjidGuides).omit({
  id: true
});

// Dua model
export const duas = pgTable("duas", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  title_ar: text("title_ar").notNull(),
  arabic_text: text("arabic_text").notNull(),
  transliteration: text("transliteration").notNull(),
  translation: text("translation").notNull(),
  translation_ar: text("translation_ar").notNull(),
  reference: text("reference").notNull(),
  category: text("category").notNull(),
  tags: text("tags").array().notNull()
});

export const insertDuaSchema = createInsertSchema(duas).omit({
  id: true
});

// Scholar model
export const scholars = pgTable("scholars", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  name_ar: text("name_ar").notNull(),
  title: text("title").notNull(),
  title_ar: text("title_ar").notNull(),
  bio: text("bio").notNull(),
  bio_ar: text("bio_ar").notNull(),
  expertise: text("expertise").array().notNull()
});

export const insertScholarSchema = createInsertSchema(scholars).omit({
  id: true
});

// Advertisement model
export const advertisements = pgTable("advertisements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  image_placeholder: text("image_placeholder").notNull(),
  location: text("location").notNull(),
  is_active: boolean("is_active").default(true)
});

export const insertAdvertisementSchema = createInsertSchema(advertisements).omit({
  id: true
});

// Export types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type HajjGuide = typeof hajjGuides.$inferSelect;
export type InsertHajjGuide = z.infer<typeof insertHajjGuideSchema>;

export type UmrahGuide = typeof umrahGuides.$inferSelect;
export type InsertUmrahGuide = z.infer<typeof insertUmrahGuideSchema>;

export type MasjidGuide = typeof masjidGuides.$inferSelect;
export type InsertMasjidGuide = z.infer<typeof insertMasjidGuideSchema>;

export type Dua = typeof duas.$inferSelect;
export type InsertDua = z.infer<typeof insertDuaSchema>;

export type Scholar = typeof scholars.$inferSelect;
export type InsertScholar = z.infer<typeof insertScholarSchema>;

export type Advertisement = typeof advertisements.$inferSelect;
export type InsertAdvertisement = z.infer<typeof insertAdvertisementSchema>;
