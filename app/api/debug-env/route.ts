import { NextResponse } from "next/server";

export async function GET() {
  try {
    const envCheck = {
      ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? "✅ Définie" : "❌ Manquante",
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "✅ Définie" : "❌ Manquante",
      BLOB_STORE_ID: process.env.BLOB_STORE_ID ? "✅ Définie" : "❌ Manquante",
      BLOB_READ_WRITE_TOKEN: process.env.BLOB_READ_WRITE_TOKEN ? "✅ Définie" : "❌ Manquante",
      NODE_ENV: process.env.NODE_ENV || "undefined",
      VERCEL: process.env.VERCEL ? "✅ Sur Vercel" : "❌ Pas sur Vercel"
    };

    // Masquer les vraies valeurs pour la sécurité
    const maskedEnv = Object.entries(process.env)
      .filter(([key]) => key.includes('API_KEY') || key.includes('TOKEN'))
      .reduce((acc, [key, value]) => {
        acc[key] = value ? `${value.substring(0, 8)}...` : "undefined";
        return acc;
      }, {} as Record<string, string>);

    return NextResponse.json({
      status: "Variables d'environnement check",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      checks: envCheck,
      masked_values: maskedEnv
    });

  } catch (error) {
    return NextResponse.json({
      error: "Erreur lors de la vérification",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}