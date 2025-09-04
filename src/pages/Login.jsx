import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useLogin } from "../hooks/useLogin";
import { useEffect, useState } from "react";
import { formError } from "../components/ErrorId";
import { toast } from "sonner";
import { useResetPassword } from "../hooks/useResetPassword";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

export default function Login() {
  const user = useActionData();
  const [forgetPassword, setForgetPassword] = useState(false);
  const [error, setError] = useState(null);
  const { _login, error: _error, isPending } = useLogin();
  const { resetPassword } = useResetPassword();

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }

    if (user?.emailRecovery) {
      resetPassword(user.emailRecovery);
      setError(false)
    }
  }, [user]);

  useEffect(() => {
    if (_error) {
      toast.error(_error);
    }
  }, [_error]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-white">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <p className="font-normal text-gray-400">Log In.</p>
          <h2 className="text-3xl md:text-4xl font-bold">Welcome Back!</h2>
          <p className="font-normal text-gray-400">
            Don't have an account?
            <Link to="/register" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>

        {!forgetPassword && (
          <Form method="post" className="flex flex-col gap-4">
            <FormInput type="email" label="Email" name="email" />
            <FormInput type="password" label="Password" name="password" />

            <button className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2 text-lg font-semibold shadow-md">
              Log in
            </button>
          </Form>
        )}
        {forgetPassword && (
          <Form method="post" className="flex flex-col gap-4">
            <FormInput type="email" label="Email" name="emailRecovery" />
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2 text-lg font-semibold shadow-md">
              Send
            </button>
          </Form>
        )}

        {!forgetPassword && <button onClick={() => setForgetPassword(!forgetPassword)} className="btn btn-neutral mt-[20px]">Forget Password</button>}
        {forgetPassword && <button onClick={() => setForgetPassword(!forgetPassword)} className="btn btn-neutral mt-[20px]">Show Login</button>}
      </div>
    </div>
  );
}
