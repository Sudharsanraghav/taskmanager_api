const mogoose = require('mongoose');
require('dotenv').config;

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME

mogoose.connect(MONGO_URL, {
    dbName : DB_NAME
}).then (
    () => {console.log('Connected to DataBAse')}
).catch(
    (err) => {console.log('Error Occured in Connecting DataBase', err)}
)