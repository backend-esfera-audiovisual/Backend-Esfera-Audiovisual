import { Router } from "express";
import httpReglamentoSalon from "../controllers/reglamento_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los reglamentos de salón
router.get(
  "/all",
  httpReglamentoSalon.getAll
);

// Obtener un reglamento de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpReglamentoSalon.getPorId
);

// Obtener un reglamento de salón evento
router.get(
  "/buscarPorSalon/:idSalonEvento",
  [
    check("idSalonEvento", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpReglamentoSalon.getPorSalonEvento
);

// Registrar un nuevo reglamento de salón
router.post(
  "/registro",
  [
    check("descripcion_regl", "Digite la descripción del reglamento").not().isEmpty(),
    check("idSalonEvento", "Ingrese un ID de salón de evento válido").isMongoId(),
    validarCampos,
  ],
  httpReglamentoSalon.registro
);

// Actualizar un reglamento de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("descripcion_regl", "Digite la descripción del reglamento").not().isEmpty(),
    check("idSalonEvento", "Ingrese un ID de salón de evento válido").isMongoId(),
    validarCampos,
  ],
  httpReglamentoSalon.editar
);

// Activar un reglamento de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpReglamentoSalon.putActivar
);

// Desactivar un reglamento de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpReglamentoSalon.putInactivar
);

export default router;
