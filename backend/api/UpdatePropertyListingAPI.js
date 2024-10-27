const express = require('express');
const router = express.Router();

// patch method for updating a property listing
router.patch('/:propertyId', async (req, res) => {
  const { propertyId } = req.params;
  const userId = req.body.userId; // Assuming user ID is passed in the body
  const propertyData = req.body;

  // Start a transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error('Transaction error:', err);
      return res.status(500).json({ message: 'Transaction failed', error: err.message });
    }

    // Verify if property exists and belongs to the user
    const verifyQuery = `
      SELECT * FROM PropertyListing 
      WHERE property_id = ? AND userID = ?
    `;
    db.query(verifyQuery, [propertyId, userId], (err, result) => {
      if (err) {
        return db.rollback(() => {
          console.error('Error fetching property:', err);
          res.status(500).json({ message: 'Failed to fetch property', error: err.message });
        });
      }

      if (result.length === 0) {
        return db.rollback(() => {
          res.status(404).json({ message: 'Property not found or unauthorized' });
        });
      }

      // Update the property details
      const updateListingQuery = `
        UPDATE PropertyListing SET 
          property_name = ?, growth_zone = ?, description = ?, dimensions_length = ?, 
          dimensions_width = ?, dimensions_height = ?, soil_type = ?, amenities = ?, 
          restrictions = ?, rent_base_price = ?
        WHERE property_id = ?
      `;
      db.query(updateListingQuery, [
        propertyData.propertyName, propertyData.growthzone, propertyData.description,
        propertyData.dimensions_length, propertyData.dimensions_width, propertyData.dimensions_height,
        propertyData.soilType, JSON.stringify(propertyData.amenities),
        JSON.stringify(propertyData.restrictions), propertyData.price, propertyId
      ], (err) => {
        if (err) {
          return db.rollback(() => {
            console.error('Listing update error:', err);
            res.status(500).json({ message: 'Failed to update property listing', error: err.message });
          });
        }

        // Update the location details
        const updateLocationQuery = `
          UPDATE PropertyLocation SET 
            address_line1 = ?, city = ?, province = ?, postal_code = ?, country = ?, 
            latitude = ?, longitude = ?
          WHERE location_id = (SELECT location_id FROM PropertyListing WHERE property_id = ?)
        `;
        db.query(updateLocationQuery, [
          propertyData.addressLine1, propertyData.city, propertyData.province, 
          propertyData.postalCode, propertyData.country, propertyData.latitude, 
          propertyData.longitude, propertyId
        ], (err) => {
          if (err) {
            return db.rollback(() => {
              console.error('Location update error:', err);
              res.status(500).json({ message: 'Failed to update location', error: err.message });
            });
          }

          // Delete existing property images
          const deleteImagesQuery = `
            DELETE FROM PropertyOtherImages WHERE property_id = ?
          `;
          db.query(deleteImagesQuery, [propertyId], (err) => {
            if (err) {
              return db.rollback(() => {
                console.error('Failed to delete existing images:', err);
                res.status(500).json({ message: 'Failed to delete images', error: err.message });
              });
            }

            // Insert new property images
            const imageValues = propertyData.otherImageUrls.map((url) => [propertyId, url]);
            const insertImagesQuery = `
              INSERT INTO PropertyOtherImages (property_id, image_url) VALUES ?
            `;
            db.query(insertImagesQuery, [imageValues], (err) => {
              if (err) {
                return db.rollback(() => {
                  console.error('Failed to insert new images:', err);
                  res.status(500).json({ message: 'Failed to insert images', error: err.message });
                });
              }

              // Update primary image
              const updatePrimaryImageQuery = `
                UPDATE PropertyPrimaryImages SET image_url = ? WHERE property_id = ?
              `;
              db.query(updatePrimaryImageQuery, [propertyData.primaryImageUrl, propertyId], (err) => {
                if (err) {
                  return db.rollback(() => {
                    console.error('Failed to update primary image:', err);
                    res.status(500).json({ message: 'Failed to update primary image', error: err.message });
                  });
                }

                // Commit the transaction
                db.commit((err) => {
                  if (err) {
                    return db.rollback(() => {
                      console.error('Commit error:', err);
                      res.status(500).json({ message: 'Failed to commit transaction', error: err.message });
                    });
                  }

                  res.status(200).json({ message: 'Property updated successfully', propertyId });
                });
              });
            });
          });
        });
      });
    });
  });
});

module.exports = router;