module.exports = (data) => ({
  from: '"Tech Shop" <support@tech-shop.tech>',
  to: data.to,
  subject: "Modification de vos informations de compte",
  html: `
    <html>
      <body style="font-family: "Exo", sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
        <h2 style="color: #A0DB10;">Modification de vos informations de compte</h2>
        <p style="color: #575757;">Bonjour, ${data.name}</p>
        <p style="color: #575757;">Les informations suivantes de votre compte ont été modifiées :</p>
        <h3 style="color: #A0DB10;">
          ${data.modifiedFields}
        </h3>
        <p style="color: #575757;">Si vous n'êtes pas à l'origine de ces modifications, veuillez contacter notre support immédiatement.</p>
        <p style="color: #575757;">Cordialement,<br>L'équipe Tech Shop</p>
      </body>
    </html>
  `,
});
