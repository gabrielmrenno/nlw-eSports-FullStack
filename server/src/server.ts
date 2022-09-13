import express from "express";

const app = express();

// first route -> a GET requisition
//   Parameter: path and function to be executed when the request is made
//      request: to get info/data from the request and response: return a response
//      The function parameter need to return a express response
//
app.get('/ads', (request, response) => {
    // Sending a text as response
    // return response.send("Acessou Ads!");

    // Returning a JSON data -> it can be a array, object or string
    //  In this example, it's returning a object array
    return response.json([
        { id: 1, name: "Anuncio 1" },
        { id: 2, name: "Anuncio 2" },
        { id: 3, name: "Anuncio 3" },
        { id: 4, name: "Anuncio 4" },
    ]);
})

// Setting the port of our server: localhost:3333 -> The application is listening new requisitions
app.listen(3333);