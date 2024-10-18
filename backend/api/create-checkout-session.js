// create-checkout-session.js
const express = require('express');
const router = express.Router(); // Use router instead of app
const stripe = require('stripe')('sk_test_51Q2bKFLm0aJYZy9zsMBApv62ayj6Bc3s1WlbJqTgOgKDPDfYZIEISvZDhwK4cFgAAM05ykkfEi94tAh3OSqcQT7a00ZvG9qjIq');

// TEST DETAILS:
// Payment succeeds

// 4242 4242 4242 4242
// Payment requires authentication

// 4000 0025 0000 3155
// Payment is declined


// Define the route using the router
router.post('/', async (req, res) => {
    const { amount, reservationDetails } = req.query;

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'cad',
                        product_data: { name: reservationDetails },
                        unit_amount: amount, // amount in cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/RentConfirmation?reservationDetails=${reservationDetails}',
            cancel_url: 'http://localhost:4242/cancel',
        });

        res.redirect(303, session.url);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Export the router
module.exports = router;
