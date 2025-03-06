import React, { useState } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  onSendImage: (imageUrl: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  onSendImage,
}) => {
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch("http://localhost:3000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        onSendImage(data.imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className=" bg-blue-600 p-4 border-t  rounded-b-lg border-white flex items-center gap-4">
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="bg-gray-500 text-white px-4 py-2 rounded-md  ml-2 cursor-pointer"
        >
          file
        </label>
      </div>
      <div className="flex ">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          className="w-full px-3 py-2 text-white border border-white rounded-l-md outline-none "
          placeholder="Type a message"
        />
        <button
          onClick={handleSendMessage}
          className="bg-gray-500 text-white px-4 py-2 rounded-r-md "
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
