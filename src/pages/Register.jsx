import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect, useState } from "react";
import { formError } from "../components/ErrorId";
import { useRegister } from "../hooks/useRegister";
import { toast } from "sonner";
import { useGoogle } from "../hooks/useGoogle";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

export default function Register() {
  const user = useActionData();
  const [error, setError] = useState(null);
  const { register, isPending, error: _error } = useRegister();
  const {error: errorGoogle, googleProvider, isPending:isPendingGoogle} = useGoogle()
 console.log(errorGoogle);
 
  useEffect(() => {
    if (user?.name && user?.email && user?.password) {
      register(user);
      setError(false);
    } else {
      setError(user ? formError(user) : false);
    }
  }, [user]);

  useEffect(() => {
          if (_error) {
            toast.error(_error);
          }
        }, [_error])

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg p-8 text-white">
        <div className="flex flex-col items-center gap-2 mb-6 text-center">
          <p className="font-normal text-gray-400">Register your account</p>
          <h2 className="text-3xl md:text-4xl font-bold">Welcome Back!</h2>
          <p className="font-normal text-gray-400">
            Already a Member?
            <Link to="/login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>

        <Form method="post" className="flex flex-col gap-4">
          <FormInput type="text" label="Name" name="name" />
          <FormInput type="email" label="Email" name="email" />
          <FormInput type="password" label="Password" name="password" />

          {!isPending && (
            <button className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2 text-lg font-semibold shadow-md">
              Register
            </button>
          )}
          {isPending && (
            <button
              className="btn btn-block transition-colors rounded-lg py-2 text-lg font-semibold shadow-md"
              disabled="disabled"
            >
              Loading...
            </button>
          )}
          {!isPendingGoogle && (
            <button onClick={() => googleProvider()} type="button" className="bg-blue-600 hover:bg-blue-700 transition-colors rounded-lg py-2 text-lg font-semibold shadow-md">
              Register with Google
            </button>
          )}
          {isPendingGoogle && (
            <button
              className="btn btn-block transition-colors rounded-lg py-2 text-lg font-semibold shadow-md"
              disabled="disabled"
            >
              Loading...
            </button>
          )}
        </Form>


      </div>
    </div>
  );
}
