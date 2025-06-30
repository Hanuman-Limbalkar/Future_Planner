import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import tripPlanRoutes from "./routes/tripPlans.js"
import contactRoutes from "./routes/contact.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("MongoDB connection error details:", {
      message: err.message,
      code: err.code,
      name: err.name,
    })
  })
  


// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tripplans", tripPlanRoutes)
app.use("/api/contact", contactRoutes) 

app.get("/", (req, res) => {
  res.send("Travel Planner API is running")
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

