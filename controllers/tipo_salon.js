import TipoSalon from "../models/tipo_salon.js";

const httpTipoSalon = {
  // Obtener todos los tipos de salón
  getAll: async (req, res) => {
    try {
      const tiposSalon = await TipoSalon.find();
      res.json(tiposSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un tipo de salón por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const tipoSalon = await TipoSalon.findById(id);
      if (!tipoSalon) return res.status(404).json({ message: "TipoSalon no encontrado" });
      res.json(tipoSalon);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener tipos de salón por nombre
  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const tiposSalon = await TipoSalon.find({ nombre_tip: nombre });
      res.json(tiposSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo tipo de salón
  registro: async (req, res) => {
    try {
      const { nombre_tip } = req.body;

      const tipoSalon = new TipoSalon({
        nombre_tip,
      });

      await tipoSalon.save();

      res.json(tipoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un tipo de salón existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_tip } = req.body;

      const tipoSalon = await TipoSalon.findByIdAndUpdate(
        id,
        {
          nombre_tip,
        },
        { new: true }
      );

      if (!tipoSalon) return res.status(404).json({ message: "TipoSalon no encontrado" });

      res.json(tipoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un tipo de salón
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const tipoSalon = await TipoSalon.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!tipoSalon) return res.status(404).json({ message: "TipoSalon no encontrado" });
      res.json(tipoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un tipo de salón
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const tipoSalon = await TipoSalon.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!tipoSalon) return res.status(404).json({ message: "TipoSalon no encontrado" });
      res.json(tipoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpTipoSalon;