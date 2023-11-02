import express from "express"
import { jokes } from "./api/jokes.js"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()

const app = express()
const port = 3000

app.set('json spaces', 2)

const auth = (req,res,next) => {
  if(req.query.key == process.env.KEY) {
    next()
  } else {
    res.json({"status": "Dilarang","message": "Membutuhkan key yang valid untuk diakses"})
  }
}

app.get("/id/:id", auth, (req, res) => {
  req.params.id == undefined && res.send("Tolong masukkan id setelah api/id/")
  if(req.params.id && jokes[req.params.id - 1]) {
    res.json(jokes[req.params.id - 1])
  } else {
    res.json({"status": 404, "message": "Joke tidak ditemukan"})
  }
})

app.get("/random", auth, (req,res) => {
  res.json(jokes[Math.floor(Math.random() * jokes.length)])
})

app.get("*", (req,res) => {
  res.send("Endpoint tidak ditemukan")
})

app.listen(port, () => console.log(`Listening on port ${port}`))

export default app
