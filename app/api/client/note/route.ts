import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import type { ClientPortal } from "@/lib/clientPortal";

export async function POST(req: NextRequest) {
  const { password, note } = await req.json();
  if (!password) return NextResponse.json({ error: "Code requis" }, { status: 400 });

  const portals = ((await kv.get<ClientPortal[]>("client-portals")) ?? []).filter(Boolean);
  const idx = portals.findIndex(p => p.password === password);
  if (idx === -1) return NextResponse.json({ error: "Client introuvable" }, { status: 404 });

  portals[idx] = { ...portals[idx], clientNote: note };
  await kv.set("client-portals", portals);
  return NextResponse.json({ ok: true });
}
