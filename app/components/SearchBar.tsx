'use client'
import React from 'react'
import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log('Searching for:', searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className="mb-12">
      <div className="relative max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="Search for your next adventure..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 px-4 pl-12 rounded-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 btn-simple"
        >
          Search
        </button>
      </div>
    </form>
  )
}

