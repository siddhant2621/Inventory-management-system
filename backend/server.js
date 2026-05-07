const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.post("/products", (req, res) => {
  const { name, quantity, price } = req.body;
  db.query(
    "INSERT INTO products (name, quantity, price) VALUES (?, ?, ?)",
    [name, quantity, price],
    (err) => {
      if (err) throw err;
      res.send("Added");
    }
  );
});

app.delete("/products/:id", (req, res) => {
  db.query("DELETE FROM products WHERE id=?", [req.params.id], (err) => {
    if (err) throw err;
    res.send("Deleted");
  });
});

app.listen(5000, () => console.log("Server running on 5000"));
