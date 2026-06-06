import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";
import { Resend } from "resend";
import type { ClientPortal } from "@/lib/clientPortal";

const KEY = "client-portals";
const resend = new Resend(process.env.RESEND_API_KEY);

function auth(password: string) {
  return password === process.env.ADMIN_PASSWORD;
}

async function sendDeliveryEmail(portal: ClientPortal, deliverableLabels: { label: string; folder: string; downloadUrl?: string }[]) {
  if (!portal.email) return;

  const rows = deliverableLabels.map(d => `
    <tr>
      <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:4px;">${d.label}</div>
        ${d.folder ? `<div style="font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:0.08em;">📁 ${d.folder}</div>` : ""}
      </td>
      <td style="padding:14px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;">
        ${d.downloadUrl
          ? `<a href="${d.downloadUrl}" style="display:inline-block;padding:8px 18px;background:rgba(74,222,128,0.12);border:1px solid rgba(74,222,128,0.3);border-radius:9999px;color:#4ade80;text-decoration:none;font-size:12px;font-weight:600;">⬇ Télécharger</a>`
          : `<span style="font-size:12px;color:rgba(255,255,255,0.25);">Lien à venir</span>`
        }
      </td>
    </tr>
  `).join("");

  await resend.emails.send({
    from: "Massishoots <onboarding@resend.dev>",
    to: [portal.email],
    subject: `✅ Nouveau contenu livré — ${deliverableLabels.map(d => d.label).join(", ")}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;background:#0a0a0a;color:#fff;border-radius:16px;">

        <h1 style="font-size:28px;letter-spacing:0.06em;margin:0 0 6px;color:#fff;">MASSISHOOTS</h1>
        <p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0 0 32px;letter-spacing:0.1em;">ESPACE CLIENT</p>

        <div style="background:rgba(74,222,128,0.08);border:1px solid rgba(74,222,128,0.2);border-radius:12px;padding:18px 20px;margin-bottom:28px;">
          <p style="margin:0;font-size:15px;color:#4ade80;font-weight:600;">✅ Contenu prêt à télécharger !</p>
          <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">Bonjour ${portal.name}, votre contenu est disponible.</p>
        </div>

        <table style="width:100%;border-collapse:collapse;">
          ${rows}
        </table>

        <div style="margin-top:32px;text-align:center;">
          <a href="https://massishoots.com/fr/client" style="display:inline-block;padding:14px 32px;background:#f2f0ec;color:#0a0a0a;text-decoration:none;border-radius:9999px;font-size:14px;font-weight:700;letter-spacing:0.06em;">
            Accéder à mon espace client →
          </a>
        </div>

        <p style="margin-top:40px;font-size:11px;color:rgba(255,255,255,0.2);text-align:center;">
          Une question ? Réponds directement à cet email.<br/>
          massishoots.com · Montréal, QC
        </p>
      </div>
    `,
  });
}

export async function GET() {
  const portals = ((await kv.get<ClientPortal[]>(KEY)) ?? []).filter(Boolean);
  return NextResponse.json(portals);
}

