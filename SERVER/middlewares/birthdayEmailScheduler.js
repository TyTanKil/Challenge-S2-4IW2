const cron = require('node-cron');
const Account = require('../models/account'); // Assurez-vous du chemin correct

const sendBirthdayEmail = async (account) => {
  const data = {
    type: 'birthday',
    to: account.email,
    data: {
      name: account.firstName,
    },
  };

  try {
    const response = await fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
      console.log('Email sent successfully:', result);
    } catch (error) {
      console.error('Error:', text);
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

const checkBirthdays = async () => {
  try {
    const today = new Date();
    const todayMonth = today.getMonth() + 1;
    const todayDate = today.getDate();

    const accounts = await Account.findAll();
    accounts.forEach((account) => {
      const birthDate = new Date(account.birth_date);
      if (birthDate.getMonth() + 1 === todayMonth && birthDate.getDate() === todayDate) {
        sendBirthdayEmail(account);
      }
    });
  } catch (error) {
    console.error('Error checking birthdays:', error);
  }
};

cron.schedule('0 10 * * *', () => {
  console.log('Running birthday email scheduler...');
  checkBirthdays();
});

