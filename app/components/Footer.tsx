
import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-cyan-400 mb-4">FuturTravel</h3>
            <p className="text-gray-400">Exploring the wonders of tomorrow, today.</p>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.instagram.com/hanumanlimbalkar/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/hanuman.limbalkar.5" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/plans" className="text-gray-400 hover:text-cyan-400 transition-colors">Plans</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors">Contact</Link></li>
              <li><Link href="/login" className="text-gray-400 hover:text-cyan-400 transition-colors">Login</Link></li>
              <li><Link href="/signup" className="text-gray-400 hover:text-cyan-400 transition-colors">Sign Up</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-cyan-400" />
                <span>travellplaner@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-cyan-400" />
                <span>8767561849</span>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-cyan-400" />
                <span>123 Itoli, Parbhani 431509</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; 2023 FuturTravel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

