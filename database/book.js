//to require mongoose
const mongoose=require("mongoose");

//to create schema
const BookSchema=mongoose.Schema({
        ISBN: {
                type:String,
                required:true,
                minLength:5,
                maxLength:10,
        },
        title: {
                type:String,
                required:true,
                minLength:5,
                maxLength:40,
        },
        pubDate: String,
        language: String,
        numPage: Number,
        author:[Number],
        publications:Number,
        category:[String],
});

// to create model
const BookModel= mongoose.model("books",BookSchema);

//to export the model
module.exports=BookModel;