async function sendWelcomeEmail(portal: ClientPortal) {
  if (!portal.email) return;

  const includes = (portal.serviceIncludes ?? []).map(item =>
    `<li style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);font-size:13px;color:rgba(255,255,255,0.7);">✓ ${item}</li>`
  ).join("");

  await resend.emails.send({
    from: "Massishoots <onboarding@resend.dev>",
    to: [portal.email],
    subject: `Bienvenue dans votre espace client Massishoots 🎬`,
    html: `
      <div style="font-family:sans-serif;max-width:580px;margin:0 auto;padding:40px 24px;background:#0a0a0a;color:#fff;border-radius:16px;">

        <h1 style="font-size:28px;letter-spacing:0.06em;margin:0 0 4px;color:#fff;">MASSISHOOTS</h1>
        <p style="font-size:11px;color:rgba(255,255,255,0.25);margin:0 0 36px;letter-spacing:0.15em;text-transform:uppercase;">Espace client</p>

        <p style="font-size:18px;font-weight:700;margin:0 0 8px;">Bonjour ${portal.name} 👋</p>
        <p style="font-size:14px;color:rgba(255,255,255,0.55);line-height:1.7;margin:0 0 32px;">
          Votre espace client est maintenant actif. Vous pouvez y suivre l'avancement de votre projet, accéder à vos livrables et télécharger votre contenu au fur et à mesure des livraisons.
        </p>

        <!-- Code d'accès -->
        <div style="background:rgba(196,205,214,0.07);border:1px solid rgba(196,205,214,0.15);border-radius:14px;padding:22px 24px;margin-bottom:24px;">
          <p style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.15em;text-transform:uppercase;margin:0 0 10px;">Votre code d'accès</p>
          <p style="font-size:28px;font-weight:800;letter-spacing:0.2em;color:#fff;margin:0 0 6px;font-family:monospace;">${portal.password}</p>
          <p style="font-size:11px;color:rgba(255,255,255,0.25);margin:0;">Gardez ce code confidentiel — il vous donne accès à tous vos fichiers.</p>
        </div>

        <!-- Service -->
        ${portal.packageName ? `
        <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px 24px;margin-bottom:24px;">
          <p style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.15em;text-transform:uppercase;margin:0 0 6px;">Votre forfait</p>
          <p style="font-size:20px;font-weight:700;color:#fff;margin:0 0 4px;">${portal.packageName}</p>
          ${portal.contractStart ? `<p style="font-size:12px;color:rgba(255,255,255,0.3);margin:0;">Début : ${portal.contractStart}${portal.contractEnd ? ` · Fin : ${portal.contractEnd}` : ""}</p>` : ""}
          ${includes ? `
          <ul style="list-style:none;padding:0;margin:16px 0 0;">
            ${includes}
          </ul>` : ""}
        </div>` : ""}

        <!-- Ce qui vous attend -->
        <div style="margin-bottom:32px;">
          <p style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:0.15em;text-transform:uppercase;margin:0 0 14px;">Ce que vous trouverez dans votre espace</p>
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${[
              ["📊", "Suivi en temps réel", "Voyez exactement où en est votre projet : préparation, tournage, montage, retouches, livraison."],
              ["📁", "Vos livrables organisés", "Photos et vidéos classées par mois, disponibles dès qu'elles sont prêtes."],
              ["🔔", "Notifications par email", "Vous recevez un email dès qu'un nouveau contenu est livré."],
              ["💬", "Communication directe", "Envoyez-moi un message ou un retour directement depuis votre espace."],
            ].map(([icon, title, desc]) => `
              <div style="display:flex;gap:14px;padding:14px 16px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.06);">
                <span style="font-size:20px;flex-shrink:0;">${icon}</span>
                <div>
                  <p style="font-size:13px;font-weight:600;color:#fff;margin:0 0 3px;">${title}</p>
                  <p style="font-size:12px;color:rgba(255,255,255,0.4);margin:0;line-height:1.5;">${desc}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin-bottom:40px;">
          <a href="https://massishoots.com/fr/client" style="display:inline-block;padding:15px 36px;background:#f2f0ec;color:#0a0a0a;text-decoration:none;border-radius:9999px;font-size:14px;font-weight:700;letter-spacing:0.06em;">
            Accéder à mon espace →
          </a>
        </div>

        <p style="font-size:12px;color:rgba(255,255,255,0.2);text-align:center;line-height:1.7;">
          Une question ? Réponds directement à cet email ou écris-moi sur WhatsApp.<br/>
          <a href="https://massishoots.com" style="color:rgba(196,205,214,0.35);text-decoration:none;">massishoots.com</a> · Montréal, QC
        </p>
      </div>
    `,
  });
}

export async function POST(req: NextRequest) {
  const { password, portal } = await req.json();
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (!portal) return NextResponse.json({ ok: true });
  const portals = ((await kv.get<ClientPortal[]>(KEY)) ?? []).filter(Boolean);
  await kv.set(KEY, [portal, ...portals]);
  await sendWelcomeEmail(portal);
  return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
  const { password, portal } = await req.json();
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });

  const portals = ((await kv.get<ClientPortal[]>(KEY)) ?? []).filter(Boolean);
  const previous = portals.find(p => p.id === portal.id);

  await kv.set(KEY, portals.map(p => p.id === portal.id ? portal : p));

  // Detect newly delivered deliverables
  if (previous && portal.email) {
    const prevDelivered = new Set((previous.deliverables ?? []).filter(d => d.status === "delivered").map(d => d.id));
    const newlyDelivered = (portal.deliverables ?? []).filter(
      (d: ClientPortal["deliverables"][0]) => d.status === "delivered" && !prevDelivered.has(d.id)
    );

    if (newlyDelivered.length > 0) {
      await sendDeliveryEmail(portal, newlyDelivered.map((d: ClientPortal["deliverables"][0]) => ({
        label: d.label,
        folder: d.folder ?? "",
        downloadUrl: d.downloadUrl,
      })));
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const { password, id } = await req.json();
  if (!auth(password)) return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  const portals = ((await kv.get<ClientPortal[]>(KEY)) ?? []).filter(Boolean);
  await kv.set(KEY, portals.filter(p => p.id !== id));
  return NextResponse.json({ ok: true });
}
