require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.Frontend_URL, // ou seu frontend
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use((req, res, next) => {
  console.log(
    `${new Date().toLocaleString()} | Requisição: ${req.method} ${req.url}`
  );
  next();
});


const RouterController = require('./controllers')
app.use("/", RouterController);



const swaggerRouter = require("./routers/swagger");
app.use("/api-docs", swaggerRouter);



app.get("/", (req, res) => {
  res.send("API - Sistema de Controle de Fluxos Veiculares");
});

app.use((req, res) => {
  res.status(404).json({
      message: "Rota não encontrada"
  });
});


module.exports = app;

// CONTROLADORES
// MODELS
// SERVIÇOS
// UTILITARIOS