import express from "express"
import TripPlan from "../models/TripPlan.js"
import User from "../models/User.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Get all trip plans
router.get("/", async (req, res) => {
  try {
    const tripPlans = await TripPlan.find().populate("user", "username")
    res.json(tripPlans)
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip plans", error: error.message })
  }
})

// Create a new trip plan
router.post("/", authenticateToken, async (req, res) => {
  try {
    // Find the user to get their username
    const user = await User.findById(req.user.userId)

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    const newTripPlan = new TripPlan({
      ...req.body,
      user: req.user.userId,
      username: user.username, // Add the username
    })

    const savedTripPlan = await newTripPlan.save()
    res.status(201).json(savedTripPlan)
  } catch (error) {
    res.status(400).json({ message: "Error creating trip plan", error: error.message })
  }
})

// Get trip plans for a specific state
router.get("/state/:state", async (req, res) => {
  try {
    const tripPlans = await TripPlan.find({ state: req.params.state }).populate("user", "username")
    res.json(tripPlans)
  } catch (error) {
    res.status(500).json({ message: "Error fetching trip plans", error: error.message })
  }
})

// Update a trip plan
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updatedTripPlan = await TripPlan.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedTripPlan) {
      return res.status(404).json({ message: "Trip plan not found" })
    }
    res.json(updatedTripPlan)
  } catch (error) {
    res.status(400).json({ message: "Error updating trip plan", error: error.message })
  }
})

// Delete a trip plan
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deletedTripPlan = await TripPlan.findByIdAndDelete(req.params.id)
    if (!deletedTripPlan) {
      return res.status(404).json({ message: "Trip plan not found" })
    }
    res.json({ message: "Trip plan deleted successfully" })
  } catch (error) {
    res.status(400).json({ message: "Error deleting trip plan", error: error.message })
  }
})

export default router

