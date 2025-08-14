"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Calendar, Shield, Key, Bell, Globe, Eye, EyeOff, Edit, Save, X, CheckCircle } from "lucide-react"

export function AccountSection() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    country: "United States",
    timezone: "UTC-5 (EST)",
  })

  const accountStats = {
    memberSince: "January 2024",
    totalPurchases: 3,
    totalSpent: "€39.97",
    accountStatus: "Premium",
    loyaltyPoints: 1250,
  }

  const securitySettings = [
    {
      title: "Two-Factor Authentication",
      description: "Add an extra layer of security to your account",
      enabled: true,
      action: "Manage",
    },
    {
      title: "Login Notifications",
      description: "Get notified when someone logs into your account",
      enabled: true,
      action: "Configure",
    },
    {
      title: "Session Management",
      description: "View and manage your active sessions",
      enabled: false,
      action: "Enable",
    },
  ]

  const notificationSettings = [
    {
      title: "Product Updates",
      description: "Get notified about new versions and updates",
      enabled: true,
    },
    {
      title: "Security Alerts",
      description: "Important security notifications",
      enabled: true,
    },
    {
      title: "Marketing Emails",
      description: "Promotional offers and news",
      enabled: false,
    },
    {
      title: "Support Responses",
      description: "Notifications for support ticket updates",
      enabled: true,
    },
  ]

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Handle save logic here
  }

  return (
    <div className="space-y-6">
      {/* Account Header */}
      <div className="bg-gradient-to-r from-[#3B82F6]/20 to-[#1d4ed8]/20 border border-[#3B82F6]/30 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-[#3B82F6] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">JD</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className="text-[#cccccc]">
                {accountStats.accountStatus} Member • {accountStats.memberSince}
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <Badge className="bg-[#3B82F6]/20 text-[#3B82F6] border-0 text-lg px-4 py-2">
              {accountStats.loyaltyPoints} Points
            </Badge>
          </div>
        </div>
      </div>

      {/* Account Tabs */}
      <div className="flex space-x-1 bg-white/5 p-1 rounded-lg">
        {[
          { id: "profile", label: "Profile", icon: User },
          { id: "security", label: "Security", icon: Shield },
          { id: "notifications", label: "Notifications", icon: Bell },
          { id: "preferences", label: "Preferences", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id ? "bg-[#3B82F6] text-white" : "text-[#cccccc] hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Profile Information */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  className="bg-transparent hover:bg-white/10 text-[#3B82F6] h-8 w-8 p-0"
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#808080] text-sm mb-2">First Name</label>
                  {isEditing ? (
                    <Input
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  ) : (
                    <p className="text-white font-medium">{profileData.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[#808080] text-sm mb-2">Last Name</label>
                  {isEditing ? (
                    <Input
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                      className="bg-white/5 border-white/10 text-white"
                    />
                  ) : (
                    <p className="text-white font-medium">{profileData.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-[#808080] text-sm mb-2">Email Address</label>
                {isEditing ? (
                  <Input
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white font-medium">{profileData.email}</p>
                )}
              </div>
              <div>
                <label className="block text-[#808080] text-sm mb-2">Phone Number</label>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="bg-white/5 border-white/10 text-white"
                  />
                ) : (
                  <p className="text-white font-medium">{profileData.phone}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#808080] text-sm mb-2">Country</label>
                  {isEditing ? (
                    <select
                      value={profileData.country}
                      onChange={(e) => setProfileData({ ...profileData, country: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                    </select>
                  ) : (
                    <p className="text-white font-medium">{profileData.country}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[#808080] text-sm mb-2">Timezone</label>
                  {isEditing ? (
                    <select
                      value={profileData.timezone}
                      onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white"
                    >
                      <option value="UTC-5 (EST)">UTC-5 (EST)</option>
                      <option value="UTC-8 (PST)">UTC-8 (PST)</option>
                      <option value="UTC+0 (GMT)">UTC+0 (GMT)</option>
                      <option value="UTC+1 (CET)">UTC+1 (CET)</option>
                    </select>
                  ) : (
                    <p className="text-white font-medium">{profileData.timezone}</p>
                  )}
                </div>
              </div>
              {isEditing && (
                <Button
                  onClick={handleSaveProfile}
                  className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Account Statistics */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Account Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold text-[#3B82F6]">{accountStats.totalPurchases}</p>
                  <p className="text-[#808080] text-sm">Total Purchases</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <p className="text-2xl font-bold text-[#3B82F6]">{accountStats.totalSpent}</p>
                  <p className="text-[#808080] text-sm">Total Spent</p>
                </div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-lg">
                <p className="text-2xl font-bold text-[#3B82F6]">{accountStats.loyaltyPoints}</p>
                <p className="text-[#808080] text-sm">Loyalty Points</p>
              </div>
              <div className="p-4 bg-[#3B82F6]/10 border border-[#3B82F6]/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-[#3B82F6]" />
                  <span className="text-[#3B82F6] font-medium">Premium Member</span>
                </div>
                <p className="text-[#cccccc] text-sm">Member since {accountStats.memberSince}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Password Change */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="w-5 h-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-[#808080] text-sm mb-2">Current Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    className="bg-white/5 border-white/10 text-white pr-10"
                  />
                  <Button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/10 text-[#808080] h-6 w-6 p-0"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-[#808080] text-sm mb-2">New Password</label>
                <Input type="password" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div>
                <label className="block text-[#808080] text-sm mb-2">Confirm New Password</label>
                <Input type="password" className="bg-white/5 border-white/10 text-white" />
              </div>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-white h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {securitySettings.map((setting, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
                >
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{setting.title}</h4>
                    <p className="text-[#808080] text-sm">{setting.description}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      className={`${setting.enabled ? "text-green-500 bg-green-500/10" : "text-red-500 bg-red-500/10"} border-0`}
                    >
                      {setting.enabled ? "Enabled" : "Disabled"}
                    </Badge>
                    <Button className="bg-transparent border border-white/20 text-white hover:bg-white/10 h-8 px-4 py-2 text-sm tracking-20-smaller font-normal">
                      {setting.action}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "notifications" && (
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notificationSettings.map((setting, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-white/5 rounded-lg border border-white/10"
              >
                <div className="flex-1">
                  <h4 className="text-white font-medium">{setting.title}</h4>
                  <p className="text-[#808080] text-sm">{setting.description}</p>
                </div>
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={setting.enabled} className="sr-only peer" />
                    <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                  </label>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {activeTab === "preferences" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Language & Region */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-[#808080] text-sm mb-2">Language</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white">
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                </select>
              </div>
              <div>
                <label className="block text-[#808080] text-sm mb-2">Date Format</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white">
                  <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                  <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                  <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-[#808080] text-sm mb-2">Currency</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-md px-3 py-2 text-white">
                  <option value="eur">EUR (€)</option>
                  <option value="usd">USD ($)</option>
                  <option value="gbp">GBP (£)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white text-sm font-medium">Profile Visibility</h4>
                  <p className="text-[#808080] text-xs">Control who can see your profile</p>
                </div>
                <select className="bg-white/5 border border-white/10 rounded px-2 py-1 text-white text-sm">
                  <option value="private">Private</option>
                  <option value="friends">Friends</option>
                  <option value="public">Public</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white text-sm font-medium">Activity Status</h4>
                  <p className="text-[#808080] text-xs">Show when you're online</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked className="sr-only peer" />
                  <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <h4 className="text-white text-sm font-medium">Data Collection</h4>
                  <p className="text-[#808080] text-xs">Allow analytics and usage data</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#3B82F6]"></div>
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
