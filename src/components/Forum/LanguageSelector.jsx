"use client"

import { useContext } from "react"
import { ThemeContext } from "../../../App"

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  const { theme } = useContext(ThemeContext)

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi" },
  ]

  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onLanguageChange(e.target.value)}
      className={`px-3 py-2 rounded border ${
        theme === "dark" ? "bg-[#222222] text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
      }`}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector

