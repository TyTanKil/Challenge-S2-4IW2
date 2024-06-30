module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Votre commande a été expédiée",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #00BFFF;">Votre commande est en route !</h2>
                <p>Bonjour,</p>
                <p>Nous sommes heureux de vous informer que votre commande a été expédiée. Voici les détails :</p>
                <p>Numéro de commande : <strong>${data.orderNumber}</strong></p>
                <p>Vous pouvez suivre votre commande en cliquant sur le lien ci-dessous :</p>
                <a href="https://www.votre-site.com/track-order?order=${data.orderNumber}" style="color: #4CAF50;">Suivre ma commande</a>
                <p>Merci pour votre achat et à bientôt !</p>
                <p>Cordialement,<br>L'équipe TechShop</p>
            </body>
        </html>
    `,
});
