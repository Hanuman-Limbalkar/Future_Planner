'use client'
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface DestinationCardProps {
  name: string
  image: string
}

export default function DestinationCard({ name, image }: DestinationCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
      </div>
    </motion.div>
  )
}

