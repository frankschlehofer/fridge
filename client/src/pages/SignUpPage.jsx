import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth"; // Import the reusable login function

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

function SignUpPage() {
    const [newUserInfo, setUserInfo] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const [repeatUser, setRepeatUser ] = useState(Boolean);
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, username, email, password } = newUserInfo;

        if (!name || !username || !email || !password) {
            console.error("All fields are required.");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${BACKEND_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, email, password }),
            });
            

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Signup failed:', errorData);
                if (errorData.error == 'username_taken') {
                    console.log('username taken');
                    setRepeatUser(true);
                }
                return;
            }
            

            console.log('Signup successful. Logging in...');
            // Automatically log the user in after signup
            const loginResult = await loginUser(username, password, navigate);

            if (!loginResult.success) {
                console.error('Login after signup failed:', loginResult.error);
            }
            setIsLoading(false)
        } catch (err) {
            console.error('Sign up error:', err);
            if (err.error == 'username_taken') {
                console.log('username');
            }
            setIsLoading(false)
        }
    };

    return (
        <div 
            className="flex flex-row justify-center items-center h-screen text-white"
            style={{backgroundColor: "var(--bg-primary)"}}
        >
            {/* Entire box */}
            <div 
                className="flex flex-col items-center w-full h-full min-w-128 min-h-128 max-h-200 max-w-164
                             rounded-4xl shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, var(--bg-card), rgba(78, 147, 122, 0.05))',
                    border: '2px solid var(--primary)',
                    borderRadius: '0.75rem',
                }}
            >
                <div className="font-[ubuntu] text-[#4E937A] text-5xl font-bold mb-4 mt-8">
                    Create your Fridge
                </div>
                <div className="font-[ubuntu] text-2xl m-5">
                    Cooking, made easy.
                </div>
                <div className="items-start ">
                    {/* Name input box */}
                    <label className="text-xl font-light">Name</label>
                    <div className="border-3 mb-2 w-128 p-3 border-gray-300 text-xl font-light hover:border-cyan-400">
                        <input 
                            type="text" 
                            className="w-full border-none outline-none" 
                            onChange={(e) => setUserInfo({
                                ...newUserInfo,
                                name: e.target.value
                            })}
                        />
                    </div>
                    {/* Username input box */}
                    <label className="text-xl font-light">Username</label>
                    <div className="border-3 mb-2 w-128 p-3 border-gray-300 text-xl font-light hover:border-cyan-400">
                        <input 
                            type="text" id="email"
                            className="w-full border-none outline-none" 
                            onChange={(e) => setUserInfo({
                                ...newUserInfo,
                                username: e.target.value
                            })}
                        />
                    </div>
                    {/* Email input box */}
                    <label className="text-xl font-light">Email</label>
                    <div className="border-3 w-128 mb-2 p-3 border-gray-300 text-xl font-light hover:border-cyan-400">
                        <input 
                            type="text" id="email"
                            className="w-full border-none outline-none" 
                            onChange={(e) => setUserInfo({
                                ...newUserInfo,
                                email: e.target.value
                            })}
                        />
                    </div>
                    <div className="text-red-400">
                        {repeatUser ? `Username or Email already in use.` : ''}
                    </div>
                    {/* Password input box */}
                    <label className="text-xl font-light">Password</label>
                    <div className="mb-4 p-3 w-128 border-3 border-gray-300 text-xl font-light hover:border-cyan-400">
                        <input 
                            type="password" id="password"
                            className="w-full border-none outline-none" 
                            onChange={(e) => setUserInfo({
                                ...newUserInfo,
                                password: e.target.value
                            })}
                        />
                    </div>
                    <button 
                        className={`mb-4 py-3 w-128  rounded text-xl text-white font-bold  transition
                            ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-emerald-500 hover:bg-emerald-600"}`}
                        onClick={handleSignup}
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
                            Creating Account...
                          </>
                        ) : (
                          "Create Account"
                        )}
                        
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;