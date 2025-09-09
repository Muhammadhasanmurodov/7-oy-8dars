import { useDispatch, useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { action as registerAction } from "./pages/Register";
import { action as loginAction } from "./pages/Login";
import { Toaster } from "sonner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { useEffect } from "react";
import { isAuthReady, login } from "./app/features/userSlice";
import CreateTask from "./pages/CreateTask";
import Task from "./pages/Task";
import Profile from "./pages/Profile";

export default function App() {
  const { user, authReady } = useSelector((store) => store.userList);
  const dispatch = useDispatch();
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/createTask",
          element: <CreateTask />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: `/task/:id`,
          element: <Task />,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction,
    },
    {
      path: "/register",
      element: user ? <Navigate to="/" /> : <Register />,
      action: registerAction,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user?.displayName) {
        dispatch(login(user));
      }
      dispatch(isAuthReady());
    });
  }, []);

  return (
    <>
      {authReady && <RouterProvider router={routes} />}
      <Toaster position="top-right" richColors />
    </>
  );
}
