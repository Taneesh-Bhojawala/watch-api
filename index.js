const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

let watches = require("./watches.json");

app.get("/api/watches", (req, res) => {
  res.json(watches);
});

app.get("/api/watches/:id", (req, res) => {
  const id = Number(req.params.id);
  const watch = watches.find(w => w.id === id);
  if (watch) res.json(watch);
  else res.status(404).json({ error: "Watch not found" });
});

app.post("/api/watches", (req, res) => {
  const newWatch = { id: Date.now(), ...req.body };
  watches.push(newWatch);

  fs.writeFileSync("./watches.json", JSON.stringify(watches, null, 2));
  res.status(201).json(newWatch);
});

app.delete("/api/watches/:id", (req, res) => {
  const id = Number(req.params.id);
  watches = watches.filter(w => w.id !== id);
  fs.writeFileSync("./watches.json", JSON.stringify(watches, null, 2));
  res.json({ message: "Deleted successfully" });
});

app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
