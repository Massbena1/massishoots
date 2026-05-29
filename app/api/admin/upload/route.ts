import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

function auth(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export async function POST(req: NextRequest) {
  const password = req.headers.get("x-admin-password") ?? "";
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "Aucun fichier" }, { status: 400 });

  const blob = await put(`covers/${Date.now()}-${file.name}`, file, { access: "public" });
  return NextResponse.json({ url: blob.url });
}
