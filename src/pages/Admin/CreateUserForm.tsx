import { FormEvent } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {Eye, EyeOff } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

interface CreateUserFormProps {
  newUser: {
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
    dateOfBirth: string;
  };
  setNewUser: React.Dispatch<React.SetStateAction<{
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
    dateOfBirth: string;
  }>>;
  onSubmit: (e: FormEvent) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ newUser, setNewUser, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Create New User</h1>
      {/* Username */}
      <div className="space-y-2">
        <Label htmlFor="username">Username *</Label>
        <Input
          id="username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
      </div>

      {/* First & Last Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={newUser.firstName}
            onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={newUser.lastName}
            onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
        />
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={newUser.dateOfBirth}
          onChange={(e) => setNewUser({ ...newUser, dateOfBirth: e.target.value })}
        />
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={newUser.location}
          onChange={(e) => setNewUser({ ...newUser, location: e.target.value })}
        />
      </div>

      {/* Role */}
      <div className="space-y-2">
        <Label htmlFor="role">Role *</Label>
        <Select
          value={newUser.role}
          onValueChange={(value) => setNewUser({ ...newUser, role: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
            <SelectItem value="VOLUNTEER_LEADER">Volunteer Leader</SelectItem>
            <SelectItem value="NGO_COORDINATOR">NGO Coordinator</SelectItem>
            <SelectItem value="PROGRAM_MANAGER">Program Manager</SelectItem>
            <SelectItem value="ADMIN">Admin</SelectItem>
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
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
            value={newUser.confirmPassword}
            onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
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
          value={newUser.skills}
          onChange={(e) => setNewUser({ ...newUser, skills: e.target.value })}
          className="w-full border border-input rounded p-2 resize-none"
        />
      </div>

      <Button type="submit" className="w-full">Create User</Button>
    </form>
  );
};

export default CreateUserForm;
