const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
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


const swaggerRouter = require("./routers/swagger");
const integradoresRouter = require("./routers/integradores");
const fluxosRouter = require("./routers/fluxos");
const municipiosRouter = require("./routers/municipios");
const equipamentosRouter = require("./routers/equipamentos");
const usuariosRouter = require("./routers/usuarios");


app.use("/usuarios", usuariosRouter);
app.use("/integradores", integradoresRouter);
app.use("/municipios", municipiosRouter);
app.use("/equipamentos", equipamentosRouter);
app.use("/fluxos", fluxosRouter);

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
