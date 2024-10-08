const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const routes = require('./routes/route')
const viewRoutes = require('./routes/viewroute')
const expressLayouts = require('express-ejs-layouts');
const path = require('path')
const port = 8000

//initialize env file
dotenv.config()
//initilize middelware here
app.use(express.json())
app.use(cookieParser());
// Use express-ejs-layouts
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
//server the static file from public folder
app.use(express.static(path.join(__dirname,'public')))

app.set('views', path.join(__dirname, 'views'));
//set template engine ejs
app.set('view engine', 'ejs');

//database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("Database connected"))
.catch((Error) => console.log("connection error"+Error))

//view routes of application
app.use('/',viewRoutes)

//application functional routes
app.use('/', routes)


app.listen(port,() => {
    console.log(`Server is running on ${port}`)
})

module.exports = app; // Export the app