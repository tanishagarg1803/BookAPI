//Prefix: /book

//Initializing express router
const Router=require("express").Router();

//database models
const BookModel=require("../../database/book");

/*
Route :         /
Description:    get all books
Access :        Public
Parameter :     None
Methods :       Get
*/
Router.get("/", async (request, response) => {
    //return response.json({books:database.books});
    const getAllBooks = await BookModel.find();
    return response.json(getAllBooks);
});

/*
Route :         /is
Description:    get specific books based on ISBN
Access :        Public
Parameter :     isbn
Methods :       Get
*/
Router.get("/is/:isbn", async (request, response) => {
    /*const getSpecificBook= database.books.filter((book)=>book.ISBN===request.params.isbn);
    if(getSpecificBook.length === 0){
        return response.json({error: `No book is found for the ISBN  of ${request.params.isbn}`,});
    }
    return response.json({book : getSpecificBook});*/
    const getSpecificBook = await BookModel.findOne({ ISBN: request.params.isbn });
    if (!getSpecificBook) {
        return response.json({ error: `No book is found for the ISBN  of ${request.params.isbn}`, });
    }
    return response.json(getSpecificBook);
});

/*
Route :         /c
Description:    get specific books based on Category
Access :        Public
Parameter :     category
Methods :       Get
*/
Router.get("/c/:category", async (request, response) => {
    /*const getSpecificBook= database.books.filter((book)=>book.category.includes(request.params.category));
    if(getSpecificBook.length === 0){
        return response.json({error: `No book is found for the category  of ${request.params.category}`,});
    }
    return response.json({book : getSpecificBook});*/

    const getSpecificBook = await BookModel.find({ category: request.params.category });
    if (!getSpecificBook) {
        return response.json({ error: `No book is found for the category  of ${request.params.category}`, });
    }
    return response.json({ book: getSpecificBook });
});

/*
Route :         /l
Description:    get specific books based on Language
Access :        Public
Parameter :     lang
Methods :       Get
*/
Router.get("/l/:lang", async (request, response) => {
    /*const getSpecificBook = database.books.filter((book) => book.language === request.params.lang);
    if (getSpecificBook.length === 0) {
        return response.json({ error: `No book is found for the language  of ${request.params.lang}`, });
    }
    return response.json({ book: getSpecificBook });*/
    const getSpecificBook = await BookModel.find({ language: request.params.lang });
    if (!getSpecificBook) {
        return response.json({ error: `No book is found for the language  of ${request.params.lang}`, });
    }
    return response.json(getSpecificBook);
});

/*
Route :         /book/add
Description:    add new book
Access :        Public
Parameter :     None
Methods :       Post
*/
Router.post("/add", async (request, response) => {
    /*const {newBook}=request.body;
    database.books.push(newBook);*/

    try{
    const { newBook } = request.body;
    const addNewBook = await BookModel.create(newBook);
    return response.json({ books: addNewBook, message: "added new book 👌" });
    }
    catch(error){
        return response.json({error: error.message});
    }
});

/*
Route :         /book/update/title
Description:    update book title
Access :        Public
Parameter :     isbn
Methods :       Put
*/
Router.put("/update/title/:isbn",async (request, response) => {
    const updatedBook=await BookModel.findOneAndUpdate({
        ISBN:request.params.isbn,
    },
    {
        title:request.body.bookTitle,
    },
    {
        new:true,
    }
    );
    return response.json({ books: updatedBook });
   /* database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            book.title = request.body.newBookTitle;
            return;
        }
    });
    return response.json({ books: database.books });*/
});

/*
Route :         /book/update/author
Description:    update/add new author for a book
Access :        Public
Parameter :     isbn
Methods :       Put
*/
Router.put("/update/author/:isbn/:authorId", async(request, response) => {
    //update book database
    const updatedBook=await BookModel.findOneAndUpdate({
        ISBN:request.params.isbn,
    },
    {
        $addToSet:{
            author:request.params.authorId,
        }
    },
    {
        new:true,
    }
    );
    /*database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            return book.author.push(parseInt(request.params.authorId));
        }
    });*/
    // update author database
    const updatedAuthor=await AuthorModel.findOneAndUpdate({
        ID:request.params.authorId,
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
    /*database.author.forEach((author) => {
        if (author.ID === parseInt(request.params.authorId)) {
            return author.books.push(request.params.isbn);
        }
    });*/

    return response.json({ books: updatedBook, authors: updatedAuthor,message:"updated" });
});

/*
Route :         /book/delete
Description:    delete a book
Access :        Public
Parameter :     isbn
Methods :       Delete
*/
Router.delete("/delete/:isbn",async (request, response) => {
    const updatedBook= await BookModel.findOneAndDelete({
        ISBN:request.params.isbn,
    });
    return response.json({books: updatedBook});
    /*const updatedBookDatabase = database.books.filter((book) =>
        book.ISBN !== request.params.isbn
    );
    database.books = updatedBookDatabase;
    return response.json({ books: database.books });*/
});

/*
Route :         /book/delete/author
Description:    delete a author from a book
Access :        Public
Parameter :     isbn, authorId
Methods :       Delete
*/
Router.delete("/delete/author/:isbn/:authorId", async(request, response) => {
    //update the book database
    const updatedBook= await BookModel.findOneAndUpdate({
        ISBN:request.params.isbn
    },
    {
        $pull:{
            author:parseInt(request.params.authorId)
        }
    },
    {
        new:true
    });
   /* database.books.forEach((book) => {
        if (book.ISBN === request.params.isbn) {
            const newAuthorList = book.author.filter((author) =>
                author !== parseInt(request.params.authorId));
            book.author = newAuthorList;
            return;
        }
    });*/
    //update the author database
    const updatedAuthor=await AuthorModel.findOneAndUpdate({
        ID:parseInt(request.params.authorId)
    },
    {
        $pull:{
            books: request.params.isbn
        }
    },
    {
        new:true
    });
    /*database.author.forEach((author) => {
        if (author.ID === parseInt(request.params.authorId)) {
            const newBookList = author.books.filter((book) =>
                book !== request.params.isbn
            );
            author.books = newBookList;
            return;
        }
    });*/
    return response.json({ books: updatedBook, authors: updatedAuthor, message: "author is deleted😢" });
});

//to export
module.exports=Router;