module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Vous avez oublié des articles dans votre panier",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #FFA500;">N'oubliez pas vos articles !</h2>
                <p>Bonjour ${data.name},</p>
                <p>Vous avez des articles en attente dans votre panier. Voici un rappel :</p>
                <ul>
                    ${data.items
                      .map((item) => `<li>${item.name} - ${item.price}€</li>`)
                      .join("")}
                </ul>
                <p>Ne manquez pas de finaliser votre commande avant que ces articles ne disparaissent !</p>
                <p>Cordialement,<br>L'équipe TechShop</p>
            </body>
        </html>
    `,
});
