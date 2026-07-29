import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";
import sharp from "sharp";
import { join } from "path";
import { existsSync, readFileSync } from "fs";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== "massiAdmin2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { imagePath, cropPercent } = await req.json();
    // cropPercent: { x, y, width, height } in % of image dimensions

    const abs = join(process.cwd(), "public", imagePath);
    if (!existsSync(abs))
      return NextResponse.json({ error: `File not found: ${abs}` }, { status: 404 });

    const fileBuffer = readFileSync(abs);
    const meta = await sharp(fileBuffer).metadata();
    const iw = meta.width ?? 800;
    const ih = meta.height ?? 600;

    const left   = Math.max(0, Math.round((cropPercent.x / 100) * iw));
    const top    = Math.max(0, Math.round((cropPercent.y / 100) * ih));
    const width  = Math.min(iw - left, Math.max(1, Math.round((cropPercent.width / 100) * iw)));
    const height = Math.min(ih - top,  Math.max(1, Math.round((cropPercent.height / 100) * ih)));

    if (width < 1 || height < 1 || left + width > iw || top + height > ih)
      return NextResponse.json({ error: `Coordonnées invalides: left=${left} top=${top} w=${width} h=${height} img=${iw}x${ih}` }, { status: 400 });

    const cropped = await sharp(fileBuffer)
      .extract({ left, top, width, height })
      .jpeg({ quality: 92 })
      .toBuffer();

    const filename = `crops/${Date.now()}_${imagePath.replace(/\//g, "_")}.jpg`;
    const blob = await put(filename, cropped, { access: "public", contentType: "image/jpeg" });

    // Save in KV config
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
