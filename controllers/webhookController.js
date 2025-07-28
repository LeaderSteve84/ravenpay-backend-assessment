const db = require('../db/connection');

exports.handleDeposit = async (req, res) => {
  try {
    const payload = req.body;

    // Verify secret key
    if (payload.secret !== process.env.RAVEN_WEBHOOK_SECRET) {
      return res.status(401).json({ message: 'Invalid secret key' });
    }

    const {
      account_number,
      amount,
      session_id,
      source: {
        account_number: sender_account,
        first_name,
        last_name,
        narration,
        bank,
        bank_code,
        createdAt
      }
    } = payload;

    // Find the user_id by account number
    const account = await db('accounts').where({ account_number }).first();
    if (!account) return res.status(404).json({ message: 'Account not found' });

    const user_id = account.user_id;

    // insert into deposits table
    await db('deposits').insert({
      user_id,
      account_number,
      amount,
      reference: session_id,
      narration,
      bank,
      bank_code,
      sender_account,
      deposited_at: createdAt
    });

    // insert into transactions table
    await db('transactions').insert({
      user_id,
      type: 'deposit',
      amount,
      reference: session_id,
      description: narration
    });

    return res.status(200).json({ message: 'Deposit recorded' });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
