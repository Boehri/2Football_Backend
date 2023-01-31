import express from "express";

const app = express();

const port = 4567;

const dogs = [
  {name: "Sam", breed: "Husky"},
  {name: "Josh", breed: "Lab"},
  {name: "Basti", breed: "Retriever"},
];

app.get("/", (req, res) => {
  res.json(dogs);
});

app.get("/dogs/:id", (req, res) => {
  res.json(dogs[parseInt(req.params.id) - 1]);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
