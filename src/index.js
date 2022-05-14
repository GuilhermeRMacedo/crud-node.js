const express = require("express");

const app = express();
app.use(express.json());

const persons = [];

//create
app.post("/person", (request, response) => {
    const { id, name, age } = request.body;

    const person = persons.find((person) => person.id == id);

    if(person) {
        return response.status(400).send({errorMessage: "Person with id: " + id + " already created"})
    }

    const newPerson = {
        id,
        name, 
        age
    }

    persons.push(newPerson);
    return response.status(201).send(newPerson);
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

//update
app.put("/person/:id", (request, response) => {
    const { id } = request.params;
    const { name, age } = request.body;

    const person = persons.find((person) => person.id == id);

    if(!person) {
        response.status(404).send({errorMessage: "person with id " + id + " not found"})
    }
    
    person.name = name;
    person.age = age;

    response.status(200).send(person);
});

app.listen(3333); 