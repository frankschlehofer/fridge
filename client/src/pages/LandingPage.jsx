"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from "../utils/auth" // Import the reusable login function

const sentences = [
  "Track and manage your food with ease",
  "Find recipes you'll love with ingredients you have",
  '"What should I make for dinner?" will never be asked again',
  "Connect with your friends to recommend something new",
]

function LandingPage() {
  const [index, setIndex] = useState(0)

  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sentences.length)
    }, 8000) // every 8 seconds

    return () => clearInterval(interval) // clean up
  }, [])

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userNotFound, setNotUserFound] = useState(Boolean)
  const [incorrectPassword, setIncorrectPassword] = useState(Boolean)
  const [isLoading, setIsLoading] = useState(false)
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("Logging in:", username, password)

    if (!username || !password) {
      return
    }

    setIsLoading(true)
    setNotUserFound(false)
    setIncorrectPassword(false)

    const loginResult = await loginUser(username, password, navigate)

    setIsLoading(false)

    if (!loginResult.success) {
      console.error("Login failed:", loginResult.error)
      if (loginResult.error.error == "user_not_found") {
        console.log("user not found")
        setNotUserFound(true)
        setIncorrectPassword(false)
        setUsername("")
        setPassword("")
      } else if (loginResult.error.error == "incorrect_password") {
        console.log("incorrect password")
        setIncorrectPassword(true)
        setNotUserFound(false)
        setPassword("")
      }
    }
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row h-screen bg-[##1a1a1a]">
        {/* Left Half of Screen, for displaying our content
         * Consumes 2/3 of the page
         */}
        <div className="w-3/5 ml-[10%] mr-[3%] mt-[15%] ">
          {/* Box containing "Fridge" */}
          <div className="text-8xl mb-3">
            <h1 className="landing-title color-[#4E937A]">Fridge</h1>
          </div>
          {/* Box containing our revolving text */}
          <div className="text-4xl font-[ubuntu]">
            {sentences.map((text, i) => (
              <p
                key={i}
                className={`absolute duration-1000 ease-in-out ${
                  i === index ? "opacity-100 transition-discrete delay-1000 duration-2000" : "opacity-0"
                }`}
              >
                {text}
              </p>
            ))}
          </div>
          {/* Box containing our image/animation */}
          <div></div>
        </div>
        {/* Right half of screen, for displaying login/signup page */}
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col max-w-md mx-4 md:mx-auto bg-[#2d2d2d] rounded-2xl shadow-xl p-6 md:p-10">
            <form>
              {/* Username input box */}
              <div
                className={`p-3 border rounded text-xl font-light ${
                  userNotFound ? "border-red-500 border-3" : "border-gray-300"
                }`}
              >
                <input
                  type="text"
                  id="email"
                  placeholder="Username"
                  className="w-full border-none outline-none"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                  }}
                  disabled={isLoading}
                />
              </div>
              <div className="text-red-400 mb-2">{userNotFound ? "Username not found" : ""}</div>
              {/* Password input box */}
              <div
                className={`p-3 border rounded text-xl font-light ${
                  incorrectPassword ? "border-red-500 border-3" : "border-gray-300"
                }`}
              >
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="w-full border-none outline-none"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                  }}
                  disabled={isLoading}
                />
              </div>
              <div className="text-red-400 mb-4">{incorrectPassword ? "Incorrect Password" : ""}</div>
              {/* Login Button */}
              <button
                className={`mb-4 py-3 w-full rounded text-xl text-white font-bold transition flex items-center justify-center ${
                  isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"
                }`}
                onClick={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Logging In...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </form>


            {/* Sign Up */}
            <Link
              to="/signup"
              className={`mt-6 py-3 text-center rounded text-xl text-white font-bold transition ${
                isLoading ? "bg-gray-500 cursor-not-allowed pointer-events-none" : "bg-amber-400 hover:bg-amber-500"
              }`}
            >
              <button disabled={isLoading}>Sign Up</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
