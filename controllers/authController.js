const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createVirtualAccount } = require('../services/ravenService');

const signup = async (req, res) => {
  const { name, email, password, phone } = req.body;

  try {
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const [userId] = await db('users')
      .insert({ name, email, password: hashedPassword, phone })
    
    const user = await db('users')
      .where({ id: userId })
      .select('id', 'name', 'email', 'phone')
      .first();

    // Create virtual account via Raven
    console.log('Creating Raven account for:', user.email);

    const ravenAccount = await createVirtualAccount(user);

    console.log('Raven account response:', ravenAccount);

    // Save to accounts table
    const accountData = {
      user_id: user.id,
      account_number: ravenAccount.account_number,
      account_name: ravenAccount.account_name,
      bank: ravenAccount.bank
    };

    await db('accounts').insert(accountData);

    res.status(201).json({
      message: 'User created successfully',
      user,
      account: accountData
    });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signup, login };
