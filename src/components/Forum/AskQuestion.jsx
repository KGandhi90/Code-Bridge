"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../../../supabaseClient"
import { ThemeContext } from "../../../App"
import Navbar from "../Navbar"
import LanguageSelector from "./LanguageSelector"

const AskQuestion = () => {
  const [session, setSession] = useState(null)
  const [isNavExpanded, setIsNavExpanded] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [language, setLanguage] = useState("en")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { theme } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Get session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (!session) {
        navigate("/auth")
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (!session) {
        navigate("/auth")
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) return

    try {
      setIsSubmitting(true)

      // Process tags
      const tagArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)

      // Submit question
      const { data, error } = await supabase.from("questions").insert({
        title,
        content,
        tags: tagArray,
        language,
        user_id: session.user.id,
      })
      .select("id")
      .single();

      if (error) throw error
      console.log("New Question ID : ", data.id);
      navigate(`/forum/question/${data.id}`);

      // Redirect to forum
    } catch (error) {
      console.error("Error submitting question:", error)
      alert("Failed to submit question. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar isExpanded={isNavExpanded} toggleNav={() => setIsNavExpanded(!isNavExpanded)} session={session} />

      <div
        className={`flex-1 ml-16 h-screen overflow-auto p-4 ${theme === "dark" ? "bg-[#373535] text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Ask a Question</h1>

          <div className={`p-6 rounded-lg ${theme === "dark" ? "bg-[#222222]" : "bg-white shadow"}`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2 font-medium">Question Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Be specific and imagine you're asking a question to another person"
                  className={`w-full p-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-[#1a1a1a] text-white border-gray-700"
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Question Details</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Include all the information someone would need to answer your question"
                  className={`w-full p-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-[#1a1a1a] text-white border-gray-700"
                      : "bg-white text-gray-900 border-gray-300"
                  } min-h-[200px]`}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2 font-medium">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add tags separated by commas (e.g. javascript, react, node.js)"
                  className={`w-full p-3 rounded-lg border ${
                    theme === "dark"
                      ? "bg-[#1a1a1a] text-white border-gray-700"
                      : "bg-white text-gray-900 border-gray-300"
                  }`}
                />
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-medium">Language</label>
                <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
                <p className={`mt-2 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Select the language in which your question is written
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate("/forum")}
                  className={`mr-4 py-2 px-4 rounded transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-900"
                  }`}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting || !title.trim() || !content.trim()}
                  className={`bg-[#504aff] hover:bg-[#4038e0] text-white py-2 px-4 rounded transition-colors ${
                    isSubmitting || !title.trim() || !content.trim() ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Post Your Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AskQuestion

