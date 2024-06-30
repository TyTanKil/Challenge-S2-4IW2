module.exports = (data) => ({
  from: "administrateur@tech-shop.tech",
  to: data.to,
  subject: "Joyeux Anniversaire !",
  html: `
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6;">
                <h2 style="color: #FF69B4;">Joyeux Anniversaire !</h2>
                <p>Bonjour ${data.name},</p>
                <p>Nous vous souhaitons un très joyeux anniversaire ! Pour célébrer, nous vous offrons une réduction spéciale :</p>
                <p><strong>Code promo : BIRTHDAY20</strong> - 20% de réduction sur votre prochaine commande.</p>
                <p>Profitez de votre journée et de ce petit cadeau de notre part !</p>
                <p>Cordialement,<br>L'équipe TechShop</p>
            </body>
        </html>
    `,
});
