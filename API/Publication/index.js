//Prefix: /publication

//Initializing express router
const Router=require("express").Router();

//database models
const PublicationModel=require("../../database/publication");

/*
Route :         /publications
Description:    get all publications
Access :        Public
Parameter :     None
Methods :       Get
*/
Router.get("/", async (request, response) => {
    const getAllPublications = await PublicationModel.find();
    return response.json({ publications: getAllPublications });
});

/*
Route :         /publications/id
Description:    get specific publications based on ID
Access :        Public
Parameter :     id
Methods :       Get
*/
Router.get("/id/:id", async (request, response) => {
    /*const getSpecificPublication = database.publication.filter((publication) => publication.ID === parseInt(request.params.id));
    if (getSpecificPublication.length === 0) {
        return response.json({ error: `No publication is found for the id of ${request.params.id}`, });
    }
    return response.json({ book: getSpecificPublication });*/
    const getSpecificPublication = await PublicationModel.findOne({ ID: request.params.id });
    if (!getSpecificPublication) {
        return response.json({ error: `No Publication is found for the id of ${request.params.id}`, });
    }
    return response.json(getSpecificPublication);
});
-
    /*
    Route :         /publications/book
    Description:    get specific publications based on the book
    Access :        Public
    Parameter :     isbn
    Methods :       Get
    */
    Router.get("/book/:isbn", async (request, response) => {
        /*const getSpecificPublication = database.publication.filter((publication) => publication.books.includes(request.params.isbn));
        if (getSpecificPublication.length === 0) {
            return response.json({ error: `No publication is found for the book of  isbn  of ${request.params.isbn}`, });
        }
        return response.json({ publications: getSpecificPublication });*/
        const getSpecificPublication = await PublicationModel.find({ books: request.params.isbn });
        if (!getSpecificPublication) {
            return response.json({ error: `No Publication is found for the isbn  of ${request.params.isbn}`, });
        }
        return response.json({ book: getSpecificPublication });
    });

/*
Route :         /publication/add
Description:    add new publication
Access :        Public
Parameter :     None
Methods :       Post
*/
Router.post("/add", async (request, response) => {
    try{
    const { newPublication } = request.body;
    //database.publication.push(newPublication);
    const addNewPublication = await PublicationModel.create(newPublication);
    return response.json({ publications: addNewPublication, message: "added new  Publication 👌" });
    }
    catch(error){
        return response.json({error: error.message});
    }
});

/*
Route :         /publication/update/name
Description:    update publication name using its id
Access :        Public
Parameter :     id
Methods :       Put
*/
Router.put("/update/name/:id", async (request, response) => {
    const updatedPublication=await PublicationModel.findOneAndUpdate({
        ID:request.params.id,
    },
    {
        name:request.body.publicationName,
    },
    {
        new:true,
    }
    );
    return response.json({ Publications: updatedPublication });
    /*database.publication.forEach((publication) => {
        if (publication.ID === parseInt(request.params.id)) {
            publication.name = request.body.newPublicationName;
            return;
        }
    });
    return response.json({ publications: database.publication });*/
});

/*
Route :         /publication/update/book
Description:    update/add books to publication
Access :        Public
Parameter :     id
Methods :       Put
*/
Router.put("/update/book/:isbn", async(request, response) => {
    // update publication database
    const updatedPublication=await PublicationModel.findOneAndUpdate({
        ID:request.body.pubId,
    },
    {
        $push:{
            books:request.params.isbn,
        }
    },
    {
        new:true,
    }
    );
    /*database.publication.forEach((publication) => {
        if (publication.ID === request.body.pubId) {
            return publication.books.push(request.params.isbn);
        }
    });*/
    //update book database
    const updatedBook=await BookModel.findOneAndUpdate({
        ISBN:request.params.isbn,
    },
    {
        publications:request.body.pubId,
    },
    {
        new:true,
    }
    );
    /*database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            book.publication = request.body.pubId;
            return;
        }
    });*/

    return response.json({ books: updatedBook, publications: updatedPublication, message: "successfully updated publication" });
});

/*
Route :         /publication/delete
Description:    delete a publication
Access :        Public
Parameter :     id
Methods :       Delete
*/
Router.delete("/delete/:id", async(request, response) => {
    const updatedPublication= await PublicationModel.findOneAndDelete({
        ID:request.params.id,
    });
    return response.json({Publications: updatedPublication});
    /*const updatedPublicationDatabase = database.publication.filter((publication) =>
        publication.ID !== parseInt(request.params.id)
    );
    database.publication = updatedPublicationDatabase;
    return response.json({ publications: database.publication });*/
});

/*
Route :         /publication/delete/book
Description:    delete a  book from a publication
Access :        Public
Parameter :     isbn, pubId
Methods :       Delete
*/
Router.delete("/delete/book/:isbn/:pubId", async(request, response) => {
    //update the publication database
    const updatedPublication=await PublicationModel.findOneAndUpdate({
        ID:parseInt(request.params.pubId)
    },
    {
        $pull:{
            books: request.params.isbn
        }
    },
    {
        new:true
    });
    /*database.publication.forEach((publication) => {
        if (publication.ID === parseInt(request.params.pubId)) {
            const newBookList = publication.books.filter((book) =>
                book !== request.params.isbn
            );
            publication.books = newBookList;
            return;
        }
    });*/
    //update the book database
    const updatedBook= await BookModel.findOneAndUpdate({
        ISBN:request.params.isbn
    },
    {
        publications: 0,
    },
    {
        new:true
    });
    /*database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            book.publications = 0; //no publication vailable
            return;
        }
    });*/
    return response.json({ books: database.books, publications: database.publication, message: "author is deleted😢" });
});

//to export
module.exports=Router;