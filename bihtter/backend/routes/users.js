const router = require('express').Router();
const UserSession = require('../models/userSession.model')
let User = require('../models/user.model');

// API call to display all current users in the database
// currently doesn't work for some reaosn
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

 // API call to add a user to the database
router.route('/add').post((req, res) => {

    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    //this.generateHash(password)

    /*console.log({name});
    console.log({username});
    console.log({password});*/

    // creates a model instance with the supplied credentials
    const newUser = new User({name, username, password});
    //console.log({newUser});
    newUser.password = newUser.generateHash(password)
    // saves that instance to the mongoDB database
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// API call to return a user information to the client
router.route('/checkPassword').post((req, res) => {
    const usr = req.body.username;
    const password = req.body.password;


    //const userLogin = new User({name, usr, password});

    User.find({
        username: usr
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'server error'
            });
        }
        if (users.length !== 1) {
            return res.send({
                success: false,
                message: 'invalid'
            });
        }

        const user = users[0];
        // if(passwordHash.verify(password, users.password) === false) {
        if(!user.validPassword(password)){
            return res.send({
                success: false,
                message: 'Error: invalid login'
            });
        }

        //otherwise
        const usersession = new UserSession();
        usersession.userID = user._id;
        usersession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'serror'
                });
            }

            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id
            });
        });
    }
    )

})

router.route('/verify').get((req,res,next) => {
    
    const { query } = req;
    const { token } = query;

    //?token = test

    UserSession.find({
        _id:token,
        isDeleted:false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });
        }
        if(sessions.length !== 1){
            return res.send({
                success: false,
                message: 'Error: Invalid'
            });
        }
        else{
            return res.send({
                success: true,
                message: 'good'
            });
        }
    }
    )
})

router.route('/logout').get((req,res,next) => {
    
    const { query } = req;
    const { token } = query;

    //?token = test

    UserSession.findOneAndUpdate({
        _id:token,
        isDeleted:false
    }, {
        $set:{isDeleted:true}
    }, null, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server Error'
            });
        }
        else{
            return res.send({
                success: true,
                message: 'good'
            });
        }
    }
    )
})

router.route('/checkUsername').post((req, res) => {
    const usr = req.body.username;


    //const userLogin = new User({name, usr, password});

    User.find({
        username: usr
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'server error'
            });
        }

        if (users.length !== 0) {
            return res.send({
                success: false,
                message: 'invalid'
            });
        }
        else {
            return res.send({
                success: true,
                message: 'Username Valid!'
            })
        }
})
})

router.route('/getUser').post((req,res) => {
    const token = req.token_id;
    var userID = ""
    UserSession.find({
        _id:token,
        isDeleted:false
    }, (err, sessions) => {
        userID = UserSession.userID;
    }
    )
    User.find({id:userID})
        .then(username => res.json(User.username))
        .catch(err => res.status(400).json('Error: ' + err));
        return(res.json(User.username))
})
module.exports = router;