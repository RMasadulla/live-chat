import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import ChatWindow from "./components/ChatWindow";
import NotificationButton from "./components/NotificationButton";
const serverURL = import.meta.env.VITE_SERVER_URL;

interface Message {
  id: string;
  message: string;
  type: "text" | "image";
}

interface Notification {
  message: string;
}

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const newSocket = io(serverURL);
    setSocket(newSocket);

    newSocket.on("chatMessage", (message: Message) => {
      setMessages((prev) => [...prev, message]);
      if (!isChatOpen) {
        setNotifications((prev) => [
          ...prev,
          { message: "New message received" },
        ]);
      }
    });

    newSocket.on("notification", (notification: Notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [isChatOpen]);

  const sendMessage = (message: string) => {
    if (socket && message.trim()) {
      socket.emit("chatMessage", { id: socket.id, message, type: "text" });
    }
  };

  const sendImage = (imageUrl: string) => {
    if (socket) {
      socket.emit("chatMessage", {
        id: socket.id,
        message: imageUrl,
        type: "image",
      });
    }
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    if (!isChatOpen) {
      setNotifications([]);
    }
  };

  return (
    <div>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <NotificationButton
          onOpenBox={toggleChat}
          isOpen={isChatOpen}
          notificationCount={notifications.length}
        />
      </div>

      {isChatOpen && (
        <ChatWindow
          messages={messages}
          socketId={socket?.id}
          onClose={toggleChat}
          onSendText={sendMessage}
          onSendFile={sendImage}
        />
      )}
    </div>
  );
};

export default App;
