module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Confirmation de commande",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #4CAF50;">Merci pour votre commande !</h2>
                <p>Bonjour,</p>
                <p>Nous avons bien reçu votre commande. Voici les détails :</p>
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Produit</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Quantité</th>
                        <th style="border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;">Prix</th>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #ddd; padding: 8px;">${data.productName}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${data.quantity}</td>
                        <td style="border: 1px solid #ddd; padding: 8px;">${data.price}€</td>
                    </tr>
                </table>
                <p>Numéro de commande : <strong>${data.orderNumber}</strong></p>
                <p>Merci pour votre achat !</p>
                <p>Cordialement,<br>L'équipe TechShop</p>
            </body>
        </html>
    `,
});
