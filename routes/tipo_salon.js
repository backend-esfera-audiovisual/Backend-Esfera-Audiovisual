import { Router } from "express";
import httpTipoSalon from "../controllers/tipo_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los tipos de salón
router.get(
  "/all",
  httpTipoSalon.getAll
);

// Obtener un tipo de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpTipoSalon.getPorId
);

// Obtener tipos de salón por nombre
router.get(
  "/nombre/:nombre",
  httpTipoSalon.getPorNombre
);

// Registrar un nuevo tipo de salón
router.post(
  "/registro",
  [
    check("nombre_tip", "Digite el nombre del tipo de salón").not().isEmpty(),
    validarCampos,
  ],
  httpTipoSalon.registro
);

// Actualizar un tipo de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_tip", "Digite el nombre del tipo de salón").not().isEmpty(),
    validarCampos,
  ],
  httpTipoSalon.editar
);

// Activar un tipo de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpTipoSalon.putActivar
);

// Desactivar un tipo de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpTipoSalon.putInactivar
);

export default router;