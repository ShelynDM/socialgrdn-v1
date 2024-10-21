const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { property_id, renter_ID, start_date, end_date, status, rent_base_price, tax_amount, transaction_fee } = req.body;

  if (!property_id || !renter_ID) {
    return res.status(400).send('Property id and Renter id are required');
  }

  const query = `
    INSERT INTO Rental (
       property_id, renter_ID, start_date, end_date, status, rent_base_price, tax_amount, transaction_fee
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ? )
  `;
  const values = [
    property_id, renter_ID, start_date, end_date, status, rent_base_price, tax_amount, transaction_fee
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error registering rental information to db.', err);
      //res.status(500).send('Error registering rental information to db.');
      return res.status(500).json({ error: 'Database error' });
    } else {
      //res.status(200).send('Rental information registered successfully');
      //return res.status(200).json({ exists: false });

      // The last inserted ID can be accessed with results.insertId
      const rent_id = results.insertId;
      console.log('Rental  from API:', rent_id);
      // Send back a response with the last inserted ID
      return res.status(200).json({
        rent_id: rent_id
      });
    }
  });
});



module.exports = router;