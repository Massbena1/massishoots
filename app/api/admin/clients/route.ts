import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import type { ClientPortal } from "@/app/api/client/auth/route";

const KEY = "client-portals";

function auth(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

export async function GET() {
  const portals = ((await kv.get<ClientPortal[]>(KEY)) ?? []).filter(Boolean);
  return NextResponse.json(portals);
}

export async function POST(req: NextRequest) {
  const { password, portal } = await req.json();
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!portal) return NextResponse.json({ ok: true });
  const portals = ((await kv.get<ClientPortal[]>(KEY)) ?? []).filter(Boolean);
  await kv.set(KEY, [portal, ...portals]);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const { password, portal } = await req.json();
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const portals = ((await kv.get<ClientPortal[]>(KEY)) ?? []).filter(Boolean);
  await kv.set(KEY, portals.map(p => p.id === portal.id ? portal : p));
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { password, id } = await req.json();
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const portals = ((await kv.get<ClientPortal[]>(KEY)) ?? []).filter(Boolean);
  await kv.set(KEY, portals.filter(p => p.id !== id));
  return NextResponse.json({ ok: true });
}
