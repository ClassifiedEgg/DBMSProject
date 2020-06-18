const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Workout = require("../../models/Workout");
const User = require("../../models/User");

// POST api/workouts/
// Make a new workout
// Private route

router.post(
    "/",
    [
        auth,
        check("workoutName", "Please enter a exercise name")
            .notEmpty(),
        check("allExercises", "Please enter some valid details about the exercise")
            .notEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { workoutName, allExercises } = req.body

        try {
            const user = await User.findById(req.user.id);

            if (!user) {
                return res.status(404).json({ msg: "User not found" })
            }

            let madeBy = {
                userID: req.user.id,
                username: req.user.name
            }

            const newWorkout = new Workout({
                madeBy,
                workoutName,
                allExercises
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

// GET api/workouts/
// Get all workouts of a user
// Private route

router.get(
    "/",
    auth,
    async (req, res) => {
        try {
            let user = await User.findById(req.user.id).populate("workouts.workout")

            let allWorkouts = user.workouts

            res.json(allWorkouts)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error")
        }
    }
)

// GET api/workouts/:wkid
// Get a workout
// Private route

router.get(
    "/:wkid",
    auth,
    async (req, res) => {
        try {
            let workout = await Workout.findById(req.params.wkid)

            res.json(workout)
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
    "/:wkId",
    auth,
    async (req, res) => {
        try {
            let workout = await Workout.findById(req.params.wkId);
            let user = await User.findById(req.user.id)

            if (!workout) {
                return res.status(404).json({ msg: "Workout not found" });
            }

            if (workout.madeBy.userID.toString() !== req.user.id) {
                return res.status(500).json({ msg: "Unauthorized" })
            }

            user.workouts = user.workouts.filter(({ workout }) => workout.toString() !== req.params.wkId)

            await user.save()

            await workout.remove();

            res.json({ msg: "Workout has been removed" })
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error")
        }
    }
)

// PUT api/workouts/:wkid
// Edit a workout
// Private route

router.put(
    "/:wkid",
    [
        auth
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { workoutName, allExercises } = req.body

        try {
            let workout = await Workout.findById(req.params.wkid);

            if (!workout) {
                return res.status(404).json({ msg: "Workout not found" });
            }

            if (workout.madeBy.userID.toString() !== req.user.id) {
                return res.status(500).json({ msg: "Unauthorized" })
            }

            let newWorkout = await Workout.findByIdAndUpdate(req.params.wkid,
                { workoutName, allExercises }, { new: true });

            res.json(newWorkout)
        } catch (err) {
            console.error(err.message);
            return res.status(500).send("Server error")
        }
    }
)

module.exports = router