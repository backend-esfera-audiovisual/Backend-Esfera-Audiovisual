import UbicacionSalon from "../models/ubicacion_salon.js";

const httpUbicacionSalon = {
  // Obtener todas las ubicaciones de salón
  getAll: async (req, res) => {
    try {
      const ubicacionesSalon = await UbicacionSalon.find();
      res.json(ubicacionesSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener una ubicación de salón por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const ubicacionSalon = await UbicacionSalon.findById(id);
      if (!ubicacionSalon) return res.status(404).json({ message: "UbicacionSalon no encontrada" });
      res.json(ubicacionSalon);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener ubicaciones de salón por nombre
  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const ubicacionesSalon = await UbicacionSalon.find({ nombre_ubi: nombre });
      res.json(ubicacionesSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar una nueva ubicación de salón
  registro: async (req, res) => {
    try {
      const { nombre_ubi } = req.body;

      const ubicacionSalon = new UbicacionSalon({
        nombre_ubi,
      });

      await ubicacionSalon.save();

      res.json(ubicacionSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar una ubicación de salón existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_ubi } = req.body;

      const ubicacionSalon = await UbicacionSalon.findByIdAndUpdate(
        id,
        {
          nombre_ubi,
        },
        { new: true }
      );

      if (!ubicacionSalon) return res.status(404).json({ message: "UbicacionSalon no encontrada" });

      res.json(ubicacionSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar una ubicación de salón
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const ubicacionSalon = await UbicacionSalon.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!ubicacionSalon) return res.status(404).json({ message: "UbicacionSalon no encontrada" });
      res.json(ubicacionSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar una ubicación de salón
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const ubicacionSalon = await UbicacionSalon.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!ubicacionSalon) return res.status(404).json({ message: "UbicacionSalon no encontrada" });
      res.json(ubicacionSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpUbicacionSalon;