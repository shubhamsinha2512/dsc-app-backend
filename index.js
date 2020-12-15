//Config
require('dotenv').config();

//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const path = require('path');

const port = 3000;
// const {PORT} = require('./config').PORT;
// console.log(PORT);

//Import Routers
const HomeRouter = require('./routes/HomeRouter')
const AuthRouter = require('./routes/AuthRouter')
const DashboardRouter = require('./routes/DashboardRouter')
const AssignmentRouter = require('./routes/AssignmentRouter')
const NotesRouter = require('./routes/NotesRouter')
const ProfileRouter = require('./routes/ProfileRouter')
const SubjectRouter = require('./routes/SubjectRouter')
const AnnouncementRouter = require('./routes/AnnouncementRouter');
const {
    collection
} = require('./models/Student');

//Create express app
const app = express();

app.use(express.json());
app.use(express.static(__dirname + 'public'));

mongoose.connect("mongodb+srv://shubham:admin@testcluster.4cqpg.mongodb.net/dsc?authSource=admin&replicaSet=atlas-man7yl-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to DB");
});

function checkAuth(req, res) {

    var bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {

        const bearerToken = bearerHeader.split(' ')[1]; //get token
        //verify token sent by user
        jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                return false;
            } else {
                return true
            }
        })
    }
}

    // if(checkAuth(req, res)){
    //     //Route if authenticated
    // }else{
    //     //redirect to login page is not authenticated
    // }

    app.use('/', HomeRouter);
    app.use('/auth', AuthRouter);
    app.use('/subject', SubjectRouter);
    app.use('/announcement', AnnouncementRouter);
    app.use('/assignment', AssignmentRouter);
    app.use('/notes', NotesRouter);
    app.use('/profile', ProfileRouter);
    app.use('/dashboard', DashboardRouter);

    app.listen(port, () => {
        console.log(`Server started at ${port}`);
    })