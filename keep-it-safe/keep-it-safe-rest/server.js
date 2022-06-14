import express from "express"
import cors from "cors"
import logins from "./api/logins.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/logins", logins)
app.use("*", (req, res) => res.status(404).json({error:"Resource Not Found"}))

export default app