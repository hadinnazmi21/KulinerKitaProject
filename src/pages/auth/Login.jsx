import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

export default function Login() {
  /* navigate, state & handleChange*/
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  /* process form */
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then((response) => {
        // Jika status bukan 200, tampilkan pesan error
        if (response.status !== 200) {
          setError(response.data.message);
          return;
        }

        // Redirect ke dashboard jika login sukses
        navigate("/");
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError(err.message || "An unknown error occurred");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  /* error & loading status */
  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  const loadingInfo = loading ? (
    <div className="bg-gray-200 mb-5 p-5 text-sm rounded flex items-center">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Login to Your Account
      </h1>
      <p className="text-gray-500 mb-6">Login using social networks</p>

      {/* Social buttons (dummy, optional) */}
      <div className="flex justify-center gap-4 mb-6">
        <button className="bg-blue-900 text-white rounded-full w-10 h-10">
          f
        </button>
        <button className="bg-red-500 text-white rounded-full w-10 h-10">
          G+
        </button>
        <button className="bg-blue-700 text-white rounded-full w-10 h-10">
          in
        </button>
      </div>

      <div className="flex items-center mb-4">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2 text-gray-400 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 text-sm mb-4 p-3 rounded flex items-center">
          <BsFillExclamationDiamondFill className="me-2" />
          {error}
        </div>
      )}

      {loading && (
        <div className="bg-gray-100 text-gray-600 text-sm mb-4 p-3 rounded flex items-center justify-center">
          <ImSpinner2 className="me-2 animate-spin" /> Mohon Tunggu...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-full transition"
        >
          Sign In
        </button>

        <div className="flex justify-between text-sm mt-3 text-green-600">
          <a href="/Forgot" className="hover:underline">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
}
