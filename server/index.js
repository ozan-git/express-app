import http from 'http';
import express, { json, urlencoded } from 'express'; // express is used to create routes and handle requests
import logger from 'morgan'; // morgan is used to log requests to the console
// cross origin resource sharing is a mechanism that allows restricted resources on a web page to be requested from another domain
// outside the domain from which the first resource was served.
import { Server } from 'socket.io';

// Import the database configuration and connect to the database
import './config/mongo.js';

import WebSockets from './core/WebSockets.js';

// Import the routes
import indexRouter from './routes/index.js';
import userRouter from './routes/user.js';
import chatRouter from './routes/chatRoom.js';
import deleteRouter from './routes/delete.js';

// Import the websockets
import { decode } from './middlewares/jwt.js';

const app = express();

// Set the port to 3000
const port = process.env.PORT || '3000';
app.set('port', port);

// Create an express app and a http server
app.use(logger('dev'));
app.use(json()); // for parsing application/json
app.use(urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/room', decode, chatRouter);
app.use('/delete', deleteRouter);

// Catch 404 and forward to error handler
app.use('*', (req, res) => {
    return res.status(404).json({
        success: false,
        message: 'API endpoint not found on the server! Server endpoints are: /users, /room, /delete',
    });
});

// Create a http server and pass the express app to it
const server = http.createServer(app);
const socketio = new Server(server);

/** Create socket connection */
global.io = socketio.listen(server);
global.io.on('connection', WebSockets.connection);
/** Listen on provided port, on all network interfaces. */
server.listen(port);

/** Event listener for HTTP server "listening" event. */
server.on('listening', () => {
    console.log(`Listening on port:: http://localhost:${port}/`);
});
