import React from "react";
import ChatInput from "./ChatInput";
import Message from "./Message";

interface Message {
  id: string;
  message: string;
}

interface ChatWindowProps {
  messages: Message[];
  socketId: string | undefined;
  onClose: () => void;
  onSendText: (message: string) => void;
  onSendFile: (imageUrl: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  messages,
  socketId,
  onClose,
  onSendText,
  onSendFile,
}) => {
  return (
    <div className="fixed bottom-16  mx-4 lg:w-96 md:right-4 ">
      <div className="bg-blue-500 rounded-lg max-w-lg w-full">
        <div className="p-4 bg-blue-600 rounded-t-lg text-white flex justify-between items-center">
          <p className="text-lg font-semibold">Live Chat</p>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
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
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-6 h-96 border-px text-white overflow-y-auto">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} socketId={socketId} />
          ))}
        </div>
        <ChatInput onSendMessage={onSendText} onSendImage={onSendFile} />
      </div>
    </div>
  );
};

export default ChatWindow;
