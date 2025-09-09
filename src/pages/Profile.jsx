import { sendEmailVerification } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { toast } from "sonner";
import { useCollection } from "../hooks/useCollection";
export default function Profile() {
  const { user } = useSelector((store) => store.userList);

  const { data } = useCollection(
    "users",
    false,
    ["uid", "==", auth.currentUser.uid] 
  );

  // console.log(data);
  
  

  
  
  
  

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success("Check your email 📩");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 text-white rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center text-center">
          <img
            src={user.photoURL || "https://via.placeholder.com/100"}
            alt="avatar"
            className="w-24 h-24 rounded-full border-4 border-gray-700 shadow-md object-cover"
          />
          <h3 className="mt-4 text-xl font-semibold">{user.displayName}</h3>
          <p className="text-gray-400 text-sm">{user.email}</p>
        </div>

        <div className="mt-6 bg-gray-700 rounded-lg p-4 text-center">
          {user.emailVerified ? (
            <p className="text-green-400 font-medium">✅ Email Verified</p>
          ) : (
            <>
              <p className="text-red-400 font-medium mb-3">
                ❌ Email Not Verified
              </p>
              <button
                onClick={sendEmailLink}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-xl font-medium transition"
              >
                Send Verification Link
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
