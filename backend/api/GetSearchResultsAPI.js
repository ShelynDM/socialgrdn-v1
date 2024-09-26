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
        plo.postal_code,
        plo.longitude,
        plo.latitude, 
        up.first_name, 
        up.last_name, 
        pl.growth_zone,
        pl.photo, 
        MIN(pc.crop_name) AS crop,  -- Select the first crop for each property
        pl.dimensions_length, 
        pl.dimensions_width, 
        pl.dimensions_height,
        pl.dimensions_length * pl.dimensions_width AS area,
        MIN(pl.soil_type) AS soil_type,
        pl.rent_base_price
    FROM 
        UserProfile up
    JOIN 
        PropertyListing pl ON up.userID = pl.userID
    JOIN 
        PropertyLocation plo ON pl.location_id = plo.location_id
    JOIN 
        PropertyCrops pc ON pl.property_id = pc.property_id
    GROUP BY 
        pl.property_id, 
        pl.property_name, 
        plo.address_line1, 
        plo.city, 
        plo.province,
        plo.postal_code,
        plo.longitude,
        plo.latitude, 
        up.first_name, 
        up.last_name, 
        pl.growth_zone,
        pl.photo, 
        pl.dimensions_length, 
        pl.dimensions_width, 
        pl.dimensions_height`;


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
