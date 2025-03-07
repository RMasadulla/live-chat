export interface Message {
  id: string;
  message: string;
  type: "text" | "image";
}

export interface Notification {
  message: string;
}

export interface MessageProps {
  message: Message;
  socketId: string | undefined;
}
