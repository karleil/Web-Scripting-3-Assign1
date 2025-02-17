const express = require('express'); //imports express module
const booksRouter = express.Router(); //this creates a new router
 

const books = [ //our initial books array
    { id: 1, title: 'Fourth Wing', author: 'Rebecca Yarros', imageUrl:'/public/book1.jpg', year:'2023'  },
    { id: 2, title: 'The Hunger Games', author: 'Suzanne Collins', imageUrl:'/public/book2.jpg', year:'2008'  },
    { id: 3, title: 'Deep End', author: 'Ali Hazelwood', imageUrl:'/public/book3.jpg', year:'2025'  },
];

function findBookById(req, res, next) { //this function will find the book by its id
    
    const requestedId = Number(req.params.id); //this will covnvert the id value into a number
    const bookData = books.find(bookInList => bookInList.id === requestedId); //this will find the book by its id
 
    if (bookData !==  undefined) { //if found, sends it back as a response
        req.book = bookData;
        next();
   
    } else { //if not found, sends a 404 error message
        res.status(404).send('A requested book is not in the array');
    }
}


booksRouter.get('/books', (req, res) => { //our GET request. Also defines the route for the books.
    res.send(books);
});        

booksRouter.get('/books/:id', findBookById, (req, res) => { //this gets the book by its id.
    res.send(req.book);
});

booksRouter.post('/books', (req, res) => { //our POST request. Lets us add a new book to the array.
    const book = req.body
    book.id = books.length + 1; //this will add a new id to the book array.
    books.push(book);
 
    res.status(201).send(book); //this will send a message that the book was added.
});


booksRouter.delete('/books/:id', findBookById, (req, res) => { // our DELETE request. Lets us delete a book by its id.

    const requestedId = Number(req.params.id); //same as the code above: this will convert the id value into a number
    const requestedData = books.find(bookInList => bookInList.id === requestedId);  //same as the code above: this will find the book by its id
    
    if (requestedData !== undefined) { //if found, it will delete the book from the array.

        books.splice(requestedData.id, 1);
        res.status(204).send('Book has been deleted');
    } else { //if not found, it will send a 404 error message.
        
        res.status(404).send('The book is not in the array');
    }
});

booksRouter.put('/books/:id', findBookById, (req, res) => { //our PUT request. Lets us update the book by its id.
    req.book.text = req.body.text; //updates the text of the book.
    res.send(req.book);
});

module.exports = booksRouter;