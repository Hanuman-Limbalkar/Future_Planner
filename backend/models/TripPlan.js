import mongoose from "mongoose"

const tripPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    startPoint: { type: String, required: true },
    destination: { type: String, required: true },
    visitingPoints: [String],
    schedule: String,
    budget: { type: Number, required: true },
    review: String,
    feedback: String,
    rating: { type: Number, min: 0, max: 5 },
    state: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
  },
  { timestamps: true },
)

const TripPlan = mongoose.model("TripPlan", tripPlanSchema)

export default TripPlan

