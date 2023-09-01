import 'dotenv/config'
import controllerSockets from "./sockets/controller.js"
import express from 'express'
import http from 'http';
import * as io from 'socket.io'
import mongoose from 'mongoose';

const port=process.env.PORT
let app = express();
app.use(express.json());
app.use(express.static('public'))
const server = http.createServer(app)

let ioServer = new io.Server(server);
app.set('socketio', io)

ioServer.on('connection', controllerSockets);

mongoose.connect(`${process.env.DB}`)
  .then(() => console.log('Connected!'));

server.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});   