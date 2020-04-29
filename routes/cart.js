const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const User = require('../models/user');

router.get('/:id', (req, res) => {
	User.find({ _id: req.params.id }).exec().then((result) => {
		if (result.length < 1) {
			return res.status(404).json({ message: 'invalid user' });
		} else {
			res.status(200).json({ cart: result[0].cart });
		}
	});
});

router.post('/:id', (req, res) => {
	User.find({ _id: req.params.id })
		.exec()
		.then((result) => {
			const record = result[0].cart.find((el) => el.itemId === req.body.itemId);
			if (record) {
				res.status(201).json({ record });
				record.quantity += req.body.quantity;
				result[0].save();
			} else {
				result[0].cart.push({
					itemId   : req.body.itemId,
					quantity : req.body.quantity,
					name     : req.body.name,
					price    : req.body.price,
					imageUrl : req.body.imageUrl
				});
				result[0].save();
			}
			res.status(201).json({ message: 'added item to cart', cart: result[0].cart });
		})
		.catch((err) => {
			res.status(500).json({ message: 'something went wrong' });
		});
});

router.delete('/:id/:itemId', (req, res) => {
	User.updateOne(
		{ _id: req.params.id },
		{
			$pull : {
				cart : {
					itemId : [
						req.params.itemId
					]
				}
			}
		}
	)
		.then((result) => {
			res.status(201).json({ result });
		})
		.catch((err) => {
			res.status(500).json({ err });
		});
});

module.exports = router;
