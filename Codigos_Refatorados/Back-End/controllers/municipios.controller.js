const models = require("../models");
const Validator = require("fastest-validator");
const router = require("express").Router();
const checkAuthMiddleware = require("../middleware/check-auth");
const MunicipioService = require("../services/municipio.service");
const municipioService = new MunicipioService();

router.get("/", async (req, res) => {
  try {
    const municipios = await municipioService.findAll(req.query);

    if (!municipios || municipios.length == 0)
      return res.status(404).json({
        message: "Nenhum municipio encontrado",
      });

    return res.status(200).json(municipios);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter os municipios",
      error: err.message,
    });
  }
});

// function gerarQuery(req) {
//   const objQuery = {where: {}}
//   return
// }

router.get("/:id", async (req, res) => {
  try {
    const municipio = await municipioService.findByPK(req.params.id);

    if (!municipio) {
      res.status(404).json({
        message: "Municipio não encontrado",
      });
    }

    return res.status(200).json(municipio);
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível obter o municipio",
      error: err.message,
    });
  }
});

router.post("/", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const municipio = {
      codigo: req.body.codigo,
      descricao: req.body.descricao,
      uf: req.body.uf,
    };

    const validationResponse = municipioService.validaSchema(municipio);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "falha na validação!",
        errors: validationResponse,
      });
    }

    const municipioExiste = await municipioService.findOne(municipio);
    if (municipioExiste) {
      return res.status(409).json({
        message: "Já existe um municipio com esse código, tente outro",
      });
    }

    const municipioCreated = await municipioService.create(municipio);

    if (!municipioCreated) {
      return res.status(500).json({
        message: "Não foi possível incluir o municipio",
      });
    }

    res.status(201).json({
      message: "Municipio criado com sucesso",
      municipio: municipioCreated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível incluir o municipio",
      error: err.message,
    });
  }
});

router.put("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const municipioUpdate = {
      codigo: req.body.codigo,
      descricao: req.body.descricao,
      uf: req.body.uf,
    };

    const validationResponse = municipioService.validaSchema(municipioUpdate);
    if (validationResponse !== true) {
      return res.status(400).json({
        message: "falha na validação!",
        errors: validationResponse,
      });
    }

    const municipio = await municipioService.findByPK(id);

    const newMunicipio = {
      ...municipio,
      ...municipioUpdate,
    };

    const municipioUpdated = await municipioService.update(id, newMunicipio);

    if (!municipioUpdated) {
      return res.status(500).json({
        message: "Não foi possível atualizar o municipio",
      });
    }

    res.status(200).json({
      message: "Municipio atualizado com sucesso",
      municipio: municipioUpdated,
    });
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível atualizar o municipio",
      error: err.message,
    });
  }
});

router.delete("/:id", checkAuthMiddleware.checkAuth, async (req, res) => {
  try {
    const id = req.params.id;

    const municipio = await municipioService.findByPK(id);

    if (!municipio) {
      return res.status(404).json({
        message: "Municipio não encontrado",
      });
    }

    const deleted = await municipioService.delete(id);

    if (deleted) {
      res.status(200).json({
        message: "Municipio removido com sucesso",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Não foi possível remover o municipio",
      error: err.message,
    });
  }
});

module.exports = router;
