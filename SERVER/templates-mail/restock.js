module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Produit de nouveau en stock",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Produit de nouveau en stock</h2>
                <p>Bonjour ${data.userName},</p>
                <p>Le produit ${data.productName} est de nouveau en stock !</p>
                <p>Venez le découvrir sur notre site avant qu'il ne soit à nouveau en rupture de stock.</p>
            </body>
        </html>
    `,
});
