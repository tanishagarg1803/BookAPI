//to require mongoose
const mongoose=require("mongoose");

//to create schema
const AuthorSchema=mongoose.Schema({
    ID:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
        minLength:5,
        maxLength:20,
    },
    books:[String] ,
});

// to create model
const AuthorModel= mongoose.model("authors",AuthorSchema);

//to export the model
module.exports=AuthorModel;