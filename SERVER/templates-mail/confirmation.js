module.exports = (data) => {
    return {
      from: '"Tech Shop" <support@tech-shop.tech>',
      to: data.to,
      subject: "Confirmation de commande",
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
            <h2 style="color: #A0DB10;">Merci pour votre commande !</h2>
            <p style="color: #575757;">Bonjour,</p>
            <p style="color: #575757;">Nous avons bien reçu votre commande. Voici les détails :</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #C4F649;">Produit</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #C4F649;">Quantité</th>
                <th style="border: 1px solid #ddd; padding: 8px; background-color: #C4F649;">Prix</th>
              </tr>
              ${data.items.map(item => `
                <tr>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
                  <td style="border: 1px solid #ddd; padding: 8px;">${item.price}€</td>
                </tr>
              `).join('')}
            </table>
            <p style="color: #575757;">Numéro de commande : <strong>${data.orderNumber}</strong></p>
            <p style="color: #575757;">Merci pour votre achat !</p>
            <p style="color: #575757;">Cordialement,<br>L'équipe TechShop</p>
          </body>
        </html>
      `,
    };
  };
  