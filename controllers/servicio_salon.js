import ServicioSalon from "../models/servicio_salon.js";

const httpServicioSalon = {
  // Obtener todos los servicios de salón
  getAll: async (req, res) => {
    try {
      const servicioSalones = await ServicioSalon.find();
      res.json(servicioSalones);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un servicio de salón por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const servicioSalon = await ServicioSalon.findById(id);
      if (!servicioSalon) return res.status(404).json({ message: "ServicioSalon no encontrado" });
      res.json(servicioSalon);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Registrar un nuevo servicio de salón
  registro: async (req, res) => {
    try {
      const { nombre_serv } = req.body;

      const servicioSalon = new ServicioSalon({
        nombre_serv,
      });

      await servicioSalon.save();

      res.json(servicioSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un servicio de salón existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_serv } = req.body;

      const servicioSalon = await ServicioSalon.findByIdAndUpdate(
        id,
        { nombre_serv },
        { new: true }
      );

      if (!servicioSalon) return res.status(404).json({ message: "ServicioSalon no encontrado" });

      res.json(servicioSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un servicio de salón
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const servicioSalon = await ServicioSalon.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!servicioSalon) return res.status(404).json({ message: "ServicioSalon no encontrado" });
      res.json(servicioSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un servicio de salón
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const servicioSalon = await ServicioSalon.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!servicioSalon) return res.status(404).json({ message: "ServicioSalon no encontrado" });
      res.json(servicioSalon);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpServicioSalon;
