/**
 * GetRentalDetailsAPI.js
 * Get rental detais (including address) through rental_id
 * by joining rental, propertylisting and  propertylocation table
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { rental_id } = req.query;
  // Ensure rental_id is provided
  if (!rental_id) {
    return res.status(400).send('rental_id is required');
  }
  // Query to fetch rental, property and location details
  const query = `SELECT 
    r.rental_id, r.start_date, r.end_date, r.status, r.rent_base_price, r.tax_amount, r.transaction_fee,
    p.property_name, p.description, p.rent_base_price AS property_base_price, p.growth_zone, 
    l.address_line1, l.city, l.province, l.postal_code,
    u.username AS renter_name
FROM 
    rental r
JOIN 
    propertylisting p ON r.property_id = p.property_id
JOIN 
    propertylocation l ON p.location_id = l.location_id
JOIN 
    userprofile u ON r.renter_ID = u.userID
WHERE 
    r.rental_id = ?;
`;

  // Execute the query
  db.query(query, [rental_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    // Check if results are found
    if (results.length === 0) {
      return res.status(404).send('Rental information not found');
    } else {
      return res.status(200).json(results[0]); // Send the first result back as JSON
    }
  });
});

module.exports = router;
