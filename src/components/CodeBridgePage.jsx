"use client"
import { useState, useContext } from "react"
import Navbar from "./Navbar"
import MainContent from "./MainContent"
import { ThemeContext } from "../../App"

export default function CodeBridgePage({ session }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const { theme } = useContext(ThemeContext)

  const toggleNav = () => {
    setIsNavExpanded(!isNavExpanded)
  }

  return (
    <div className={`flex h-screen overflow-hidden ${theme === "dark" ? "bg-[#373535]" : "bg-gray-100"}`}>
      {/* Pass session to Navbar */}
      <Navbar isExpanded={isNavExpanded} toggleNav={toggleNav} session={session} />
      <MainContent session={session} />
    </div>
  )
}

