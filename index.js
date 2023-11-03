import express from "express";
import auth from "./middleware/auth.js";
import { jokes } from "./api/jokes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 3000;

app.set("json spaces", 2);
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Jokes bapak bapak by Luthpai, only for personal use",
  });
});

app.get("/id/:id", auth, (req, res) => {
  req.params.id == undefined &&
    res.json({ status: 404, messsage: "Tolong masukkan id setelah api/id/" });
  if (req.params.id && jokes[req.params.id - 1]) {
    res.json(jokes[req.params.id - 1]);
  } else {
    res.json({ status: 404, message: "Joke tidak ditemukan" });
  }
});

app.get("/random", auth, (req, res) => {
  res.json(jokes[Math.floor(Math.random() * jokes.length)]);
});

app.get("*", (req, res) => {
  res.json({ status: 404, message: "Endpoint atau page tidak ditemukan" });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
