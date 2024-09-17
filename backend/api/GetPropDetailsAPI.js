const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { property_id } = req.query;

  if (!property_id) {
    return res.status(400).send('property_id is required');
  }

  const query = `
    SELECT p.property_id, p.property_name, p.photo, p.description,
           CONCAT(p.dimensions_length, ' L x ', p.dimensions_width, ' W x ', p.dimensions_height, ' H') AS dimension, 
           p.soil_type, p.amenities, p.restrictions, p.rent_base_price,
           l.address_line1, l.city, l.province, l.postal_code,
           GROUP_CONCAT(c.crop_name) AS crops,
           JSON_ARRAYAGG(JSON_OBJECT('image_id', pi.image_id, 'image_name', pi.image_name, 'image_url', pi.image_url)) AS images
    FROM PropertyListing p
    JOIN PropertyLocation l ON p.location_id = l.location_id
    LEFT JOIN PropertyCrops c ON p.property_id = c.property_id
    LEFT JOIN PropertyImages pi ON p.property_id = pi.property_id
    WHERE p.property_id = ?
    GROUP BY p.property_id
  `;

  db.query(query, [property_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).send('Property not found');
    }

    const property = results[0];
    property.amenities = property.amenities.split(',').map(item => item.trim());
    property.restrictions = property.restrictions.split(',').map(item => item.trim());
    property.crops = property.crops ? property.crops.split(',').map(item => item.trim()) : [];

    // Parse the images array
    property.images = JSON.parse(property.images);

    return res.status(200).json(property);
  });
});

module.exports = router;
