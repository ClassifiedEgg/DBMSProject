const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Workout = require("../../models/Workout");
const User = require("../../models/User");

// POST api/workouts/:user/
// Make a new workout
// Private route

router.post(
    "/:user",
    [
        auth,
        check("name", "Please enter a exercise name")
            .notEmpty(),
        check("detials", "Please enter some valid details about the exercise")
            .notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { exerciseName, detials } = req.body

        try {
            const user = await User.findOne(req.params.user).select("-password");

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            let madeBy = {
                userID: req.user.id,
                userName: req.user.name
            }

            const newWorkout = new Workout({
                madeBy,
                exerciseName,
                detials
            });

            const workout = await newWorkout.save();

            user.workouts.unshift({ workout: workout.id })

            await user.save();

            res.json(workout)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error");
        }
    }
)

// GET api/workouts/:name/:wkid
// Get all workouts of a user
// Private route

router.get(
    "/:name/:wkid",
    auth,
    async (req, res) => {
        try {
            let user = await User.findOne(req.user.params).populate("workouts")

            let allWorkouts = user.workouts

            res.json(allWorkouts)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error")
        }
    }
)

// DELETE api/workouts/:name/:wkid
// Delete a workout
// Private route

router.delete(
    "/:name/:wkid",
    auth,
    async (req, res) => {
        try {
            let workout = await Workout.findById(req.params.wkid);
            let user = await User.findById(req.user.id)

            if (!post) {
                return res.status(404).json({ msg: "Workout not found" });
            }

            if (post.user.toString() !== req.user.id) {
                return res.status(500).json({ msg: "Unauthorized" })
            }

            let removeIndex = user.workouts.find(({ workout }) => workout === req.params.postid)

            user.workouts.splice(removeIndex, 1)

            await user.save()

            await workout.remove();

            res.json({ msg: "Workout has been removed" })
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error")
        }
    }
)

// PUT api/workouts/:name/:wkid
// Edit a workout
// Private route

router.put(
    "/:name/:wkid",
    [
        auth,
        check("name", "Please enter a exercise name")
            .notEmpty(),
        check("detials", "Please enter some valid details about the exercise")
            .notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { exerciseName, detials } = req.body

        try {
            let user = await User.findOne({ name: req.params.name })

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            let workout = await Workout.findById(req.params.wkid);

            if (!workout) {
                return res.status(404).json({ msg: "Workout not found" });
            }

            if (workout.madeBy.userID.toString() !== req.user.id) {
                return res.status(500).json({ msg: "Unauthorized" })
            }

            let newWorkout = await Workout.findByIdAndUpdate(req.params.wkid,
                { exerciseName, detials }, { new: true });

            res.json(newWorkout)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error")
        }
    }
)