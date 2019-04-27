const jwt = require('jsonwebtoken');
//const passport = require('passport');
const config = require('../../config/database');

const authUser = require('../models/userDetails');

exports.registerUser = (req,res) => {
    const newUser = new authUser({
        username :req.body.username,
        password :req.body.password,
    });

   authUser.addUser(newUser,(err) => {
       if(err){
           throw err
       }else{
           res.send("Sucessfully registered")
       }
   });
}

exports.loginUser = (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    authUser.getUserByUsername(username,(err,user) => {
        if(err) throw err;
        if(!user) {
            return res.send("User not found");
        }
        authUser.comparePassword(password,user.password, (err,isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user.toJSON(),config.secret,{
                    expiresIn:604800 //1week
                });
                res.json({
                    token:'JWT '+token,
                    user:{
                        id:user._id,
                        username:user.username,
                        role:user.role
                    }
                });
            }else{
                return res.send("Wrong Password");
            }
        });
            });
}

exports.profileInfo = (req,res) => {
   authUser.aggregate([ 
    {$match:{username:req.params.username}},
    {$project:{_id:1,username:1}} 
]).then((user) =>{
    console.log(user);
        res.send(user)
    }).catch((error)=>{
        res.send(error);
    })

}

exports.allProfileInfo = (req,res) => {
    authUser.find()
        .then((users) =>{
            res.send(users)
        }).catch((error)=>{
            console.log(error)
        })
}

exports.adminInfo = (req,res) => {
    const role = req.user.role;
    console.log(role);
    authUser.getUserByRole(role,(err,user) => {
        if(err) throw err;
        if(user && user.role == 'ADMIN'){
            res.send("You are in admin page!!")
        }else{
            res.send("You don't have admin access")
        }
    })
   
}

// var needsRole = function(role){
//     return function(req,res,next){
//         if(req.user && req.user.role === 'ADMIN'){
//             next();
//         }else{
//             res.send(401,'Unauthorized');
//         }
//     };
// };
