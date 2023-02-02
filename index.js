import express from "express";
import bodyParser from "body-parser";
const app = express();

const users = [];

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.get("/api/data", (req, res) => {
  res.json({users});
});

app.post("/api/data", (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({message: "Email and password required"});
  }

  users.push({email, password});
  res.json({message: `User with email ${email} added`});
});

app.put("/api/data/:index", (req, res) => {
  const {index} = req.params;
  const {email, password} = req.body;

  if (index >= users.length) {
    return res.status(400).json({message: "Index out of range"});
  }

  users[index] = {email, password};
  res.json({message: `User at index ${index} updated with email ${email}`});
});

const port = process.env.PORT || 4567;
app.listen(port, () => console.log(`API running on port ${port}`));
