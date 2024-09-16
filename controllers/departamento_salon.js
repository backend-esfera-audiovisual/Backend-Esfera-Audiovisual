import DepartamentoSalonEvento from "../models/departamento_salon.js";

const httpDepartamentoSalonEvento = {
  // Obtener todos los departamentos de salón de eventos
  getAll: async (req, res) => {
    try {
      const departamentosSalonEvento = await DepartamentoSalonEvento.find();
      res.json(departamentosSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un departamento de salón de eventos por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const departamentoSalonEvento = await DepartamentoSalonEvento.findById(id);
      if (!departamentoSalonEvento) return res.status(404).json({ message: "DepartamentoSalonEvento no encontrado" });
      res.json(departamentoSalonEvento);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener departamentos de salón de eventos por nombre
  getPorNombre: async (req, res) => {
    try {
      const { nombre } = req.params;
      const departamentosSalonEvento = await DepartamentoSalonEvento.find({ nombre_depart: nombre });
      res.json(departamentosSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo departamento de salón de eventos
  registro: async (req, res) => {
    try {
      const { nombre_depart, longitud, altitud  } = req.body;

      const departamentoSalonEvento = new DepartamentoSalonEvento({
        nombre_depart,
        longitud, altitud 
      });

      await departamentoSalonEvento.save();

      res.json(departamentoSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un departamento de salón de eventos existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre_depart,  longitud, altitud  } = req.body;

      const departamentoSalonEvento = await DepartamentoSalonEvento.findByIdAndUpdate(
        id,
        {
          nombre_depart,
          longitud, 
          altitud,
        },
        { new: true }
      );

      if (!departamentoSalonEvento) return res.status(404).json({ message: "DepartamentoSalonEvento no encontrado" });

      res.json(departamentoSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un departamento de salón de eventos
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const departamentoSalonEvento = await DepartamentoSalonEvento.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      if (!departamentoSalonEvento) return res.status(404).json({ message: "DepartamentoSalonEvento no encontrado" });
      res.json(departamentoSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un departamento de salón de eventos
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const departamentoSalonEvento = await DepartamentoSalonEvento.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      if (!departamentoSalonEvento) return res.status(404).json({ message: "DepartamentoSalonEvento no encontrado" });
      res.json(departamentoSalonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpDepartamentoSalonEvento;
