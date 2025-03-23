"use client"

import { X, Menu, LogOut, Sun, Moon, Code } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { ThemeContext } from "../../App"
import { supabase } from "../../supabaseClient"

const Navbar = ({ isExpanded, toggleNav, session }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Error signing out:", error)
      } else {
        navigate("/")
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err)
    }
  }

  return (
    <div
      className={`fixed h-screen transition-all duration-300 z-10 ${isExpanded ? "w-64" : "w-16"} ${theme === "dark" ? "bg-[#222222]" : "bg-white border-r border-gray-200"}`}
    >
      <div className="flex flex-col h-full justify-between p-3">
        <div>
          <div className="flex items-center mb-6">
            <div className="flex justify-center">
              <div className="w-10 h-6 rounded-full flex items-center justify-center mr-2">
                <Link to="/">
                  <span className="text-md md:text-2xl">
                    <img src="/logo.jpg" alt="Logo" />
                  </span>
                </Link>
              </div>
            </div>
            {/* Nav items */}
            {isExpanded && (
              <Link to="/" className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Code-Bridge
              </Link>
            )}
          </div>

          {isExpanded && session && session?.user && (
            <div className="flex items-center gap-2 mt-4">
              <img
                src={session?.user?.user_metadata?.avatar_url || "/placeholder.svg"}
                alt="Profile"
                className="h-8 w-8 md:w-10 md:h-10 rounded-full ml-2"
              />
              <span className={theme === "dark" ? "text-white" : "text-gray-900"}>
                {session?.user?.user_metadata?.name}
              </span>
            </div>
          )}
          {isExpanded && (
            <div className={`text-md md:text-2xl mt-8 ml-2 ${theme === "dark" ? "text-white/70" : "text-gray-700"}`}>
              <Link
                to="/forum"
                className={`flex items-center hover:${theme === "dark" ? "text-white" : "text-gray-900"} cursor-pointer mb-4`}
              >
                Stack Overflow
              </Link>

              {/* Theme toggle button */}
              <div
                onClick={toggleTheme}
                className={`flex items-center hover:${theme === "dark" ? "text-white" : "text-gray-900"} cursor-pointer mb-4`}
              >
                {theme === "dark" ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    Light Theme
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    Dark Theme
                  </>
                )}
              </div>

              {session ? (
                <button
                  onClick={handleLogout}
                  className={`hover:${theme === "dark" ? "text-white" : "text-gray-900"} cursor-pointer flex items-center`}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/auth"
                  className={`hover:${theme === "dark" ? "text-white" : "text-gray-900"} cursor-pointer`}
                >
                  Login
                </Link>
              )}
              {session && (
                <Link
                  to="/compiler"
                  className={`hover:${theme === "dark" ? "text-white" : "text-gray-900"} cursor-pointer mt-4 flex items-center`}
                >
                  <Code className="h-5 w-5 mr-2" />
                  Compiler
                </Link>
              )}
            </div>
          )}

          {/* Collapsed navbar icons */}
          {!isExpanded && (
            <div className="flex flex-col items-center gap-6 mt-8">
              {/* Stack Overflow icon */}
              <Link
                to="/forum"
                className={`${theme === "dark" ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-gray-900"} cursor-pointer`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </Link>

              {/* Theme toggle icon */}
              <button
                onClick={toggleTheme}
                className={`${theme === "dark" ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-gray-900"} cursor-pointer`}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {session && (
                <Link
                  to="/compiler"
                  className={`${theme === "dark" ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-gray-900"} cursor-pointer`}
                >
                  <Code className="h-5 w-5" />
                </Link>
              )}

              {session ? (
                <button
                  onClick={handleLogout}
                  className={`${theme === "dark" ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-gray-900"} cursor-pointer`}
                >
                  <LogOut className="h-5 w-5" />
                </button>
              ) : (
                <Link
                  to="/auth"
                  className={`${theme === "dark" ? "text-white/70 hover:text-white" : "text-gray-700 hover:text-gray-900"} cursor-pointer`}
                >
                  <span className="text-md">Login</span>
                </Link>
              )}
            </div>
          )}
        </div>

        <button
          onClick={toggleNav}
          className={`p-2 rounded-full transition-colors self-start ${
            theme === "dark"
              ? "bg-[#373535] hover:bg-white/15 text-white"
              : "bg-gray-200 hover:bg-gray-300 text-gray-900"
          }`}
        >
          {isExpanded ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </div>
  )
}

export default Navbar

