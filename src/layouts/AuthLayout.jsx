import { Outlet, useLocation } from "react-router-dom";

export default function AuthLayout() {
  const location = useLocation();
  
  // Fixing the path matching issue by adding leading slashes to paths
  const isLoginPage = location.pathname === '/Login';
  const isRegisterPage = location.pathname === '/Register';
  const isForgotPasswordPage = location.pathname === '/Forgot';

  return (
    <div className="min-h-screen w-full flex">
      {/* Left: Form Login/Register */}
      <div className="w-1/2 bg-white flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      {/* Right: Panel with different content based on the page */}
      <div className="w-1/2 bg-gradient-to-br from-green-500 to-green-400 text-white flex flex-col items-center justify-center p-10 relative">
        {isLoginPage && (
          <>
            <h2 className="text-3xl font-bold mb-4">New Here?</h2>
            <p className="mb-6 text-center max-w-sm">
              Sign up and discover a great amount of new opportunities!
            </p>
            <a
              href="/Register"
              className="bg-white text-green-500 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition"
            >
              Sign Up
            </a>
          </>
        )}

        {isRegisterPage && (
          <>
            <h2 className="text-3xl font-bold mb-4">Already have an account?</h2>
            <p className="mb-6 text-center max-w-sm">
              If you already have an account, log in to continue.
            </p>
            <a
              href="/Login"
              className="bg-white text-green-500 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition"
            >
              Log In
            </a>
          </>
        )}

        {isForgotPasswordPage && (
          <>
            <h2 className="text-3xl font-bold mb-4">Forgot Your Account?</h2>
            <p className="mb-6 text-center max-w-sm">
              If you've forgotten your account, please log in.
            </p>
            <a
              href="/Login"
              className="bg-white text-green-500 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition"
            >
              Sign In
            </a>
          </>
        )}
      </div>
    </div>
  );
}
