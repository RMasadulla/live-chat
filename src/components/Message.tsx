import React from "react";
import { MessageProps } from "../types";

const Message: React.FC<MessageProps> = ({ message, socketId }) => {
  return (
    <div className={`mb-2 ${message.id === socketId ? "text-right" : ""}`}>
      {message.type === "text" ? (
        <p
          className={`${
            message.id === socketId
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } rounded-lg py-2 px-4 inline-block`}
        >
          {message.message}
        </p>
      ) : (
        <img
          src={message.message}
          alt="uploaded"
          className="md:max-w-xs rounded-lg"
        />
      )}
    </div>
  );
};

export default Message;
