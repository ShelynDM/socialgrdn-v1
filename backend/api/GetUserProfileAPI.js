const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send('userID is required');
  }

  const query = 'SELECT * FROM UserProfile WHERE userID = ?';
  db.query(query, [userID], (err, results) => {
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
