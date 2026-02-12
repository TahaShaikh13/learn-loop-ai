import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { User, Moon, Sun } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [studyMinutes, setStudyMinutes] = useState("25");

  const handleSave = () => {
    toast({ title: "Settings saved", description: "Your preferences have been updated." });
    setNewPassword("");
  };

  return (
    <div className="animate-fade-in max-w-lg mx-auto space-y-8">
      <h1 className="text-2xl font-bold">Profile</h1>

      {/* User info */}
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <p className="font-semibold text-lg">{user?.name || "User"}</p>
            <p className="text-sm text-muted-foreground">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <h3 className="font-semibold">Update Password</h3>
        <div className="space-y-2">
          <Label>New Password</Label>
          <Input type="password" placeholder="••••••••" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <Button size="sm" disabled={!newPassword} onClick={handleSave}>Update Password</Button>
      </div>

      {/* Preferences */}
      <div className="rounded-xl border border-border bg-card p-6 space-y-5">
        <h3 className="font-semibold">Study Preferences</h3>
        <div className="space-y-2">
          <Label>Daily Study Duration (minutes)</Label>
          <Input type="number" min="10" max="60" value={studyMinutes} onChange={(e) => setStudyMinutes(e.target.value)} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            <Label>Dark Mode</Label>
          </div>
          <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
        </div>
        <Button size="sm" onClick={handleSave}>Save Preferences</Button>
      </div>
    </div>
  );
};

export default Profile;
