import SalonEvento from "../models/salon_evento.js";

const httpSalonEvento = {
  // Obtener todos los eventos de salón
  getAll: async (req, res) => {
    try {
      const salonEventos = await SalonEvento.find()
        .populate('idCiudSalonEvento')
        .populate('idContactoSalon')
        .populate('idAmbienteSalon')
        .populate('idEspaciosSalon')
        .populate('idServiciosSalon');
      res.json(salonEventos);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener un evento de salón por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const salonEvento = await SalonEvento.findById(id)
        .populate('idCiudSalonEvento')
        .populate('idContactoSalon')
        .populate('idAmbienteSalon')
        .populate('idEspaciosSalon')
        .populate('idServiciosSalon');
      if (!salonEvento) return res.status(404).json({ message: "Salon no encontrado" });
      res.json(salonEvento);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener eventos de salón por ciudad
  getPorCiudad: async (req, res) => {
    try {
      const { idCiudSalonEvento } = req.params;
      const salonEventos = await SalonEvento.find({ idCiudSalonEvento })
        .populate('idCiudSalonEvento')
        .populate('idContactoSalon')
        .populate('idAmbienteSalon')
        .populate('idEspaciosSalon')
        .populate('idServiciosSalon');
      res.json(salonEventos);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Registrar un nuevo evento de salón
  registro: async (req, res) => {
    try {
      const {
        nombre_sal,
        descripcion_sal,
        galeria_sal,
        tipo_sal,
        capacidad_sal,
        direccion_sal,
        precio_sal,
        idCiudSalonEvento,
        idContactoSalon,
        idAmbienteSalon,
        idEspaciosSalon,
        idServiciosSalon
      } = req.body;

      const salonEvento = new SalonEvento({
        nombre_sal,
        descripcion_sal,
        galeria_sal,
        tipo_sal,
        capacidad_sal,
        direccion_sal,
        precio_sal,
        idCiudSalonEvento,
        idContactoSalon,
        idAmbienteSalon,
        idEspaciosSalon,
        idServiciosSalon,
      });

      await salonEvento.save();

      res.json(salonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Actualizar un evento de salón existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nombre_sal,
        descripcion_sal,
        galeria_sal,
        tipo_sal,
        capacidad_sal,
        direccion_sal,
        precio_sal,
        idCiudSalonEvento,
        idContactoSalon,
        idAmbienteSalon,
        idEspaciosSalon,
        idServiciosSalon
      } = req.body;

      const salonEvento = await SalonEvento.findByIdAndUpdate(
        id,
        {
          nombre_sal,
          descripcion_sal,
          galeria_sal,
          tipo_sal,
          capacidad_sal,
          direccion_sal,
          precio_sal,
          idCiudSalonEvento,
          idContactoSalon,
          idAmbienteSalon,
          idEspaciosSalon,
          idServiciosSalon,
        },
        { new: true }
      )
      .populate('idCiudSalonEvento')
      .populate('idContactoSalon')
      .populate('idAmbienteSalon')
      .populate('idEspaciosSalon')
      .populate('idServiciosSalon');

      if (!salonEvento) return res.status(404).json({ message: "Salon no encontrado" });

      res.json(salonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar un evento de salón
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const salonEvento = await SalonEvento.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      )
      .populate('idCiudSalonEvento')
      .populate('idContactoSalon')
      .populate('idAmbienteSalon')
      .populate('idEspaciosSalon')
      .populate('idServiciosSalon');
      if (!salonEvento) return res.status(404).json({ message: "Salon no encontrado" });
      res.json(salonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar un evento de salón
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const salonEvento = await SalonEvento.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      )
      .populate('idCiudSalonEvento')
      .populate('idContactoSalon')
      .populate('idAmbienteSalon')
      .populate('idEspaciosSalon')
      .populate('idServiciosSalon');
      if (!salonEvento) return res.status(404).json({ message: "Salon no encontrado" });
      res.json(salonEvento);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpSalonEvento;
