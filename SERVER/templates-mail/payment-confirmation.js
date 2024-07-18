module.exports = (data) => {
    const products = data.products && Array.isArray(data.products) ? data.products : [];
    return {
      from: '"Tech Shop" <support@tech-shop.tech>',
      to: data.to,
      subject: 'Confirmation de paiement',
      html: `
        <div style="font-family: Arial, sans-serif; color: #575757; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
          <h1 style="color: #A0DB10;">Merci pour votre achat !</h1>
          <p style="color: #575757;">Votre commande <strong>${data.orderId}</strong> a été confirmée.</p>
          <p style="color: #575757;">Produits achetés :</p>
          <ul style="list-style-type: none; padding: 0;">
            ${data.items.map(item => `
              <li style="background-color: #fff; padding: 10px; margin: 10px 0; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <span style="color: #A0DB10;">${item.name}</span> - <span style="color: #C4F649;">${item.price}€</span>
              </li>
            `).join('')}
          </ul>
          <p style="color: #575757;">Vous recevrez un email de confirmation avec la facture dans quelques instants.</p>
        </div>
      `,
    };
  };
  