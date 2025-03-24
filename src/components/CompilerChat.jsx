import { useState, useEffect, useContext } from "react";
import { supabase } from "../../supabaseClient";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { ThemeContext } from "../../App";

const CompilerChat = () => {
  const [session, setSession] = useState(null);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");  // Programming language
  const [output, setOutput] = useState("");
  const [explanation, setExplanation] = useState("");  // Explanation result
  const [translateLanguage, setTranslateLanguage] = useState("hindi"); // Translation language

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) navigate("/auth");
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate("/");
    });

    setExplanation("");

    return () => subscription.unsubscribe();
  }, [navigate]);

  const runCode = async () => {
    try {
      const response = await fetch("https://codebridge-ovdg.onrender.com/output", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const result = await response.json();
      setOutput(result.run.stdout + result.run.stderr);
    } catch (error) {
      console.error("Error running code:", error);
      setOutput("Error executing code.");
    }
  };

  const runAi = async () => {
    setExplanation("");
    try {
      setExplanation("Generating explanation...");
      const response = await fetch("https://codebridge-ovdg.onrender.com/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, planguage: language, language: translateLanguage }),
      });

      const out = await response.json();
      setExplanation(out);  // Store explanation result
    } catch (error) {
      console.error("Error explaining code:", error);
      setExplanation("Error generating explanation.");
    }
  };

  if (!session) {
    return (
      <div className={`min-h-screen flex justify-center items-center ${theme === "dark" ? "bg-[#373535] text-white" : "bg-gray-100 text-gray-900"}`}>
        Loading...
      </div>
    );
  }

  return (
    <div className={`flex h-screen overflow-hidden ${theme === "dark" ? "bg-[#373535]" : "bg-white"}`}>
      <Navbar isExpanded={isNavExpanded} toggleNav={() => setIsNavExpanded(!isNavExpanded)} session={session} />

      <div className="flex-1 ml-16 h-screen overflow-auto p-4">
        <div className="flex flex-col h-full">
          {/* Language Selection */}
          <div className="mb-4 flex items-center">
            <label className={`${ theme === "dark" ? "text-white" : "text-gray-900"} mr-2`}>Language:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className={`${theme === "dark" ? "bg-[#222222] text-white " : "bg-white text-gray-900"} p-2 rounded border-2 border-[#504aff]`}
            >
              <option value="python">Python</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          {/* Compiler Section */}
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <h2 className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-xl mb-2`}>Code Editor</h2>
              <textarea
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setExplanation("");
                }}
                className={`flex-1 ${theme === "dark" ? "bg-[#222222] text-white" : "bg-gray-300 text-gray-900"} p-4 font-mono resize-none rounded placeholder:text-gray-900`}
                placeholder="Write your code here..."
              />
              <button
                onClick={runCode}
                className="mt-2 bg-[#504aff] text-white py-2 px-4 rounded hover:bg-[#4038e0] transition-colors"
              >
                Run Code
              </button>
            </div>

            {/* Output */}
            <div className="flex-1 flex flex-col">
              <h2 className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-xl mb-2`}>Output</h2>
              <div className={`flex-1 ${theme === "dark" ? "bg-[#222222] text-white" : "bg-gray-300 text-gray-900"} p-4 font-mono rounded overflow-auto`}>
                {output || "Your output will appear here..."}
              </div>
            </div>
          </div>

          {/* Explanation Section */}
          <div className={`mt-4 ${theme === "dark" ? "bg-[#222222]" : "bg-gray-300"} p-4 rounded`}>
            <h2 className={`${theme === "dark" ? "text-white" : "text-gray-900"} text-xl mb-2`}>Code Explanation</h2>

            {/* Language Selection for Explanation */}
            <div className="mb-2 flex items-center">
              <label className={`${theme === "dark" ? "text-white" : "text-gray-900"} mr-2`}>Translate to:</label>
              <select
                value={translateLanguage}
                onChange={(e) => setTranslateLanguage(e.target.value)}
                className={`${theme === "dark" ? "bg-[#222222] text-white" : "bg-gray-300 text-gray-900"} p-2 rounded border-2 border-[#504aff]`}
              >
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
                <option value="english">English</option>
              </select>
              <button
                onClick={runAi}
                className="ml-2 bg-[#504aff] text-white py-2 px-4 rounded hover:bg-[#4038e0] transition-colors"
              >
                Explain Code
              </button>
            </div>

            {/* Explanation Output */}
            <div className={`${theme === "dark" ? "bg-[#1a1a1a] text-white" : "bg-[#bfc3c9] text-gray-900"} p-4 font-mono rounded overflow-auto min-h-[100px]`}>
              {explanation || "Code explanation will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompilerChat;
