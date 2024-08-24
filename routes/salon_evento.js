import { Router } from "express";
import httpSalonEvento from "../controllers/salon_evento.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los eventos de salón
router.get(
  "/all",
  httpSalonEvento.getAll
);

router.get("/salones", httpSalonEvento.getFilteredSalones)


// Obtener un evento de salón por ID
router.get(
  "/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpSalonEvento.getPorId
);

// Obtener eventos de salón por ciudad
router.get(
  "/ciudad/:idCiudSalonEvento",
  [
    check("idCiudSalonEvento", "Ingrese un ID de ciudad válido").isMongoId(),
    validarCampos,
  ],
  httpSalonEvento.getPorCiudad
);

router.get('/salones/:location', httpSalonEvento.getSalonesByLocation);




// Registrar un nuevo evento de salón
router.post(
  "/registro",
  [
    check("nombre_sal", "Digite el nombre del salón").not().isEmpty(),
    check("descripcion_sal", "Digite una descripción válida").not().isEmpty(),
    check("tipo_sal", "Ingrese un tipo de salón válido").not().isEmpty(),
    check("capacidad_sal", "Ingrese una capacidad válida").isInt({ min: 1 }),
    check("direccion_sal", "Digite una dirección válida").not().isEmpty(),
    check("precio_sal", "Ingrese un precio válido").isFloat({ min: 0 }),
    check("idCiudSalonEvento", "Ingrese un ID de ciudad de salón de evento válido").isMongoId(),
    check("idContactoSalon", "Ingrese un ID de contacto de salón válido").isMongoId(),
    check("idAmbienteSalon", "Ingrese un ID de ambiente de salón válido").isMongoId(),
    check("idEspaciosSalon", "Ingrese un ID de espacios de salón válido").isMongoId(),
    check("idServiciosSalon", "Ingrese un ID de servicios de salón válido").isMongoId(),
    validarCampos,
  ],
  httpSalonEvento.registro
);

// Actualizar un evento de salón existente
router.put(
  "/editar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    check("nombre_sal", "Digite el nombre del salón").not().isEmpty(),
    check("descripcion_sal", "Digite una descripción válida").not().isEmpty(),
    check("galeria_sal", "Ingrese una galería válida").optional(),
    check("tipo_sal", "Ingrese un tipo de salón válido").not().isEmpty(),
    check("capacidad_sal", "Ingrese una capacidad válida").isInt({ min: 1 }),
    check("direccion_sal", "Digite una dirección válida").not().isEmpty(),
    check("precio_sal", "Ingrese un precio válido").isFloat({ min: 0 }),
    check("idCiudSalonEvento", "Ingrese un ID de ciudad de salón de evento válido").isMongoId(),
    check("idContactoSalon", "Ingrese un ID de contacto de salón válido").isMongoId(),
    check("idAmbienteSalon", "Ingrese un ID de ambiente de salón válido").isMongoId(),
    check("idEspaciosSalon", "Ingrese un ID de espacios de salón válido").isMongoId(),
    check("idServiciosSalon", "Ingrese un ID de servicios de salón válido").isMongoId(),
    validarCampos,
  ],
  httpSalonEvento.editar
);

// Activar un evento de salón
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpSalonEvento.putActivar
);

// Desactivar un evento de salón
router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese una ID válida").isMongoId(),
    validarCampos,
  ],
  httpSalonEvento.putInactivar
);

export default router;
