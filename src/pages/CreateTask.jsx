import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "sonner";
import { useCollection } from "../hooks/useCollection";
import Select, { components } from "react-select";

export default function CreateTask() {
  const { data } = useCollection("users");
  const [userOptions, setUserOptions] = useState([]);
  const [attachedUsers, setAttachedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const users = data.map((user) => ({
        value: user.displayName,
        label: user.displayName,
        photoURL: user.photoURL,
        uid: user.uid,
      }));
      setUserOptions(users);
    }
  }, [data]);

  const CustomOption = (props) => (
    <components.Option {...props}>
      <div className="flex items-center gap-2">
        <img
          src={props.data.photoURL}
          alt={props.data.label}
          className="w-6 h-6 rounded-full"
        />
        <span>{props.data.label}</span>
      </div>
    </components.Option>
  );

  const CustomMultiValueLabel = (props) => (
    <components.MultiValueLabel {...props}>
      <div className="flex items-center gap-1">
        <img
          src={props.data.photoURL}
          alt={props.data.label}
          className="w-5 h-5 rounded-full"
        />
        <span>{props.data.label}</span>
      </div>
    </components.MultiValueLabel>
  );

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const title = formData.get("title");
    const description = formData.get("description");
    const dueTo = formData.get("due-to");

    if (!title) {
      toast.error("Please enter a task title!");
      return;
    }
    if (!description) {
      toast.error("Please enter a task description!");
      return;
    }
    if (!dueTo) {
      toast.error("Please select a due date!");
      return;
    }

    const task = {
      title,
      description,
      attachedUsers,
      dueTo,
      comments: [],
    };

    try {
      await addDoc(collection(db, "tasks"), { ...task });
      toast.success("Task created successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to create task!");
      console.error(err);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 px-4 sm:px-6 lg:px-8 text-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg bg-slate-800 shadow-lg rounded-2xl p-6 sm:p-8 space-y-6 border border-slate-700"
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-white text-center">
          Create New Task
        </h2>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 sm:px-4 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Write task details..."
            rows={4}
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 sm:px-4 py-2 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Due Date
          </label>
          <input
            type="date"
            name="due-to"
            className="w-full rounded-xl border border-slate-700 bg-slate-900 px-3 sm:px-4 py-2 text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Assign Users
          </label>
          <Select
            isMulti
            name="users"
            options={userOptions}
            className="react-select-container"
            classNamePrefix="react-select"
            components={{
              Option: CustomOption,
              MultiValueLabel: CustomMultiValueLabel,
            }}
            value={attachedUsers}
            onChange={(selected) => setAttachedUsers(selected || [])}
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#0f172a", // slate-900
                borderColor: "#334155", // slate-700
                color: "white",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "#1e293b", // slate-800
                color: "white",
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#334155", // slate-700
              }),
              input: (base) => ({
                ...base,
                color: "white",
              }),
              singleValue: (base) => ({
                ...base,
                color: "white",
              }),
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 sm:py-2.5 rounded-xl font-medium shadow-md hover:bg-indigo-700 transition-all"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}
