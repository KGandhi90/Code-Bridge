"use client"

import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const [session, setSession] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        // If user is already logged in, redirect to compiler page
        navigate("/compiler")
      }
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        // When auth state changes and user is logged in, redirect to compiler page
        navigate("/compiler")
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      navigate("/")
    }
  }

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/compiler",
      },
    })
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#373535]">
        <div className="flex justify-center items-center border-2 border-white w-[25rem] rounded-lg p-3">
          <img src="/google.svg" alt="Google Logo" className="h-10 w-10 mr-4" />
          <button onClick={signUp} className="text-2xl font-sans text-white">
            Sign in with Google
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#373535] text-white">
        <img
          src={session?.user?.user_metadata?.avatar_url || "/placeholder.svg"}
          alt="Profile"
          className="h-20 w-20 rounded-full mb-4"
        />
        <h2 className="text-2xl mb-4">Welcome, {session?.user?.user_metadata?.name}</h2>
        <button onClick={signOut} className="bg-[#504aff] hover:bg-[#4038e0] px-4 py-2 rounded-lg transition-colors">
          Sign Out
        </button>
      </div>
    )
  }
}

export default Auth

