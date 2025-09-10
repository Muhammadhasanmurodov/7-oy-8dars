import { useParams } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

export default function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection("users", null, ["uid", "==", id]);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-gray-400 animate-pulse">Loading user info...</p>
      </div>
    );
  }

  const user = data[0];

  return (
    <div
      className="flex justify-center items-center min-h-screen 
                    bg-gray-900 "
    >
      <div
        className="flex flex-col items-center gap-4 p-6 max-w-sm w-full 
                      bg-gray-800 rounded-2xl shadow-xl
                "
      >
        <img
          src={user.photoURL}
          alt={user.displayName}
          className="w-20 h-20 rounded-full shadow-md"
        />
        <h3 className="text-lg font-semibold text-gray-200">
          {user.displayName}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm
            ${
              user.online
                ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
            }`}
        >
          {user.online ? "Online" : "Offline"}
        </span>
      </div>
    </div>
  );
}
