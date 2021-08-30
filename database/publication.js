//to require mongoose
const mongoose=require("mongoose");

//to create schema
const PublicationSchema=mongoose.Schema({
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
    books:[String],
});

// to create model
const PublicationModel= mongoose.model("publications",PublicationSchema);

//to export the model
module.exports=PublicationModel;