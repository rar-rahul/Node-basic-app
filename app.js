const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/route')
const path = require('path')
const port = 8000

//initialize env file
dotenv.config()
//initilize middelware here
app.use(express.json())
//server the static file from public folder
app.use(express.static(path.join(__dirname,'public')))

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected"))
.catch((Error) => console.log("connection error"+Error))


//view routes of application
app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'))
})

app.get('/login',(req,res) => {
    res.sendFile(path.join(__dirname,'public','login.html'))
})

//application routes
app.use('/', routes)




app.listen(port,() => {
    console.log(`Server is running on ${port}`)
})

