module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Nouveau produit dans la catégorie",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Nouveau produit dans la catégorie ${data.categoryName}</h2>
                <p>Bonjour ${data.userName},</p>
                <p>Nous avons un nouveau produit dans la catégorie ${data.categoryName} :</p>
                <ul>
                    <li>Nom du produit : ${data.productName}</li>
                    <li>Prix : ${data.price}</li>
                </ul>
                <p>Venez le découvrir sur notre site !</p>
            </body>
        </html>
    `,
});
