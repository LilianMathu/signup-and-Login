const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Initialize express
const router = express.Router();

// Import user model
const User = require('../models/Users');

// POST routes
router.post('/signup', (req, res) => {
    User.findOne({ email: req.body.email })
        .exec()
        .then(user => {
            if (user) {
                return res.status(401).json({
                    message: "Mail exist"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({ err });
                    } else {
                        const user = new User({
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(user => {
                                res.status(201).json({
                                    message: "Registered successfully",
                                    user
                                });
                            })
                            .catch(error => {
                                res.status(500).json({
                                    message: "registration failed",
                                    error
                                })
                            });
                    }
                })
            }
        })
        .catch(error => {
            res.status(500).json({ error });
        });


});

// GET route
router.get('/', (req, res) => {
    User.find()
        .exec()
        .then(users => {
            const response = {
                count: users.length,
                users: users.map(users => {
                    return {
                        id: users._id,
                        email: users.email,
                        password: users.password
                    }
                })
            };
            res.status(200).json({ response });
        })
        .catch(error => {
            res.status(500).json({
                error
            });
        });
});

// DELETE route
router.delete('/userId', (req, res) => {
    User.remove({ _id: req.params.id })
        .select('_id email')
        .exec()
        .then(user => {
            res.status(200).json({
                message: "User deleted",
                user
            });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
});

// UPDATE route
router.patch('/', (Req, res) => {

});

module.exports = router;