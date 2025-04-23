module.exports = (data) => {
    return {
      from: '"Tech Shop" <support@tech-shop.tech>',
      to: '"Tech Shop" <support@tech-shop.tech>',
      bcc: data.to,
      subject: data.object,
      html: `
        <html>
          <body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f9f9f9; padding: 20px; border-radius: 10px;">
            ${data.content}
          </body>
        </html>
      `,
    };
  };
  