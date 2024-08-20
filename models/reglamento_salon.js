import mongoose from "mongoose";

const reglamentoSalonSchema = new mongoose.Schema({
    descripcion_regl: { type: String, required: true },
    idSalonEvento: { type: mongoose.Schema.Types.ObjectId, ref: "SalonEvento", required: true },
    createdAt: { type: Date, default: Date.now },
    estado: { type: Boolean, default: 1 }

});

export default mongoose.model("ReglamentoSalon", reglamentoSalonSchema);
