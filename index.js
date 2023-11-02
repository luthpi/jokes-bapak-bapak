import express from "express"
import { jokes } from "./api/jokes.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = 3000

const auth = (req,res,next) => {
  if(req.query.key == process.env.KEY) {
    next()
  } else {
    res.json({"status": "Not allowed","message": "Valid key needed"})
  }
}

app.use(auth)

app.get("/api/id/:id", (req, res) => {
  req.params.id == undefined && res.send("Tolong masukkan id setelah api/id/")
  if(req.params.id && jokes[req.params.id - 1]) {
    res.json(jokes[req.params.id - 1])
  } else {
    res.json({"status": 404, "message": "Joke tidak ditemukan"})
  }
})

app.get("/api/random", (req,res) => {
  res.json(jokes[Math.floor(Math.random() * jokes.length)])
})

app.listen(port, () => console.log(`Listening on port ${port}`))
