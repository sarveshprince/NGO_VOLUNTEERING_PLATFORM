import React from "react";
import { Users, UserPlus, Shield, LogOut } from "lucide-react";
import { getUser, logout } from "../../api/auth";

interface SidebarProps {
  onTabChange: (tab: string) => void;
  currentTab: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabChange, currentTab }) => {
  let username = null;
  try {
    username = getUser();
  } catch (error) {
    console.warn("Failed to parse user from localStorage", error);
    username = null;
  }

  return (
    <div className="w-64 min-h-screen bg-background border-r border-muted/20 flex flex-col justify-between">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <div className="flex flex-col space-y-2">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-primary/10 ${currentTab === "users" ? "bg-primary/10" : ""}`}
            onClick={() => onTabChange("users")}
          >
            <Users className="h-5 w-5" /> User Management
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-primary/10 ${currentTab === "create" ? "bg-primary/10" : ""}`}
            onClick={() => onTabChange("create")}
          >
            <UserPlus className="h-5 w-5" /> Create User
          </button>

          <button
            className={`flex items-center gap-2 px-4 py-2 rounded hover:bg-primary/10 ${currentTab === "ngos" ? "bg-primary/10" : ""}`}
            onClick={() => onTabChange("ngos")}
          >
            <UserPlus className="h-5 w-5" /> NGO Approval
          </button>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded hover:bg-primary/10"
            onClick={() => alert("Statistics tab can be added!")}
          >
            <Shield className="h-5 w-5" /> Statistics
          </button>
        </div>
      </div>

      <div className="p-6 border-t border-muted/20">
        <div className="mb-4 font-bold text-xl text-muted-foreground">{username ? username : "GuestUser"}</div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded hover:bg-destructive/10 text-destructive font-medium"
          onClick={() => {
            logout();
            window.location.reload();
          }}
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
