module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: "Réinitialisation de mot de passe",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Demande de réinitialisation de mot de passe</h2>
          <p style="color: #575757;">Bonjour,</p>
          <p style="color: #575757;">Vous avez demandé à réinitialiser votre mot de passe. Cliquez sur le lien ci-dessous pour procéder :</p>
          <a href="https://www.votre-site.com/reset-password?token=${data.token}" style="color: #C4F649;">Réinitialiser mon mot de passe</a>
          <p style="color: #575757;">Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
          <p style="color: #575757;">Cordialement,<br>L'équipe TechShop</p>
        </body>
      </html>
    `,
  });
  