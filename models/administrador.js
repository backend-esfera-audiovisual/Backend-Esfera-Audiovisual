import mongoose from "mongoose";

const administradorSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    cedula: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    telefono: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    estado: { type: Boolean, default: 1 }
});

export default mongoose.model("Administrador", administradorSchema);
