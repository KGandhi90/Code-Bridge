"use client"

import { useState, useContext } from "react"
import { ThemeContext } from "../../../App"

const AnswerForm = ({ onSubmit }) => {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { theme } = useContext(ThemeContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!content.trim()) return

    try {
      setIsSubmitting(true)
      await onSubmit(content)
      setContent("")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your answer here..."
          className={`w-full p-3 rounded-lg border ${
            theme === "dark" ? "bg-[#1a1a1a] text-white border-gray-700" : "bg-white text-gray-900 border-gray-300"
          } min-h-[150px]`}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !content.trim()}
        className={`bg-[#504aff] hover:bg-[#4038e0] text-white py-2 px-4 rounded transition-colors ${
          isSubmitting || !content.trim() ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSubmitting ? "Submitting..." : "Post Your Answer"}
      </button>
    </form>
  )
}

export default AnswerForm

