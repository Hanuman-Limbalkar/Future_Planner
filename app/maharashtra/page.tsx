
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Destination {
  id: number
  name: string
  description: string
  image: string
}

const maharashtraDestinations: Destination[] = [
  {
    id: 1,
    name: "Gateway of India, Mumbai",
    description: "An iconic arch monument built in the early 20th century, symbolizing the grandeur of Mumbai.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 2,
    name: "Ajanta Caves",
    description: "Ancient rock-cut Buddhist caves featuring stunning paintings and sculptures dating back to the 2nd century BCE.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 3,
    name: "Ellora Caves",
    description: "A UNESCO World Heritage site showcasing intricate rock-cut temples from Buddhist, Hindu, and Jain traditions.",
    image: "/placeholder.svg?height=400&width=600"
  },
  {
    id: 4,
    name: "Shirdi",
    description: "A spiritual town famous for the Sai Baba temple, attracting millions of devotees annually.",
    image: "/placeholder.svg?height=400&width=600"
  }
]

export default function MaharashtraDestinations() {
  return (
    <div className="min-h-screen bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center text-cyan-400"
        >
          Discover Maharashtra
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {maharashtraDestinations.map((dest) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={dest.image || "/placeholder.svg"}
                alt={dest.name}
                width={600}
                height={400}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2 text-cyan-400">{dest.name}</h2>
                <p className="text-gray-300">{dest.description}</p>
                <button className="mt-4 btn-simple">
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

