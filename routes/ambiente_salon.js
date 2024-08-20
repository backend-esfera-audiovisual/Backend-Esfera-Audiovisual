import { Router } from "express";
import httpAmbienteSalon from "../controllers/ambiente_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los ambientes de salón
router.get(
  "/all",
  httpAmbienteSalon.getAll
);

// Obtener un ambiente de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpAmbienteSalon.getPorId
);

// Obtener ambientes de salón por nombre
router.get(
  "/nombre/:nombre",
  httpAmbienteSalon.getPorNombre
);

// Registrar un nuevo ambiente de salón
router.post(
  "/registro",
  [
    check("nombre_amb", "Digite el nombre del ambiente").not().isEmpty(),
    validarCampos,
  ],
  httpAmbienteSalon.registro
);

// Actualizar un ambiente de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_amb", "Digite el nombre del ambiente").not().isEmpty(),
    validarCampos,
  ],
  httpAmbienteSalon.editar
);

// Activar un ambiente de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpAmbienteSalon.putActivar
);

// Desactivar un ambiente de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpAmbienteSalon.putInactivar
);

export default router;
