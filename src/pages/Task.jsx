import { useParams } from "react-router-dom";
import useDocument from "../hooks/useDocument";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Task() {
  const { id } = useParams();
  const { data } = useDocument("tasks", id);
  const { user } = useSelector((store) => store.userList);
  const [loading, setLoading] = useState(false);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <span className="loading loading-spinner loading-lg text-indigo-400"></span>
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment")?.trim();
    if (!comment) return;

    const newComment = {
      text: comment,
      id: Math.random(),
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
    };

    try {
      setLoading(true);
      const commentRef = doc(db, "tasks", data.id);
      await updateDoc(commentRef, {
        comments: [...data.comments, newComment],
      });
      e.target.reset();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700 shadow p-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">
          Task: {data.title}
        </h1>
        {data.dueTo && (
          <p className="text-sm text-gray-400">
            Due: <span className="font-medium text-gray-200">{data.dueTo}</span>
          </p>
        )}
      </header>

      {/* Comments */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {data.comments.length === 0 ? (
          <p className="text-center text-gray-400">No comments yet</p>
        ) : (
          data.comments.map((comment) => (
            <div
              key={comment.id}
              className={`chat ${
                comment.uid === user.uid ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full border border-slate-600">
                  <img src={comment.photoURL} alt="avatar" />
                </div>
              </div>
              <div className="chat-header text-gray-300">
                {comment.displayName}
              </div>
              <div
                className={`chat-bubble ${
                  comment.uid === user.uid
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-700 text-gray-100"
                }`}
              >
                {comment.text}
              </div>
            </div>
          ))
        )}
      </main>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 border-t border-slate-700 p-4 flex items-center gap-2"
      >
        <input
          type="text"
          name="comment"
          placeholder="Type a message..."
          className="input input-bordered flex-1 rounded-full bg-slate-900 border-slate-700 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Send"
          )}
        </button>
      </form>
    </div>
  );
}
