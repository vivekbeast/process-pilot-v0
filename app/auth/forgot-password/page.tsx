"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { User, Mail, CheckCircle2, AlertCircle, ArrowLeft, Key, Sparkles } from "lucide-react";
import NavBar from "../../../components/NavBar";

export default function ForgotPasswordPage() {
  const [loginId, setLoginId] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleForgotPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Password reset instructions have been sent to your email address.");
        // Don't redirect automatically for security - let user go back manually
      } else {
        setError(data.message || "Password reset request failed.");
      }
    } catch (err) {
      setError("Server not reachable. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <nav><NavBar /></nav>
      
      {/* Hero Background Section */}
      <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full opacity-20 blur-xl animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-20 blur-xl animate-pulse animation-delay-2000"></div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 gap-12 items-center">
          
          {/* Welcome Content */}
          <div className="text-center space-y-6">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-full px-4 py-2 text-sm font-medium text-amber-800 mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              Password Recovery
            </div>
          </div>

          {/* Forgot Password Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Key className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold">Reset Password</h2>
                    <p className="text-slate-300 text-sm">Recover your ProcessPilot account</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="px-8 py-8">
                {/* Back to Login Link */}
                <div className="mb-6">
                  <Link href="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-amber-600 transition-colors font-medium">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Sign In
                  </Link>
                </div>

                {success && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 animate-fadeIn">
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-green-800 text-sm font-medium">{success}</span>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 animate-fadeIn">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                      <span className="text-red-800 text-sm font-medium">{error}</span>
                    </div>
                  </div>
                )}

                {!success && (
                  <>
                    <div className="text-center mb-6">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        Enter your Login ID and email address to receive password reset instructions.
                      </p>
                    </div>

                    <form onSubmit={handleForgotPassword} className="space-y-6">
                      {/* Login ID Field */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Login ID
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                          <input
                            type="text"
                            value={loginId}
                            onChange={(e) => setLoginId(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 text-gray-900 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-gray-50 hover:bg-white transition-all duration-200 text-sm font-medium placeholder-gray-400"
                            placeholder="Enter your Login ID"
                            required
                          />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-gray-50 hover:bg-white transition-all duration-200 text-sm font-medium placeholder-gray-400"
                            placeholder="your.email@company.com"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Sending Instructions...
                          </>
                        ) : (
                          <>
                            <Key className="w-4 h-4" />
                            Send Reset Instructions
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}

                {success && (
                  <div className="text-center space-y-4">
                    <div className="text-sm text-gray-600">
                      <p className="mb-3">Check your email inbox and spam folder for the reset link.</p>
                      <p>The reset link will expire in 24 hours for security.</p>
                    </div>
                    <Link 
                      href="/login"
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to Sign In
                    </Link>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Remember your password?{" "}
                    <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                      Sign in here
                    </Link>
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    Need help? Contact our support team
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}