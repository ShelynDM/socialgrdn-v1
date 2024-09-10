const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  const query = 'SELECT * FROM UserProfile WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).send('User not found');
    } else {
      return res.status(200).json(results[0]);
    }
  });
});

module.exports = router;
