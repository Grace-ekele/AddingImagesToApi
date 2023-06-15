require('dotenv').config();
const mongoose = require( 'mongoose' );

const url = "mongodb+srv://ekelegracege:Sqs7Ueaj364XdASu@cluster0.eurqlng.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url).then( () => {
    console.log("Database connection successful")
} ).catch( () => {
    console.log("Database connection failed")
});