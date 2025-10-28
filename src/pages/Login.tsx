import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft,Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { login} from "../api/auth";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginForm>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loadingForgot, setLoadingForgot] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const data = await login({
        username: formData.username,
        passwordHash: formData.password
      });
      setLoading(false);

      if (data.role === "NGO_COORDINATOR") {
        if (!data.ngoProfile) {
          navigate("/NGORegister");
          return;
        }
        const status = (data.ngoProfile.verificationStatus || "").toUpperCase().trim();
        if (status === "APPROVED") {
          navigate("/dashboard/ngo-coordinator");
          return;
        } else {
          toast.info("Your NGO registration is pending admin approval.");
          navigate("/");
          return;
        }
      }

      switch (data.role) {
        case "ADMIN":
          navigate("/dashboard/admin");
          break;
        case "VOLUNTEER":
        case "VOLUNTEER_LEADER":
          navigate("/dashboard/volunteer");
          break;
        case "PROGRAM_MANAGER":
          navigate("/dashboard/program-manager");
          break;
        default:
          toast.error("Invalid role or credentials");
      }
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>

          <div className="max-w-md mx-auto">
            <Card className="shadow-glow border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant">
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
                <CardTitle className="text-3xl">Welcome Back</CardTitle>
                <CardDescription className="text-base">
                  Sign in to continue your volunteering journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Enter your username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                  </div>

                 {/* Password */}
            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(true)}
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </span>
              </div>
            </div>

                  <Button
                    type="submit"
                    size="lg"
                    variant="hero"
                    className="w-full"
                    disabled={loading}
                  >
                    {loading ? "Logging in..." : "Sign In"}
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Don't have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/register")}
                      className="text-primary hover:underline font-medium"
                    >
                      Create one now
                    </button>
                  </p>
                </form>
              </CardContent>
              {showForgotModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        onClick={() => {
          setShowForgotModal(false);
          setOtpSent(false);
          setForgotEmail("");
          setOtp("");
          setNewPassword("");
        }}
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

      {!otpSent ? (
        <>
          <label className="block mb-2">Enter your registered email</label>
          <input
            type="email"
            className="w-full border p-2 rounded mb-4"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={async () => {
              if (!forgotEmail) {
                toast.error("Enter your email");
                return;
              }

              setLoadingForgot(true);

              try {
                const response = await fetch(
                  "http://localhost:8080/auth/forgot-password",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: forgotEmail }),
                  }
                );

                const data = await response.json();

                if (!response.ok) {
                  toast.error(data.message || "Email not registered");
                } else {
                  setOtpSent(true);
                  toast.success(data.message || "OTP sent to your registered email");
                }
              } catch (err) {
                console.error(err);
                toast.error("Network error. Try again later.");
              }

              setLoadingForgot(false);
            }}
            disabled={loadingForgot}
          >
            {loadingForgot ? "Sending OTP..." : "Send OTP"}
          </button>
        </>
      ) : (
        <>
          <label className="block mb-2">Enter OTP</label>
          <input
            type="text"
            className="w-full border p-2 rounded mb-4"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <label className="block mb-2">New Password</label>
          <input
            type="password"
            className="w-full border p-2 rounded mb-4"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            onClick={async () => {
              if (!otp || !newPassword) {
                toast.error("Fill all fields");
                return;
              }

              setLoadingForgot(true);

              try {
                const response = await fetch(
                  "http://localhost:8080/auth/reset-password",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: forgotEmail,
                      otp,
                      newPassword,
                    }),
                  }
                );

                const data = await response.json();

                if (!response.ok) {
                  toast.error(data.message || "Failed to reset password");
                } else {
                  toast.success(data.message || "Password reset successful");
                  setShowForgotModal(false);
                  setOtpSent(false);
                  setForgotEmail("");
                  setOtp("");
                  setNewPassword("");
                }
              } catch (err) {
                console.error(err);
                toast.error("Network error. Try again later.");
              }

              setLoadingForgot(false);
            }}
            disabled={loadingForgot}
          >
            {loadingForgot ? "Resetting..." : "Reset Password"}
          </button>
        </>
      )}
    </div>
  </div>
)}

            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
