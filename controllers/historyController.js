const db = require('../db/connection');

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await db('transactions').select('*').orderBy('created_at', 'desc');
    res.status(200).json({ transactions });
  } catch (err) {
    console.error('Transaction fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch transactions' });
  }
};

// Get all deposits
exports.getAllDeposits = async (req, res) => {
  try {
    const deposits = await db('deposits').select('*').orderBy('created_at', 'desc');
    res.status(200).json({ deposits });
  } catch (err) {
    console.error('Deposit fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch deposits' });
  }
};

// Get all transfers
exports.getAllTransfers = async (req, res) => {
  try {
    const transfers = await db('transfers').select('*').orderBy('created_at', 'desc');
    res.status(200).json({ transfers });
  } catch (err) {
    console.error('Transfer fetch error:', err.message);
    res.status(500).json({ message: 'Failed to fetch transfers' });
  }
};
