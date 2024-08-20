import { Router } from "express";
import httpCiudadSalonEvento from "../controllers/ciudad_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los eventos de ciudad de salón
router.get(
  "/all",
  httpCiudadSalonEvento.getAll
);

// Obtener un evento de ciudad de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpCiudadSalonEvento.getPorId
);

// Obtener eventos de ciudad de salón por nombre
router.get(
  "/nombre/:nombre",
  httpCiudadSalonEvento.getPorNombre
);

// Registrar un nuevo evento de ciudad de salón
router.post(
  "/registro",
  [
    check("nombre_ciud", "Digite el nombre de la ciudad").not().isEmpty(),
    check("idDepart", "Ingrese un ID de departamento válido").isMongoId(),
    validarCampos,
  ],
  httpCiudadSalonEvento.registro
);

// Actualizar un evento de ciudad de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_ciud", "Digite el nombre de la ciudad").not().isEmpty(),
    check("idDepart", "Ingrese un ID de departamento válido").isMongoId(),
    validarCampos,
  ],
  httpCiudadSalonEvento.editar
);

// Activar un evento de ciudad de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpCiudadSalonEvento.putActivar
);

// Desactivar un evento de ciudad de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpCiudadSalonEvento.putInactivar
);

export default router;
