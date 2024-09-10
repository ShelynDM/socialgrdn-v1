const express = require('express');
const router = express.Router();

router.patch('/', (req, res) => {
  const { email, first_name, last_name, username, address_line1, phone_number, profession } = req.body;

  if (!email) {
    return res.status(400).send('Email is required');
  }

  const query = `
    UPDATE UserProfile 
    SET first_name = ?, last_name = ?, username = ?, address_line1 = ?, phone_number = ?, profession = ?
    WHERE email = ?
  `;

  const values = [first_name, last_name, username, address_line1, phone_number, profession, email];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('Error updating profile');
    }

    if (result.affectedRows === 0) {
      return res.status(404).send('User not found');
    }

    return res.status(200).send('Profile updated successfully');
  });
});

module.exports = router;
