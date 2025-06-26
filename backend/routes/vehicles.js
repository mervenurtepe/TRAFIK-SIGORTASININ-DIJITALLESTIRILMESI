const express = require("express");

module.exports = (models) => {
  const { Vehicle, Quote } = models;
  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const vehicles = await Vehicle.findAll();
      res.json(vehicles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
      res.json(vehicle);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.post("/", async (req, res) => {
    try {
      const newVehicle = await Vehicle.create(req.body);
      // Araç eklendikten sonra otomatik teklifler oluştur
      const companies = [
        "Anadolu Sigorta",
        "Allianz",
        "Axa",
        "Mapfre",
        "Sompo",
        "Groupama",
        "Zurich",
        "HDI",
        "Ray Sigorta",
        "Quick Sigorta",
      ];
      const coverages = [
        "Kasko, Mini Onarım, Yol Yardım",
        "Kasko, Cam Değişim, Çekici",
        "Kasko, İkame Araç, Hasar Danışmanlığı",
        "Kasko, Ferdi Kaza, Mini Onarım",
        "Kasko, Cam Tamiri, Lastik Değişim",
        "Kasko, Hukuksal Koruma, Asistans",
        "Kasko, Anahtar Kaybı, Cam Onarım",
        "Kasko, Sel/Su Baskını, Yangın",
        "Kasko, Hırsızlık, Deprem",
        "Kasko, Terör, Fırtına",
      ];
      const shuffledCompanies = companies.sort(() => 0.5 - Math.random());
      const offerCount = Math.floor(Math.random() * 8) + 8; // 8-15 arası
      const selectedCompanies = shuffledCompanies.slice(
        0,
        Math.min(offerCount, companies.length)
      );
      const offers = selectedCompanies.map((company) => ({
        vehicle_id: newVehicle.vehicle_id,
        insurance_company: company,
        price: Math.floor(Math.random() * 2000) + 2000,
        coverage: coverages[Math.floor(Math.random() * coverages.length)],
      }));
      await Quote.bulkCreate(offers);
      res.status(201).json(newVehicle);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put("/:id", async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
      await vehicle.update(req.body);
      res.json(vehicle);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete("/:id", async (req, res) => {
    try {
      const vehicle = await Vehicle.findByPk(req.params.id);
      if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
      await vehicle.destroy();
      res.json({ message: "Vehicle deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
}; 