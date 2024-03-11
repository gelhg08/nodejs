const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://angelicamhg31:IevENUAk6CTWodsi@mongodb3.wvf0uet.mongodb.net/"
);
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

  //Listar usuario mayor a :
  app.get("/api/users/ejercicio1", async (req, res) => {
    const users = await user.find({ edad: { $gt: 30 } });
    res.json(users);
  });

  //Listar si un usuario es igual a este valor :
  app.get("/api/users/ejercicio2", async (req, res) => {
    const users = await user.find({ edad: { $eq: 23 } });
    res.json(users);
  });

  //Listar si un usuario NO es igual a este valor :
  app.get("/api/users/ejercicio3", async (req, res) => {
    const users = await user.find({ edad: { $ne: 23 } });
    res.json(users);
  });
  //Listar los usarios menores a :
  app.get("/api/users/ejercicio4", async (req, res) => {
    const users = await user.find({ edad: { $lt: 23 } });
    res.json(users);
  });

  //Listar usuario mayor o igual a :
  app.get("/api/users/ejercicio5", async (req, res) => {
    const users = await user.find({ edad: { $gte: 23 } });
    res.json(users);
  });

  //Traer este array de valores
  app.get("/api/users/ejercicio6", async (req, res) => {
    const users = await user.find({ edad: { $in: [18, 19, 21] } });
    res.json(users);
  });

  //No traer este array de valores
  app.get("/api/users/ejercicio7", async (req, res) => {
    const users = await user.find({ edad: { $nin: [18, 19, 21] } });
    res.json(users);
  });

  //No traer este array de valores
  app.get("/api/users/ejercicio8", async (req, res) => {
    const users = await user.find({ edad: { $exist: true } });
    res.json(users);
  });
  //Listar si un usuario es menor o igual a este valor :
  app.get("/api/users/ejercicio9", async (req, res) => {
    const users = await user.find({ edad: { $lte: 23 } });
    res.json(users);
  });

  //buscar documentos donde un campo coincide con una expresión regular.
  app.get("/api/users/ejercicio4", async (req, res) => {
    const users = await user.find({ nombre: { $regex: /^Elena/ } });
    res.json(users);
  });

  app.listen(3001, () => {
    console.log("server");
  });
});
