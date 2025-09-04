import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import { formError } from "../components/ErrorId";
import { toast } from "sonner";

export const useResetPassword = () => {
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/",
      });
      toast.success("Check your email")
    } catch (error) {
      const errorMessage = error.message;
      formError(errorMessage);
    }
  };
  return { resetPassword };
};
