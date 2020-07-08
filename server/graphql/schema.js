const { buildSchema } = require('graphql')

module.exports = buildSchema(`
  type UserCreateInfo {
    userID: ID!
    username: String!
  }

  type Meal {
    name: String!
    kcal: String!
  }

  type Diet {
    _id: ID!
    dietName: String!
    allMeals: [Meal!]!
    date: String!
    madeBy: UserCreateInfo!
  }

  type DietObj {
    _id: ID!
    diet: Diet!
  }
  
  type Exercise {
    name: String!
    reps: Float!
  }

  type Workout {
    _id: ID!
    workoutName: String!
    allExercises: [Exercise!]!
    date: String!
    madeBy: UserCreateInfo!
  }

  type WorkoutObj {
    _id: ID!
    workout: Workout!
  }

  type User {
    username: String!
    firstName: String!
    lastName: String!
    age: Float!
    weight: Float!
    height: Float!
    email: String!
    password: String
    workouts: [WorkoutObj]
    diets: [Diet] 
  }

  type AuthData {
    token: String!
  }

  input UserLoginInput {
    username: String!
    password: String!
  }

  input UserRegisterInput {
    username: String!
    firstName: String!
    lastName: String!
    age: String!
    gender: String!
    weight: String!
    height: String!
    email: String!
    password: String!
  }

  input ExerciseInput {
    name: String!
    reps: Float!
  }

  input NewWorkoutInput {
    workoutName: String!
    allExercises: [ExerciseInput!]!
  }

  input MealInput {
    name: String!
    kcal: Float!
  }

  input NewDietInput {
    dietName: String!
    allMeals: [MealInput!]!
  }

  type RootQuery {
    loginUser(userInput: UserLoginInput!): AuthData!
    getUser: User!
    getWorkouts: [WorkoutObj!]!
    getWorkout(wkId: String!): Workout!
    getDiets: [DietObj!]
    getDiet(dietId: String!): Diet!
  }

  type RootMutation {
    registerUser(userInput: UserRegisterInput!): AuthData!
    makeNewWorkout(userInput: NewWorkoutInput!): Workout!
    editWorkout(wkId: ID!, userInput: NewWorkoutInput!): Workout!
    deleteWorkout(wkId: ID!): String!
    makeNewDiet(userInput: NewDietInput!): Diet!
    editDiet(dietId: ID!, userInput: NewDietInput!): Diet!
    deleteDiet(dietId: ID!): String!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)