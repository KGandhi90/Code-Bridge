"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { supabase } from "../../../supabaseClient"
import { ThemeContext } from "../../../App"
import Navbar from "../Navbar"
import AnswerList from "./AnswerList"
import AnswerForm from "./AnswerForm"
import { formatDistanceToNow } from "date-fns"

const QuestionDetail = () => {
  const { questionId } = useParams()
  const [session, setSession] = useState(null)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [question, setQuestion] = useState(null)
  const [answers, setAnswers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
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

    // Fetch question and answers
    fetchQuestionAndAnswers()

    // Update view count
    updateViewCount()

    return () => subscription.unsubscribe()
  }, [questionId])

  const fetchQuestionAndAnswers = async () => {
    try {
      setIsLoading(true)

      // Fetch question
      const { data: questionData, error: questionError } = await supabase
        .from("questions")
        .select(`
          *,
          profiles(username, avatar_url)
        `)
        .eq("id", questionId)
        .single()

      if (questionError) throw questionError

      setQuestion(questionData)

      // Fetch answers
      const { data: answersData, error: answersError } = await supabase
        .from("answers")
        .select(`
          *,
          profiles(username, avatar_url)
        `)
        .eq("question_id", questionId)
        .order("created_at", { ascending: true })

      if (answersError) throw answersError

      setAnswers(answersData || [])
    } catch (error) {
      console.error("Error fetching question details:", error)
      navigate("/forum")
    } finally {
      setIsLoading(false)
    }
  }

  const updateViewCount = async () => {
    try {
      // Get current view count
      const { data, error } = await supabase.from("questions").select("views").eq("id", questionId).single()

      if (error) throw error

      // Increment view count
      const newViewCount = (data.views || 0) + 1

      await supabase.from("questions").update({ views: newViewCount }).eq("id", questionId)
    } catch (error) {
      console.error("Error updating view count:", error)
    }
  }

  const handleAnswerSubmit = async (content) => {
    if (!session) {
      navigate("/auth")
      return
    }

    try {
      const { data, error } = await supabase.from("answers").insert({
        question_id: questionId,
        user_id: session.user.id,
        content,
        language: question.language,
      })

      if (error) throw error

      // Refresh answers
      fetchQuestionAndAnswers()
    } catch (error) {
      console.error("Error submitting answer:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Navbar isExpanded={isNavExpanded} toggleNav={() => setIsNavExpanded(!isNavExpanded)} session={session} />
        <div
          className={`flex-1 ml-16 h-screen overflow-auto p-4 ${theme === "dark" ? "bg-[#373535] text-white" : "bg-gray-100 text-gray-900"}`}
        >
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#504aff]"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!question) {
    return (
      <div className="flex h-screen overflow-hidden">
        <Navbar isExpanded={isNavExpanded} toggleNav={() => setIsNavExpanded(!isNavExpanded)} session={session} />
        <div
          className={`flex-1 ml-16 h-screen overflow-auto p-4 ${theme === "dark" ? "bg-[#373535] text-white" : "bg-gray-100 text-gray-900"}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="p-6 rounded-lg text-center">
              <p className="text-lg mb-4">Question not found</p>
              <Link
                to="/forum"
                className="bg-[#504aff] hover:bg-[#4038e0] text-white py-2 px-4 rounded transition-colors"
              >
                Back to Forum
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Format the date
  const formattedDate = formatDistanceToNow(new Date(question.created_at), { addSuffix: true })

  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar isExpanded={isNavExpanded} toggleNav={() => setIsNavExpanded(!isNavExpanded)} session={session} />

      <div
        className={`flex-1 ml-16 h-screen overflow-auto p-4 ${theme === "dark" ? "bg-[#373535] text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link
              to="/forum"
              className={`inline-flex items-center ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-gray-900"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Forum
            </Link>
          </div>

          <div className={`p-6 rounded-lg mb-6 ${theme === "dark" ? "bg-[#222222]" : "bg-white shadow"}`}>
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0">
                <img
                  src={question.profiles?.avatar_url || "/placeholder.svg?height=40&width=40"}
                  alt="User avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">{question.title}</h1>

                <div className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Posted by {question.profiles?.username || "Anonymous"} • {formattedDate}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags &&
                    question.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs rounded-full bg-[#504aff]/20 text-[#504aff]">
                        {tag}
                      </span>
                    ))}
                </div>

                <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
                  <p className="whitespace-pre-line">{question.content}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
            </h2>

            <AnswerList answers={answers} />
          </div>

          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-[#222222]" : "bg-white shadow"}`}>
            <h2 className="text-xl font-semibold mb-4">Your Answer</h2>

            {session ? (
              <AnswerForm onSubmit={handleAnswerSubmit} />
            ) : (
              <div className="text-center py-4">
                <p className="mb-4">You need to be logged in to answer questions</p>
                <Link
                  to="/auth"
                  className="bg-[#504aff] hover:bg-[#4038e0] text-white py-2 px-4 rounded transition-colors"
                >
                  Log in to answer
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuestionDetail

