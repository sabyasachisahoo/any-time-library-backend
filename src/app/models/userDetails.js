const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
    Schema = mongoose.Schema;

const UserDetailSchema  = new Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,enum:['USER','ADMIN'],default:'ADMIN'}
})

const UserDetail = module.exports = mongoose.model('UserDetail',UserDetailSchema);

module.exports.getUserById = (id,callback) =>{
    UserDetail.findById(id,callback);
}

module.exports.getUserByUsername = (username,callback) =>{
    const query = {username:username};
    UserDetail.findOne(query,callback);
}

module.exports.getUserByCredentials = (username,password,callback) =>{
    const query = {username:username,password:password};
    UserDetail.findOne(query,callback);
}

module.exports.getUserByRole = (role,callback) =>{
    const query = {role:role};
    UserDetail.findOne(query,callback);
}

module.exports.addUser = function(newUser,callback) {
    bcrypt.genSalt(10,(err,salt) => {
        bcrypt.hash(newUser.password,salt,(err,hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback)
        });
    });
};

module.exports.comparePassword = function(userPass,hash,callback) {
    bcrypt.compare(userPass,hash,(err,isMatch) => {
        if(err) throw err;
        callback(null,isMatch);
    })
}