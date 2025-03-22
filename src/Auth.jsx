import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient';

const Auth = () => {
  const [session, setSession] = useState(null);

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
  }, []);

  console.log(session);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
  };

  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    })
  }

  if (!session) {
    return (
      <>
      {/* <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} /> */}
      <button onClick={signUp}>Sign in with Google</button>
      </>
    )
  }
  else {
    return (
      <div>
        <img src={session?.user?.user_metadata?.avatar_url} alt="" />
        <h2>Welcome, {session?.user?.user_metadata?.name}</h2>
        <button onClick={signOut}>Sign Out</button>
      </div>
    )
  }
}

export default Auth;
