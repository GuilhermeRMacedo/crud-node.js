const express = require("express");

const app = express();
app.use(express.json());

const persons = [];

//create
app.post("/person", (request, response) => {
    const { id, name, age } = request.body;

    const personAlreadyExist = persons.find((person) => person.id === id);

    if(personAlreadyExist) {
        return response.status(400).send({errorMessage: "Person with id: " + id + " already created"})
    }

    const person = {
        id,
        name, 
        age
    }

    persons.push(person);
    return response.status(201).send(person);
});

//read all
app.get("/person", (request, response) => {
    return response.status(200).send(persons);
});

//read by id
app.get("/person/:id", (request, response) => {
    const { id } = request.params;

    const person = persons.find((person) => person.id == id);

    if(!person) {
        response.status(404).send({errorMessage: "person with id " + id + " not found"})
    }

    response.status(200).send(person);
});

app.listen(3333); 