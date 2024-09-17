import Reserva from "../models/reserva.js";
import nodemailer from "nodemailer";
import SalonEvento from "../models/salon_evento.js";

const httpReserva = {
  // Obtener todas las reservas
  getAll: async (req, res) => {
    try {
      const reservas = await Reserva.find().populate("idSalonEvento");
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Obtener una reserva por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findById(id).populate("idSalonEvento");
      if (!reserva)
        return res.status(404).json({ message: "Reserva no encontrada" });
      res.json(reserva);
    } catch (error) {
      res.status(400).json({ error });
    }
  },

  // Obtener reservas por nombre del cliente
  getPorNombreCliente: async (req, res) => {
    try {
      const { nombre_cliente } = req.params;
      const reservas = await Reserva.find({ nombre_cliente }).populate(
        "idSalonEvento"
      );
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  contactanos: async (req, res) => {
    try {
      // Definir el número de teléfono de WhatsApp (en formato internacional)
      const numeroWhatsApp = "573103370459";

      // Mensaje predeterminado (opcional, puedes dejarlo vacío si no lo necesitas)
      const mensajeWhatsApp =
        "Hola, me gustaría postular mi salón de eventos en tú pagina web, podrías darme más información por favor";

      // Crear el enlace de WhatsApp con el mensaje
      const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
        mensajeWhatsApp
      )}`;

      // Redireccionar al enlace de WhatsApp
      res.json({ link: enlaceWhatsApp });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Registrar una nueva reserva
  registro: async (req, res) => {
    try {
      const {
        nombre_cliente,
        correo_cliente,
        telefono_cliente,
        cant_pers_res,
        fecha_res,
        mensaje_res,
        idSalonEvento,
      } = req.body;

      // Crear la nueva reserva
      const reserva = new Reserva({
        nombre_cliente,
        correo_cliente,
        telefono_cliente,
        cant_pers_res,
        fecha_res,
        mensaje_res,
        idSalonEvento,
      });

      await reserva.save();

      // Buscar el salón para obtener el correo del contacto asociado
      const salon = await SalonEvento.findById(idSalonEvento)
        .populate("idContactoSalon")
        .populate({
          path: "idCiudSalonEvento",
          populate: { path: "idDepart" },
        });

      // Verificar si el salón fue encontrado correctamente
      if (!salon || !salon.idContactoSalon) {
        return res
          .status(404)
          .json({ error: "No se encontró el salón o su contacto" });
      }

      // Debugging: Asegurarse de que el salón y el contacto existen
      console.log("Salon encontrado: ", salon);
      console.log("Contacto del salón: ", salon.idContactoSalon);

      const correoContactoSalon = salon.idContactoSalon.correo_cont;

      // Configurar el transporte de nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });

      const mailOptionsCliente = {
        from: process.env.userEmail,
        to: correo_cliente, // Correo del cliente
        subject: "Solicitud de reserva para salón de evento",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center;">
              <div style="flex-grow: 1;">
                <h2 style="color: #E53935;">
                  ${salon.nombre_sal}
                </h2>
                <p style="font-size: 14px;color: #000000;font-weight: bold">${
                  salon.idCiudSalonEvento.nombre_ciud
                }, ${salon.idCiudSalonEvento.idDepart.nombre_depart}</p>
                <p>Dirección: ${salon.direccion_sal}</p>
                <p>Teléfono: ${salon.idContactoSalon.telefono_cont}</p>
              </div>
              <div style="margin-left: 20px;">
                <img src="${
                  salon.galeria_sal[0]?.url
                }" alt="Imagen del salón" style="width: 150px; height: auto; border-radius: 8px; object-fit: cover;" />
              </div>
            </div>
      
            <h3>Tu solicitud <span style="float: right; font-size: 14px;">Enviada el ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span></h3>
      
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Nombre:</strong> ${nombre_cliente}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>E-Mail:</strong> ${correo_cliente}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Fecha Evento:</strong> ${fecha_res}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Teléfono:</strong> ${telefono_cliente}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>N.º invitados:</strong> ${cant_pers_res}</td>
              </tr>
            </table>
          </div>
        `,
      };

      const mailOptionsSalon = {
        from: process.env.userEmail,
        to: correoContactoSalon, // Correo del contacto del salón
        subject: "Nueva reserva confirmada - Esfera Audiovisual",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center;">
              <div style="flex-grow: 1;">
                <h2 style="color: #E53935;">
                  Nueva reserva confirmada para el salón ${salon.nombre_sal}
                </h2>
                <p style="font-size: 14px;color: #000000;font-weight: bold">${
                  salon.idCiudSalonEvento.nombre_ciud
                }, ${salon.idCiudSalonEvento.idDepart.nombre_depart}</p>
                <p>Dirección: ${salon.direccion_sal}</p>
                <p>Teléfono: ${salon.idContactoSalon.telefono_cont}</p>
              </div>
              <div style="margin-left: 20px;">
                <img src="${
                  salon.galeria_sal[0]?.url
                }" alt="Imagen del salón" style="width: 150px; height: auto; border-radius: 8px; object-fit: cover;" />
              </div>
            </div>
      
            <h3>Detalles de la reserva <span style="float: right; font-size: 14px;">Confirmada el ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}</span></h3>
      
            <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Cliente:</strong> ${nombre_cliente}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>N.º Personas:</strong> ${cant_pers_res}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Fecha Evento:</strong> ${fecha_res}</td>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Teléfono Cliente:</strong> ${telefono_cliente}</td>
              </tr>
              <tr>
                <td colspan="2" style="padding: 10px; border-bottom: 1px solid #ddd;"><strong>Mensaje:</strong> ${mensaje_res}</td>
              </tr>
            </table>
          </div>
        `,
      };

      // Enviar ambos correos de forma asíncrona
      await Promise.all([
        transporter.sendMail(mailOptionsCliente),
        transporter.sendMail(mailOptionsSalon),
      ]);

      res.json(reserva);
    } catch (error) {
      // Asegurarse de mostrar el error en detalle
      console.error("Error en el proceso de reserva: ", error);
      res.status(500).json({ error: error.message });
    }
  },

  // Actualizar una reserva existente
  editar: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nombre_cliente,
        correo_cliente,
        telefono_cliente,
        cant_pers_res,
        fecha_res,
        mensaje_res,
        idSalonEvento,
      } = req.body;

      const reserva = await Reserva.findByIdAndUpdate(
        id,
        {
          nombre_cliente,
          correo_cliente,
          telefono_cliente,
          cant_pers_res,
          fecha_res,
          mensaje_res,
          idSalonEvento,
        },
        { new: true }
      ).populate("idSalonEvento");

      if (!reserva)
        return res.status(404).json({ message: "Reserva no encontrada" });

      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Activar una reserva
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      ).populate("idSalonEvento");
      if (!reserva)
        return res.status(404).json({ message: "Reserva no encontrada" });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  // Desactivar una reserva
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      ).populate("idSalonEvento");
      if (!reserva)
        return res.status(404).json({ message: "Reserva no encontrada" });
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpReserva;
