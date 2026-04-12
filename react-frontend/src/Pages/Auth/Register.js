import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../rtk/authSlice/authSlice";
import LoadingSpinner from "../../Components/Loading/loading.js";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      setForm({ name: "", email: "", password: "" });
    }
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
        <form
          onSubmit={handleSubmit}
          className="p-8 w-full max-w-md rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30"
        >
          <h1 className="mb-6 text-center text-3xl font-bold text-white">
            Register to Your Account
          </h1>

          {error && (
            <div className="mb-4 p-3 bg-red-500/30 border border-red-400 rounded-lg backdrop-blur-sm">
              <div className="flex items-start gap-2">
                <svg
                  className="w-5 h-5 text-white flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-white text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="my-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Name:
            </label>
            <input
              id="name"
              type="text"
              required
              minLength={3}
              placeholder="Enter your name..."
              value={form.name}
              name="name"
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="example@email.com"
              value={form.email}
              name="email"
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="my-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password..."
              value={form.password}
              name="password"
              required
              minLength={6}
              onChange={handleChange}
              disabled={isLoading}
              className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 text-white placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-white/70">
             It must be at least 6 letters long.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-white text-blue-600 py-3 font-bold transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              Register
            </button>

            <div className="flex items-center gap-3 w-full my-2">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-white/70 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            <a href="http://127.0.0.1:8000/login-google" className="w-full">
              <button
                type="button"
                disabled={isLoading}
                className="w-full rounded-lg bg-white/20 py-3 font-bold text-white border border-white/40 transition-all hover:bg-white/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Login with Google
              </button>
            </a>

            <p className="text-white/80 text-sm mt-2">
              Do you already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-white font-semibold underline hover:text-white/80 transition-colors"
              >
                Login
              </button>
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
