module.exports = (data) => ({
    from: '"Tech Shop" <support@tech-shop.tech>"',
    to: data.to,
    subject: "Joyeux Anniversaire !",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Joyeux Anniversaire !</h2>
          <p style="color: #575757;">Bonjour ${data.name},</p>
          <p style="color: #575757;">Nous vous souhaitons un très joyeux anniversaire ! Pour célébrer, nous vous offrons une réduction spéciale :</p>
          <p style="color: #575757;"><strong>Code promo : BIRTHDAY20</strong> - 20% de réduction sur votre prochaine commande.</p>
          <p style="color: #575757;">Profitez de votre journée et de ce petit cadeau de notre part !</p>
          <p style="color: #575757;">Cordialement,<br>L'équipe TechShop</p>
        </body>
      </html>
    `,
  });
  