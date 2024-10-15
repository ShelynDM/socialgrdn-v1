const express = require('express');
const router = express.Router();

// Route for fetching user's earnings by month
router.get('/', (req, res) => {
  const { userID } = req.query;

  if (!userID) {
    return res.status(400).send('userID is required');
  }

  const query = `
    SELECT 
      YEAR(p.payout_date) AS YEAR, 
      MONTH(p.payout_date) AS MONTH, 
      SUM(r.rent_base_price) AS total_rent
    FROM rental r
    JOIN payment p ON r.rental_id = p.rental_id
    WHERE p.status = 'P'
    AND r.rental_id IN (
      SELECT rental_id
      FROM rental
      WHERE property_id IN (
        SELECT property_id
        FROM propertylisting
        WHERE userId = ?
      )
    )
    GROUP BY YEAR(p.payout_date), MONTH(p.payout_date)
    ORDER BY YEAR, MONTH;
  `;
  
  db.query(query, [userID], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).send('No earnings found for the user');
    }

    return res.status(200).json(results);
  });
});

// New route for fetching detailed earnings by day
router.get('/details', (req, res) => {
  const { userID, year, month } = req.query;

  if (!userID || !year || !month) {
    return res.status(400).send('userID, year, and month are required');
  }

  const query = `
    SELECT 
      DAY(p.payout_date) AS day,
      SUM(r.rent_base_price) AS daily_total_rent
    FROM rental r
    JOIN payment p ON r.rental_id = p.rental_id
    WHERE p.status = 'P'
    AND r.rental_id IN (
      SELECT rental_id
      FROM rental
      WHERE property_id IN (
        SELECT property_id
        FROM propertylisting
        WHERE userId = ?
      )
    )
    AND YEAR(p.payout_date) = ?
    AND MONTH(p.payout_date) = ?
    GROUP BY DAY(p.payout_date)
    ORDER BY day;
  `;
  
  db.query(query, [userID, year, month], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).send(err);
    }

    if (results.length === 0) {
      return res.status(404).send('No detailed earnings found for the specified month');
    }

    return res.status(200).json(results);
  });
});

module.exports = router;
