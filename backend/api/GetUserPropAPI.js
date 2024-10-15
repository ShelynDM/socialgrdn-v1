const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send('userID is required');
  }

  const query = `
    SELECT p.property_id, p.property_name, 
           l.address_line1, l.city, l.province, l.postal_code,
           ppi.image_url
    FROM PropertyListing p
    JOIN PropertyLocation l ON p.location_id = l.location_id
    LEFT JOIN PropertyPrimaryImages ppi ON p.property_id = ppi.property_id
    WHERE p.userID = ?`;

  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('An error occurred while fetching properties');
    }

    if (results.length === 0) {
      return res.status(404).send('No properties found for the user');
    }

    return res.status(200).json(results);
  });
});

module.exports = router;