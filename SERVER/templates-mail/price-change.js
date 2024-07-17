module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: "Changement de prix",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Changement de prix</h2>
          <p style="color: #575757;">Bonjour ${data.userName},</p>
          <p style="color: #575757;">Le prix du produit ${data.productName} a changé.</p>
          <p style="color: #575757;">Nouveau prix : <span style="color: #C4F649;">${data.newPrice}€</span></p>
        </body>
      </html>
    `,
  });
  