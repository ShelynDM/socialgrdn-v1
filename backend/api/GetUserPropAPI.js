/**
 * GetUserPropertiesAPI.js
 * Description: API to retrieve properties associated with a user based on userID
 * Author: Donald Jans Uy
 * Date: 2024-10-02
 */

const express = require('express');
const router = express.Router();

// Handle GET request to retrieve properties based on userID

router.get('/', (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send('userID is required');
  }

// SQL query to retrieve properties with location and primary image based on userID
  const query = `
    SELECT p.property_id, p.property_name, 
           l.address_line1, l.city, l.province, l.postal_code,
           ppi.image_url
    FROM PropertyListing p
    JOIN PropertyLocation l ON p.location_id = l.location_id
    LEFT JOIN PropertyPrimaryImages ppi ON p.property_id = ppi.property_id
    WHERE p.userID = ?`;
// Execute the SQL query to fetch properties for the given userID
  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('An error occurred while fetching properties');
    }

// Check if any properties are found for the user
    if (results.length === 0) {
      return res.status(404).send('No properties found for the user');
    }

    return res.status(200).json(results);
  });
});

module.exports = router;