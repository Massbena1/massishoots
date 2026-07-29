import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import Jimp from "jimp";
import { join } from "path";
import { existsSync, readFileSync } from "fs";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== "massiAdmin2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { imagePath, cropPercent } = await req.json();

    const abs = join(process.cwd(), "public", imagePath);
    if (!existsSync(abs))
      return NextResponse.json({ error: `Fichier introuvable: ${imagePath}` }, { status: 404 });

    const fileBuffer = readFileSync(abs);
    const image = await Jimp.read(fileBuffer);

    const iw = image.bitmap.width;
    const ih = image.bitmap.height;

    const left   = Math.max(0, Math.round((cropPercent.x / 100) * iw));
    const top    = Math.max(0, Math.round((cropPercent.y / 100) * ih));
    const width  = Math.min(iw - left, Math.max(1, Math.round((cropPercent.width / 100) * iw)));
    const height = Math.min(ih - top,  Math.max(1, Math.round((cropPercent.height / 100) * ih)));

    image.crop(left, top, width, height);
    const croppedBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    const filename = `crops/${Date.now()}_${imagePath.replace(/\//g, "_")}.jpg`;
    const blob = await put(filename, croppedBuffer, { access: "public", contentType: "image/jpeg" });

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
