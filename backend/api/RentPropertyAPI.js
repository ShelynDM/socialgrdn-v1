const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { property_id } = req.query;

  if (!property_id) {
    return res.status(400).send('propertyID is required');
  }

  const query = 'SELECT * FROM PropertyListing WHERE property_id = ?';
  db.query(query, [property_id], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).send('Property not found');
    } else {
      return res.status(200).json(results[0]);
    }
  });
});

module.exports = router;
