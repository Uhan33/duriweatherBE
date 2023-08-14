const express = require("express");
const { PrismaClient } = require('@prisma/client');

const bodyParser = require("body-parser");

// Create an express instance
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRouter = require("./api/router");
app.use("/api", apiRouter);

app.get("/", (req, res) => {
  res.send("Server On^^! \n" + Date());
});

app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

app.get("/goat", (req, res) => {
  res.send("mye,,,🐐");
});

// const { fetchCommentsWithWeather } = require('./database-operation');

// async function check() {
//   try {
//     const comments = await fetchCommentsWithWeather();
//     console.log("Comments with weather 3:", comments);
//   } catch (error) {
//     console.error("Error:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

const prisma = new PrismaClient()
// check();

module.exports = app;