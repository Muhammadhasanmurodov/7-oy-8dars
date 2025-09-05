import { useState } from "react";
import { auth } from "../firebase/config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { firebaseErrorMessage } from "../components/ErrorId";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export const useGoogle = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const googleProvider = async () => {
    try {
      setIsPending(true);
      const provider = new GoogleAuthProvider()

      const req = await signInWithPopup(auth, provider)
      if (!req.user) {
        throw new Error("Registration failed!");
      }
     

      await setDoc(doc(db, "users", req.user.uid), {
        displayName: req.user.displayName,
        photoURL: req.user.photoURL,
        online: true,
        uid: req.user.uid,
      });
      dispatch(login(req.user));
      console.log(req.user);
    } catch (error) {
      setError(firebaseErrorMessage(error.message));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return { googleProvider, error, isPending };
};
