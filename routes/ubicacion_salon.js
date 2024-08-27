import { Router } from "express";
import httpUbicacionSalon from "../controllers/ubicacion_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todas las ubicaciones de salón
router.get(
  "/all",
  httpUbicacionSalon.getAll
);

// Obtener una ubicación de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpUbicacionSalon.getPorId
);

// Obtener ubicaciones de salón por nombre
router.get(
  "/nombre/:nombre",
  httpUbicacionSalon.getPorNombre
);

// Registrar una nueva ubicación de salón
router.post(
  "/registro",
  [
    check("nombre_ubi", "Digite el nombre de la ubicación").not().isEmpty(),
    validarCampos,
  ],
  httpUbicacionSalon.registro
);

// Actualizar una ubicación de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_ubi", "Digite el nombre de la ubicación").not().isEmpty(),
    validarCampos,
  ],
  httpUbicacionSalon.editar
);

// Activar una ubicación de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpUbicacionSalon.putActivar
);

// Desactivar una ubicación de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpUbicacionSalon.putInactivar
);

export default router;