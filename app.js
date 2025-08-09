const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
const mongoose = require("mongoose");

// models
const Client = require("./models/client");

const mongoDBURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoDBURL)
  .then(() => console.log("Connection Successful!"))
  .catch((err) => console.error("Connection Error:", err));

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "BarberShop - Premium Hair Care", page: 1 });
});

app.get("/admin", (req, res) => {
  res.render("index", { title: "Book Appointment", page: 2 });
});

// mongodb api
// --- CREATE (Create a new appointment) ---
app.post("/createClient", async (req, res) => {
  console.log(req.body);
  try {
    const newClient = new Client(req.body);
    await newClient.save();
    res.status(201).json(newClient);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// --- READ (Get all appointments) ---
app.get("/getClients", async (req, res) => {
  try {
    const client = await Client.find();
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// --- UPDATE (Update a client by ID) ---
app.put("/updateClient/:id", async (req, res) => {
  console.log("===========");
  console.log(req.body);
  console.log(req.params.id);
  try {
    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      }
    );

    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    res.status(200).json(updatedClient);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
