const { initiateTransfer } = require('../services/ravenService');
const db = require('../db/connection');

exports.sendMoney = async (req, res) => {
  const {
    account_number,
    bank_code,
    bank,
    account_name,
    amount,
    narration
  } = req.body;

  const reference = `raven_ref_${Date.now()}`;

  try {
    // Call Raven API to initiate transfer
    const response = await initiateTransfer({
      account_number,
      bank_code,
      amount,
      narration,
      reference,
      bank,
      account_name
    });

    const {
      trx_ref,
      email,
      merchant_ref,
      fee,
      status,
      created_at
    } = response;

    // Get the user_id from req.user if auth is implemented; 
    const user_id = req.user?.id || 1;

    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Save to transfers table
    await db('transfers').insert({
      user_id,
      email: email || null,
      trx_ref,
      merchant_ref: merchant_ref || reference,
      amount,
      bank,
      bank_code,
      account_number,
      account_name,
      narration,
      fee,
      status,
      created_at: created_at || createdAt
    });

    // Save to transactions table
    await db('transactions').insert({
      user_id,
      type: 'transfer',
      amount,
      reference: trx_ref,
      description: narration
    });

    res.status(200).json({
      message: 'Transfer initiated successfully',
      data: response
    });
  } catch (error) {
    console.error('Transfer error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to initiate transfer' });
  }
};
