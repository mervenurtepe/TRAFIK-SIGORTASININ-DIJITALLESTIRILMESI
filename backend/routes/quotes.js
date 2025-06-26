const express = require("express");

module.exports = (models) => {
  const { Quote, Vehicle } = models;
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const { vehicle_id } = req.query;
      let quotes;
      if (vehicle_id) {
        quotes = await Quote.findAll({ where: { vehicle_id } });
      } else {
        quotes = await Quote.findAll();
      }
      res.json(quotes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const quote = await Quote.findByPk(req.params.id);
      if (!quote) return res.status(404).json({ error: "Quote not found" });
      res.json(quote);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      if (Array.isArray(req.body)) {
        const newQuotes = await Quote.bulkCreate(req.body);
        res.status(201).json(newQuotes);
      } else {
        const newQuote = await Quote.create(req.body);
        res.status(201).json(newQuote);
      }
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const quote = await Quote.findByPk(req.params.id);
      if (!quote) return res.status(404).json({ error: "Quote not found" });
      await quote.update(req.body);
      res.json(quote);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const quote = await Quote.findByPk(req.params.id);
      if (!quote) return res.status(404).json({ error: "Quote not found" });
      await quote.destroy();
      res.json({ message: "Quote deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}; 