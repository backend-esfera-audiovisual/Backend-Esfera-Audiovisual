import { Router } from "express";
import httpDepartamentoSalonEvento from "../controllers/departamento_salon.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los departamentos de salón de eventos
router.get(
  "/all",
  httpDepartamentoSalonEvento.getAll
);

// Obtener un departamento de salón de eventos por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpDepartamentoSalonEvento.getPorId
);

// Obtener departamentos de salón de eventos por nombre
router.get(
  "/nombre/:nombre",
  httpDepartamentoSalonEvento.getPorNombre
);

// Registrar un nuevo departamento de salón de eventos
router.post(
  "/registro",
  [
    check("nombre_depart", "Digite el nombre del departamento").not().isEmpty(),
    validarCampos,
  ],
  httpDepartamentoSalonEvento.registro
);

// Actualizar un departamento de salón de eventos existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_depart", "Digite el nombre del departamento").not().isEmpty(),
    validarCampos,
  ],
  httpDepartamentoSalonEvento.editar
);

// Activar un departamento de salón de eventos
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpDepartamentoSalonEvento.putActivar
);

// Desactivar un departamento de salón de eventos
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpDepartamentoSalonEvento.putInactivar
);

export default router;
