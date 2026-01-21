import React, { useContext, useState } from "react";
import { Authcontext } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const SignUp = () => {
  const { getRegister, loading } = useContext(Authcontext);
  const [name, SetName] = useState('')
  const [email, SetEmail] = useState('')
  const [password, SetPassword] = useState('')
  const [hide, SetHide] = useState(false)
  const navigate = useNavigate();


  const handleregister = () => {
    getRegister(name, email, password)
    SetEmail('')
    SetName('')
    SetPassword('')
     navigate('/login')
  }


  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-8">

        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-linear-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 shadow-md">
            <span className="text-white text-2xl font-bold">✨</span>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Create Account
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Sign up to start your journey
          </p>
        </div>

        {/* Name */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-600 mb-1 tracking-wide">
            FULL NAME
          </label>

          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
            <span className="text-gray-400">👤</span>
            <input
              type="text"
              placeholder="Alex Johnson"
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              onChange={(e) => SetName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-xs font-semibold text-gray-600 mb-1 tracking-wide">
            EMAIL
          </label>

          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
            <span className="text-gray-400">📧</span>
            <input
              type="email"
              placeholder="alex@timetoprogram.com"
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              onChange={(e) => SetEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-600 mb-1 tracking-wide">
            PASSWORD
          </label>

          <div className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-3 focus-within:border-green-500 focus-within:ring-2 focus-within:ring-green-100 transition">
            <span className="text-gray-400">🔒</span>
            <input
              type={hide ? "password" : "text"}
              placeholder="••••••••"
              className="w-full text-sm text-gray-700 placeholder-gray-400 outline-none bg-transparent"
              onChange={(e) => SetPassword(e.target.value)}
            />
            {hide ? <EyeOff className="text-gray-700" onClick={() => SetHide((prev) => !prev)} /> : <Eye className="text-gray-700" onClick={() => SetHide((prev) => !prev)} />}
          </div>
          <div className="mt-5">
            <p className="  text-red-600">note*</p>
            <ul className="mt-3 space-y-1 text-xs text-gray-500">
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span>
                Minimum 6 characters
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span>
                At least one uppercase letter (A–Z)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span>
                At least one lowercase letter (a–z)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span>
                At least one number (0–9)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-500">•</span>
                At least one special character (!@#$%^&*)
              </li>
            </ul>

          </div>


        </div>

        {/* Button */}
        <button className="w-full bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200" onClick={handleregister}>
          Sign Up →
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-green-600 font-medium cursor-pointer hover:underline" onClick={() => navigate('/login')}>
            {loading ? "Signing" : "Sign in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
