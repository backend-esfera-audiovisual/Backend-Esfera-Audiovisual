import CiudadSalonEvento from "../models/ciudad_salon.js";
import DepartamentoSalonEvento from "../models/departamento_salon.js";

const httpCiudadSalonEvento = {
  // Obtener todos los eventos de ciudad de salón
  getAll: async (req, res) => {
    try {
      const ciudadesSalonEvento = await CiudadSalonEvento.find().populate(
        "idDepart"
      );
      res.json(ciudadesSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un evento de ciudad de salón por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const ciudadSalonEvento = await CiudadSalonEvento.findById(id).populate(
        "idDepart"
      );
      if (!ciudadSalonEvento)
        return res
          .status(404)
          .json({ message: "CiudadSalonEvento no encontrado" });
      res.json(ciudadSalonEvento);
    } catch (error) {
      res.status(400).json({ error });
    }
  },
  // Obtener ciudades por departamento
  getCiudadesPorDepartamento: async (req, res) => {
    try {
      const { id } = req.params;

      /* const departamento = await DepartamentoSalonEvento.findById(id); */

      const ciudades = await CiudadSalonEvento.find({
        idDepart: id,
      });

      res.json(ciudades);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener las ciudades" });
    }
  },

  // Obtener eventos de ciudad de salón por nombre
  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const ciudadesSalonEvento = await CiudadSalonEvento.find({
        nombre_ciud: nombre,
      }).populate("idDepart");
      res.json(ciudadesSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo evento de ciudad de salón
  registro: async (req, res) => {
    try {
      const { nombre_ciud, idDepart } = req.body;

      const ciudadSalonEvento = new CiudadSalonEvento({
        nombre_ciud,
        idDepart,
      });

      await ciudadSalonEvento.save();

      res.json(ciudadSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un evento de ciudad de salón existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_ciud, idDepart } = req.body;

      const ciudadSalonEvento = await CiudadSalonEvento.findByIdAndUpdate(
        id,
        {
          nombre_ciud,
          idDepart,
        },
        { new: true }
      ).populate("idDepart");

      if (!ciudadSalonEvento)
        return res
          .status(404)
          .json({ message: "CiudadSalonEvento no encontrado" });

      res.json(ciudadSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un evento de ciudad de salón
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const ciudadSalonEvento = await CiudadSalonEvento.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      ).populate("idDepart");
      if (!ciudadSalonEvento)
        return res
          .status(404)
          .json({ message: "CiudadSalonEvento no encontrado" });
      res.json(ciudadSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un evento de ciudad de salón
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const ciudadSalonEvento = await CiudadSalonEvento.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      ).populate("idDepart");
      if (!ciudadSalonEvento)
        return res
          .status(404)
          .json({ message: "CiudadSalonEvento no encontrado" });
      res.json(ciudadSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpCiudadSalonEvento;
