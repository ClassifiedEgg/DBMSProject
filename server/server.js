const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const connectDB = require("./config/db")
const path = require('path')

const GraphQLSchema = require('./graphql/schema')
const GraphQLResolvers = require('./graphql/resolvers')

const auth = require('./middleware/auth')

const app = express()

// Connect to database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));
app.use(auth)

//GraphQL
app.use('/graphql', graphqlHTTP({
    schema: GraphQLSchema,
    rootValue: GraphQLResolvers,
    graphiql: true,
    customFormatErrorFn: (err) => {
        const data = err.originalError.data || ['Server Error']
        const code = err.originalError.statusCode || 500
        const message = err.message || 'Server Error'

        return { message, data, code }
    }
}))

// Define routes
// app.use("/api/users", require('./routes/api/users'))
// app.use("/api/auth", require('./routes/api/auth'))
// app.use("/api/workouts", require('./routes/api/workout'))
// app.use("/api/diets", require('./routes/api/diet'))


// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));