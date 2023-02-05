import express from 'express'
import bodyParser from 'body-parser'
import pgk from 'pg'

const app = express();
app.use(bodyParser.json());

const {Client} = pgk
const client = new Client({
  user: "noahboehringer",
  host: "localhost",
  database: "noahboehringer",
  port: 5432,
});

client.connect((err) => {
  if (err) {
    console.error("Verbindung fehlgeschlagen", err.stack);
  } else {
    console.log("Verbindung erfolgreich");
  }
});

app.post("/api/users", async (req, res) => {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "Email and password are required",
    });
  }
  try {
    const {email, password} = req.body;
    const result = await client.query('INSERT INTO "users" ("email", "password") VALUES ($1, $2)', [email, password]);
    res.send("Benutzer erfolgreich gespeichert");
  } catch (err) {
    console.error("Fehler beim Speichern des Benutzers in der Datenbank", err.stack);
    res.status(500).send("Fehler beim Speichern des Benutzers in der Datenbank");
  }
});


app.get("/api/users", (req, res) => {
  const sql = `SELECT * FROM users`;

  client.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        error: "Error fetching users from database",
      });
    }

    return res.json(result.rows);
  });
});

const port = process.env.PORT || 4567;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
