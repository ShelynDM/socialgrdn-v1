const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // No need for userID since data is not dependent on the user
  const query = `
    SELECT 
    u.username AS username,
    CONCAT(u.first_name, ' ', u.last_name) AS name,
    DATE_FORMAT(u.created_at, '%M %Y') AS createdAt,
    CONCAT(COUNT(DISTINCT p.property_id), ' active properties') AS active_properties,
    CONCAT(u.city, ', ', u.province) AS location,
    CASE 
        WHEN u.role = '1' AND EXISTS (
            SELECT 1 FROM propertylisting pl WHERE pl.userID = u.userID
        ) THEN 'Renter & Owner'
        WHEN u.role = '1' THEN 'Renter'
        WHEN u.role = '2' THEN 'Owner'
        ELSE 'Unknown'
    END AS renterOrOwner
FROM 
    userprofile u
LEFT JOIN 
    propertylisting p ON u.userID = p.userID AND p.status = '1'
WHERE 
    u.username = 'shelyndm'
GROUP BY 
    u.userID;`;


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
