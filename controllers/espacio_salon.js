import EspacioSalon from "../models/espacio_salon.js";

const httpEspacioSalon = {
  // Obtener todos los espacios de salón
  getAll: async (req, res) => {
    try {
      const espaciosSalon = await EspacioSalon.find();
      res.json(espaciosSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un espacio de salón por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const espacioSalon = await EspacioSalon.findById(id);
      if (!espacioSalon) return res.status(404).json({ message: "EspacioSalon no encontrado" });
      res.json(espacioSalon);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener un espacio de salón por nombre
  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const espaciosSalon = await EspacioSalon.find({ nombre_esp: nombre });
      res.json(espaciosSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo espacio de salón
  registro: async (req, res) => {
    try {
      const { nombre_esp } = req.body;

      const espacioSalon = new EspacioSalon({
        nombre_esp,
      });

      await espacioSalon.save();

      res.json(espacioSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un espacio de salón existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_esp } = req.body;

      const espacioSalon = await EspacioSalon.findByIdAndUpdate(
        id,
        {
          nombre_esp,
        },
        { new: true }
      );

      if (!espacioSalon) return res.status(404).json({ message: "EspacioSalon no encontrado" });

      res.json(espacioSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un espacio de salón
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const espacioSalon = await EspacioSalon.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!espacioSalon) return res.status(404).json({ message: "EspacioSalon no encontrado" });
      res.json(espacioSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un espacio de salón
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const espacioSalon = await EspacioSalon.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!espacioSalon) return res.status(404).json({ message: "EspacioSalon no encontrado" });
      res.json(espacioSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpEspacioSalon;
