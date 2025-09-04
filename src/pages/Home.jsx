import { toast } from "sonner";
import useLogout from "../hooks/useLogout";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import { Link } from "react-router-dom";

export default function Home() {
  const { _logout, error, isPending } = useLogout();
  const { user } = useSelector((store) => store.userList);
  const { data: users } = useCollection("users");
  const { data: tasks } = useCollection("tasks");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-slate-800 border-b md:border-r border-slate-700 shadow-md flex flex-col items-center p-6">
        <div className="flex flex-col items-center space-y-3">
          <img
            src={user.photoURL}
            alt="avatar"
            className="w-20 h-20 rounded-full shadow-md border-2 border-slate-700"
          />
          <h2 className="text-xl font-semibold text-white">
            {user.displayName}
          </h2>
        </div>

        <div className="mt-6 w-full">
          {!isPending && (
            <button
              className="w-full bg-indigo-600 text-white py-2.5 rounded-xl font-medium shadow hover:bg-indigo-700 transition-all"
              onClick={_logout}
            >
              Log Out
            </button>
          )}
          {isPending && (
            <button
              className="w-full bg-indigo-400 text-white py-2.5 rounded-xl font-medium shadow cursor-not-allowed"
              disabled
            >
              Loading...
            </button>
          )}
        </div>

        <Link
          to="/createTask"
          className="mt-6 w-full bg-green-600 text-white py-2.5 rounded-xl font-medium shadow hover:bg-green-700 text-center transition-all"
        >
          + Create Task
        </Link>

        {error && toast.error(error)}
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 space-y-8 overflow-y-auto">
        {/* Users */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Users</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users &&
              users.map((u) => (
                <div
                  key={u.uid}
                  className="p-4 bg-slate-800 border border-slate-700 rounded-2xl shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={u.photoURL}
                      alt={u.displayName}
                      className="w-12 h-12 rounded-full shadow border border-slate-600"
                    />
                    <div>
                      <h4 className="text-lg font-medium text-gray-100">
                        {u.displayName}
                      </h4>
                      <p
                        className={`mt-1 text-sm font-semibold ${
                          u.online ? "text-green-500" : "text-gray-400"
                        }`}
                      >
                        {u.online ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* Tasks */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-4">Tasks</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tasks &&
              tasks.map((task) => (
                <div
                  key={task.uid}
                  className="p-4 bg-slate-800 border border-slate-700 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
                >
                  <Link to={`/task/${task.uid}`}>
                    <h5 className="text-lg font-semibold text-gray-100">
                      {task.title}
                    </h5>
                    {task.dueTo && (
                      <p className="text-sm text-gray-400 mt-2">
                        Due: {task.dueTo}
                      </p>
                    )}
                    {task.attachedUsers && task.attachedUsers.length > 0 && (
                      <div className="flex -space-x-2 mt-3">
                        {task.attachedUsers.slice(0, 3).map((u) => (
                          <img
                            key={u.uid}
                            src={u.photoURL}
                            alt={u.label}
                            className="w-8 h-8 rounded-full border-2 border-slate-800 shadow"
                          />
                        ))}
                        {task.attachedUsers.length > 3 && (
                          <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700 text-xs text-gray-200 border border-slate-800">
                            +{task.attachedUsers.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                </div>
              ))}
          </div>
        </section>
      </main>
    </div>
  );
}
