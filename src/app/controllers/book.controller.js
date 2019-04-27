const Book = require('../models/book');

exports.getAllBooks = (req,res) =>{
    Book.find()
        .then((books) =>{
            console.log(books)
            res.send(books)
        }).catch((error)=>{
            console.log(error)
        })
    
}

// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
// };

exports.getBookByAuthorOrTitle = (req,res) =>{
       
    // Book.find()
    //         .then(books => { 
    //             res.send(books)
    //             console.log("all books")
    //         }).catch(error => console.log(error))

    if(req.query.author){
        console.log(req.query.author);
        //const regex = new RegExp(escapeRegex(req.query.q),'gi');
        //console.log(regex)
        Book.find({'author':{ $regex :req.query.author, $options:'i'}})
            .then(books => { 
                res.send(books)
            }).catch(error => console.log(error))
         }

      if(req.query.title){
          console.log(req.query.title)
            Book.find({'title':{ $regex :req.query.title, $options:'i'}})
            .then(books => { 
                res.send(books)
            }).catch(error => console.log(error))
        }
       
    
}

exports.addBook = (req,res) => {
    let newBook = new Book({
        isbn : req.body.isbn,
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        published_date:req.body.published_date,
        publisher:req.body.publisher,
        updated_date:req.body.updated_date
    })

    newBook.save()
        .then((data) => {
            res.send(data)
        }).catch((error)=>{
            console.log(error);
        })
}

exports.updateBook = (req,res) =>{
    User.findByIdAndUpdate(req.params.id,req.body, {new: true})
    .then(()=>{
        res.send("Book updated successfully")
    }).catch((error)=>{
        console,log(error)
    })
}

exports.deleteBook =(req,res) =>{
    Book.findByIdAndRemove(req.params.id)
        .then(()=>{
            res.send("Book deleted") 
        }).catch((error)=>{
            console.log(error);
        })
}
