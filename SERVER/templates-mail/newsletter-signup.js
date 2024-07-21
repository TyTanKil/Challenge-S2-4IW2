module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: "Inscription à la newsletter",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Bienvenue à notre newsletter !</h2>
          <p style="color: #575757;">Bonjour ${data.userName},</p>
          <p style="color: #575757;">Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt des nouvelles et des offres exclusives.</p>
          <p style="color: #575757;">Cordialement,<br>L'équipe TechShop</p>
        </body>
      </html>
    `,
  });
  