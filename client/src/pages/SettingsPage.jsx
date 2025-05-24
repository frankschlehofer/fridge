"use client"

import { useState } from "react"
import NavSideBar from "../components/NavSideBar"
import { useNavigate } from "react-router-dom"

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account")
  const navigate = useNavigate()

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <NavSideBar />
      <div className="flex flex-col overflow-y-auto overflow-x-hidden p-6 w-full">
        <h1 className="text-4xl font-bold mb-6 page-title">Settings</h1>

        {/* Settings Navigation */}
        <div className="flex mb-6 border-b" style={{ borderColor: "var(--border-color)" }}>
          <button
            onClick={() => setActiveTab("account")}
            className={`px-4 py-2 font-medium ${activeTab === "account" ? "border-b-2 -mb-px" : ""}`}
            style={{ borderColor: activeTab === "account" ? "var(--primary)" : "transparent" }}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab("preferences")}
            className={`px-4 py-2 font-medium ${activeTab === "preferences" ? "border-b-2 -mb-px" : ""}`}
            style={{ borderColor: activeTab === "preferences" ? "var(--primary)" : "transparent" }}
          >
            Preferences
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`px-4 py-2 font-medium ${activeTab === "notifications" ? "border-b-2 -mb-px" : ""}`}
            style={{ borderColor: activeTab === "notifications" ? "var(--primary)" : "transparent" }}
          >
            Notifications
          </button>
          <button
            onClick={() => setActiveTab("privacy")}
            className={`px-4 py-2 font-medium ${activeTab === "privacy" ? "border-b-2 -mb-px" : ""}`}
            style={{ borderColor: activeTab === "privacy" ? "var(--primary)" : "transparent" }}
          >
            Privacy
          </button>
        </div>

        {/* Account Settings */}
        {activeTab === "account" && (
          <div className="space-y-6">
            <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
              <h2 className="text-2xl font-bold mb-4">Profile Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 rounded border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Username</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                    placeholder="username"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
              <h2 className="text-2xl font-bold mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full p-2 rounded border"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      borderColor: "var(--border-color)",
                      color: "var(--text-primary)",
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 rounded" style={{ backgroundColor: "var(--primary)", color: "white" }}>
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Preferences Settings */}
        {activeTab === "preferences" && (
          <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
            <h2 className="text-2xl font-bold mb-4">Appearance</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="darkMode" className="mr-2" />
                <label htmlFor="darkMode">Dark Mode</label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Theme Color</label>
                <select
                  className="w-full p-2 rounded border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <option>Green (Default)</option>
                  <option>Blue</option>
                  <option>Purple</option>
                  <option>Orange</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Notifications Settings */}
        {activeTab === "notifications" && (
          <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
            <h2 className="text-2xl font-bold mb-4">Notification Preferences</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <input type="checkbox" id="expirationAlerts" className="mr-2" />
                <label htmlFor="expirationAlerts">Expiration Alerts</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="recipeRecommendations" className="mr-2" />
                <label htmlFor="recipeRecommendations">Recipe Recommendations</label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="friendActivity" className="mr-2" />
                <label htmlFor="friendActivity">Friend Activity</label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Notification Frequency</label>
                <select
                  className="w-full p-2 rounded border"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border-color)",
                    color: "var(--text-primary)",
                  }}
                >
                  <option>Immediately</option>
                  <option>Daily Digest</option>
                  <option>Weekly Summary</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Settings */}
        {activeTab === "privacy" && (
          <div className="space-y-6">
            <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
              <h2 className="text-2xl font-bold mb-4">Privacy Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input type="checkbox" id="publicProfile" className="mr-2" />
                  <label htmlFor="publicProfile">Public Profile</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="shareRecipes" className="mr-2" />
                  <label htmlFor="shareRecipes">Share My Recipes</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="allowFriendRequests" className="mr-2" checked />
                  <label htmlFor="allowFriendRequests">Allow Friend Requests</label>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: "var(--bg-card)" }}>
              <h2 className="text-2xl font-bold mb-4 text-red-500">Danger Zone</h2>
              <div className="space-y-4">
                <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                  Delete Account
                </button>
                <p className="text-sm opacity-75">
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SettingsPage
