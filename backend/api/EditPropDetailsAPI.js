const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Configure multer storage
const upload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// Use multer middleware for file uploads
router.use(upload.single('photo'));

router.patch('/', async (req, res) => {
    const { 
        property_id, 
        crops,
        property_name,
        photo,
        description,
        dimensions_length,
        dimensions_width,
        dimensions_height,
        soil_type,
        amenities,
        restrictions,
        rent_base_price,
        address_line1,
        city,
        province,
        postal_code
    } = req.body;

    // Input validation
    if (!property_id) {
        return res.status(400).json({ error: 'property_id is required' });
    }

    const cropsArray = Array.isArray(crops) ? crops : [];

    const fieldsToUpdate = {
        property_name,
        photo,
        description,
        dimensions_length,
        dimensions_width,
        dimensions_height,
        soil_type,
        amenities: amenities ? amenities.join(', ') : null,
        restrictions: restrictions ? restrictions.join(', ') : null,
        rent_base_price,
        address_line1,
        city,
        province,
        postal_code
    };

    const updateFields = Object.entries(fieldsToUpdate)
        .filter(([key, value]) => value !== undefined)
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

    if (Object.keys(updateFields).length === 0 && cropsArray.length === 0) {
        return res.status(400).json({ error: 'No fields provided for update' });
    }

    const updatePropertyQuery = `
        UPDATE PropertyListing p
        JOIN PropertyLocation l ON p.location_id = l.location_id
        SET 
            p.property_name = COALESCE(?, p.property_name),
            p.photo = COALESCE(?, p.photo),
            p.description = COALESCE(?, p.description),
            p.dimensions_length = COALESCE(?, p.dimensions_length),
            p.dimensions_width = COALESCE(?, p.dimensions_width),
            p.dimensions_height = COALESCE(?, p.dimensions_height),
            p.soil_type = COALESCE(?, p.soil_type),
            p.amenities = COALESCE(?, p.amenities),
            p.restrictions = COALESCE(?, p.restrictions),
            p.rent_base_price = COALESCE(?, p.rent_base_price),
            l.address_line1 = COALESCE(?, l.address_line1),
            l.city = COALESCE(?, l.city),
            l.province = COALESCE(?, l.province),
            l.postal_code = COALESCE(?, l.postal_code)
        WHERE p.property_id = ?
    `;

    const deleteCropsQuery = `DELETE FROM PropertyCrops WHERE property_id = ?`;
    const insertCropsQuery = cropsArray.length > 0
        ? `INSERT INTO PropertyCrops (property_id, crop_name) VALUES ${cropsArray.map(() => '(?, ?)').join(', ')}`
        : null;

    db.beginTransaction(async (err) => {
        if (err) {
            console.error('Error starting transaction:', err);
            return res.status(500).json({ error: 'Transaction error' });
        }

        try {
            // Save image to disk
            const imagePath = path.join(__dirname, 'uploads', photo.filename);

            // Update the database query to include the new photo
            const updatePropertyWithPhotoQuery = `
                UPDATE PropertyListing p
                JOIN PropertyLocation l ON p.location_id = l.location_id
                SET 
                    p.property_name = COALESCE(?, p.property_name),
                    p.photo = COALESCE(?, p.photo),
                    // ... other fields...
                WHERE p.property_id = ?
            `;
            
            // Insert image path into ImagePaths table
            const insertImagePathQuery = `
                INSERT INTO ImagePaths (property_id, image_path)
                VALUES (?, ?)
                ON DUPLICATE KEY UPDATE image_path = VALUES(image_path)
            `;

            await db.query(updatePropertyWithPhotoQuery, [
                property_name,
                imagePath,
                description,
                dimensions_length,
                dimensions_width,
                dimensions_height,
                soil_type,
                fieldsToUpdate.amenities,
                fieldsToUpdate.restrictions,
                rent_base_price,
                address_line1,
                city,
                province,
                postal_code,
                property_id
            ]);

            await db.query(insertImagePathQuery, [property_id, imagePath]);

            // Delete existing crops
            await db.query(deleteCropsQuery, [property_id]);

            // Insert new crops
            const cropParams = cropsArray.reduce((acc, crop) => {
                acc.push(property_id, crop);
                return acc;
            }, []);

            await db.query(insertCropsQuery, cropParams);

            // Commit transaction
            await db.commit();

            console.log('Property and crops updated successfully');
            res.status(200).json({ message: 'Property and crops updated successfully' });
        } catch (err) {
            console.error('Error updating property:', err);
            await db.rollback(() => {
                res.status(500).json({ error: 'Error updating property' });
            });
        }
    });
});

module.exports = router;