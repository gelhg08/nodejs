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

  //Obtener todos los usuarios que sean mayores de 18 años. :
  app.get("/api/users/ejercicio1", async (req, res) => {
    const users = await user.find({ edad: { $gt: 18 } });
    res.json(users);
  });

  //Obtener todos los usuarios que sean de Londres o de París. :
  app.get("/api/users/ejercicio2", async (req, res) => {
    const users = await user.find({ ciudad: { $in: ["Londres", "Paris"] } });
    res.json(users);
  });

  //Obtener a todos los usuarios que ganen más de $2000 al mes y tengan menos de 30 años:
  app.get("/api/users/ejercicio3", async (req, res) => {
    const users = await user.find({
      $and: [{ salario: { $gt: 2000 } }, { edad: { $lt: 30 } }],
    });
    res.json(users);
  });
  //Obtener a todos los usuarios que sean de España y ganen más de $3000 al mes.:
  app.get("/api/users/ejercicio4", async (req, res) => {
    const users = await user.find({
      $and: [{ pais: "España" }, { salario: { $gt: 3000 } }],
    });
    res.json(users);
  });

  //Obtener todos los usuarios que tengan entre 25 y 35 años:
  app.get("/api/users/ejercicio5", async (req, res) => {
    const users = await user.find({ edad: { $gte: 25, $lte: 35 } });
    res.json(users);
  });

  //Obtener a todos los usuarios que no sean de Estados Unidos:
  app.get("/api/users/ejercicio6", async (req, res) => {
    const users = await user.find({ pais: { $ne: "Estados Unidos" } });
    res.json(users);
  });

  //Obtener a todos los usuarios que sean de Londres y que ganen más de $2500 o que tengan más de 30 años.
  app.get("/api/users/ejercicio7", async (req, res) => {
    const users = await user.find({
      $and: [
        { ciudad: "Londres" },
        { $or: [{ salario: { $gt: 2500 } }, { edad: { $gt: 30 } }] },
      ],
    });
    res.json(users);
  });

  //Obtener a todos los usuarios que sean de Australia y tengan un peso mayor a 140 libras:
  app.get("/api/users/ejercicio8", async (req, res) => {
    const users = await user.find({
      $and: [{ ciudad: "Australia" }, { peso: { gt: 140 } }],
    });
    res.json(users);
  });
  //Obtener a todos los usuarios que no sean de Londres ni de París. :
  app.get("/api/users/ejercicio9", async (req, res) => {
    const users = await user.find({ ciudad: { $nin: ["Londres", "Paris"] } });
    res.json(users);
  });

  //Obtener a todos los usuarios que ganen menos de $2000 al mes o que tengan más de 40 años.
  app.get("/api/users/ejercicio10", async (req, res) => {
    const users = await user.find({
      $or: [{ salario: { $lt: 2000 } }, { edad: { $gt: 40 } }],
    });
    res.json(users);
  });

  //Obtener a todos los usuarios que sean de Canadá y ganen más de $4000 al mes o que tengan una altura mayor a 180 cm. :
  app.get("/api/users/ejercicio11", async (req, res) => {
    const users = await user.find({
      $and: [
        { pais: "Canada" },
        { $or: [{ salario: { gt: 4000 } }, { altura: { $gt: 180 } }] },
      ],
    });
    res.json(users);
  });

  //Obtener todos los usuarios que sean de Italia y tengan entre 20 y 30 años. :
  app.get("/api/users/ejercicio12", async (req, res) => {
    const users = await user.find({
      $and: [{ pais: "Italia" }, { edad: { $gte: 20, lte: 30 } }],
    });
    res.json(users);
  });

  //Obtener todos los usuarios que no tengan un correo electrónico registrado.
  app.get("/api/users/ejercicio13", async (req, res) => {
    const users = await user.find({ correo: { $exists: false } });
    res.json(users);
  });
  //Obtener todos los usuarios que sean de Francia y que su salario esté entre $3000 y $5000 al mes:
  app.get("/api/users/ejercicio14", async (req, res) => {
    const users = await user.find({
      $and: [{ pais: "Francia" }, { salario: { $gte: 3000, $lte: 5000 } }],
    });
    res.json(users);
  });

  //Obtener todos los usuarios que sean de Brasil y que tengan un peso menor a 120 libras o más de 140 libras.:
  app.get("/api/users/ejercicio15", async (req, res) => {
    const users = await user.find({
      $and: [
        { pais: "Brasil" },
        { $or: [{ peso: { $lt: 120 } }, { peso: { $gt: 140 } }] },
      ],
    });
    res.json(users);
  });

  //Obtener todos los usuarios que sean de Argentina o de Chile y que tengan una edad menor a 25 años.:
  app.get("/api/users/ejercicio16", async (req, res) => {
    const users = await user.find({
      $and: [
        { pais: { $nin: ["España", "Mexico"] } },
        { salario: { $lt: 3000 } },
      ],
    });
    res.json(users);
  });

  //Obtener a todos los usuarios que no sean de España ni de México y que ganen menos de $3000 al mes..
  app.get("/api/users/ejercicio17", async (req, res) => {
    const users = await user.find({
      $and: [
        { ciudad: "Londres" },
        { $or: [{ salario: { $gt: 2500 } }, { edad: { $gt: 30 } }] },
      ],
    });
    res.json(users);
  });

  //Obtener todos los usuarios que sean de Alemania y que tengan un salario menor a $4000 o una edad mayor a 35 años.
  app.get("/api/users/ejercicio18", async (req, res) => {
    const users = await user.find({
      $and: [
        { pais: "Alemania" },
        { $or: [{ salario: { $lt: 4000 } }, { edad: { $gt: 35 } }] },
      ],
    });
    res.json(users);
  });
  // Obtener todos los usuarios que no sean de Colombia y que su altura sea menor a 170 cm.:
  app.get("/api/users/ejercicio19", async (req, res) => {
    const users = await user.find({
      $and: [{ pais: { $ne: "Colombia" } }, { altura: { $lt: 170 } }],
    });
    res.json(users);
  });

  //Obtener todos los usuarios que sean de India y que no tengan un salario registrado.
  app.get("/api/users/ejercicio20", async (req, res) => {
    const users = await user.find({$and:[{pais: 'India'}, {salario: null}] });
    res.json(users);
  });

  app.listen(3001, () => {
    console.log("server");
  });
});
