const express = require("express");
const mongoose = require("mongoose");
const profileModel = require("./models/Profile.js");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  });

// POST API to save LinkedIn profiles
app.post("/api/profiles/create", async (req, res) => {
  const { profile } = req.body;

  try {
    const newProfile = await profileModel.create(profile);
    console.log(newProfile);
    res.status(201).json({
      msg: "Profiles saved successfully",
      profile: newProfile,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
