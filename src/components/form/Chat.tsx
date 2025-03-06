import { useState } from "react";

const Chat: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([
    { sender: "user", text: "hello" },
    { sender: "bot", text: "This is a response from the chatbot." },
    { sender: "user", text: "this example of chat" },
    { sender: "bot", text: "This is a response from the chatbot." },
    { sender: "user", text: "design with tailwind" },
    { sender: "bot", text: "This is a response from the chatbot." },
  ]);
  const [userInput, setUserInput] = useState("");

  const toggleChat = () => setIsChatOpen((prev) => !prev);

  const sendMessage = () => {
    if (userInput.trim() === "") return;
    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setUserInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "This is a response from the chatbot." },
      ]);
    }, 500);
  };

  return (
    <div>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          onClick={toggleChat}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Chat with Admin Bot
        </button>
      </div>

      {isChatOpen && (
        <div className="fixed bottom-16 right-4 w-96 bg-white shadow-md rounded-lg max-w-lg">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">Admin Bot</p>
            <button
              onClick={toggleChat}
              className="text-gray-300 hover:text-gray-400 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="p-4 h-80 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <p
                  className={`py-2 px-4 rounded-lg inline-block ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 border-t flex">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message"
              className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
