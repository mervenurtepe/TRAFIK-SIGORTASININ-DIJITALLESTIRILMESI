const express = require("express");

module.exports = (models) => {
  const { Feedback } = models;
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const feedbacks = await Feedback.findAll();
      res.json(feedbacks);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
      if (!feedback) return res.status(404).json({ error: "Feedback not found" });
      res.json(feedback);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newFeedback = await Feedback.create(req.body);
      res.status(201).json(newFeedback);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
      if (!feedback) return res.status(404).json({ error: "Feedback not found" });
      await feedback.update(req.body);
      res.json(feedback);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const feedback = await Feedback.findByPk(req.params.id);
      if (!feedback) return res.status(404).json({ error: "Feedback not found" });
      await feedback.destroy();
      res.json({ message: "Feedback deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}; 