module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Inscription à la newsletter",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Bienvenue à notre newsletter !</h2>
                <p>Bonjour ${data.userName},</p>
                <p>Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt des nouvelles et des offres exclusives.</p>
                <p>Cordialement,<br>L'équipe TechShop</p>
            </body>
        </html>
    `,
});
