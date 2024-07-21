module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: "Vous avez oublié des articles dans votre panier",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">N'oubliez pas vos articles !</h2>
          <p style="color: #575757;">Bonjour ${data.name},</p>
          <p style="color: #575757;">Vous avez des articles en attente dans votre panier. Voici un rappel :</p>
          <ul style="list-style-type: none; padding: 0;">
            ${data.items.map(item => `
              <li style="background-color: #fff; padding: 10px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <span style="color: #A0DB10;">${item.name}</span> - <span style="color: #C4F649;">${item.price}€</span>
              </li>
            `).join('')}
          </ul>
          <p style="color: #575757;">Ne manquez pas de finaliser votre commande avant que ces articles ne disparaissent !</p>
          <p style="color: #575757;">Cordialement,<br>L'équipe TechShop</p>
        </body>
      </html>
    `,
  });
  