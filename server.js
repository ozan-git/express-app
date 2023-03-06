const http = require('http');       // http is used to create a server and listen to requests
const express = require('express'); // express is used to create routes and handle requests
const morgan = require('morgan');   // morgan is used to log requests to the console
const cors = require('cors');      // cors is used to enable cross-origin resource sharing
// cross origin resource sharing is a mechanism that allows restricted resources on a web page to be requested from another domain 
// outside the domain from which the first resource was served.

// Set the port to 3000
const port = 3000;
const userRouter = require('./routes/user');
const app = express();

// Create an express app and a http server
app.use(morgan('dev'));
app.use(cors());    
app.use(express.json());                         // for parsing application/json 
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/user', userRouter);

// Create a http server and pass the express app to it 
const server = http.createServer(app);
server.listen(port);
server.on('listening', () => {
  console.log(`Listening on port ${port}`);
});