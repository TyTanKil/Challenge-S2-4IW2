module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Changement de prix",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #FFA500;">Changement de prix</h2>
                <p>Bonjour ${data.userName},</p>
                <p>Le prix du produit ${data.productName} a changé.</p>
                <p>Nouveau prix : ${data.newPrice}€</p>
            </body>
        </html>
    `,
});
