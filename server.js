var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

// //api documentation UI
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger-output.json');
// var options = {
//   swaggerOptions: {
//     validatorUrl: null
//   }
// };


//connects to MogoDB by creating a class with a function (client) to create a session and make requests
require('dotenv').config(); //loads environment variables from a `.env` file into `process.env`.
const { MongoClient } = require('mongodb'); //MongoClient is a class used to connect to MongoDB database and run queries.

const client = new MongoClient(process.env.MONGODB_URI); //creates a new MongoDB client using connection string from the `.env` file.
async function connectDB() {
  try {
    await client.connect(); //attempt to connect to MongoDB
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
  }
}

connectDB();
module.exports = client; //exports the client object so other files (like route files) can import and use the database connection.


//enable json reading for server
app.use(express.json());

app.use(express.static('public'));

const routes = require('./routes');

app.use((req, res, next) => {
  req.db = client.db(); // set the database instance to req.db for controllers
  next();
});

app.use('/', routes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//enable api documetation UI
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));