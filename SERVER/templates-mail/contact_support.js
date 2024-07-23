module.exports = (data) => ({
    from: 'site@tech-shop.tech',
    to: 'support@tech-shop.tech',
    subject: "Nouveau mail de contact",
    html: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h2 style="color: #A0DB10;">Nouveau mail de contact de ${data.last_name} ${data.first_name} (adresse mail : ${data.from})</h2>
          <span style="color: #A0DB10;">Demande : <br> ${data.demande}</span>
        </body>
      </html>
    `,
  });
  