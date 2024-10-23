//UpdatePropStatusAPI.js

const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    const { property_id, status } = req.body;

    if (!property_id || !status) {
        return res.status(400).json({ success: false, message: 'Property ID and status are required' });
    }

    const query = 'UPDATE PropertyListing SET status = ? WHERE property_id = ?';
    const values = [status, property_id];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ success: false, message: 'Failed to update property status', error: err });
        }

        return res.status(200).json({ success: true, message: 'Property status updated successfully' });
    });
}
);
module.exports = router;