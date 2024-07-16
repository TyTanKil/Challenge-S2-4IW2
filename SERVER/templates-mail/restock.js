module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: "Produit de nouveau en stock",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Produit de nouveau en stock</h2>
          <p style="color: #575757;">Bonjour ${data.userName},</p>
          <p style="color: #575757;">Le produit ${data.productName} est de nouveau en stock !</p>
          <p style="color: #575757;">Venez le découvrir sur notre site avant qu'il ne soit à nouveau en rupture de stock.</p>
        </body>
      </html>
    `,
  });
  