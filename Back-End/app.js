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


app.use("/api-docs", swaggerRouter)




module.exports = app;
