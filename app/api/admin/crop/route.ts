import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== "massiAdmin2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { imagePath, croppedDataUrl } = await req.json();

    if (!croppedDataUrl || !croppedDataUrl.startsWith("data:image"))
      return NextResponse.json({ error: "Image invalide" }, { status: 400 });

    const base64 = croppedDataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64, "base64");

    const filename = `crops/${Date.now()}_${imagePath.replace(/\//g, "_")}.jpg`;
    const blob = await put(filename, buffer, { access: "public", contentType: "image/jpeg" });

    const KEY = "media-config";
    const config = ((await kv.get(KEY)) ?? { covers: {}, crops: {}, thumbnails: {} }) as Record<string, Record<string, string>>;
    if (!config.crops) config.crops = {};
    config.crops[imagePath] = blob.url;
    await kv.set(KEY, config);

    return NextResponse.json({ url: blob.url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
