import { Router } from "express";
import httpServicioSalon from "../controllers/servicio_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los servicios de salón
router.get(
  "/all",
  httpServicioSalon.getAll
);

// Obtener un servicio de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpServicioSalon.getPorId
);

// Registrar un nuevo servicio de salón
router.post(
  "/registro",
  [
    check("nombre_serv", "Digite el nombre del servicio").not().isEmpty(),
    validarCampos,
  ],
  httpServicioSalon.registro
);

// Actualizar un servicio de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_serv", "Digite el nombre del servicio").not().isEmpty(),
    validarCampos,
  ],
  httpServicioSalon.editar
);

// Activar un servicio de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpServicioSalon.putActivar
);

// Desactivar un servicio de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpServicioSalon.putInactivar
);

export default router;
