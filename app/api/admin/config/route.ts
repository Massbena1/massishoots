import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

const KEY = "media-config";
const defaultConfig = { covers: {}, crops: {}, thumbnails: {} };

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== "massiAdmin2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const config = (await kv.get(KEY)) ?? defaultConfig;
    return NextResponse.json(config);
  } catch {
    return NextResponse.json(defaultConfig);
  }
}

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== "massiAdmin2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const current = ((await kv.get(KEY)) ?? defaultConfig) as Record<string, unknown>;
    const merged = { ...current, ...body };
    await kv.set(KEY, merged);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
