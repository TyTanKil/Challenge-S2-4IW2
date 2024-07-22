module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: `Nouveau produit dans la catégorie ${data.categoryName}`,
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Nouveau produit dans la catégorie ${data.categoryName}</h2>
          <p style="color: #575757;">Bonjour ${data.userName},</p>
          <p style="color: #575757;">Nous avons un nouveau produit dans la catégorie ${data.categoryName} :</p>
          <ul style="list-style-type: none; padding: 0;">
            <li style="background-color: #fff; padding: 10px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <span style="color: #A0DB10;">Nom du produit : ${data.productName}</span> - <span style="color: #C4F649;">${data.price}€</span>
            </li>
          </ul>
          <p style="color: #575757;">Venez le découvrir sur notre site !</p>
          <p style="color: #575757;">Cordialement,<br>L'équipe TechShop</p>
        </body>
      </html>
    `,
  });
  