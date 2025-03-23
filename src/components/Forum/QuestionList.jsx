"use client"

import { useContext } from "react"
import { Link } from "react-router-dom"
import { ThemeContext } from "../../../App"
import { formatDistanceToNow } from "date-fns"

const QuestionList = ({ questions }) => {
  const { theme } = useContext(ThemeContext)

  if (questions.length === 0) {
    return (
      <div className={`p-6 rounded-lg text-center ${theme === "dark" ? "bg-[#222222]" : "bg-white shadow"}`}>
        <p className="text-lg">No questions found. Be the first to ask a question!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  )
}

const QuestionCard = ({ question }) => {
  const { theme } = useContext(ThemeContext)

  // Format the date
  const formattedDate = formatDistanceToNow(new Date(question.created_at), { addSuffix: true })

  // Get answer count
  const answerCount = question.answers?.[0]?.count || 0

  return (
    <div
      className={`p-4 rounded-lg ${
        theme === "dark" ? "bg-[#222222] hover:bg-[#2a2a2a]" : "bg-white shadow hover:shadow-md"
      } transition-all`}
    >
      <Link to={`/forum/question/${question.id}`} className="block">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <img
              src={question.profiles?.avatar_url || "/placeholder.svg?height=40&width=40"}
              alt="User avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>

          <div className="flex-1">
            <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              {question.title}
            </h3>

            <p className={`mb-3 line-clamp-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
              {question.content}
            </p>

            <div className="flex flex-wrap gap-2 mb-3">
              {question.tags &&
                question.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 text-xs rounded-full bg-[#504aff]/20 text-[#504aff]">
                    {tag}
                  </span>
                ))}
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                Posted by {question.profiles?.username || "Anonymous"} • {formattedDate}
              </div>

              <div className="flex items-center gap-4">
                <span className={`flex items-center gap-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  {answerCount} {answerCount === 1 ? "answer" : "answers"}
                </span>

                <span className={`flex items-center gap-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  {question.views || 0} {question.views === 1 ? "view" : "views"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default QuestionList

