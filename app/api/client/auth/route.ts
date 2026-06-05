import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export interface ClientPortal {
  id: string;
  name: string;
  project: string;
  password: string;
  status: "preparation" | "tournage" | "montage" | "retouche" | "livre";
  deliveryDate: string;
  message: string;
  downloadUrl?: string;
  createdAt: string;
}

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!password) return NextResponse.json({ error: "Mot de passe requis" }, { status: 400 });

  const portals = ((await kv.get<ClientPortal[]>("client-portals")) ?? []).filter(Boolean);
  const portal = portals.find(p => p.password === password);

  if (!portal) return NextResponse.json({ error: "Accès refusé" }, { status: 401 });

  const { password: _, ...safePortal } = portal;
  return NextResponse.json(safePortal);
}
