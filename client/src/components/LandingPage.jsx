import { useState, useEffect } from "react";


const sentences = [
    'Track and manage your food with ease',
    'Find recipes you\'ll love with ingredients you have',
    '"What should I make for dinner?" will never be asked again',
    'Connect with your friends to recommend something new'
];

function LandingPage() {
    {/* State for determining which message in the cycle to display on screen, related by index*/}
    const [index, setIndex] = useState(0);

    {/* A looping counter, incrementing the value of index every 8 seconds */}
    useEffect(() => {
        const interval = setInterval(() => {
          setIndex((prev) => (prev + 1) % sentences.length);
        }, 8000); // every 8 seconds
      
        return () => clearInterval(interval); // clean up
      }, []);

    
    {/* For attempting to login */}
    const handleLogin = (e) => {
        e.preventDefault();
    };

    {/* For attempting to signup */}
    const handleSignup = (e) => {
        e.preventDefault();
        
    };

    {/* For clicking Forgot Password? */}
    const handleForgot = (e) => {
        e.preventDefault();
        
    };


    return (
        <div>
            <div className="flex flex-col md:flex-row h-screen bg-amber-50">
                {  
                    /* Left Half of Screen, for displaying our content 
                     * Consumes 2/3 of the page   
                     */
                }
                <div className="w-3/5 ml-[10%] mr-[3%] mt-[15%] ">
                    {/* Box containing "Fridge" */}
                    <div className="text-8xl mb-3">
                        <h1 className="landing-title color">Fridge</h1>
                    </div>
                    {/* Box containing our revolving text */}
                    <div className="text-4xl font-sans">
                        {sentences.map((text, i) => (
                            <p
                            key={i}
                            className={`absolute w-full duration-1000 ease-in-out ${
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
                    <form className="flex flex-col max-w-md mx-4 md:mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
                        {/* Email/Username input box */}
                        <div className="mb-4 p-3 border border-gray-300 rounded text-xl font-light">
                            <input type="text" id="email" placeholder="Email" className="w-full border-none outline-none" />
                        </div>
                        {/* Password input box */}
                        <div className="mb-4 p-3 border border-gray-300 rounded text-xl font-light">
                            <input type="password" id="password" placeholder="Password" className="w-full border-none outline-none" />
                        </div>

                        {/* Login Button */}
                        <button 
                            className="mb-4 py-3 bg-emerald-500 rounded text-xl text-white font-bold hover:bg-emerald-600 transition"
                            onClick={() => handleLogin}
                        >
                            Log In
                        </button>

                        {/* Forgot Password */}
                        <button 
                            className="mb-4 text-center text-sm font-medium text-blue-600 hover:underline cursor-pointer"
                            onClick={() => handleForgot}
                        >
                            Forgot Password?
                        </button>

                        {/* Sign Up */}
                        <button 
                            className="mt-6 py-3 bg-amber-400 rounded text-xl text-white font-bold hover:bg-amber-500 transition"
                            onClick={() => handleSignup}    
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LandingPage