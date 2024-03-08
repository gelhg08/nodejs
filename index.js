const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://angelicamhg31:ZgvkfRASn4LYASu6@mongodb2.qurw56t.mongodb.net/");
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("error", console.error.bind(console, "connection error"));

db.once("open", () => {
  console.log("Connected to MongoDB");
  const userSchema = new mongoose.Schema({
    nombres: { type: "string", required: true },
    apellidos: { type: "string", required: true },
  });

  const user = mongoose.model("users", userSchema);

  const app = express();
  app.use(express.json());

  app.get("/api/users", async (req, res) => {
    const users = await user.find();
    res.json(users);
    console.log(users)
  });

  app.listen(3000, () => {
    console.log("servidor arriba ");
  });
});

