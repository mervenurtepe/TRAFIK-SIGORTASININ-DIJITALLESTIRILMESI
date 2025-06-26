const express = require("express");

module.exports = (models) => {
  const { Payment, Quote, Vehicle, Policy } = models;
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const payments = await Payment.findAll({
        include: [
          {
            model: Quote,
            include: [Vehicle],
          },
        ],
      });
      res.json(payments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) return res.status(404).json({ error: "Payment not found" });
      res.json(payment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newPayment = await Payment.create(req.body);
      res.status(201).json(newPayment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) return res.status(404).json({ error: "Payment not found" });
      const prevStatus = payment.payment_status;
      await payment.update(req.body);
      let newPolicy = null;
      if (req.body.payment_status === "Başarılı" && prevStatus !== "Başarılı") {
        const quote = await Quote.findByPk(payment.quote_id);
        const vehicle = quote ? await Vehicle.findByPk(quote.vehicle_id) : null;
        const today = new Date();
        const start_date = today.toISOString().slice(0, 10);
        const end_date = new Date(today.setFullYear(today.getFullYear() + 1))
          .toISOString()
          .slice(0, 10);
        const pdf_path = `/policies/${start_date.replace(/-/g, "/")}/policy_${payment.user_id}_${payment.quote_id}.pdf`;
        newPolicy = await Policy.create({
          payment_id: payment.payment_id,
          pdf_path,
          start_date,
          end_date,
        });
      }
      res.json({ payment, policy: newPolicy });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const payment = await Payment.findByPk(req.params.id);
      if (!payment) return res.status(404).json({ error: "Payment not found" });
      await payment.destroy();
      res.json({ message: "Payment deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}; 