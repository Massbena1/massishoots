import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Massishoots",
  description: "Comment Massishoots collecte, utilise et protège vos informations personnelles.",
};

export default function ConfidentialitePage() {
  return (
    <main>
      <PageHeader
        label="Légal"
        title="Confidentialité"
        subtitle="Comment nous protégeons vos informations."
      />
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 120px" }}>
        <div className="font-dm" style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.9, fontSize: 15 }}>

          <Block title="1. Informations collectées">
            Lorsque vous remplissez le formulaire de contact, nous collectons votre nom, votre adresse courriel, votre numéro de téléphone (si fourni) et le contenu de votre message. Nous ne collectons aucune information sans votre consentement explicite.
          </Block>

          <Block title="2. Utilisation des informations">
            Les informations collectées sont utilisées uniquement pour répondre à vos demandes, préparer des devis et communiquer avec vous dans le cadre de nos services photo et vidéo. Vos données ne sont jamais revendues à des tiers.
          </Block>

          <Block title="3. Cookies">
            Ce site utilise des cookies techniques essentiels au fonctionnement des pages. Aucun cookie publicitaire ou de traçage tiers n&apos;est utilisé.
          </Block>

          <Block title="4. Conservation des données">
            Vos informations sont conservées le temps nécessaire à la gestion de votre projet, puis supprimées sur demande ou après 12 mois d&apos;inactivité.
          </Block>

          <Block title="5. Vos droits">
            Vous avez le droit d&apos;accéder à vos données, de les corriger ou de demander leur suppression en nous contactant à{" "}
            <a href="mailto:massi@massishoots.com" style={{ color: "#c4cdd6", textDecoration: "none" }}>
              massi@massishoots.com
            </a>.
          </Block>

          <Block title="6. Sécurité">
            Vos données sont transmises via des connexions sécurisées (HTTPS) et stockées sur des serveurs protégés. Nous prenons toutes les mesures raisonnables pour prévenir tout accès non autorisé.
          </Block>

          <Block title="7. Contact">
            Pour toute question relative à cette politique, contactez-nous :{" "}
            <a href="mailto:massi@massishoots.com" style={{ color: "#c4cdd6", textDecoration: "none" }}>
              massi@massishoots.com
            </a>
          </Block>

          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", marginTop: 48 }}>
            Dernière mise à jour : juin 2026
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 className="font-bebas" style={{ fontSize: 22, color: "#fff", letterSpacing: "0.06em", marginBottom: 12 }}>
        {title}
      </h2>
      <p>{children}</p>
    </div>
  );
}
