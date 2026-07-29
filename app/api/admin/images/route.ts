import { NextRequest, NextResponse } from "next/server";
import { readdirSync, existsSync } from "fs";
import { join } from "path";

const IMG = /\.(jpg|jpeg|JPG|png|webp|PNG|JPEG|WEBP)$/;

const CATEGORIES: Record<string, string> = {
  brand: "portfolio/brand",
  eventt: "portfolio/eventt",
  corpo: "portfolio/corpo",
  lyfestyle: "portfolio/lyfestyle",
  mariage: "portfolio/mariage",
  professionel: "portfolio/professionel",
  videos: "portfolio/videos",
};

export async function GET(req: NextRequest) {
  if (req.headers.get("x-admin-key") !== "massiAdmin2026")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const category = req.nextUrl.searchParams.get("category") ?? "";
  const rel = CATEGORIES[category];
  if (!rel) return NextResponse.json({ images: [] });

  try {
    const abs = join(process.cwd(), "public", rel);

    if (category === "brand") {
      // scan sous-dossiers clients
      const clients = readdirSync(abs).filter(f => !f.startsWith("."));
      const images: { src: string; client: string }[] = [];
      for (const client of clients) {
        const clientAbs = join(abs, client);
        try {
          const files = readdirSync(clientAbs).filter(f => IMG.test(f));
          for (const f of files) {
            images.push({ src: `/${rel}/${client}/${f}`, client });
          }
        } catch { /* skip */ }
      }
      return NextResponse.json({ images });
    }

    if (!existsSync(abs)) return NextResponse.json({ images: [] });
    const files = readdirSync(abs).filter(f => IMG.test(f)).sort();
    return NextResponse.json({ images: files.map(f => ({ src: `/${rel}/${f}` })) });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
