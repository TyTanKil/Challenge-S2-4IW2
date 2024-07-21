module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: "Votre commande a été expédiée",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Votre commande est en route !</h2>
          <p style="color: #575757;">Bonjour,</p>
          <p style="color: #575757;">Nous sommes heureux de vous informer que votre commande a été expédiée. Voici les détails :</p>
          <p style="color: #575757;">Numéro de commande : <strong>${data.orderNumber}</strong></p>
          <p style="color: #575757;">Vous pouvez suivre votre commande en cliquant sur le lien ci-dessous :</p>
          <a href="https://www.votre-site.com/track-order?order=${data.orderNumber}" style="color: #C4F649;">Suivre ma commande</a>
          <p style="color: #575757;">Merci pour votre achat et à bientôt !</p>
          <p style="color: #575757;">Cordialement,<br>L'équipe TechShop</p>
        </body>
      </html>
    `,
  });
  