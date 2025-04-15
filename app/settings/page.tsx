"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Lock,
  Bell,
  Globe,
  Palette,
  Shield,
  HelpCircle,
  LogOut,
  Search,
  Moon,
  Sun,
  Check,
} from "lucide-react";

const settingsSections = [
  {
    id: "account",
    icon: User,
    label: "Account",
    description: "Manage your account settings and preferences",
  },
  {
    id: "privacy",
    icon: Lock,
    label: "Privacy & Security",
    description: "Control your privacy and security settings",
  },
  {
    id: "notifications",
    icon: Bell,
    label: "Notifications",
    description: "Choose what notifications you receive",
  },
  {
    id: "appearance",
    icon: Palette,
    label: "Appearance",
    description: "Customize how Fanmix looks on your device",
  },
  {
    id: "language",
    icon: Globe,
    label: "Language & Region",
    description: "Set your language and regional preferences",
  },
];

const themes = [
  {
    id: "light",
    name: "Light",
    icon: Sun,
  },
  {
    id: "dark",
    name: "Dark",
    icon: Moon,
  },
  {
    id: "system",
    name: "System",
    icon: Palette,
  },
];

const languages = [
  { code: "en", name: "English (US)" },
  { code: "es", name: "Español" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState("account");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  
  // Profile state
  const [displayName, setDisplayName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [bio, setBio] = useState("Anime and gaming enthusiast");
  
  // Accessibility settings
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  
  // Privacy settings
  const [publicProfile, setPublicProfile] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [dataCollection, setDataCollection] = useState(true);

  // Notification settings
  const [newReleaseNotifs, setNewReleaseNotifs] = useState(true);
  const [messageNotifs, setMessageNotifs] = useState(true);
  const [communityNotifs, setCommunityNotifs] = useState(true);
  const [emailNotifs, setEmailNotifs] = useState(false);
  
  // Load saved settings on mount
  useEffect(() => {
    // Set selected theme based on current theme
    setSelectedTheme(theme || "dark");
    
    // Load from localStorage if available
    const savedSettings = localStorage.getItem("user-settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.displayName) setDisplayName(settings.displayName);
      if (settings.email) setEmail(settings.email);
      if (settings.bio) setBio(settings.bio);
      if (settings.language) setSelectedLanguage(settings.language);
      if (settings.reduceMotion !== undefined) setReduceMotion(settings.reduceMotion);
      if (settings.highContrast !== undefined) setHighContrast(settings.highContrast);
      if (settings.publicProfile !== undefined) setPublicProfile(settings.publicProfile);
      if (settings.onlineStatus !== undefined) setOnlineStatus(settings.onlineStatus);
      if (settings.dataCollection !== undefined) setDataCollection(settings.dataCollection);
      if (settings.newReleaseNotifs !== undefined) setNewReleaseNotifs(settings.newReleaseNotifs);
      if (settings.messageNotifs !== undefined) setMessageNotifs(settings.messageNotifs);
      if (settings.communityNotifs !== undefined) setCommunityNotifs(settings.communityNotifs);
      if (settings.emailNotifs !== undefined) setEmailNotifs(settings.emailNotifs);
    }
  }, [theme]);
  
  // Save all settings to localStorage
  const saveSettings = () => {
    const settings = {
      displayName,
      email,
      bio,
      language: selectedLanguage,
      reduceMotion,
      highContrast,
      publicProfile,
      onlineStatus,
      dataCollection,
      newReleaseNotifs,
      messageNotifs,
      communityNotifs,
      emailNotifs
    };
    localStorage.setItem("user-settings", JSON.stringify(settings));
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  // Save privacy settings
  const savePrivacySettings = () => {
    const settings = JSON.parse(localStorage.getItem("user-settings") || "{}");
    const updatedSettings = {
      ...settings,
      publicProfile,
      onlineStatus,
      dataCollection
    };
    localStorage.setItem("user-settings", JSON.stringify(updatedSettings));
    toast({
      title: "Privacy settings saved",
      description: "Your privacy preferences have been updated.",
    });
  };

  // Save notification settings
  const saveNotificationSettings = () => {
    const settings = JSON.parse(localStorage.getItem("user-settings") || "{}");
    const updatedSettings = {
      ...settings,
      newReleaseNotifs,
      messageNotifs,
      communityNotifs,
      emailNotifs
    };
    localStorage.setItem("user-settings", JSON.stringify(updatedSettings));
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  // Apply theme change
  const handleThemeChange = (newTheme: string) => {
    setSelectedTheme(newTheme);
    setTheme(newTheme);
  };
  
  // Apply accessibility settings
  useEffect(() => {
    // Apply reduce motion setting to document
    if (reduceMotion) {
      document.documentElement.classList.add('reduce-motion');
    } else {
      document.documentElement.classList.remove('reduce-motion');
    }
    
    // Apply high contrast setting
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }, [reduceMotion, highContrast]);

  // Filter settings sections based on search query
  const filteredSections = settingsSections.filter(section => 
    section.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    section.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case "account":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Profile Information</h3>
              <p className="text-muted-foreground">
                Update your profile information and email preferences
              </p>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="text-sm font-medium">Display Name</label>
                <Input 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)} 
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="mt-1" 
                />
              </div>
              <div>
                <label className="text-sm font-medium">Bio</label>
                <Input 
                  value={bio} 
                  onChange={(e) => setBio(e.target.value)} 
                  className="mt-1" 
                />
              </div>
            </div>

            <Button onClick={saveSettings}>Save Changes</Button>
          </div>
        );

      case "appearance":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Theme</h3>
              <p className="text-muted-foreground">
                Select your preferred color theme
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {themes.map((themeOption) => {
                const Icon = themeOption.icon;
                return (
                  <Card
                    key={themeOption.id}
                    className={`p-4 cursor-pointer relative ${
                      selectedTheme === themeOption.id
                        ? "border-primary"
                        : "hover:border-primary/50"
                    }`}
                    onClick={() => handleThemeChange(themeOption.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      <span>{themeOption.name}</span>
                    </div>
                    {selectedTheme === themeOption.id && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">Accessibility</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Reduce Motion</p>
                    <p className="text-sm text-muted-foreground">
                      Reduce motion effects
                    </p>
                  </div>
                  <Switch 
                    checked={reduceMotion}
                    onCheckedChange={setReduceMotion}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">High Contrast</p>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast between elements
                    </p>
                  </div>
                  <Switch 
                    checked={highContrast}
                    onCheckedChange={setHighContrast}
                  />
                </div>
              </div>
              <Button onClick={saveSettings} className="mt-4">Apply Accessibility Settings</Button>
            </div>
          </div>
        );

      case "language":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Language</h3>
              <p className="text-muted-foreground">
                Choose your preferred language
              </p>
            </div>

            <div className="space-y-2">
              {languages.map((lang) => (
                <Card
                  key={lang.code}
                  className={`p-4 cursor-pointer ${
                    selectedLanguage === lang.code
                      ? "border-primary"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => setSelectedLanguage(lang.code)}
                >
                  <div className="flex items-center justify-between">
                    <span>{lang.name}</span>
                    {selectedLanguage === lang.code && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <Button onClick={saveSettings} className="mt-4">Save Language Preference</Button>
          </div>
        );

      case "privacy":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Privacy Settings</h3>
              <p className="text-muted-foreground">
                Control how your information is used and shared
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Allow others to see your profile
                  </p>
                </div>
                <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Online Status</p>
                  <p className="text-sm text-muted-foreground">
                    Show when you're active
                  </p>
                </div>
                <Switch checked={onlineStatus} onCheckedChange={setOnlineStatus} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Data Collection</p>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymous usage data collection
                  </p>
                </div>
                <Switch checked={dataCollection} onCheckedChange={setDataCollection} />
              </div>
            </div>
            <Button onClick={savePrivacySettings}>Save Privacy Settings</Button>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Notification Preferences</h3>
              <p className="text-muted-foreground">
                Customize which notifications you receive
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Releases</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about new anime, movies and shows
                  </p>
                </div>
                <Switch checked={newReleaseNotifs} onCheckedChange={setNewReleaseNotifs} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Messages</p>
                  <p className="text-sm text-muted-foreground">
                    Receive message notifications
                  </p>
                </div>
                <Switch checked={messageNotifs} onCheckedChange={setMessageNotifs} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Community Updates</p>
                  <p className="text-sm text-muted-foreground">
                    Stay updated on community posts and events
                  </p>
                </div>
                <Switch checked={communityNotifs} onCheckedChange={setCommunityNotifs} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
              </div>
            </div>
            <Button onClick={saveNotificationSettings}>Save Notification Settings</Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-background via-background to-background/95">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Settings</h1>
          <Input
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-xs"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <Card className="p-4 md:col-span-1">
            <nav className="space-y-2">
              {filteredSections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setActiveSection(section.id)}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.label}</span>
                  </button>
                );
              })}

              {filteredSections.length === 0 && (
                <div className="text-center py-4 text-muted-foreground">
                  No settings found for "{searchQuery}"
                </div>
              )}
            </nav>

            <div className="mt-8 pt-8 border-t">
              <Button variant="outline" className="w-full justify-start text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Log Out
              </Button>
            </div>
          </Card>

          {/* Content */}
          <div className="md:col-span-3">
            <Card className="p-6">
              {renderSectionContent()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}