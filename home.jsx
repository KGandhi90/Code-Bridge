import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Home, HelpCircle, Tag, Users, Search } from "lucide-react";

export default function StackOverflowClone() {
  const [questions, setQuestions] = useState([
    { id: 1, title: "How to center a div in CSS?", body: "I've tried using flexbox but it's not working." },
    { id: 2, title: "Best way to manage state in React?", body: "Should I use Redux or Context API?" }
  ]);
  const [newQuestion, setNewQuestion] = useState({ title: "", body: "" });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const addQuestion = () => {
    if (newQuestion.title && newQuestion.body) {
      setQuestions([...questions, { id: questions.length + 1, ...newQuestion }]);
      setNewQuestion({ title: "", body: "" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white relative">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 bg-gray-950 shadow-md p-4 flex justify-between items-center z-50">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="w-6 h-6 text-white" />
          </Button>
          <h1 className="text-2xl font-bold text-white">StackOverflow Clone</h1>
        </div>
        <div className="flex items-center space-x-4 w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input type="text" placeholder="Search questions..." className="pl-8 w-full bg-gray-800 border-gray-700 text-white" />
          </div>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" className="border-gray-700 text-black hover:bg-gray-200">Log in</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Sign up</Button>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar with Hover Effect */}
        <motion.aside 
          animate={{ width: sidebarOpen ? 200 : 60 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-950 p-4 shadow-md h-screen sticky top-16 flex flex-col z-40"
        >
          <nav className="space-y-2 relative">
            <ul className="space-y-1">
              {[
                { name: "Home", icon: <Home className="w-6 h-6 text-white" /> },
                { name: "Questions", icon: <HelpCircle className="w-6 h-6 text-white" /> },
                { name: "Tags", icon: <Tag className="w-6 h-6 text-white" /> },
                { name: "Users", icon: <Users className="w-6 h-6 text-white" /> },
              ].map((item, index) => (
                <li key={index} className="flex items-center p-2 rounded-md relative hover:bg-gray-800 transition-all duration-200 group">
                  <div className="w-8 h-8 flex items-center justify-center">{item.icon}</div>
                  {sidebarOpen && <span className="ml-2 text-white">{item.name}</span>}
                  {!sidebarOpen && (
                    <span className="absolute left-14 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </motion.aside>
        
        {/* Main Content */}
        <main className="flex-1 p-6 z-30">
          <h2 className="text-xl font-semibold mb-4 text-white">Newest Questions</h2>
          <ScrollArea className="h-[80vh] overflow-y-auto">
            {questions.map((q) => (
              <motion.div key={q.id} whileHover={{ scale: 1.02 }}>
                <Card className="mb-4 bg-gray-900 shadow-md border border-gray-700 relative z-10">
                  <CardContent>
                    <h2 className="text-lg font-semibold text-blue-400">{q.title}</h2>
                    <p className="text-gray-300">{q.body}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </ScrollArea>
        </main>
      </div>
    </div>
  );
}
