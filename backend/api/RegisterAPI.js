const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  const { email, firstname, lastname, username, profession, phoneNumber, userAddress, userCity, userProvince, userPostalCode } = req.body;

  if (!firstname || !lastname || !username || !email) {
    return res.status(400).send('First name, last name, username, and email are required');
  }

  const query = `
    INSERT INTO UserProfile (
      email, first_name, last_name, username, profession, phone_number, 
      address_line1, city, province, postal_code, role, status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '1', '1')
  `;
  const values = [
    email, firstname, lastname, username, profession, phoneNumber, 
    userAddress, userCity, userProvince, userPostalCode
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Error registering user');
    } else {
      res.status(200).send('User registered successfully');
    }
  });
});

router.post('/check-user', async (req, res) => {
  const { email } = req.body;
  console.log('Checking for user with email:', email);
  try {
    const result = await db.query('SELECT * FROM UserProfile WHERE email = ?', [email]);
    console.log('Query result:', result);
    if (result.length > 0) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }
});

module.exports = router;