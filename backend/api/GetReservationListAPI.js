/**
 * GetReservationListAPI.js
 * Get reservation details through user id
 * by joining reservations, propertylisting and propertylocation tables
 */
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send('userID is required');
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
    r.renter_ID = ?
`;

  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send('An error occurred while fetching reservations');
    }

    if (results.length === 0) {
      return res.status(404).send('No reservations found for the user');
    }

    return res.status(200).json(results);
  });
});

module.exports = router;