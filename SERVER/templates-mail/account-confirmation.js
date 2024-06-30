module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Confirmation de création de compte",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Bienvenue chez nous !</h2>
                <p>Bonjour ${data.name},</p>
                <p>Votre compte a été créé avec succès. Nous sommes ravis de vous compter parmi nos clients.</p>
                <p>Vous pouvez dès maintenant vous connecter et découvrir nos produits.</p>
                <p>Merci de votre confiance et à bientôt !</p>
                <p>Cordialement,<br>L'équipe TechShop</p>
            </body>
        </html>
    `,
});
