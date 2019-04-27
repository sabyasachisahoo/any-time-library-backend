const Library = require('../models/library');

exports.issueBooks = (req,res) =>{
    let issueBook = new Library({
        username: req.body.username,
        bookId: req.body.bookId,
        bookTitle: req.body.title,
        bookAuthor: req.body.author
    })

    issueBook.save()
    .then((data) => {
        console.log(data)
        res.send(data)
    }).catch((error)=>{
        console.log(error);
    })
}

exports.getAllIssuedBooks = (req,res) =>{
    Library.find()
        .then((issuedbooks) =>{
            console.log(issuedbooks)
            res.send(issuedbooks)
        }).catch((error)=>{
            console.log(error)
        })
    
}

exports.getIssuedBookByUsername = (req,res) =>{
    Library.aggregate([ 
        {$match:{username:req.params.username}},
        {$project:{bookId:1,bookTitle:1,bookAuthor:1,issue_date:1,renew_date:1}} 
    ]).then((issuedbooks) =>{
        console.log(issuedbooks);
            res.send(issuedbooks)
        }).catch((error)=>{
            res.send(error);
        })
}

exports.updateIssuedBook = (req,res) =>{
    Library.findByIdAndUpdate(req.params.id,req.body, {new: true})
    .then(()=>{
        res.send("Book updated successfully")
    }).catch((error)=>{
        console,log(error)
    })
}

exports.deleteIssuedBook = (req,res) => {
    Library.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.send("Book is returned") 
        }).catch((error)=>{
            console.log(error);
        })
}
