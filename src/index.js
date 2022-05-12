const express = require("express");

const app = express();
app.use(express.json());

const persons = [];

app.post("/person", (request, response) => {
    const { id, name, age } = request.body;

    const person = {
        id,
        name, 
        age
    }

    persons.push(person);
    return response.status(201).send(person);
});

app.listen(3333); 