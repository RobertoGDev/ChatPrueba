require('dotenv').config();

const mongoose = require('mongoose');
const chalk = require('chalk');
const server = require('./server.js');

const PORT = process.env.PORT || 3000;
const MONGO_DB = process.env.MONGODB || 'chat-cice';
const MONGO_PORT = process.env.MONGO_PORT || 27018;
const MONGO_URL = process.env.MONGO_URL || 'localhost';

server.listen(PORT, () => {
    mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGODB}`, {
        useNewUrlParser: true
    }, err => {
        if (err) {
            throw err;
        }

        console.info(chalk.black.bgMagenta(`${emoji.get('heart')}   AUTHENTICATOR SERVER RUNNING! ${emoji.get('heart')}  
  at ${port}    
 Good luck! and remember: ${emoji.get('coffee')}   + ${emoji.get('smoking')}  = ${emoji.get('poop')}  `))

    });
});