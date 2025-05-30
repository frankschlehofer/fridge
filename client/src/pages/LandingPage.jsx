import { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from "../utils/auth"; // Import the reusable login function

const sentences = [
    'Track and manage your food with ease',
    'Find recipes you\'ll love with ingredients you have',
    '"What should I make for dinner?" will never be asked again',
    'Connect with your friends to recommend something new'
];

function LandingPage() {
    {/* State for determining which message in the cycle to display on screen, related by index*/}
    const [index, setIndex] = useState(0);

    const navigate = useNavigate();

    {/* A looping counter, incrementing the value of index every 8 seconds */}
    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % sentences.length);
        }, 8000); // every 8 seconds
      
        return () => clearInterval(interval); // clean up
      }, []);

    
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ userNotFound, setNotUserFound ] = useState(Boolean);
    const [ incorrectPassword, setIncorrectPassword ] = useState(Boolean);

    {/* For attempting to login */}
    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('Logging in:', username, password);

        if (!username || !password) {
            return;
        }

        const loginResult = await loginUser(username, password, navigate);

        if (!loginResult.success) {
            console.error('Login failed:', loginResult.error);
            if (loginResult.error.error == 'user_not_found') {
                console.log('user not found');
                setNotUserFound(true);
                setIncorrectPassword(false);
                setUsername('');
                setPassword('');
            }
            else if (loginResult.error.error == 'incorrect_password') {
                console.log('incorrect password');
                setIncorrectPassword(true);
                setNotUserFound(false);
                setPassword('');
            }
        }
    };

    {/* For clicking Forgot Password? */}
    const handleForgot = () => {
        
    };


    return (
        <div>
            <div className="flex flex-col md:flex-row h-screen bg-[##1a1a1a]">
                {  
                    /* Left Half of Screen, for displaying our content 
                     * Consumes 2/3 of the page   
                     */
                }
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
                                i === index
                                ? "opacity-100 transition-discrete delay-1000 duration-2000"
                                : "opacity-0"
                            }`}
                            >
                            {text}
                            </p>
                        ))}
                    </div>
                    {/* Box containing our image/animation */}
                    <div>
                        
                    </div>
                </div>
                {/* Right half of screen, for displaying login/signup page */}
                <div className="flex justify-center items-center min-h-screen">
                    <div className="flex flex-col max-w-md mx-4 md:mx-auto bg-[#2d2d2d] rounded-2xl shadow-xl p-6 md:p-10">
    
                        <form>
                            {/* Username input box */}
                            <div 
                                className={`p-3 border rounded text-xl font-light ${
                                    userNotFound ?
                                    'border-red-500 border-3'
                                    : 'border-gray-300'
                                }`}>
                                <input 
                                    type="text" id="email" placeholder="Username" 
                                    className="w-full border-none outline-none" 
                                    value={username}
                                    onChange={(e) => {setUsername(e.target.value)}}
                                />
                            </div>
                            <div className="text-red-400 mb-2">
                                { userNotFound ? 'Username not found' : ''}
                            </div>
                            {/* Password input box */}
                            <div 
                                className={`p-3 border rounded text-xl font-light ${
                                    incorrectPassword ?
                                    'border-red-500 border-3'
                                    : 'border-gray-300'
                                }`}>
                                <input 
                                    type="password" id="password" placeholder="Password" 
                                    className="w-full border-none outline-none" 
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                            </div>
                            <div className="text-red-400 mb-4">
                                { incorrectPassword ? 'Incorrect Password' : ''}
                            </div>
                            {/* Login Button */}
                            <button 
                                className="mb-4 py-3 w-full bg-emerald-500 rounded text-xl text-white font-bold hover:bg-emerald-600 transition"
                                onClick={handleLogin}
                            >
                                Log In
                            </button>
                        </form>
                        

                        {/* Sign Up */}
                        <Link to='/signup' className="mt-6 py-3 text-center bg-amber-400 rounded text-xl text-white font-bold hover:bg-amber-500 transition">
                            <button>
                                Sign Up
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage