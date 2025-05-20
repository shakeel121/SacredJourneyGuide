import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertUserSchema, insertHajjGuideSchema, insertUmrahGuideSchema, insertMasjidGuideSchema, insertDuaSchema, insertScholarSchema, insertAdvertisementSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API Routes

  // Get all hajj guides
  app.get("/api/hajj-guides", async (req, res) => {
    try {
      const guides = await storage.getHajjGuides();
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Hajj guides" });
    }
  });

  // Get specific hajj guide
  app.get("/api/hajj-guides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const guide = await storage.getHajjGuide(id);
      
      if (!guide) {
        return res.status(404).json({ message: "Hajj guide not found" });
      }
      
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Hajj guide" });
    }
  });

  // Get all umrah guides
  app.get("/api/umrah-guides", async (req, res) => {
    try {
      const guides = await storage.getUmrahGuides();
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Umrah guides" });
    }
  });

  // Get specific umrah guide
  app.get("/api/umrah-guides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const guide = await storage.getUmrahGuide(id);
      
      if (!guide) {
        return res.status(404).json({ message: "Umrah guide not found" });
      }
      
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Umrah guide" });
    }
  });

  // Get all masjid guides
  app.get("/api/masjid-guides", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      let guides;
      if (category) {
        guides = await storage.getMasjidGuidesByCategory(category);
      } else {
        guides = await storage.getMasjidGuides();
      }
      
      res.json(guides);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Masjid guides" });
    }
  });

  // Get specific masjid guide
  app.get("/api/masjid-guides/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const guide = await storage.getMasjidGuide(id);
      
      if (!guide) {
        return res.status(404).json({ message: "Masjid guide not found" });
      }
      
      res.json(guide);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Masjid guide" });
    }
  });

  // Get all duas
  app.get("/api/duas", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      
      let duasList;
      if (category) {
        duasList = await storage.getDuasByCategory(category);
      } else {
        duasList = await storage.getDuas();
      }
      
      res.json(duasList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch duas" });
    }
  });

  // Get specific dua
  app.get("/api/duas/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const dua = await storage.getDua(id);
      
      if (!dua) {
        return res.status(404).json({ message: "Dua not found" });
      }
      
      res.json(dua);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dua" });
    }
  });

  // Get all scholars
  app.get("/api/scholars", async (req, res) => {
    try {
      const scholars = await storage.getScholars();
      res.json(scholars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scholars" });
    }
  });

  // Get specific scholar
  app.get("/api/scholars/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const scholar = await storage.getScholar(id);
      
      if (!scholar) {
        return res.status(404).json({ message: "Scholar not found" });
      }
      
      res.json(scholar);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch scholar" });
    }
  });

  // Get advertisements by location
  app.get("/api/advertisements", async (req, res) => {
    try {
      const location = req.query.location as string | undefined;
      
      let adsList;
      if (location) {
        adsList = await storage.getAdvertisementsByLocation(location);
      } else {
        adsList = await storage.getAdvertisements();
      }
      
      res.json(adsList);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch advertisements" });
    }
  });

  // Toggle advertisement active status
  app.patch("/api/advertisements/:id/toggle", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { isActive } = req.body;
      
      if (typeof isActive !== 'boolean') {
        return res.status(400).json({ message: "isActive must be a boolean" });
      }
      
      const ad = await storage.toggleAdvertisement(id, isActive);
      
      if (!ad) {
        return res.status(404).json({ message: "Advertisement not found" });
      }
      
      res.json(ad);
    } catch (error) {
      res.status(500).json({ message: "Failed to update advertisement" });
    }
  });

  // User progress tracking
  app.post("/api/user-progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = req.body.progress;
      
      if (!progress || typeof progress !== 'object') {
        return res.status(400).json({ message: "Invalid progress data" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const updatedUser = await storage.updateUserProgress(userId, progress);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user progress" });
    }
  });

  // Create the HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
