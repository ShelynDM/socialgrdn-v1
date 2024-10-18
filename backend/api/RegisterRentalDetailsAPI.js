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
      res.status(500).send('Error registering rental information to db.');
      Console.log('Error registering rental information to db.');
    } else {
      res.status(200).send('Rental information registered successfully');
      Console.log('Rental information registered successfully');
    }
  });
});



module.exports = router;