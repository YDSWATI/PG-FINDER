import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//AUTH ROUTES
import authRoutes from "./routes/authRoute.js"
app.use("/api/auth", authRoutes);
//PG LISTING ROUTES
import pgListingRoutes from "./routes/pgListRoute.js"
app.use("/api/listings", pgListingRoutes)



export { app }