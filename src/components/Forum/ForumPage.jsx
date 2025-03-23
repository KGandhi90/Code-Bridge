"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../../supabaseClient"
import { ThemeContext } from "../../../App"
import Navbar from "../Navbar"
import QuestionList from "./QuestionList"
import LanguageSelector from "./LanguageSelector"

const ForumPage = () => {
  const [session, setSession] = useState(null)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [questions, setQuestions] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // Fetch questions
    fetchQuestions()

    return () => subscription.unsubscribe()
  }, [selectedLanguage])

  const fetchQuestions = async () => {
    try {
      setIsLoading(true)

      // Fetch questions from Supabase
      let query = supabase
        .from("questions")
        .select(`
          *,
          profiles(username, avatar_url),
          answers(count)
        `)
        .order("created_at", { ascending: false })

      // Filter by language if not "all"
      if (selectedLanguage !== "all") {
        query = query.eq("language", selectedLanguage)
      }

      const { data, error } = await query

      if (error) throw error

      setQuestions(data || [])
    } catch (error) {
      console.error("Error fetching questions:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language)
  }

  const handleAskQuestion = () => {
    if (!session) {
      navigate("/auth")
      return
    }
    navigate("/forum/ask")
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar isExpanded={isNavExpanded} toggleNav={() => setIsNavExpanded(!isNavExpanded)} session={session} />

      <div
        className={`flex-1 ml-16 h-screen overflow-auto p-4 ${theme === "dark" ? "bg-[#373535] text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">Code-Bridge Community Forum</h1>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={handleLanguageChange} />

              <button
                onClick={handleAskQuestion}
                className="bg-[#504aff] hover:bg-[#4038e0] text-white py-2 px-4 rounded transition-colors"
              >
                Ask Question
              </button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#504aff]"></div>
            </div>
          ) : (
            <QuestionList questions={questions} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ForumPage

