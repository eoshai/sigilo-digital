import { connectDB } from "@/lib/mongodb";
import Cartinha from "@/models/Cartinha";

export async function GET() {
  await connectDB();
  const cartinhas = await Cartinha.find();
  return Response.json(cartinhas);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();

  const nova = await Cartinha.create({
    ...data,
    created_at: new Date(),
  });

  return Response.json(nova);
}
