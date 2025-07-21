const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


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




module.exports = app;
