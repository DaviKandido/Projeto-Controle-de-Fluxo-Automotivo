const models = require("../models");
const Validator = require("fastest-validator");
const router = require("express").Router();
const checkAuthMiddleware = require("../middleware/check-auth");

const IntegradorService = require("../services/integradore.service");
const integradorService = new IntegradorService();

router.get("/", async (req, res) => {
  try {
    const integradores = await integradorService.findAll();

    if (!integradores || integradores.length == 0) {
      return res.status(404).json({
        message: "Nenhum integrador encontrado",
      });
    }

    res.status(200).json(integradores);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter os integradores",
      error: err,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const integrador = await integradorService.findByPk(req.params.id);

    if (!integrador) {
      return res.status(404).json({
        message: "Integrador não encontrado",
      });
    }

    res.status(200).json(integrador);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter o integrador",
      error: err,
    });
  }
});

router.post("/", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const integrador = {
      nome: req.body.nome,
    };

    const validationResponse = integradorService.ValidaSchema(integrador);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "falha na validação!",
        errors: validationResponse,
      });
    }

   const integradorCreated = await integradorService.create(integrador);

   res.status(201).json({
     message: "Integrador criado com sucesso",
     integrador: integradorCreated
   })
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível criar o integrador",
      error: err.message,
    });
  }
});

router.put("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const id = req.params.id;
    const updatedIntegrador = {
      nome: req.body.nome,
    };

    const validationResponse = integradorService.ValidaSchema(updatedIntegrador);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "falha na validação!",
        errors: validationResponse,
      });
    }

    const integrador = await integradorService.findByPk(id);

    if (!integrador) {
      return res.status(404).json({
        message: "Integrador não encontrado",
      });
    }

    let integradorUpdated = {
      ...integrador,
      ...updatedIntegrador,
    };

    integradorUpdated = await integradorService.update(id, integradorUpdated);
    
    res.status(200).json({
      message: "Integrador atualizado com sucesso",
      integrador: integradorUpdated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível atualizar o integrador",
      error: err.message,
    });
  }
});

router.delete("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const integrador = await integradorService.findByPk(id);

    if (!integrador) {
      return res.status(404).json({
        message: "Integrador não encontrado",
      });
    }

    const deleted = await integradorService.delete(id);

    if (deleted) {
      res.status(200).json({
        message: "Integrador removido com sucesso",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível remover o integrador",
      error: err.message,
    });
  }
});

module.exports = router;
