const express = require("express");
const PDFDocument = require("pdfkit");
const dayjs = require("dayjs");
const fs = require("fs");
const path = require("path");

module.exports = (models) => {
  const { Policy, Payment, Quote, Vehicle, User } = models;
  const router = express.Router();

  // GET all policies
  router.get("/", async (req, res) => {
    try {
      const policies = await Policy.findAll({
        include: [
          {
            model: Payment,
            include: [
              {
                model: Quote,
                include: [Vehicle],
              },
            ],
          },
        ],
      });
      res.json(policies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET policy by id
  router.get("/:id", async (req, res) => {
    try {
      const policy = await Policy.findByPk(req.params.id);
      if (!policy) return res.status(404).json({ error: "Policy not found" });
      res.json(policy);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // POST create policy
  router.post("/", async (req, res) => {
    try {
      const newPolicy = await Policy.create(req.body);
      res.status(201).json(newPolicy);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // PUT update policy
  router.put("/:id", async (req, res) => {
    try {
      const policy = await Policy.findByPk(req.params.id);
      if (!policy) return res.status(404).json({ error: "Policy not found" });
      await policy.update(req.body);
      res.json(policy);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // DELETE policy
  router.delete("/:id", async (req, res) => {
    try {
      const policy = await Policy.findByPk(req.params.id);
      if (!policy) return res.status(404).json({ error: "Policy not found" });
      await policy.destroy();
      res.json({ message: "Policy deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET policy PDF download
  router.get("/:id/download", async (req, res) => {
    try {
      const policy = await Policy.findByPk(req.params.id, {
        include: [
          {
            model: Payment,
            include: [{ model: Quote, include: [Vehicle] }, { model: User }],
          },
        ],
      });
      if (!policy) {
        return res.status(404).json({ error: "Poliçe bulunamadı" });
      }
      const { Payment: payment } = policy;
      const quote = payment?.Quote;
      const vehicle = quote?.Vehicle;
      const user = payment?.User;

      const doc = new PDFDocument({
        size: "A4",
        margin: 40,
        info: {
          Title: `Poliçe ${policy.policy_id}`,
          Author: "Sigorta Şirketi",
        },
      });
      const fontNormal = path.join(__dirname, "../fonts/Roboto-Regular.ttf");
      const fontBold = path.join(__dirname, "../fonts/Roboto-Bold.ttf");
      doc.registerFont("Normal", fontNormal);
      doc.registerFont("Bold", fontBold);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=police_${policy.policy_id}.pdf`
      );
      doc.pipe(res);
      const logoPath = path.join(__dirname, "../images/sigortamLogo.png");
      if (fs.existsSync(logoPath)) {
        doc.image(logoPath, doc.page.margins.left, 20, { width: 100 });
      }
      doc
        .font("Bold")
        .fontSize(20)
        .fillColor("#1e40af")
        .text("Sigorta Poliçesi", 0, 30, { align: "center" })
        .moveDown(1);
      dayjs.locale("tr");
      const now = dayjs(policy.createdAt);
      doc
        .font("Normal")
        .fontSize(10)
        .fillColor("gray")
        .text(`Düzenlenme Tarihi: ${now.format("D MMMM YYYY")}`,
          { align: "right" })
        .moveDown();
      const section = (title, y) => {
        doc
          .moveTo(doc.page.margins.left, y)
          .lineTo(doc.page.width - doc.page.margins.right, y)
          .strokeColor("#e2e8f0")
          .lineWidth(1)
          .stroke()
          .font("Bold")
          .fontSize(14)
          .fillColor("#1e40af")
          .rect(doc.page.margins.left, y + 10, 120, 20)
          .fillOpacity(0.1)
          .fill("#1e40af")
          .fillOpacity(1)
          .fillColor("#1e40af")
          .text(title, doc.page.margins.left + 5, y + 13)
          .moveDown(2);
      };
      let currentY = doc.y;
      section("Poliçe Bilgileri", currentY);
      doc
        .font("Normal")
        .fontSize(11)
        .fillColor("black")
        .list([
          `Poliçe No: ${policy.policy_id}`,
          `Başlangıç: ${dayjs(policy.start_date).format("D MMMM YYYY")}`,
          `Bitiş: ${dayjs(policy.end_date).format("D MMMM YYYY")}`,
        ], { bulletRadius: 2, textIndent: 10, bulletIndent: 0, lineGap: 1 });
      doc.moveDown(0.5);
      currentY = doc.y;
      if (user) {
        section("Sigortalı Bilgileri", currentY);
        doc.font("Normal").fontSize(10).fillColor("black");
        doc.list([
          `Ad Soyad: ${user.name} ${user.surname}`,
          `E-posta: ${user.email}`,
          `Telefon: ${user.tel}`,
          `Adres: ${user.address}`,
          `T.C. No: ${user.tc_identity_number}`,
        ], { bulletRadius: 2, textIndent: 10, bulletIndent: 0, lineGap: 1 });
        doc.moveDown(0.5);
        currentY = doc.y;
      }
      if (vehicle) {
        section("Araç Bilgileri", currentY);
        doc.font("Normal").fontSize(10).fillColor("black");
        doc.list([
          `Plaka: ${vehicle.plate_number}`,
          `Marka/Model: ${vehicle.brand_model}`,
          `Araç T.C. No: ${vehicle.tc_identity_number}`,
        ], { bulletRadius: 2, textIndent: 10, bulletIndent: 0, lineGap: 1 });
        doc.moveDown(0.5);
        currentY = doc.y;
      }
      if (quote) {
        section("Teklif Bilgileri", currentY);
        doc.font("Normal").fontSize(10).fillColor("black");
        doc.list([
          `Şirket: ${quote.insurance_company}`,
          `Fiyat: ${quote.price} TL`,
          `Kapsam: ${quote.coverage}`,
        ], { bulletRadius: 2, textIndent: 10, bulletIndent: 0, lineGap: 1 });
        doc.moveDown(0.5);
        currentY = doc.y;
      }
      if (payment) {
        section("Ödeme Bilgileri", currentY);
        doc.font("Normal").fontSize(10).fillColor("black");
        doc.list([
          `Yöntem: ${payment.payment_method}`,
          `Taksit: ${payment.installment_option}`,
          `Tutar: ${payment.amount} TL`,
          `Durum: ${payment.payment_status}`,
        ], { bulletRadius: 2, textIndent: 10, bulletIndent: 0, lineGap: 1 });
        doc.moveDown(0.5);
        currentY = doc.y;
      }
      const bottom = doc.page.height - 50;
      doc
        .font("Normal")
        .fontSize(10)
        .fillColor("gray")
        .text(
          "Bu poliçe elektronik ortamda oluşturulmuştur ve imzasız geçerlidir.",
          doc.page.margins.left,
          bottom - 20,
          { align: "center" }
        );
      const range = doc.bufferedPageRange();
      for (let i = range.start; i < range.start + range.count; i++) {
        doc.switchToPage(i);
        doc
          .font("Normal")
          .fontSize(9)
          .fillColor("gray")
          .text(`${i + 1} / ${range.count}`,
            doc.page.margins.left, bottom, { align: "right" });
      }
      doc.end();
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}; 