//Prefix: /author

//Initializing express router
const Router=require("express").Router();

//database models
const AuthorModel=require("../../database/author");

/*
Route :         /author
Description:    get all author
Access :        Public
Parameter :     None
Methods :       Get
*/
Router.get("/", async (request, response) => {
    const getAllAuthor = await AuthorModel.find();
    return response.json({ authors: getAllAuthor });
});

/*
Route :         /author/Id
Description:    get specific authors based on id
Access :        Public
Parameter :     id
Methods :       Get
*/
Router.get("/id/:id", async (request, response) => {
    /*const getSpecificAuthor = database.author.filter((author) => author.ID === parseInt(request.params.id));
    if (getSpecificAuthor.length === 0) {
        return response.json({ error: `No author is found for the id of ${request.params.id}`, });
    }
    return response.json({ authors: getSpecificAuthor });*/
    const getSpecificAuthor = await AuthorModel.findOne({ ID: request.params.id });
    if (!getSpecificAuthor) {
        return response.json({ error: `No author is found for the id of ${request.params.id}`, });
    }
    return response.json(getSpecificAuthor);
});

/*
Route :         /author/book
Description:    get specific authors based on the book
Access :        Public
Parameter :     isbn
Methods :       Get
*/
Router.get("/book/:isbn", async (request, response) => {
    /*const getSpecificAuthor = database.author.filter((author) => author.books.includes(request.params.isbn));
    if (getSpecificAuthor.length === 0) {
        return response.json({ error: `No author is found for the book of  isbn  of ${request.params.isbn}`, });
    }
    return response.json({ authors: getSpecificAuthor });*/
    const getSpecificAuthor = await AuthorModel.find({ books: request.params.isbn });
    if (!getSpecificAuthor) {
        return response.json({ error: `No Author is found for the isbn  of ${request.params.isbn}`, });
    }
    return response.json({ book: getSpecificAuthor });
});

/*
Route :         /author/add
Description:    add new author
Access :        Public
Parameter :     None
Methods :       Post
*/
Router.post("/add", async (request, response) => {
    // database.author.push(newAuthor);
    try{
        const { newAuthor } = request.body;
        const addNewAuthor = await AuthorModel.create(newAuthor);
    return response.json({ authors: addNewAuthor, message: "added new author 👌" });
        }
        catch(error){
            return response.json({error: error.message});
        }
});

/*
Route :         /author/update/name
Description:    update author name using its id
Access :        Public
Parameter :     id
Methods :       Put
*/
Router.put("/update/name/:id",async (request, response) => {
    const updatedAuthor=await AuthorModel.findOneAndUpdate({
        ID:request.params.id,
    },
    {
        name:request.body.authorName,
    },
    {
        new:true,
    }
    );
    return response.json({ authors: updatedAuthor });
    /*database.author.forEach((author) => {
        if (author.ID === parseInt(request.params.id)) {
            author.name = request.body.newAuthorName;
            return;
        }
    });
    return response.json({ authors: database.author });*/
});

/*
Route :         /author/delete
Description:    delete a author
Access :        Public
Parameter :     id
Methods :       Delete
*/
Router.delete("/delete/:id", async(request, response) => {
    const updatedAuthor= await AuthorModel.findOneAndDelete({
        ID:request.params.id,
    });
    return response.json({Authors: updatedAuthor});
    /*const updatedAuthorDatabase = database.author.filter((author) =>
        author.ID !== parseInt(request.params.id)
    );
    database.author = updatedAuthorDatabase;
    return response.json({ authors: database.author });*/
});

//to export
module.exports=Router;