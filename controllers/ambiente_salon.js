import AmbienteSalon from "../models/ambiente_salon.js";

const httpAmbienteSalon = {
  // Obtener todos los ambientes de salón
  getAll: async (req, res) => {
    try {
      const ambientesSalon = await AmbienteSalon.find();
      res.json(ambientesSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un ambiente de salón por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const ambienteSalon = await AmbienteSalon.findById(id);
      if (!ambienteSalon) return res.status(404).json({ message: "AmbienteSalon no encontrado" });
      res.json(ambienteSalon);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener ambientes de salón por nombre
  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const ambientesSalon = await AmbienteSalon.find({ nombre_amb: nombre });
      res.json(ambientesSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo ambiente de salón
  registro: async (req, res) => {
    try {
      const { nombre_amb } = req.body;

      const ambienteSalon = new AmbienteSalon({
        nombre_amb,
      });

      await ambienteSalon.save();

      res.json(ambienteSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un ambiente de salón existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_amb } = req.body;

      const ambienteSalon = await AmbienteSalon.findByIdAndUpdate(
        id,
        {
          nombre_amb,
        },
        { new: true }
      );

      if (!ambienteSalon) return res.status(404).json({ message: "AmbienteSalon no encontrado" });

      res.json(ambienteSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un ambiente de salón
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const ambienteSalon = await AmbienteSalon.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!ambienteSalon) return res.status(404).json({ message: "AmbienteSalon no encontrado" });
      res.json(ambienteSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un ambiente de salón
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const ambienteSalon = await AmbienteSalon.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!ambienteSalon) return res.status(404).json({ message: "AmbienteSalon no encontrado" });
      res.json(ambienteSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpAmbienteSalon;
