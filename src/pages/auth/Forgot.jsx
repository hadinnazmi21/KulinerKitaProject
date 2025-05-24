export default function Forgot() {
    return (
        <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Forgot Your Password?
            </h2>
            
            <p className="text-sm text-gray-500 mb-6">
                Enter your email address and we'll send you a link to reset your password.
            </p>

            <form className="space-y-4 text-left">
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 rounded-full bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                        placeholder="you@example.com"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-full transition"
                >
                    Send Reset Link
                </button>
            </form>
        </div>
    )
}
