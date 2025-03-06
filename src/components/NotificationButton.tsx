import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

interface NotificationButtonProps {
  onOpenBox: () => void;
  notificationCount: number;
  isOpen: boolean;
}

const NotificationButton: React.FC<NotificationButtonProps> = ({
  onOpenBox,
  notificationCount,
  isOpen,
}) => {
  return (
    <button
      onClick={onOpenBox}
      className={
        isOpen
          ? "hidden"
          : "w-18 h-18 flex justify-center shadow-md rounded-full bg-blue-500 text-white  hover:bg-blue-600 transition duration-300 items-center relative"
      }
    >
      <IoChatbubbleEllipsesOutline className="text-4xl" />
      {notificationCount > 0 && (
        <span className="absolute top-2 right-4 z-10 ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
          {notificationCount}
        </span>
      )}
    </button>
  );
};

export default NotificationButton;
