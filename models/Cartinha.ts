import mongoose from "mongoose";

const CartinhaSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  nome: String,
  fotos: [String],
  texto: String,
  spotify_embed: String,
  created_at: Date
});

export default mongoose.models.Cartinha || mongoose.model("Cartinha", CartinhaSchema);
