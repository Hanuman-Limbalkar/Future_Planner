'use client'

import React from 'react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronLeft } from "lucide-react"

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
]

export default function IndiaStates() {
  const [selectedState, setSelectedState] = useState<string | null>(null)

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
          Explore India
        </motion.h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {indianStates.map((state, index) => (
            <motion.button
              key={state}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`btn-simple ${selectedState === state ? 'bg-cyan-600' : ''}`}
              onClick={() => setSelectedState(state)}
            >
              {state}
            </motion.button>
          ))}
        </div>
        {selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-4">You selected: {selectedState}</h2>
            <Link href={`/plans?state=${selectedState}`} className="btn-simple">
              View {selectedState} Plans
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  )
}

