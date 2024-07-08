import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
app.use(express.json(
    {
        limit:"50mb"
    }
))
app.use(express.urlencoded(
    {
        limit:"50mb",
        extended:true,
        parameterLimit:50000
    }
))
app.use(express.static("public"))
app.use(cookieParser())
export default app