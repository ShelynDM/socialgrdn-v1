const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // No need for userID since data is not dependent on the user
  const query = `
    SELECT 
        pl.property_id,
        pl.property_name, 
        plo.address_line1, 
        plo.city, 
        plo.province,
        plo.longitude,
        plo.latitude, 
        up.first_name, 
        up.last_name, 
        pl.growth_zone,
        pl.photo, 
        pc.crop_name, 
        pl.dimensions_length, 
        pl.dimensions_width, 
        pl.dimensions_height, 
        pl.soil_type
    FROM 
        UserProfile up
    JOIN 
        PropertyListing pl ON up.userID = pl.userID
    JOIN 
        PropertyLocation plo ON pl.location_id = plo.location_id
    JOIN 
        PropertyCrops pc ON pl.property_id = pc.property_id`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).send('No properties found');
    } else {
      return res.status(200).json(results);
    }
  });
});

module.exports = router;
