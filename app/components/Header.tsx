'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-cyan-400">FuturTravel</Link>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className={`hover:text-cyan-400 transition-colors ${pathname === '/' ? 'text-cyan-400' : 'text-white'}`}
              >
                Home
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link
                  href="/plans"
                  className={`hover:text-cyan-400 transition-colors ${pathname === '/plans' ? 'text-cyan-400' : 'text-white'}`}
                >
                  Plans
                </Link>
              </li>
            )}
            <li>
              <Link
                href="/contact"
                className={`hover:text-cyan-400 transition-colors ${pathname === '/contact' ? 'text-cyan-400' : 'text-white'}`}
              >
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <li>
                <button
                  onClick={logout}
                  className="btn-simple"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className={`hover:text-cyan-400 transition-colors ${pathname === '/login' ? 'text-cyan-400' : 'text-white'}`}
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="btn-simple"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  )
}

