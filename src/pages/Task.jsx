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
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-indigo-600"></span>
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
          Task: {data.title}
        </h1>
        {data.dueTo && (
          <p className="text-sm text-slate-600">
            Due: <span className="font-medium">{data.dueTo}</span>
          </p>
        )}
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {data.comments.length === 0 ? (
          <p className="text-center text-slate-500">No comments yet</p>
        ) : (
          data.comments.map((comment) => (
            <div
              key={comment.id}
              className={`chat ${
                comment.uid === user.uid ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full">
                  <img src={comment.photoURL} alt="avatar" />
                </div>
              </div>
              <div className="chat-header">
                {comment.displayName}
              </div>
              <div
                className={`chat-bubble ${
                  comment.uid === user.uid
                    ? "chat-bubble-primary"
                    : "chat-bubble-secondary"
                }`}
              >
                {comment.text}
              </div>
            </div>
          ))
        )}
      </main>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 flex items-center gap-2 border-t"
      >
        <input
          type="text"
          name="comment"
          placeholder="Type a message..."
          className="input input-bordered flex-1 rounded-full"
        />
        <button
          type="submit"
          className="btn btn-primary rounded-full px-6"
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
