const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const Workout = require('../models/Workout')
const Diet = require('../models/Diet')

module.exports = {
  getUser: async (args, req) => {
    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }
    try {
      const user = await User.findById(req.user.id).select("-password");

      return user;
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  registerUser: async ({ userInput }, req) => {
    let errors = [];

    let { username, firstName, lastName, age, weight, height, gender, email, password } = userInput;

    if (validator.isEmpty(username.trim())) {
      errors.push("Please enter a valid username")
    }
    if (validator.isEmpty(firstName.trim())) {
      errors.push("Please enter a valid first name")
    }
    if (validator.isEmpty(lastName.trim())) {
      errors.push("Please enter a valid last name")
    }
    if (!validator.isFloat(age)) {
      errors.push("Please enter a valid age")
    }
    if (validator.isEmpty(gender.trim())) {
      errors.push("Please choose a gender")
    }
    if (!validator.isFloat(weight, { min: 0 })) {
      errors.push("Please enter a valid weight")
    }
    if (!validator.isFloat(height, { min: 0 })) {
      errors.push("Please enter a valid height")
    }
    if (!validator.isEmail(email)) {
      errors.push("Please enter a valid email")
    }
    if (!validator.isLength(password, { min: 8, max: 16 })) {
      errors.push("Please enter a valid pasword (between 6-8 characters)")
    }

    if (errors.length !== 0) {
      const error = new Error('Invalid form data')
      error.statusCode = 404
      error.data = errors
      throw error
    }

    try {
      let user = await User.findOne({ $or: [{ username }, { email }] });

      if (user) {
        const error = new Error('User with same email exists')
        error.statusCode = 409
        error.data = ['User with same email exists']
        throw error
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

      await user.save();

      const payload = {
        user: {
          id: user.id,
          username: user.username
        }
      };

      const token = jwt.sign(
        payload,
        'mysecretkey',
        { expiresIn: '1h' }
      );

      return { token: token }

    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  loginUser: async ({ userInput }, req) => {

    const { username, password } = userInput

    try {
      let user = await User.findOne({ username })


      // See if user exists
      if (!user) {
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        error.data = ['Invalid credentials']
        console.log(error)
        throw error
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        const error = new Error('Invalid credentials')
        error.statusCode = 401
        error.data = ['Invalid credentials']
        throw error
      }

      // Return payload
      const payload = {
        user: {
          id: user.id,
          name: user.username
        }
      };

      const token = jwt.sign(
        payload,
        'mysecretkey',
        { expiresIn: '1h' },
      )

      return { token: token }

    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  makeNewWorkout: async ({ userInput }, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    const { workoutName, allExercises } = userInput

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        const error = new Error('User not found')
        error.statusCode = 404
        error.data = ['User not found']
        throw error
      }

      let madeBy = {
        userID: user._id,
        username: user.username
      }

      const newWorkout = new Workout({
        madeBy,
        workoutName,
        allExercises
      });

      const workout = await newWorkout.save();

      user.workouts.unshift({ workout: workout.id })

      await user.save();

      return workout
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  getWorkouts: async (args, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    try {
      let user = await User.findById(req.user.id).populate("workouts.workout")

      if (!user) {
        const error = new Error('User not found')
        error.statusCode = 404
        error.data = ['User not found']
        throw error
      }

      let allWorkouts = user.workouts

      return allWorkouts
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  getWorkout: async ({ wkId }, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    try {
      let workout = await Workout.findById(wkId)

      return workout
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  editWorkout: async ({ userInput, wkId }, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    const { workoutName, allExercises } = userInput

    try {
      let workout = await Workout.findById(wkId);

      if (!workout) {
        const error = new Error('Workout not found')
        error.statusCode = 404
        error.data = ['Workout not found']
        throw error
      }

      if (workout.madeBy.userID.toString() !== req.user.id) {
        const error = new Error('Forbidden Request')
        error.statusCode = 403
        error.data = ['Workout doest not belong to current user']
        throw error
      }

      let newWorkout = await Workout.findByIdAndUpdate(wkId,
        { workoutName, allExercises }, { new: true });

      return newWorkout
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  deleteWorkout: async ({ wkId }, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    try {
      let workout = await Workout.findById(wkId);
      let user = await User.findById(req.user.id)

      if (!workout) {
        const error = new Error('Workout not found')
        error.statusCode = 404
        error.data = ['Workout not found']
        throw error
      }

      if (workout.madeBy.userID.toString() !== req.user.id) {
        const error = new Error('Forbidden Request')
        error.statusCode = 403
        error.data = ['Workout doest not belong to current user']
        throw error
      }

      user.workouts = user.workouts.filter(({ workout }) => workout.toString() !== wkId)

      await user.save()

      await workout.remove();

      return "Workout has been removed"
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  makeNewDiet: async ({ userInput }, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    const { dietName, allMeals } = userInput

    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        const error = new Error('User not found')
        error.statusCode = 404
        error.data = ['User not found']
        throw error
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

      return diet
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  getDiets: async (args, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    try {
      let user = await User.findById(req.user.id).populate("diets.diet")

      if (!user) {
        const error = new Error('User not found')
        error.statusCode = 404
        error.data = ['User not found']
        throw error
      }

      let allDiets = user.diets

      return allDiets
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  getDiet: async ({ dietId }, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    try {
      let diet = await Diet.findById(dietId)

      if (!user) {
        const error = new Error('User not found')
        error.statusCode = 404
        error.data = ['User not found']
        throw error
      }

      return diet
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  editDiet: async ({ dietId, userInput }, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    const { dietName, allMeals } = userInput

    try {
      let diet = await Diet.findById(dietId);

      if (!diet) {
        const error = new Error('Diet not found')
        error.statusCode = 404
        error.data = ['Diet not found']
        throw error
      }

      if (diet.madeBy.userID.toString() !== req.user.id) {
        const error = new Error('Forbidden Request')
        error.statusCode = 403
        error.data = ['Diet does not belong to current user']
        throw error
      }

      let newDiet = await Diet.findByIdAndUpdate(dietId,
        { dietName, allMeals }, { new: true });

      return newDiet
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  },
  deleteDiet: async ({ dietId }, req) => {

    if (!req.isAuth) {
      const error = new Error('Unauthorized Request')
      error.statusCode = 401
      error.data = ['Login to perform this action']
      throw error
    }

    try {
      let diet = await Diet.findById(dietId);
      let user = await User.findById(req.user.id)


      if (!diet) {
        const error = new Error('Diet not found')
        error.statusCode = 404
        error.data = ['Diet not found']
        throw error
      }

      if (diet.madeBy.userID.toString() !== req.user.id) {
        const error = new Error('Forbidden Request')
        error.statusCode = 403
        error.data = ['Diet does not belong to current user']
        throw error
      }

      user.diets = user.diets.filter(({ diet }) => diet.toString() !== dietId)

      await user.save()

      await diet.remove();

      return "Diet has been removed"
    } catch (err) {
      console.error(err.message);
      throw err.statusCode ? err : new Error()
    }
  }
}
