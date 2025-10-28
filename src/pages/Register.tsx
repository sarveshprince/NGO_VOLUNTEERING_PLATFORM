import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { Heart, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { register } from "../api/auth";

interface FormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: string;
  location: string;
  skills: string;
  volunteerExperience: string;
  communicationSettings: string;
  dateOfBirth: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    location: "",
    skills: "",
    volunteerExperience: "",
    communicationSettings: "",
    dateOfBirth: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.role) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      const payload = {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        passwordHash: formData.password,
        role: formData.role.toUpperCase(),
        location: formData.location,
        skills: formData.skills,
        volunteerExperience: formData.volunteerExperience,
        communicationSettings: formData.communicationSettings,
        dateOfBirth: formData.dateOfBirth,
      };

      await register(payload);
      toast.success("Registration successful! Please check your email to verify your account.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error: any) {
      if (error.response?.status === 409) {
        // backend sends which field already exists
        const message = error.response.data?.message || "Username or Email already exists";
        toast.error(message);
      } else {
        toast.error("Registration failed. Please try again later.");
      }
    }
  };

  const autoExpand = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto";
    target.style.height = target.scrollHeight + "px";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Button>
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-glow border-border">
              <CardHeader className="text-center">
                <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-elegant">
                  <Heart className="w-8 h-8 text-white" fill="white" />
                </div>
                <CardTitle className="text-3xl">Join VolunteerHub</CardTitle>
                <CardDescription className="text-base">Create your account and start making a difference today</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username */}
                  <div className="space-y-2">
                    <Label htmlFor="username">Username *</Label>
                    <Input
                      id="username"
                      placeholder="john_doe"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      required
                    />
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>

                  {/* Date of Birth */}
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <Label htmlFor="role">I want to register as *</Label>
                    <Select
                      value={formData.role}
                      onValueChange={(value: string) => setFormData({ ...formData, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
                        <SelectItem value="VOLUNTEER_LEADER">Volunteer Leader</SelectItem>
              
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Password */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2 relative">
                      <Label htmlFor="password">Password *</Label>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Min. 8 characters"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                      />
                      <span
                        className="absolute right-3 top-9 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                    <div className="space-y-2 relative">
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        required
                      />
                      <span
                        className="absolute right-3 top-9 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills</Label>
                    <textarea
                      id="skills"
                      placeholder="e.g., Teaching, Event Management"
                      className="w-full border border-input rounded p-2 resize-none overflow-hidden"
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      onInput={autoExpand}
                    />
                  </div>

                  {/* Volunteer Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="volunteerExperience">Volunteering Experience</Label>
                    <textarea
                      id="volunteerExperience"
                      placeholder="Describe your previous volunteering experience"
                      className="w-full border border-input rounded p-2 resize-none overflow-hidden"
                      value={formData.volunteerExperience}
                      onChange={(e) => setFormData({ ...formData, volunteerExperience: e.target.value })}
                      onInput={autoExpand}
                    />
                  </div>

                  {/* Communication Settings */}
                  <div className="space-y-2">
                    <Label htmlFor="communicationSettings">Preferred Communication</Label>
                    <textarea
                      id="communicationSettings"
                      placeholder="e.g., Email, WhatsApp, Phone Calls"
                      className="w-full border border-input rounded p-2 resize-none overflow-hidden"
                      value={formData.communicationSettings}
                      onChange={(e) => setFormData({ ...formData, communicationSettings: e.target.value })}
                      onInput={autoExpand}
                    />
                  </div>

                  <div className="pt-4">
                    <Button type="submit" size="lg" variant="hero" className="w-full">
                      Create Account
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-primary hover:underline font-medium bg-transparent border-0 p-0"
                    >
                      Sign in here
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
