"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import axios from "axios"
import Loader from "../components/Loader"

export default function Contact() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
  
    try {
      const response = await axios.post("/api/contact/submit", { name, email, message })
  
      if (response.status === 200) {
        setStatus("success")
        setName("")
        setEmail("")
        setMessage("")
      }
    } catch (error) {
      console.error("Error sending message:", error)
      setStatus("error")
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
          Contact Us
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  required
                ></textarea>
              </div>
              <button type="submit" className="w-full btn-simple" disabled={status === "loading"}>
                {status === "loading" ? <Loader /> : "Send Message"}
              </button>
              {status === "success" && <p className="text-green-400 text-center">Message sent successfully!</p>}
              {status === "error" && (
                <p className="text-red-400 text-center">Error sending message. Please try again.</p>
              )}
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <div className="flex items-center space-x-4">
              <Mail className="text-cyan-400" />
              <span>contact@futurtravel.com</span>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="text-cyan-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-4">
              <MapPin className="text-cyan-400" />
              <span>123 Future Street, Techno City, TC 12345</span>
            </div>
            <div className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

