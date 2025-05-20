import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User model
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  language: text("language").default("en"),
  progress: jsonb("progress").default({}),
  profile_image: text("profile_image"),
  is_admin: boolean("is_admin").default(false)
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  language: true,
  profile_image: true
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
  is_essential: boolean("is_essential").default(false),
  created_at: timestamp("created_at").defaultNow()
});

export const insertHajjGuideSchema = createInsertSchema(hajjGuides).omit({
  id: true,
  created_at: true
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
  is_essential: boolean("is_essential").default(false),
  created_at: timestamp("created_at").defaultNow()
});

export const insertUmrahGuideSchema = createInsertSchema(umrahGuides).omit({
  id: true,
  created_at: true
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
  reference: text("reference").notNull(),
  created_at: timestamp("created_at").defaultNow()
});

export const insertMasjidGuideSchema = createInsertSchema(masjidGuides).omit({
  id: true,
  created_at: true
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
  tags: text("tags").array().notNull(),
  created_at: timestamp("created_at").defaultNow()
});

export const insertDuaSchema = createInsertSchema(duas).omit({
  id: true,
  created_at: true
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
  expertise: text("expertise").array().notNull(),
  image_url: text("image_url"),
  created_at: timestamp("created_at").defaultNow()
});

export const insertScholarSchema = createInsertSchema(scholars).omit({
  id: true,
  created_at: true
});

// Advertisement model
export const advertisements = pgTable("advertisements", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  image_placeholder: text("image_placeholder").notNull(),
  location: text("location").notNull(),
  is_active: boolean("is_active").default(true),
  created_at: timestamp("created_at").defaultNow()
});

export const insertAdvertisementSchema = createInsertSchema(advertisements).omit({
  id: true,
  created_at: true
});

// Blog model
export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  title_ar: text("title_ar").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  content_ar: text("content_ar").notNull(),
  excerpt: text("excerpt").notNull(),
  excerpt_ar: text("excerpt_ar").notNull(),
  author_id: integer("author_id").notNull(),
  featured_image: text("featured_image"),
  published: boolean("published").default(false),
  category: text("category").notNull(),
  tags: text("tags").array().default([]),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  created_at: true,
  updated_at: true
});

// Blog Comments model
export const blogComments = pgTable("blog_comments", {
  id: serial("id").primaryKey(),
  post_id: integer("post_id").notNull(),
  user_id: integer("user_id").notNull(),
  content: text("content").notNull(),
  is_approved: boolean("is_approved").default(false),
  created_at: timestamp("created_at").defaultNow()
});

export const insertBlogCommentSchema = createInsertSchema(blogComments).omit({
  id: true,
  created_at: true
});

// Forum model
export const forumTopics = pgTable("forum_topics", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  user_id: integer("user_id").notNull(),
  category: text("category").notNull(),
  is_pinned: boolean("is_pinned").default(false),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertForumTopicSchema = createInsertSchema(forumTopics).omit({
  id: true,
  created_at: true,
  updated_at: true
});

export const forumReplies = pgTable("forum_replies", {
  id: serial("id").primaryKey(),
  topic_id: integer("topic_id").notNull(),
  user_id: integer("user_id").notNull(),
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow()
});

export const insertForumReplySchema = createInsertSchema(forumReplies).omit({
  id: true,
  created_at: true,
  updated_at: true
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

export type BlogPost = typeof blogPosts.$inferSelect;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

export type BlogComment = typeof blogComments.$inferSelect;
export type InsertBlogComment = z.infer<typeof insertBlogCommentSchema>;

export type ForumTopic = typeof forumTopics.$inferSelect;
export type InsertForumTopic = z.infer<typeof insertForumTopicSchema>;

export type ForumReply = typeof forumReplies.$inferSelect;
export type InsertForumReply = z.infer<typeof insertForumReplySchema>;
