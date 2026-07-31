import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import logo from "/logo2.png";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) return;

    try {
      setLoading(true);

      // TODO:
      // const response = await login(form);

      console.log(form);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-white px-6"
    >
      <div className="w-full max-w-md">

        {/* Logo */}

        <div className="mb-10 flex justify-center">
          <img
            src={logo}
            alt="Recovery"
            className="w-40 object-contain"
          />
        </div>

        {/* Title */}

        <h1 className="text-center text-5xl font-bold text-[#111827]">
          تسجيل الدخول
        </h1>

        <p className="mt-3 text-center text-lg text-gray-500">
          الرجاء تسجيل البيانات للمتابعة
        </p>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >

          {/* Email */}

          <div>
            <label className="mb-2 block text-lg font-medium text-[#1F2937]">
              البريد الإلكتروني
            </label>

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  pr-4
                  pl-12
                  text-right
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-[#35C759]
                  focus:ring-2
                  focus:ring-[#35C759]/10
                "
              />

            </div>
          </div>

          {/* Password */}

          <div>
            <label className="mb-2 block text-lg font-medium text-[#1F2937]">
              كلمة المرور
            </label>

            <div className="relative">

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

              <Lock
                size={20}
                className="absolute left-12 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="
                  h-14
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  pr-4
                  pl-20
                  text-right
                  outline-none
                  transition
                  placeholder:text-gray-400
                  focus:border-[#35C759]
                  focus:ring-2
                  focus:ring-[#35C759]/10
                "
              />

            </div>
          </div>

          {/* Remember + Forgot */}

          <div className="flex items-center justify-between">

            <Link
              to="/forgot-password"
              className="
                text-sm
                font-medium
                text-[#247C5A]
                transition
                hover:underline
              "
            >
              نسيت كلمة المرور؟
            </Link>

            <label className="flex items-center gap-2 text-sm">

              <span>تذكرني</span>

              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 accent-[#35C759]"
              />

            </label>

          </div>

          {/* Login */}

          <button
            type="submit"
            disabled={
              loading ||
              !form.email ||
              !form.password
            }
            className="
              mt-2
              h-14
              w-full
              rounded-xl
              bg-[#35C759]
              text-lg
              font-semibold
              text-white
              transition
              hover:bg-[#2FB350]
              disabled:cursor-not-allowed
              disabled:bg-gray-300
            "
          >
            {loading
              ? "جاري تسجيل الدخول..."
              : "تسجيل الدخول"}
          </button>

        </form>

      </div>
    </main>
  );
};

export default LoginPage;