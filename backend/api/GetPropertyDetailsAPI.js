/**
 * GetPropertyDetailsAPI.js
 * Get property detais(including address) through property ID 
 * by joining propertylisting and  propertylocation table
 */
const express = require('express');
const router = express.Router();

// const cors = require('cors');
// app.use(cors());

router.get('/', (req, res) => {
  const { property_id } = req.query;
  // Ensure property_id is provided
  if (!property_id) {
    return res.status(400).send('property_id is required');
  }
  // Define the query to fetch property and location details
  const query = `SELECT 
          pl.property_id, pl.property_name, pl.description, pl.growth_zone, pl.rent_base_price,
          pl.dimensions_length, pl.dimensions_width, pl.dimensions_height, pl.soil_type,
          loc.address_line1, loc.city,loc.province,
          loc.postal_code, loc.latitude, loc.longitude
      FROM 
          propertylisting pl
      INNER JOIN 
          propertylocation loc
      ON 
          pl.location_id = loc.location_id
      WHERE 
          pl.property_id = ?`;

  // Execute the query
  db.query(query, [property_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    // Check if results are found
    if (results.length === 0) {
      return res.status(404).send('Property not found');
    } else {
      return res.status(200).json(results[0]); // Send the first result back as JSON
    }
  });
});

module.exports = router;