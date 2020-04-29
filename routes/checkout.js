const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SK);

const User = require('../models/user');

const router = express.Router();

router.post('/:id', (req, res) => {
	stripe.charges.create(
		{
			amount        : req.body.amount,
			currency      : 'php',
			source        : req.body.source,
			description   : req.body.description,
			receipt_email : req.body.receipt_email,
			shipping      : { address: { line1: req.body.address }, name: req.body.name }
		},
		(err, charge) => {
			if (err) {
				res.status(500).json({ err });
				console.log(err);
			}
			if (charge) {
				User.updateOne({ _id: req.params.id }, { $set: { cart: [] } }, (err, affected) => {
					if (err) {
						return res.status(500).json({ err });
					}
					if (affected) {
						console.log(affected);
					}
				});
				res.status(200).json({ charge, result: 'successful' });
			}
		}
	);
});

module.exports = router;
