const swaggerUI = require("swagger-ui-express");
const express = require("express");
const router = express.Router()
const path = require("path");


const swaggerDocument = require("../docs/swagger.json");


router.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
router.use("/json", (_, res) => {
  res.sendFile(path.join(__dirname, "../docs/swagger.json"));
});


module.exports = router;