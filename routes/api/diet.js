const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Diet = require("../../models/Diet");
const User = require("../../models/User");

// POST api/diets/
// Make a new diet
// Private route

router.post(
  "/",
  [
    auth
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dietName, allMeals } = req.body

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
        dietName,
        allMeals,
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

// GET api/diets/
// Get all diets of a user
// Private route

router.get(
  "/",
  auth,
  async (req, res) => {
    try {
      let user = await User.findById(req.user.id).populate("diets.diet")

      let allDiets = user.diets

      res.json(allDiets)
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error")
    }
  }
)

// GET api/diets/:dietId
// Get a diet
// Private route

router.get(
  "/:dietId",
  auth,
  async (req, res) => {
    try {
      let diet = await Diet.findById(req.params.dietId)

      res.json(diet)
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error")
    }
  }
)

// DELETE api/diets/:did
// Delete a diet
// Private route

router.delete(
  "/:dietId",
  auth,
  async (req, res) => {
    try {
      let diet = await Diet.findById(req.params.dietId);
      let user = await User.findById(req.user.id)

      if (!diet) {
        return res.status(404).json({ msg: "Diet not found" });
      }

      if (diet.madeBy.userID.toString() !== req.user.id) {
        return res.status(500).json({ msg: "Unauthorized" })
      }

      user.diets = user.diets.filter(({ diet }) => diet.toString() !== req.params.dietId)

      await user.save()

      await diet.remove();

      res.json({ msg: "Diet has been removed" })
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error")
    }
  }
)

// PUT api/diets/:did
// Edit a diet
// Private route

router.put(
  "/:dietId",
  [
    auth,
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { dietName, allMeals } = req.body

    try {
      let diet = await Diet.findById(req.params.dietId);

      if (!diet) {
        return res.status(404).json({ msg: "Diet not found" });
      }

      if (diet.madeBy.userID.toString() !== req.user.id) {
        return res.status(500).json({ msg: "Unauthorized" })
      }

      let newDiet = await Diet.findByIdAndUpdate(req.params.dietId,
        { dietName, allMeals }, { new: true });

      res.json(newDiet)
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server error")
    }
  }
)

module.exports = router;
