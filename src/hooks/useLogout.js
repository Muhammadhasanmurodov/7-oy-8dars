import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { firebaseErrorMessage } from "../components/ErrorId";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../app/features/userSlice";
import { doc, updateDoc } from "firebase/firestore";

export default function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.userList);
  const _logout = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        online: false,
      });
      setIsPending(true);
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      setError(firebaseErrorMessage(error.message));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _logout, isPending, error };
}
