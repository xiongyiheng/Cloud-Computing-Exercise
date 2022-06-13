// require express and other modules
const express = require('express');
const app = express();
// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

const db = require('./models');

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', (req, res) => {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  res.json({
    message: 'Welcome to my app api!',
    documentationUrl: '', //leave this also blank for the first exercise
    baseUrl: '', //leave this blank for the first exercise
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'},
      {method: 'GET', path: '/api/books/', description: 'Get All books information'},
      // TODO: Write other API end-points description here like above
      {method: 'POST', path: '/api/books/', description: 'Add a book information into database'},
      {method: 'PUT', path: '/api/books/:id', description: 'Update a book information based upon the specified ID'},
      {method: 'DELETE', path: '/api/books/:id', description: 'Delete a book based upon the specified ID'},
       // TODO: Write other API end-points description here like above
      {method: 'GET', path: '/api/exercise2', description: 'sends a message group # application deployed using docker back to the user when called the api'}
    ]
  })
});
// TODO:  Fill the values
app.get('/api/profile', (req, res) => {
  res.json({
    'name': 'Yiheng Xiong',
    'homeCountry': 'China',
    'degreeProgram': 'Informatics',//informatics or CSE.. etc
    'email': 'yiheng.xiong@tum.de',
    'deployedURLLink': '',//leave this blank for the first exercise
    'apiDocumentationURL': '', //leave this also blank for the first exercise
    'currentCity': 'Munich',
    'hobbies': ['Football', 'Fitness', 'Swimming']

  })
});
/*
 * Get All books information
 */
app.get('/api/books/', (req, res) => {
  /*
   * use the books model and query to mongo database to get all objects
   */
  db.books.find({}, function (err, books) {
    if (err) throw err;
    /*
     * return the object as array of json values
     */
    res.json(books);
  });
});
/*
 * Add a book information into database
 */
app.post('/api/books/', (req, res) => {

  /*
   * New Book information in req.body
   */
  console.log(req.body);
  /*
   * TODO: use the books model and create a new object
   * with the information in req.body
   */
  /*
   * return the new book information object as json
   */
  var newBook = {
    title: req.body.title, // title of the book
    author: req.body.author, // name of the first author
    releaseDate: req.body.releaseDate, // release date of the book
    genre: req.body.genre, //like fiction or non fiction
    rating: req.body.rating, // rating if you have read it out of 5
    language: req.body.language // language in which the book is released
  };
  db.books.create(newBook, function(err, res) {
    if (err) throw err;
    console.log("new book inserted");
  });
  res.json(newBook);
});

/*
 * Update a book information based upon the specified ID
 */
app.put('/api/books/:id', (req, res) => {
  /*
   * Get the book ID and new information of book from the request parameters
   */
  const bookId = req.params.id;
  const bookNewData = req.body;
  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);

  /*
   * TODO: use the books model and find using the bookId and update the book information
   */
  /*
   * Send the updated book information as a JSON object
   */
  var queryBook = {_id: bookId};
  var updatedBookInfo = {
    title: bookNewData.title, // title of the book
    author: bookNewData.author, // name of the first author
    releaseDate: bookNewData.releaseDate, // release date of the book
    genre: bookNewData.genre, //like fiction or non fiction
    rating: bookNewData.rating, // rating if you have read it out of 5
    language: bookNewData.language // language in which the book is released
  };
  db.books.updateOne(queryBook, updatedBookInfo, function(err, res) {
    if (err) throw err;
    console.log("1 book updated");
  });
  res.json(updatedBookInfo);
});
/*
 * Delete a book based upon the specified ID
 */
app.delete('/api/books/:id', (req, res) => {
  /*
   * Get the book ID of book from the request parameters
   */
  const bookId = req.params.id;
  /*
   * TODO: use the books model and find using
   * the bookId and delete the book
   */
  /*
   * Send the deleted book information as a JSON object
   */
  var deletedBook = {'_id': bookId};
  db.books.deleteOne(deletedBook, function(err, obj) {
    if (err) throw err;
    console.log("1 book deleted");
  });
  res.json(deletedBook);
});

// TODO:  Add API end point /api/exercise2
/**********
 * SERVER *
 **********/
 app.get('/api/exercise2', (req, res) => {
  res.send("group 5 application deployed using docker");
});

// listen on the port 3000
app.listen(process.env.PORT || 80, () => {
  console.log('Express server is up and running on http://localhost:80/');
});
