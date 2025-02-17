const express = require('express');
const booksRouter = express.Router();
 

const books = [
    { id: 1, title: 'Fourth Wing', author: 'Rebecca Yarros', imageUrl:'/public/book1.jpg', year:'2023'  },
    { id: 2, title: 'The Hunger Games', author: 'Suzanne Collins', imageUrl:'/public/book2.jpg', year:'2008'  },
    { id: 3, title: 'Deep End', author: 'Ali Hazelwood', imageUrl:'/public/book3.jpg', year:'2025'  },
];

function findBookById(req, res, next) {
    
    const requestedId = Number(req.params.id);
 
    
    const reminderData = books.find(reminderInList => reminderInList.id === requestedId);
 
   
    if (reminderData !==  undefined) {
        req.reminder = reminderData;
        next();
   
    } else {
        res.status(404).send('A requested book is not in the array');
    }
}


booksRouter.get('/books', (req, res) => {
    res.send(books);
});        

booksRouter.get('/books/:id', findBookById, (req, res) => {
    res.send(req.reminder);
});


booksRouter.post('/books', (req, res) => {
    const reminder = req.body
    reminder.id = books.length + 1;
    books.push(reminder);
 
    res.status(201).send(reminder);
});


booksRouter.delete('/books/:id', findBookById, (req, res) => {

    const requestedId = Number(req.params.id);
    
   
    const requestedData = books.find(reminderInList => reminderInList.id === requestedId);
    
  
    if (requestedData !== undefined) {
        
        books.splice(requestedData.id, 1);
        
     
        res.status(204).send('Book deleted');
    } else {
        
        res.status(404).send('A requested book is not in the array');
    }
});

booksRouter.put('/books/:id', findBookById, (req, res) => {
    req.reminder.text = req.body.text;
    res.send(req.reminder);
});

module.exports = booksRouter;