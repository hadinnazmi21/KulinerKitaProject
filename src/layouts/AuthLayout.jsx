import { Outlet, useLocation, Link } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isForgotPasswordPage = location.pathname === "/forgot";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
      {/* Form tanpa card */}
      <div className="w-full max-w-md p-0">
        <Outlet />
      </div>

      {/* Panel info tanpa card */}
      <div className="mt-8 max-w-md text-center text-gray-700">
        {isLoginPage && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-green-600">New Here?</h2>
            <p className="mb-4">
              Sign up and discover a great amount of new opportunities!
            </p>
            <Link
              to="/register"
              className="inline-block bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition"
            >
              Sign Up
            </Link>
          </>
        )}

        {isRegisterPage && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Already have an account?</h2>
            <p className="mb-4">
              If you already have an account, log in to continue.
            </p>
            <Link
              to="/login"
              className="inline-block bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition"
            >
              Log In
            </Link>
          </>
        )}

        {isForgotPasswordPage && (
          <>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Forgot Your Account?</h2>
            <p className="mb-4">
              If you've forgotten your account, please log in.
            </p>
            <Link
              to="/login"
              className="inline-block bg-green-500 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-600 transition"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
