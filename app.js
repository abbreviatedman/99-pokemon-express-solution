const express = require("express");
const dotenv = require("dotenv");
const pokemon = require("./models/pokemon.json");

dotenv.config();
const { PORT } = process.env;
const app = express();

app.get("/", (_, response) => {
  response.send("Welcome 99 Pokemon");
});

app.get("/:verb/:adjective/:noun", (request, response) => {
  const { verb, adjective, noun } = request.params;
  response.send(
    `Congratulations on starting a new project called ${verb}-${adjective}-${noun}!`
  );
});

app.get("/bugs", (_, response) => {
  const message = "<p>99 little bugs in the code</p>";
  const link = `<p><a href="http://localhost:${PORT}/bugs/101">pull one down, patch it around</a></p>`;
  response.send(message + link);
});

app.get("/bugs/:number", (request, response) => {
  const { number } = request.params;
  if (number >= 200) {
    response.send("Too many bugs!! Start over!");

    return;
  }

  const message = `<p>${number} little bugs in the code</p>`;
  const link = `<p><a href="http://localhost:${PORT}/bugs/${
    Number(number) + 2
  }">Pull one down, patch it around</a></p>`;

  response.send(message + link);
});

app.get("/pokemon", (request, response) => {
  response.send(pokemon);
});

app.get("/pokemon/search", (request, response) => {
  const match = pokemon.find(
    (pokemon) => pokemon.name.toLowerCase() === request.query.name.toLowerCase()
  );

  if (!match) {
    response.send([]);

    return;
  }

  response.send(JSON.stringify(match));
});

app.get("/pokemon/:i", (request, response) => {
  const { i } = request.params;
  if (!pokemon[i]) {
    response.send(`Sorry, no pokemon found at ${i}`);

    return;
  }

  response.send(JSON.stringify(pokemon[request.params.i]));
});

module.exports = app;
