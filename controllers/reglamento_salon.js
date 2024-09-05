import ReglamentoSalon from "../models/reglamento_salon.js";

const httpReglamentoSalon = {
  // Obtener todos los reglamentos de salón
  getAll: async (req, res) => {
    try {
      const reglamentosSalon = await ReglamentoSalon.find().populate('idSalonEvento');
      res.json(reglamentosSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un reglamento de salón por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const reglamentoSalon = await ReglamentoSalon.findById(id).populate('idSalonEvento');
      if (!reglamentoSalon) return res.status(404).json({ message: "ReglamentoSalon no encontrado" });
      res.json(reglamentoSalon);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  getPorSalonEvento: async (req, res) => {
    try {
      const { idSalonEvento } = req.params;
      const reglamentoSalon = await ReglamentoSalon.findOne({ idSalonEvento }).populate('idSalonEvento');
      if (!reglamentoSalon) return res.status(404).json({ message: "No se encontró un reglamento para este salón" });
      res.json(reglamentoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo reglamento de salón
  registro: async (req, res) => {
    try {
      const { descripcion_regl, idSalonEvento } = req.body;

      const reglamentoSalon = new ReglamentoSalon({
        descripcion_regl,
        idSalonEvento,
      });

      await reglamentoSalon.save();

      res.json(reglamentoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un reglamento de salón existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { descripcion_regl, idSalonEvento } = req.body;

      const reglamentoSalon = await ReglamentoSalon.findByIdAndUpdate(
        id,
        {
          descripcion_regl,
          idSalonEvento,
        },
        { new: true }
      ).populate('idSalonEvento');

      if (!reglamentoSalon) return res.status(404).json({ message: "ReglamentoSalon no encontrado" });

      res.json(reglamentoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un reglamento de salón
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reglamentoSalon = await ReglamentoSalon.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      ).populate('idSalonEvento');
      if (!reglamentoSalon) return res.status(404).json({ message: "ReglamentoSalon no encontrado" });
      res.json(reglamentoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un reglamento de salón
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reglamentoSalon = await ReglamentoSalon.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      ).populate('idSalonEvento');
      if (!reglamentoSalon) return res.status(404).json({ message: "ReglamentoSalon no encontrado" });
      res.json(reglamentoSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpReglamentoSalon;
