module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: `Stock épuisé sur le produit ${data.productName}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Stock épuisé</h2>
          <p style="color: #575757;">Bonjour ${data.userName},</p>
          <p style="color: #575757;">Le produit ${data.productName} n'est plus en stock !</p>
          <p style="color: #575757;">Réapprovisionnez-le dès que possible.</p>
          <p style="color: #575757;">Cordialement,<br>L'équipe TechShop</p>
        </body>
      </html>
    `,
  });
  