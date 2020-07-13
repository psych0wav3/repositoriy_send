const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body
  const id = uuid()
  repositories.push({id: id, title: title, url: url, techs: techs, likes: 0})
  response.status(200).json({id: id, title: title, url: url, techs: techs, likes: 0})
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params
  const {title, url, techs} = request.body

  const projectIndex = repositories.findIndex(project => id === id)
  const repo = {
    id, title, url, techs
  }
  repositories[projectIndex] = repo
  response.json(repo)

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params
  const projectIndex = repositories.findIndex(project => id === id)

  repositories.splice(projectIndex, 1)

  return response.status(200).json({stauts: 'OK'})
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
