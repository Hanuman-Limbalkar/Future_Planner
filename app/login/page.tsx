"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ChevronLeft } from "lucide-react"
import axios from "axios"
import { useAuth } from "../context/AuthContext"
import Loader from "../components/Loader"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post("/api/auth/login", { email, password })
      login(response.data.token, response.data.userId)
      router.push("/")
    } catch (error) {
      setError("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <Link href="/" className="absolute top-4 left-4 text-cyan-400 hover:text-cyan-300 transition-colors">
        <ChevronLeft className="inline-block mr-1" size={20} />
        Back to Home
      </Link>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-cyan-400">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
              required
            />
          </div>
          <button type="submit" className="w-full btn-simple" disabled={loading}>
            {loading ? <Loader /> : "Log In"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Dont have an account?{" "}
          <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

