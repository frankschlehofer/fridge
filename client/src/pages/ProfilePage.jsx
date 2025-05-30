"use client"

import { useEffect, useState } from "react"
import NavSideBar from "../components/NavSideBar"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"

function ProfilePage() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    username: "",
    email: "",
    ingredientCount: 0,
  })
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("authToken")
        if (!authToken) {
          navigate("/", { replace: true })
          return
        }

        const decodedToken = jwtDecode(authToken)
        const user_id = decodedToken.sub
        console.log("User ID from JWT:", user_id)

        // Fetch user profile data
        const userResponse = await fetch(`http://localhost:3000/api/users/${user_id}/profile`)
        if (userResponse.ok) {
          const userData = await userResponse.json()
          setUserInfo((prev) => ({
            ...prev,
            name: userData.name || "",
            username: userData.username || "",
            email: userData.email || "",
          }))
        }

        // Fetch ingredient count
        const ingredientsResponse = await fetch(`http://localhost:3000/api/users/${user_id}/fridgepage`)
        if (ingredientsResponse.ok) {
          const ingredientsData = await ingredientsResponse.json()
          setUserInfo((prev) => ({
            ...prev,
            ingredientCount: ingredientsData.length,
          }))
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [navigate])

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      <NavSideBar />
      <div className="flex flex-col overflow-y-auto overflow-x-hidden p-6 w-full">
        <h1 className="text-4xl font-bold mb-6 page-title">Profile</h1>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div
              className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
              style={{ borderColor: "var(--primary)" }}
            ></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full">
            {/* Profile Header */}
            <div
              style={{
                background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(78, 147, 122, 0.05) 100%)",
                border: "2px solid var(--primary)",
                borderRadius: "1rem",
                padding: "2rem",
                marginBottom: "2rem",
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative background elements */}
              <div
                style={{
                  position: "absolute",
                  top: "-30px",
                  right: "-30px",
                  width: "80px",
                  height: "80px",
                  background: "linear-gradient(45deg, var(--primary), var(--primary-light))",
                  borderRadius: "50%",
                  opacity: 0.1,
                  zIndex: 0,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                    marginBottom: "2rem",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                      borderRadius: "50%",
                      padding: "1.5rem",
                      boxShadow: "0 10px 15px -3px rgba(78, 147, 122, 0.3)",
                    }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </div>
                  <div>
                    <h2
                      style={{
                        fontSize: "2.5rem",
                        fontWeight: "bold",
                        background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        margin: 0,
                        fontFamily: '"Ubuntu", sans-serif',
                      }}
                    >
                      Welcome back, {userInfo.name || userInfo.username}!
                    </h2>
                    <p
                      style={{
                        color: "var(--text-secondary)",
                        margin: "0.5rem 0 0 0",
                        fontSize: "1.2rem",
                      }}
                    >
                      Manage your profile and account settings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Information Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "2rem",
                marginBottom: "2rem",
              }}
            >
              {/* Personal Information */}
              <div
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "1rem",
                  padding: "2rem",
                  boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 15px 25px -5px rgba(0, 0, 0, 0.2)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 8px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, var(--secondary), var(--secondary-light))",
                      borderRadius: "50%",
                      padding: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    Personal Information
                  </h3>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "var(--text-secondary)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Full Name
                    </label>
                    <div
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "0.5rem",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                      }}
                    >
                      {userInfo.name || "Not provided"}
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "var(--text-secondary)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Username
                    </label>
                    <div
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "0.5rem",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                      }}
                    >
                      {userInfo.username || "Not provided"}
                    </div>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                        color: "var(--text-secondary)",
                        marginBottom: "0.5rem",
                      }}
                    >
                      Email Address
                    </label>
                    <div
                      style={{
                        padding: "0.75rem",
                        backgroundColor: "var(--bg-secondary)",
                        border: "1px solid var(--border-color)",
                        borderRadius: "0.5rem",
                        color: "var(--text-primary)",
                        fontSize: "1rem",
                      }}
                    >
                      {userInfo.email || "Not provided"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fridge Statistics */}
              <div
                style={{
                  backgroundColor: "var(--bg-card)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "1rem",
                  padding: "2rem",
                  boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)"
                  e.currentTarget.style.boxShadow = "0 15px 25px -5px rgba(0, 0, 0, 0.2)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)"
                  e.currentTarget.style.boxShadow = "0 8px 15px -3px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                      borderRadius: "50%",
                      padding: "0.75rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <path d="M8 3v4a2 2 0 0 1-2 2H3"></path>
                      <path d="M5 14V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-7"></path>
                      <path d="M5 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2H5Z"></path>
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      color: "var(--text-primary)",
                      margin: 0,
                    }}
                  >
                    Fridge Statistics
                  </h3>
                </div>

                <div style={{ textAlign: "center" }}>
                  <div
                    style={{
                      fontSize: "4rem",
                      fontWeight: "bold",
                      background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      margin: "1rem 0",
                    }}
                  >
                    {userInfo.ingredientCount}
                  </div>
                  <p
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "1.2rem",
                      margin: 0,
                    }}
                  >
                    Ingredients stored in your fridge
                  </p>
                </div>

                <div
                  style={{
                    marginTop: "2rem",
                    padding: "1rem",
                    backgroundColor: "var(--bg-secondary)",
                    borderRadius: "0.5rem",
                    textAlign: "center",
                  }}
                >
                  <p
                    style={{
                      color: "var(--text-primary)",
                      fontSize: "0.875rem",
                      margin: 0,
                    }}
                  >
                    Keep your fridge stocked for better recipe recommendations!
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div
              style={{
                backgroundColor: "var(--bg-card)",
                border: "1px solid var(--border-color)",
                borderRadius: "1rem",
                padding: "2rem",
                boxShadow: "0 8px 15px -3px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, var(--warning), #ffb347)",
                    borderRadius: "50%",
                    padding: "0.75rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </div>
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    color: "var(--text-primary)",
                    margin: 0,
                  }}
                >
                  Quick Actions
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                  gap: "1rem",
                }}
              >
                <button
                  onClick={() => navigate("/fridgepage")}
                  style={{
                    padding: "1rem",
                    background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
                    color: "white",
                    border: "none",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 6px -1px rgba(78, 147, 122, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 8px 15px -3px rgba(78, 147, 122, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 6px -1px rgba(78, 147, 122, 0.3)"
                  }}
                >
                  🥬 Manage Fridge
                </button>

                <button
                  onClick={() => navigate("/explore")}
                  style={{
                    padding: "1rem",
                    background: "linear-gradient(135deg, var(--secondary), var(--secondary-light))",
                    color: "white",
                    border: "none",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                    boxShadow: "0 4px 6px -1px rgba(196, 180, 209, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "translateY(-2px)"
                    e.target.style.boxShadow = "0 8px 15px -3px rgba(196, 180, 209, 0.4)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "translateY(0)"
                    e.target.style.boxShadow = "0 4px 6px -1px rgba(196, 180, 209, 0.3)"
                  }}
                >
                  🍳 Find Recipes
                </button>

                <button
                  onClick={() => navigate("/settings")}
                  style={{
                    padding: "1rem",
                    backgroundColor: "transparent",
                    color: "var(--text-primary)",
                    border: "2px solid var(--border-color)",
                    borderRadius: "0.75rem",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "1rem",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = "var(--primary)"
                    e.target.style.color = "var(--primary)"
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = "var(--border-color)"
                    e.target.style.color = "var(--text-primary)"
                  }}
                >
                  ⚙️ Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
