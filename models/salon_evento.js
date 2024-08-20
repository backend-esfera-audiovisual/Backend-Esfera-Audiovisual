import mongoose from "mongoose";

const salonEventoSchema = new mongoose.Schema({
    nombre_sal: { type: String, required: true },
    descripcion_sal: { type: String, required: true },
    galeria_sal: [{ url: { type: String }, publicId: { type: String } }],
    tipo_sal: { type: String, required: true },
    capacidad_sal: { type: Number, required: true },
    direccion_sal: { type: String, required: true },
    precio_sal: { type: Number, required: true },
    idCiudSalonEvento: { type: mongoose.Schema.Types.ObjectId, ref: "CiudadSalonEvento", required: true },
    idContactoSalon: { type: mongoose.Schema.Types.ObjectId, ref: "ContactoSalon", required: true },
    idAmbienteSalon: [{ type: mongoose.Schema.Types.ObjectId, ref: "AmbienteSalon", required: true }],
    idEspaciosSalon: [{ type: mongoose.Schema.Types.ObjectId, ref: "EspacioSalon", required: true }],
    idServiciosSalon: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServicioSalon", required: true }],
    createdAt: { type: Date, default: Date.now },
    estado: { type: Boolean, default: 1 }
});

export default mongoose.model("SalonEvento", salonEventoSchema);
