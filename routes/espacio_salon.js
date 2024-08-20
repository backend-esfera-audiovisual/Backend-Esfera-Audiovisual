import { Router } from "express";
import httpEspacioSalon from "../controllers/espacio_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los espacios de salón
router.get(
  "/all",
  httpEspacioSalon.getAll
);

// Obtener un espacio de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpEspacioSalon.getPorId
);

// Obtener un espacio de salón por nombre
router.get(
  "/nombre/:nombre",
  httpEspacioSalon.getPorNombre
);

// Registrar un nuevo espacio de salón
router.post(
  "/registro",
  [
    check("nombre_esp", "Digite el nombre del espacio").not().isEmpty(),
    validarCampos,
  ],
  httpEspacioSalon.registro
);

// Actualizar un espacio de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_esp", "Digite el nombre del espacio").not().isEmpty(),
    validarCampos,
  ],
  httpEspacioSalon.editar
);

// Activar un espacio de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpEspacioSalon.putActivar
);

// Desactivar un espacio de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpEspacioSalon.putInactivar
);

export default router;
