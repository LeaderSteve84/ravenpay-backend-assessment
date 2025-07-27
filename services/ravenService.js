const axios = require('axios');
require('dotenv').config();

const createVirtualAccount = async (user) => {
  try {
    const response = await axios.post(
      'https://integrations.getravenbank.com/v1/pwbt/generate_account',
      {
        first_name: user.name.split(' ')[0],
        last_name: user.name.split(' ')[1] || '',
        phone: user.phone,
        amount: '0',
        email: user.email
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.RAVEN_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    return response.data.data;
  } catch (error) {
    if (error.response) {
      console.error('Raven API Error Response:', error.response.data);
    } else {
      console.error('Raven API Request Error:', error.message);
    }
    throw new Error('Failed to create virtual account with Raven');
  }
};

module.exports = {
  createVirtualAccount,
};
