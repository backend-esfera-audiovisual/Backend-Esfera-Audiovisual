import { Router } from "express";
import httpAdministrador from "../controllers/administrador.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersAdministrador from "../helpers/administrador.js"; // Asumiendo que necesitas un archivo similar para validaciones

const router = new Router();

// Obtener todos los administradores
router.get(
  "/all",
  validarJWT, // Protege esta ruta para que solo usuarios autenticados puedan acceder
  httpAdministrador.getAll
);

// Registrar un nuevo administrador
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cédula").not().isEmpty(),
    check("cedula").custom(helpersAdministrador.existeCedula), // Asume que existe un helper para cédulas
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("correo").custom(helpersAdministrador.existeCorreo), // Asume que existe un helper para correos
    check("telefono", "Digite el teléfono").not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    // Aquí podrías agregar validaciones para la contraseña si es necesario
    validarCampos,
  ],
  httpAdministrador.registroAdministrador
);

// Autenticación de administrador
router.post(
  "/login",
  [
    check("cedula", "Digite la cédula").not().isEmpty(),
    check("password", "Digite la contraseña").not().isEmpty(),
    validarCampos,
  ],
  httpAdministrador.login
);

// Editar administrador
router.put(
  "/editar/:id",
  [
    validarJWT, // Protege esta ruta para que solo usuarios autenticados puedan acceder
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("telefono", "Digite el teléfono").not().isEmpty(),
    validarCampos,
  ],
  httpAdministrador.editarAdministrador
);

// Activar administrador
router.put(
  "/activar/:id",
  [
    validarJWT, // Protege esta ruta para que solo usuarios autenticados puedan acceder
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpAdministrador.activarAdministrador
);

// Inactivar administrador
router.put(
  "/inactivar/:id",
  [
    validarJWT, // Protege esta ruta para que solo usuarios autenticados puedan acceder
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpAdministrador.inactivarAdministrador
);

export default router;
