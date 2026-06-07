#!/bin/bash

echo "🚀 Démarrage du serveur de développement avec variables d'environnement..."

# Charger les variables d'environnement depuis .env.local
if [ -f .env.local ]; then
    echo "✅ Chargement de .env.local..."
    export $(grep -v '^#' .env.local | xargs)

    # Vérifier que les variables importantes sont chargées
    if [ -n "$ANTHROPIC_API_KEY" ]; then
        echo "✅ ANTHROPIC_API_KEY chargée"
    else
        echo "❌ ANTHROPIC_API_KEY manquante"
    fi

    if [ -n "$RESEND_API_KEY" ]; then
        echo "✅ RESEND_API_KEY chargée"
    else
        echo "❌ RESEND_API_KEY manquante"
    fi
else
    echo "⚠️  Fichier .env.local non trouvé"
fi

echo "🏃‍♂️ Démarrage de Next.js..."
npm run dev