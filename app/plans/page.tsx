"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Star, Clock, DollarSign, MapPin, Plus } from "lucide-react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import Loader from "../components/Loader"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

interface TripPlan {
  _id: string
  title: string
  startPoint: string
  destination: string
  visitingPoints: string[]
  schedule: string
  budget: number
  review: string
  feedback: string
  rating: number
  state: string
  user : string
}

function StarRating({ rating, setRating }: { rating: number; setRating?: (rating: number) => void }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${
            star <= Math.floor(rating)
              ? "text-yellow-400 fill-current"
              : star <= rating
                ? "text-yellow-400 fill-current opacity-50"
                : "text-gray-300"
          } ${setRating ? "cursor-pointer" : ""}`}
          onClick={() => setRating && setRating(star)}
        />
      ))}
      <span className="ml-2 text-gray-300">{rating.toFixed(1)}</span>
    </div>
  )
}

export default function Plans() {
  const searchParams = useSearchParams()
  const stateFilter = searchParams.get("state")
  const [plans, setPlans] = useState<TripPlan[]>([])
  const [showForm, setShowForm] = useState(false)
  const [newPlan, setNewPlan] = useState<Partial<TripPlan>>({
    visitingPoints: [],
    rating: 0,
  })
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    fetchPlans()
  }, []) //Fixed useEffect dependency

  const fetchPlans = async () => {
    setLoading(true)
    try {
      const url = stateFilter ? `/api/tripplans/state/${stateFilter}` : "/api/tripplans"
      const response = await axios.get(url)
      setPlans(response.data)
    } catch (error) {
      console.error("Error fetching plans:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewPlan((prev) => ({ ...prev, [name]: value }))
  }

  const handleVisitingPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const visitingPoints = e.target.value.split(",").map((point) => point.trim())
    setNewPlan((prev) => ({ ...prev, visitingPoints }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      await axios.post("/api/tripplans", newPlan, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setNewPlan({
        visitingPoints: [],
        rating: 0,
      })
      setShowForm(false)
      fetchPlans()
    } catch (error) {
      console.error("Error adding new plan:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <Link href="/" className="absolute top-4 left-4 text-cyan-400 hover:text-cyan-300 transition-colors">
        <ChevronLeft className="inline-block mr-1" size={20} />
        Back to Home
      </Link>
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center text-cyan-400"
        >
          {stateFilter ? `Travel Plans for ${stateFilter}` : "All Travel Plans"}
        </motion.h1>
        {isAuthenticated && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="btn-simple mb-8 flex items-center"
            onClick={() => setShowForm(!showForm)}
          >
            <Plus className="mr-2" /> {showForm ? "Cancel" : "Add New Plan"}
          </motion.button>
        )}
        {showForm && (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="bg-gray-800 p-6 rounded-lg mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={newPlan.title || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={newPlan.state || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="text"
                name="startPoint"
                placeholder="Start Point"
                value={newPlan.startPoint || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="text"
                name="destination"
                placeholder="Destination"
                value={newPlan.destination || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="text"
                name="visitingPoints"
                placeholder="Visiting Points (comma-separated)"
                value={newPlan.visitingPoints?.join(", ") || ""}
                onChange={handleVisitingPointsChange}
                className="bg-gray-700 text-white p-2 rounded"
              />
              <input
                type="text"
                name="schedule"
                placeholder="Schedule"
                value={newPlan.schedule || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <input
                type="number"
                name="budget"
                placeholder="Budget"
                value={newPlan.budget || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded"
                required
              />
              <div className="flex items-center">
                <span className="mr-2">Rating:</span>
                <StarRating
                  rating={newPlan.rating || 0}
                  setRating={(rating) => setNewPlan((prev) => ({ ...prev, rating }))}
                />
              </div>
            </div>
            <textarea
              name="review"
              placeholder="Review"
              value={newPlan.review || ""}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded w-full mb-4"
              rows={4}
              required
            ></textarea>
            <textarea
              name="feedback"
              placeholder="Feedback"
              value={newPlan.feedback || ""}
              onChange={handleInputChange}
              className="bg-gray-700 text-white p-2 rounded w-full mb-4"
              rows={4}
            ></textarea>
            <button type="submit" className="btn-simple">
              Add Plan
            </button>
          </motion.form>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {plans.map((plan) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
              >
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-4 text-cyan-400">{plan.title}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Start: {plan.startPoint}</h3>
                      <h3 className="text-lg font-semibold mb-2">Destination: {plan.destination}</h3>
                      <h3 className="text-lg font-semibold mb-2">Visiting Points:</h3>
                      <ul className="list-disc list-inside">
                        {plan.visitingPoints.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 mr-2 text-cyan-400" />
                        <span>{plan.schedule}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        <DollarSign className="w-5 h-5 mr-2 text-cyan-400" />
                        <span>Budget: ₹{plan.budget}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-cyan-400" />
                        <span>{plan.visitingPoints.length + 2} locations</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Review:</h3>
                    <p className="text-gray-300">{plan.review}</p>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-2">Feedback:</h3>
                    <p className="text-gray-300">{plan.feedback}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <StarRating rating={plan.rating} />
                    <button className="btn-simple">View Details</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

