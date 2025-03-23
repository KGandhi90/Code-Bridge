"use client"

import { useState, useEffect, createContext } from "react"
import { Routes, Route } from "react-router-dom"
import { supabase } from "./supabaseClient" // Import Supabase
import CodeBridgePage from "./src/components/CodeBridgePage"
import Auth from "./src/Auth"
import CompilerChat from "./src/components/CompilerChat"
import ForumPage from "./src/components/Forum/ForumPage"
import QuestionDetail from "./src/components/Forum/QuestionDetail"
import AskQuestion from "./src/components/Forum/AskQuestion"

// Create a theme context
export const ThemeContext = createContext()

export default function App() {
  const [session, setSession] = useState(null)
  const [theme, setTheme] = useState("dark") // Default theme is dark

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Fetch session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`min-h-screen font-mono ${theme === "dark" ? "bg-[#373535] text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <Routes>
          {/* Pass session and theme as props */}
          <Route path="/" element={<CodeBridgePage session={session} />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/compiler" element={<CompilerChat />} />

          {/* Forum routes */}
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/forum/question/:questionId" element={<QuestionDetail />} />
          <Route path="/forum/ask" element={<AskQuestion />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  )
}

