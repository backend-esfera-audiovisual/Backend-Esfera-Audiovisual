import Administrador from "../models/administrador.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/validar-jwt.js";

// Controlador de Administradores
const httpAdministrador = {
  // Obtener todos los administradores
  getAll: async (req, res) => {
    try {
      const administradores = await Administrador.find();
      res.json(administradores);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo administrador
  registroAdministrador: async (req, res) => {
    try {
      const { nombre, apellido, cedula, correo, telefono, password } = req.body;

      // Verifica si ya existe un administrador con el mismo correo o cédula
      const adminExist = await Administrador.findOne({ $or: [{ cedula }, { correo }] });
      if (adminExist) {
        return res.status(400).json({
          error: "Cédula o Correo ya están registrados",
        });
      }

      // Crea un nuevo administrador
      const admin = new Administrador({
        nombre,
        apellido,
        cedula,
        correo,
        telefono,
        password,
      });

      // Encripta la contraseña
      const salt = bcryptjs.genSaltSync();
      admin.password = bcryptjs.hashSync(password, salt);

      // Guarda el administrador en la base de datos
      await admin.save();

      res.json(admin);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Autenticación de administrador
  login: async (req, res) => {
    const { cedula, password } = req.body;

    try {
      const admin = await Administrador.findOne({ cedula });
      if (!admin) {
        return res.status(400).json({
          error: "Cédula o Contraseña incorrectos",
        });
      }
      if (admin.estado === false) {
        return res.status(400).json({
          error: "Administrador Inactivo",
        });
      }
      const validPassword = bcryptjs.compareSync(password, admin.password);
      if (!validPassword) {
        return res.status(401).json({
          error: "Cédula o Contraseña incorrectos",
        });
      }
      const token = await generarJWT(admin.id);
      res.json({ admin, token });
    } catch (error) {
      return res.status(500).json({
        error: "Hable con el WebMaster",
      });
    }
  },

  // Editar administrador
  editarAdministrador: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, correo, telefono } = req.body;

      const administrador = await Administrador.findByIdAndUpdate(
        id,
        { nombre, apellido, correo, telefono },
        { new: true }
      );

      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar administrador
  activarAdministrador: async (req, res) => {
    try {
      const { id } = req.params;
      const administrador = await Administrador.findByIdAndUpdate(
        id,
        { estado: 1 },
        { new: true }
      );
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Inactivar administrador
  inactivarAdministrador: async (req, res) => {
    try {
      const { id } = req.params;
      const administrador = await Administrador.findByIdAndUpdate(
        id,
        { estado: 0 },
        { new: true }
      );
      res.json(administrador);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpAdministrador;
