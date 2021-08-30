require('dotenv').config();
const { request, response } = require("express");

const express = require("express");
const mongoose = require("mongoose");

/*
//Database
const database = require("./database/database");

//models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
*/

//Initializing a micro services route
const Books=require("./API/Book");
const Authors=require("./API/Author");
const Publications=require("./API/Publication");

// Initialization express
const booky = express();

//configuration
booky.use(express.json());

//Establishing connection
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("connection establish"));

//Initializing micro services- adding prefix
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);


booky.listen(3000, () => console.log("hello server is on"));
