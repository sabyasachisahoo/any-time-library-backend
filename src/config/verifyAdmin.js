exports.verifyAdmin = function(req, res, next){
    var isAdmin = req.decoded._doc.admin
    if (isAdmin) {
        return next();
    }else {
        // if user is not admin
        // return an error
        var err =  new Error ('You are not autorized to perform this operation!');
        err.status =  403;
        return next(err);

    }
}
