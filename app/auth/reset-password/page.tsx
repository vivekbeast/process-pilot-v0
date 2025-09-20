"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle, ArrowLeft, Key, Sparkles, Shield } from "lucide-react";
import NavBar from "../../../components/NavBar";

export default function ResetPasswordPage() {
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleResetPassword = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Password has been reset successfully! Redirecting to login...");
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        setError(data.message || "Password reset failed.");
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
              Set New Password
            </div>
          </div>

          {/* Reset Password Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-slate-600 to-slate-700 px-8 py-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <Shield className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h2 className="text-white text-xl font-bold">Reset Password</h2>
                    <p className="text-slate-300 text-sm">Create your new secure password</p>
                  </div>
                </div>
              </div>

              {/* Form Body */}
              <div className="px-8 py-8">
                {/* Back to Login Link */}
                <div className="mb-6">
                  <Link href="/auth/login" className="inline-flex items-center text-sm text-gray-600 hover:text-amber-600 transition-colors font-medium">
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
                        Enter the OTP from your email and create a new secure password.
                      </p>
                    </div>

                    <form onSubmit={handleResetPassword} className="space-y-6">
                      {/* OTP Field */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Verification Code (OTP)
                        </label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                          <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 text-gray-900 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-gray-50 hover:bg-white transition-all duration-200 text-sm font-medium placeholder-gray-400 text-center tracking-widest"
                            placeholder="000000"
                            required
                            maxLength={6}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Enter the 6-digit code sent to your email</p>
                      </div>

                      {/* New Password Field */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-gray-50 hover:bg-white transition-all duration-200 text-sm font-medium placeholder-gray-400"
                            placeholder="Create a secure password"
                            required
                            minLength={8}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Minimum 8 characters required</p>
                      </div>

                      {/* Confirm New Password Field */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-amber-500 transition-colors" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 bg-gray-50 hover:bg-white transition-all duration-200 text-sm font-medium placeholder-gray-400"
                            placeholder="Confirm your new password"
                            required
                          />
                        </div>
                        {password && confirmPassword && (
                          <p className={`text-xs mt-1 ${password === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                            {password === confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
                          </p>
                        )}
                      </div>

                      {/* Password Strength Indicators */}
                      {password && (
                        <div className="bg-gray-50 rounded-xl p-4">
                          <p className="text-xs font-semibold text-gray-700 mb-2">Password Requirements:</p>
                          <div className="space-y-1">
                            <div className={`flex items-center text-xs ${password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                              <span className="mr-2">{password.length >= 8 ? '✓' : '○'}</span>
                              At least 8 characters
                            </div>
                            <div className={`flex items-center text-xs ${/[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                              <span className="mr-2">{/[A-Z]/.test(password) ? '✓' : '○'}</span>
                              Contains uppercase letter
                            </div>
                            <div className={`flex items-center text-xs ${/[a-z]/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                              <span className="mr-2">{/[a-z]/.test(password) ? '✓' : '○'}</span>
                              Contains lowercase letter
                            </div>
                            <div className={`flex items-center text-xs ${/\d/.test(password) ? 'text-green-600' : 'text-gray-500'}`}>
                              <span className="mr-2">{/\d/.test(password) ? '✓' : '○'}</span>
                              Contains number
                            </div>
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isLoading || !otp || !password || !confirmPassword || password !== confirmPassword}
                        className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 px-6 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:scale-100 disabled:shadow-none flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Resetting Password...
                          </>
                        ) : (
                          <>
                            <Shield className="w-4 h-4" />
                            Reset Password
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}

                {success && (
                  <div className="text-center space-y-4">
                    <div className="text-sm text-gray-600">
                      <p className="mb-3">Your password has been successfully reset.</p>
                      <p>You can now sign in with your new password.</p>
                    </div>
                  </div>
                )}

                {/* Footer */}
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    Didnt receive the code?{" "}
                    <Link href="/auth/forgot-password" className="font-semibold text-amber-600 hover:text-amber-700 hover:underline transition-colors">
                      Request new one
                    </Link>
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    Your password will be encrypted and stored securely
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