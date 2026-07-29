import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { kv } from "@vercel/kv";

export async function POST(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== "massiAdmin2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const form = await req.formData();
    const file = form.get("file") as File;
    const videoName = form.get("videoName") as string;

    if (!file || !videoName)
      return NextResponse.json({ error: "Missing file or videoName" }, { status: 400 });

    const blob = await put(`thumbnails/${videoName}.jpg`, file, {
      access: "public",
      contentType: "image/jpeg",
    });

    // Save thumbnail mapping in KV
    const KEY = "media-config";
    const config = ((await kv.get(KEY)) ?? { covers: {}, crops: {}, thumbnails: {} }) as Record<string, Record<string, string>>;
    if (!config.thumbnails) config.thumbnails = {};
    config.thumbnails[videoName] = blob.url;
    await kv.set(KEY, config);

    return NextResponse.json({ url: blob.url });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
