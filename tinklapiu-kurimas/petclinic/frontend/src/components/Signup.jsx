import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const { data: response } = await axios.post(
        `${API_URL}/users/signup`,
        formData,
        {
          withCredentials: true,
        }
      );
      setError(null);
      navigate("/appointments");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(error.response.data.message || "An error occurred.");
        } else if (error.request) {
          setError("No response from the server.");
        } else {
          setError("Something went wrong.");
        }
      } else {
        setError("An error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 p-8 bg-white rounded-lg shadow-lg w-full sm:w-96"
      >
        <h2 className="text-2xl font-bold text-center text-purple-700">
          Sign Up
        </h2>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Username Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("passwordconfirm", {
              required: "Confirm password is required",
            })}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.passwordconfirm && (
            <p className="text-red-500 text-sm">
              {errors.passwordconfirm.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-purple-700 text-white font-semibold rounded-md hover:bg-purple-800 transition duration-300"
        >
          Sign Up
        </button>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link to="/" className="text-purple-700 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
