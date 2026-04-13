import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../rtk/authSlice/authSlice";
import LoadingSpinner from "../../Components/Loading/loading.js";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAt, faLock, faEye } from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons"; 
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.state?.email && location.state?.password) {
      setForm({
        email: location.state.email,
        password: location.state.password,
      });
    }
  }, [location.state]);

  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

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

    const result = dispatch(loginUser(form));
    isAuthenticated && navigate("/");

    if (loginUser.fulfilled.match(result)) {
      setForm({ email: "", password: "" });
    }
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}

      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-4">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="p-8 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30"
          >
            {error && (
              <div
                div
                className="mb-4 p-3 bg-red-500/30 border border-red-400 rounded-lg backdrop-blur-sm animate-shake"
              >
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
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{error}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => dispatch(clearError())}
                    className="text-white/80 hover:text-white"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-white"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 pl-11 text-white placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <FontAwesomeIcon
                  icon={faAt}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-white"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  minLength={6}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-3 pl-11 pr-11 text-white placeholder:text-white/60 focus:border-white focus:ring-2 focus:ring-white/50 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7-1.274 4.057-5.064 7-9.543 7-4.478 0-8.268-2.943-9.543-7a10.025 10.025 0 014.134-5.411z"
                      />
                    </svg>
                  ) : (
                    <FontAwesomeIcon icon={faEye} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/30 bg-white/10 text-blue-600 focus:ring-2 focus:ring-white/50"
                />
                <span className="text-sm text-white/80">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-white hover:text-white/80 transition-colors underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-white text-blue-600 py-3 font-bold transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg mb-4"
            >
              Login
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="text-white/70 text-sm">OR</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            <a href="http://127.0.0.1:8000/login-google" className="block">
              <button
                type="button"
                disabled={isLoading}
                className="w-full rounded-lg bg-white/20 py-3 font-bold text-white border border-white/40 transition-all hover:bg-white/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
                Login With Google
              </button>
            </a>

            <p className="text-white/80 text-sm text-center mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-white font-semibold underline hover:text-white/80 transition-colors"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
