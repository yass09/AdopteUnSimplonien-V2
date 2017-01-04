const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const config = require('./config/database');
const User = require('./app/models/user');
const port = process.env.PORT || 6868;
const jwt = require('jwt-simple');
const mongojs = require('mongojs');

const controllers_users = require('./app/controllers/controllers.users');
const controllers_student = require('./app/controllers/controllers.student');

const db = mongojs('mongodb://Poncho:simplonien@ds127928.mlab.com:27928/adopte-un-simplonien', ['simplonien', 'users']);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// configuration de l'app
app.use(function(request, response, next) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \Authorization');
    next();
});

app.get('/api/infoStudent', (req, res) => {
    console.log('I received a GET request');
    db.simplonien.find(function(err, docs) {
        res.json(docs);
    });
});

app.use(morgan('dev'));
app.use(express.static(__dirname + 'dist'));
app.use("/node_modules", express.static(__dirname + "/node_modules"));

app.use(passport.initialize());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/dist/app/index.html'));
});

// connect to database
mongoose.connect(config.database);

// pass passport for configuration
require('./config/passport')(passport);

// bundle our routes
const apiRoutes = express.Router();
// // connect the api routes under /api/*
app.use('/api', apiRoutes);

/////////////////////////USER CONTROLLER/////////////////////////
// create a new user account (POST http://localhost:6868/api/signup)
apiRoutes.post('/signup', controllers_users.signup);
// route to authenticate a user (POST http://localhost:6868/api/authenticate)
apiRoutes.post('/authenticate', controllers_users.authenticate);
// route to a restricted info (GET http://localhost:6868/api/users)
apiRoutes.get('/users', controllers_users.RecruiterUsers);
// route to a restricted info (GET http://localhost:6868/api/memberinfo)
apiRoutes.get('/memberinfo', controllers_users.memberinfo);

apiRoutes.delete('/memberinfo/delete/:id', passport.authenticate('jwt', {session: false}), controllers_users.remove);

/////////////////////////STUDENT CONTROLLER/////////////////////////
// create a new user account (POST http://localhost:6868/api/signup)
apiRoutes.get('/backOffice/infoStudent', passport.authenticate('jwt', {session: false}), controllers_student.infoStudent);
// route to authenticate a user (POST http://localhost:6868/api/authenticate)
apiRoutes.get('/backOffice/infoStudent/:id_profil', controllers_student.findStudent);
// route to authenticate a user (POST http://localhost:6868/api/authenticate)
apiRoutes.get('/backOffice/infoStudent/fromMember/:memberId', controllers_student.findStudentByMemberId);
// route to a restricted info (GET http://localhost:6868/api/users)
apiRoutes.delete('/backOffice/removeStudent/:id_profil', passport.authenticate('jwt', {session: false}), controllers_student.removeStudent);
// route to a restricted info (GET http://localhost:6868/api/memberinfo)
apiRoutes.post('/backOffice/addStudent', passport.authenticate('jwt', {session: false}), controllers_student.addStudent);
// route to a restricted info (GET http://localhost:6868/api/users)
apiRoutes.put('/backOffice/update/:id', passport.authenticate('jwt', {session: false}), controllers_student.updateStudent);

// Start the server
app.listen(port);
console.log('http://localhost:' + port);
