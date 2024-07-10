module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Confirmation de paiement",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Paiement confirmé !</h2>
                <p>Bonjour ${data.name},</p>
                <p>Nous confirmons que nous avons bien reçu votre paiement pour la commande numéro <strong>${data.orderNumber}</strong>.</p>
                <p>Votre commande est en cours de traitement et vous serez informé de son expédition prochainement.</p>
                <p>Merci pour votre achat !</p>
                <p>Cordialement,<br>L'équipe TechShop</p>
            </body>
        </html>
    `,
});
