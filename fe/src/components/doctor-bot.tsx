"use client"

import { useState } from "react"
import { Send, X } from "lucide-react"

const fetchBotResponse = async (message: string) => {

  try {
    const response = await fetch('http://127.0.0.1:5000/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ input_text: message }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log(data)
    return data.response; // Adjust based on the actual response structure
  } catch (error) {
    console.error('Error fetching bot response:', error);
    return ["I'm sorry, I don't have information about that. How else can I assist you?"];
  }
}

export function DoctorBotComponent() {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([])
  const [input, setInput] = useState("")

  const handleSend = async () => {
    if (input.trim()) {
      setMessages(prev => [...prev, { text: input, sender: "user" }])
      setInput("")
      const botResponses = await fetchBotResponse(input)
     
      setMessages(prev => [...prev, { text: botResponses, sender: "bot" }])
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h2 className="text-xl font-bold text-blue-900">Doctor Bot</h2>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex-grow px-3 py-2 border border-gray-200 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-800"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}