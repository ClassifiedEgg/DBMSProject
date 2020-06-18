const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { check, validationResult } = require("express-validator");
const auth = require('../../middleware/auth')

const User = require('../../models/User')

// POST api/users
// Register a user
// Public Route

router.post(
    "/",
    [
        check("username", "Please enter a valid username")
            .notEmpty().trim(),
        check("firstName", "Please enter a valid first name")
            .notEmpty().trim(),
        check("lastName", "Please enter a valid lasy name")
            .notEmpty().trim(),
        check("age", "Please enter a valid age")
            .notEmpty().isFloat({ min: 0 }),
        check("gender", "Please choose a gender")
            .notEmpty(),
        check("weight", "Please enter a valid weight")
            .notEmpty().isFloat({ min: 0 }),
        check("height", "Please enter a valid height")
            .notEmpty().isFloat({ min: 0 }),
        check("email", "Please enter a valid email")
            .notEmpty().normalizeEmail().isEmail(),
        check("password", "Please enter a vlaid pasword (between 6-8 characters)")
            .notEmpty()
            .trim()
            .isLength({ min: 8, max: 16 })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let { username, firstName, lastName, age, weight, height, email, password } = req.body;

        try {
            let user = await User.findOne({ $or: [{ username }, { email }] });

            if (user) {
                return res
                    .status(500)
                    .json({ errors: [{ msg: "Username / Email already exists" }] });
            }

            // Make new User

            user = new User({
                username,
                firstName,
                lastName,
                age,
                weight,
                height,
                email,
                password
            });

            // Encrypt Password

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            // await bcrypt.genSalt(10, (err, salt) => {
            //     await bcrypt.hash(password, salt, (err, hash) => {
            //         user.password = hash;
            //     });
            // });

            await user.save();

            const payload = {
                user: {
                    id: user.id,
                    username: user.username
                }
            };

            jwt.sign(
                payload,
                'mysecretkey',
                {},
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            );

        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
)

//GET api/users/:name
//Get user details
//public route

router.get(
    '/:name',
    async (req, res) => {
        try {
            let user = await User.findOne({ name: req.params.name }).select("-password");

            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            res.json(user)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error")
        }
    }
)

//PUT /api/users/:name/edit
//Edit User
//Private route
router.put(
    "/:name/edit",
    [
        auth,
        check("username", "Please enter a valid username")
            .notEmpty(),
        check("firstName", "Please enter a valid first name")
            .notEmpty(),
        check("lastName", "Please enter a valid lasy name")
            .notEmpty(),
        check("age", "Please enter a valid age")
            .notEmpty().isFloat({ min: 0 }),
        check("weight", "Please enter a valid weight")
            .notEmpty().isFloat({ min: 0 }),
        check("height", "Please enter a valid height")
            .notEmpty().isFloat({ min: 0 }),
    ],
    async (req, res) => {
        let { username, firstName, lastName, age, weight, height } = req.body;

        try {
            const user = await User.find({ name: req.params.name });

            const checkEmail = await User.findOne({ email: req.body.email });

            if (checkEmail) {
                return res.status(500).json({ msg: "User with that email already exists" })
            }

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            if (req.params.name !== req.user.name) {
                return res.status(500).json({ msg: "Unauthorized" })
            }

            let newUser = await User.findByIdAndUpdate(req.user.id, {
                username, firstName, lastName, age, weight, height
            }, { new: true })

            res.json(newUser)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error")
        }
    }
)



module.exports = router;