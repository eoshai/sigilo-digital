import { connectDB } from "@/lib/mongodb";
import Cartinha from "@/models/Cartinha";

export async function GET(req, context) {
  const { id } = await context.params;

  await connectDB();
  const item = await Cartinha.findOne({ id });
  return Response.json(item || null);
}

export async function PUT(req, context) {
  const { id } = await context.params;

  await connectDB();
  const data = await req.json();

  const atualizado = await Cartinha.findOneAndUpdate(
    { id },
    data,
    { new: true }
  );

  return Response.json(atualizado);
}

export async function DELETE(req, context) {
  const { id } = await context.params;

  await connectDB();
  await Cartinha.findOneAndDelete({ id });

  return Response.json({ success: true });
}
