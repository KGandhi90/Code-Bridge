"use client"

import { useContext } from "react"
import { ThemeContext } from "../../../App"
import { formatDistanceToNow } from "date-fns"

const AnswerList = ({ answers }) => {
  const { theme } = useContext(ThemeContext)

  if (answers.length === 0) {
    return (
      <div className={`p-6 rounded-lg text-center ${theme === "dark" ? "bg-[#222222]" : "bg-white shadow"}`}>
        <p>No answers yet. Be the first to answer this question!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {answers.map((answer) => (
        <AnswerCard key={answer.id} answer={answer} />
      ))}
    </div>
  )
}

const AnswerCard = ({ answer }) => {
  const { theme } = useContext(ThemeContext)

  // Format the date
  const formattedDate = formatDistanceToNow(new Date(answer.created_at), { addSuffix: true })

  return (
    <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-[#222222]" : "bg-white shadow"}`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={answer.profiles?.avatar_url || "/placeholder.svg?height=40&width=40"}
            alt="User avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>

        <div className="flex-1">
          <div className={`text-sm mb-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Answered by {answer.profiles?.username || "Anonymous"} • {formattedDate}
          </div>

          <div className={`prose max-w-none ${theme === "dark" ? "prose-invert" : ""}`}>
            <p className="whitespace-pre-line">{answer.content}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnswerList

