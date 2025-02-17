//Karleil Villareal - A01397468
//GitHub Link: https://github.com/karleil/Web-Scripting-3-Assign1
const express = require('express'); //imports express module
const app = express();
const PORT = 3000; //this will be the port number the server will listen to
const booksRouter = require('./routes/Books'); //path to import books.js file
const bodyParser = require('body-parser'); //imports body-parser module or the middleware 


app.use(bodyParser.json()); //parses the text as JSON using body-parser

app.use('/api', booksRouter); //this will be the path to access the booksRouter
 
app.listen(PORT, () => { //listens to the port number / runs the server
    console.log(`Server running at http://localhost:${PORT}/`);
});