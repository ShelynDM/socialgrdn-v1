/**
 * GetReservationDetailsAPI.js
 * Get reservation details through reservation id
 * by joining reservations, propertylisting and propertylocation tables
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { rentalID } = req.query;

  if (!rentalID) {
    return res.status(400).send('rentalID is required');
  }

  const query = `
    SELECT
    r.rental_id,
    pl.property_id, pl.property_name, pl.growth_zone,
    CONCAT(up.first_name, ' ', up.last_name) AS property_owner,
    r.start_date, r.end_date,
    loc.address_line1, loc.city, loc.province, 
    p.image_url
FROM
    rental r
JOIN
    propertylisting pl ON r.property_id = pl.property_id
JOIN
    userprofile up ON pl.userID = up.userID
JOIN
    propertylocation loc ON pl.location_id = loc.location_id
LEFT JOIN
    PropertyPrimaryImages p ON pl.property_id = p.property_id
WHERE
    r.rental_ID = ?
`;

  db.query(query, [rentalID], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('An error occurred while fetching reservation');
    }

    if (results.length === 0) {
      return res.status(404).send('Reservation not found');
    }

    return res.status(200).json(results[0]);
  });
});

module.exports = router;