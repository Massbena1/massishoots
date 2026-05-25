import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await req.json();
    const { nom, email, telephone, type, budget, message, date, time } = body;

    await resend.emails.send({
      from: "Massishoots Contact <onboarding@resend.dev>",
      to: ["massishot.ca@gmail.com"],
      replyTo: email,
      subject: `Nouvelle demande — ${type || "Non spécifié"} · ${nom}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px 24px;background:#0a0a0a;color:#fff;border-radius:16px;">
          <h1 style="font-size:22px;margin:0 0 24px;color:#c4cdd6;letter-spacing:0.05em;">MASSISHOOTS — Nouvelle demande</h1>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.45);font-size:12px;width:140px;">Nom</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;font-weight:600;">${nom}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.45);font-size:12px;">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;"><a href="mailto:${email}" style="color:#c4cdd6;">${email}</a></td>
            </tr>
            ${telephone ? `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.45);font-size:12px;">Téléphone</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;">${telephone}</td>
            </tr>` : ""}
            ${type ? `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.45);font-size:12px;">Type de projet</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;">${type}</td>
            </tr>` : ""}
            ${budget ? `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.45);font-size:12px;">Budget estimé</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;">${budget}</td>
            </tr>` : ""}
            ${date ? `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.45);font-size:12px;">Créneau préféré</td>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.08);font-size:14px;color:#c4cdd6;">${date}${time ? ` à ${time}` : ""}</td>
            </tr>` : ""}
          </table>

          ${message ? `
          <div style="margin-top:24px;">
            <p style="font-size:12px;color:rgba(255,255,255,0.45);margin-bottom:8px;">Message</p>
            <div style="background:rgba(255,255,255,0.05);border-radius:10px;padding:16px;font-size:14px;line-height:1.7;color:rgba(255,255,255,0.8);">${message.replace(/\n/g, "<br/>")}</div>
          </div>` : ""}

          <p style="margin-top:32px;font-size:11px;color:rgba(255,255,255,0.2);">Envoyé depuis massishoots.com</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
