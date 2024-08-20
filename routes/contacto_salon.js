import { Router } from "express";
import httpContactoSalon from "../controllers/contacto_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los contactos de salón
router.get(
  "/all",
  httpContactoSalon.getAll
);

// Obtener un contacto de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpContactoSalon.getPorId
);

// Obtener contactos de salón por nombre
router.get(
  "/nombre/:nombre",
  httpContactoSalon.getPorNombre
);

// Registrar un nuevo contacto de salón
router.post(
  "/registro",
  [
    check("nombre_cont", "Digite el nombre del contacto").not().isEmpty(),
    check("correo_cont", "Ingrese un correo válido").isEmail(),
    check("telefono_cont", "Ingrese un teléfono válido").not().isEmpty(),
    validarCampos,
  ],
  httpContactoSalon.registro
);

// Actualizar un contacto de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_cont", "Digite el nombre del contacto").not().isEmpty(),
    check("correo_cont", "Ingrese un correo válido").isEmail(),
    check("telefono_cont", "Ingrese un teléfono válido").not().isEmpty(),
    validarCampos,
  ],
  httpContactoSalon.editar
);

// Activar un contacto de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpContactoSalon.putActivar
);

// Desactivar un contacto de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpContactoSalon.putInactivar
);

export default router;
