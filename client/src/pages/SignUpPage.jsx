import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../utils/auth"; // Import the reusable login function

function SignUpPage() {
    const [newUserInfo, setUserInfo] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
    });

    const [repeatUser, setRepeatUser ] = useState(Boolean);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const { name, username, email, password } = newUserInfo;

        if (!name || !username || !email || !password) {
            console.error("All fields are required.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/signup', {
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
        } catch (err) {
            console.error('Sign up error:', err);
            if (err.error == 'username_taken') {
                console.log('username');
            }
        }
    };

    return (
        <div className="flex flex-row justify-center items-center h-screen bg-amber-50">
            {/* Entire box */}
            <div className="flex flex-col items-center w-full h-full min-w-128 min-h-128 max-h-200 max-w-164
                            bg-white rounded-4xl shadow-2xl">
                <div className="font-[ubuntu] text-[#4E937A] text-5xl font-bold mb-4 mt-8">
                    Create your Fridge
                </div>
                <div className="font-[ubuntu] text-2xl text-black m-5">
                    Cooking, made easy.
                </div>
                <div className="items-start text-black">
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
                        className="mb-4 py-3 w-128 bg-emerald-500 rounded text-xl text-white font-bold hover:bg-emerald-600 transition"
                        onClick={handleSignup}
                    >
                        Create Account
                    </button>
                </div>
                
                <div className="">
                    Sign in with google
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;