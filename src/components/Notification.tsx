import { useEffect } from "react";

interface NotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 max-w-xs w-full shadow-lg rounded-lg px-4 py-3 text-white flex justify-between items-center transition-all duration-500 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      }`}
      style={{ zIndex: 9999 }} // Ensure it's above other elements
    >
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-3 text-white text-lg font-bold focus:outline-none"
        aria-label="Close notification"
      >
        ✖
      </button>
    </div>
  );
};

export default Notification;
