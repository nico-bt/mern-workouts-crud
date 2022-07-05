//Enviroment variables
require('dotenv').config()

//Database
const mongoose = require("mongoose")

//Express init
const express = require("express")
const app = express()

//Cors
var cors = require('cors')
app.use(cors())

//Routes
workoutRoutes = require("./routes/workouts")

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use((req, res, next)=>{
    console.log(req.method + " --> " + req.url)
    next()
})

//Routes
app.use("/api/workouts", workoutRoutes)

//Connect to DB and run app
mongoose.connect(process.env.MONGODB_URI)
    .then(
        app.listen(process.env.PORT, ()=>{
            console.log(`Connected to DB & running on port: ${process.env.PORT}`)
        })
    )
    .catch(
        (err)=>console.log(err)
    )
