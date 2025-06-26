// server/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const {
  ensureDatabaseExists,
  getSequelizeInstance,
  loadModels,
} = require("./models");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// MODELS
const models = loadModels(getSequelizeInstance());

// ROUTES
app.use("/api/policies", require("./routes/policies")(models));
app.use("/api/users", require("./routes/users")(models));
app.use("/api/vehicles", require("./routes/vehicles")(models));
app.use("/api/quotes", require("./routes/quotes")(models));
app.use("/api/payments", require("./routes/payments")(models));
app.use("/api/feedbacks", require("./routes/feedbacks")(models));

async function seedExampleData(models) {
  const seedPath = path.join(__dirname, "seedData.json");
  if (!fs.existsSync(seedPath)) {
    console.error("Seed data dosyası bulunamadı:", seedPath);
    return;
  }
  const raw = fs.readFileSync(seedPath, "utf-8");
  const data = JSON.parse(raw);
  // User
  const userCount = await models.User.count();
  if (userCount === 0 && data.users) {
    await models.User.bulkCreate(data.users);
  }
  // Vehicle
  const vehicleCount = await models.Vehicle.count();
  if (vehicleCount === 0 && data.vehicles) {
    await models.Vehicle.bulkCreate(data.vehicles);
  }
  // Quote
  const quoteCount = await models.Quote.count();
  if (quoteCount === 0 && data.quotes) {
    await models.Quote.bulkCreate(data.quotes);
  }
  // Payment
  const paymentCount = await models.Payment.count();
  if (paymentCount === 0 && data.payments) {
    await models.Payment.bulkCreate(data.payments);
  }
  // Policy
  const policyCount = await models.Policy.count();
  if (policyCount === 0 && data.policies) {
    await models.Policy.bulkCreate(data.policies);
  }
  // Feedback
  const feedbackCount = await models.Feedback.count();
  if (feedbackCount === 0 && data.feedbacks) {
    await models.Feedback.bulkCreate(data.feedbacks);
  }
}

async function startServerWithRetry() {
  while (true) {
    let sequelize;
    try {
      await ensureDatabaseExists();
      sequelize = getSequelizeInstance();
      loadModels(sequelize); // Models are loaded above
      await sequelize.authenticate();
      console.log("MySQL bağlantısı başarılı!");
      await sequelize.sync({ alter: true });
      console.log("Tüm tablolar senkronize edildi!");
      await seedExampleData(models);
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
      break; // Başarılı olursa döngüden çık
    } catch (err) {
      console.error("MySQL bağlantı/senkronizasyon hatası, 5 saniye sonra tekrar denenecek:", err.message);
      if (sequelize) {
        try {
          await sequelize.close();
          console.log("Başarısız bağlantı kapatıldı.");
        } catch (closeErr) {
          console.error("Bağlantı kapatılırken hata oluştu:", closeErr.message);
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

startServerWithRetry();
