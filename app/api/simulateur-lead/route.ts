import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { prenom, email, instagram, secteur, cible } = await req.json();

    await resend.emails.send({
      from: "noreply@massishoots.com",
      to: "massishoots.ca@gmail.com",
      subject: `📱 Nouveau lead simulateur — ${prenom}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 32px; border-radius: 12px;">
          <div style="border-left: 3px solid #C9A84C; padding-left: 16px; margin-bottom: 24px;">
            <h2 style="color: #C9A84C; margin: 0 0 4px;">Nouveau lead — Simulateur IA</h2>
            <p style="color: rgba(255,255,255,0.4); margin: 0; font-size: 13px;">${new Date().toLocaleString("fr-CA", { timeZone: "America/Toronto" })}</p>
          </div>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; width: 140px;">Prénom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff; font-weight: 600;">${prenom}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #C9A84C; font-weight: 600;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Instagram</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff;">${instagram || "—"}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Secteur</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.08); color: #fff;">${secteur}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: rgba(255,255,255,0.5); font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Cible</td>
              <td style="padding: 12px 0; color: #fff;">${cible}</td>
            </tr>
          </table>
          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; background: #C9A84C; color: #0a0a0a; padding: 12px 28px; border-radius: 9999px; font-weight: 700; font-size: 13px; text-decoration: none; letter-spacing: 0.05em;">
              Contacter ${prenom} →
            </a>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
  }
}
