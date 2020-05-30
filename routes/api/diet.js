const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Diet = require("../../models/Diet");
const User = require("../../models/User");

// POST api/workouts/:user/
// Make a new diet
// Private route

router.post(
  "/:user",
  [
    auth,
    check("name", "Please enter a diet name")
      .notEmpty(),
    check("macros", "Please enter some valid details about the diet")
      .notEmpty(),
    check("food", "Please enter some food in your diet")
      .notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, macros, food } = req.body

    try {
      const user = await User.findOne(req.params.user).select("-password");

      if (!user) {
        return res.status(404).json({ msg: "User not found" })
      }

      let madeBy = {
        userID: req.user.id,
        userName: req.user.name
      }

      const newDiet = new Diet({
        name,
        macros,
        food,
        madeBy
      });

      const diet = await newDiet.save();

      user.diets.unshift({ diet: diet.id })

      await user.save();

      res.json(diet)
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error");
    }
  }
)

// GET api/diet/:name/
// Get all diets of a user
// Private route

router.get(
  "/:name/",
  auth,
  async (req, res) => {
    try {
      let user = await User.findOne(req.user.params).populate("diets")

      let allDiets = user.diets

      res.json(allDiets)
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error")
    }
  }
)

// DELETE api/workouts/:name/:did
// Delete a diet
// Private route

router.delete(
  "/:name/:wkid",
  auth,
  async (req, res) => {
    try {
      let diet = await Diet.findById(req.params.dif);
      let user = await User.findById(req.user.id)

      if (!post) {
        return res.status(404).json({ msg: "Diet not found" });
      }

      if (post.user.toString() !== req.user.id) {
        return res.status(500).json({ msg: "Unauthorized" })
      }

      let removeIndex = user.diets.find(({ diet }) => diet === req.params.postid)

      user.diets.splice(removeIndex, 1)

      await user.save()

      await diet.remove();

      res.json({ msg: "Diet has been removed" })
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error")
    }
  }
)

// PUT api/workouts/:name/:did
// Edit a diet
// Private route

router.put(
  "/:name/:did",
  [
    auth,
    check("name", "Please enter a diet name")
      .notEmpty(),
    check("macros", "Please enter some valid details about the diet")
      .notEmpty(),
    check("food", "Please enter some food in your diet")
      .notEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, macros, food } = req.body

    try {
      let user = await User.findOne({ name: req.params.name })

      if (!user) {
        return res.status(404).json({ msg: "User not found" })
      }

      let diet = await Diet.findById(req.params.did);

      if (!workout) {
        return res.status(404).json({ msg: "Diet not found" });
      }

      if (diet.madeBy.userID.toString() !== req.user.id) {
        return res.status(500).json({ msg: "Unauthorized" })
      }

      let newDiet = await Diet.findByIdAndUpdate(req.params.did,
        { name, macros, food }, { new: true });

      res.json(newDiet)
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error")
    }
  }
)

module.exports = router;
