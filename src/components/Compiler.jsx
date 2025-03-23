import { useState } from "react";

const Compiler = () => {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");

  async function runCode() {
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
  }

  async function runAi() {
    try {
      const response = await fetch("https://codebridge-ovdg.onrender.com/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, planguage: language, language: "Hindi" }),
      });

      const out = await response.json();
      setOutput(out);
    } catch (error) {
      console.error("Error explaining code:", error);
      setOutput("Error generating explanation.");
    }
  }

  return (
    <div className="p-4 bg-[#222222] text-white rounded">
      <h2 className="text-xl mb-2">Online Compiler</h2>

      {/* Language Selector */}
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="bg-[#373535] text-white p-2 rounded border border-[#504aff] mb-2"
      >
        <option value="python">Python</option>
        <option value="javascript">JavaScript</option>
      </select>

      {/* Code Editor */}
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-40 bg-[#373535] text-white p-4 font-mono resize-none rounded"
        placeholder="Write your code here..."
      />

      {/* Buttons */}
      <div className="mt-2">
        <button
          onClick={runCode}
          className="mr-2 bg-[#504aff] text-white py-2 px-4 rounded hover:bg-[#4038e0] transition-colors"
        >
          Run Code
        </button>
        <button
          onClick={runAi}
          className="bg-[#ff4a4a] text-white py-2 px-4 rounded hover:bg-[#e03b3b] transition-colors"
        >
          Explain Code
        </button>
      </div>

      {/* Output Section */}
      <div className="mt-4 bg-[#373535] p-4 rounded">
        <h3 className="text-lg mb-1">Output:</h3>
        <pre className="text-sm">{output || "Your output will appear here..."}</pre>
      </div>
    </div>
  );
};

export default Compiler;
