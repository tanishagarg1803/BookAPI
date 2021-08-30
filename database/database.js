let books = [
    {
        ISBN:"12345book",
        title:"getting started with mern",
        pubDate:"2021-08-06",
        language:"en",
        numPage:250,
        author:[1,2],
        publications:1,
        category:["tech","programming", "education","thriller"],
    },
    {
        ISBN:"1234book",
        title:"getting started with html",
        pubDate:"2021-08-06",
        language:"hn",
        numPage:250,
        author:[1],
        publications:1,
        category:["programming", "education","thriller"]
    },
];

let author= [
    {
        ID:1,
        name:"pawan",
        books:["12345book","123456789secret"]
    },
    {
        ID:2,
        name:"elon musk",
        books:["12345book"]
    },
];

let publication = [
    {
        ID:1,
        name:"writex",
        books:["12345book"],
    },
];

module.exports={books,author,publication};