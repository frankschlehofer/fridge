function LandingPage() {
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
                        <h2>Track and manage your food with ease.</h2>
                        <h2>Eating is easy, everything else is hard.</h2>
                        <h2>"What should I make for dinner?" will never be asked again.</h2>
                    </div>
                    {/* Box containing our image/animation */}
                    <div>
                        <h3>"Temp image"</h3>
                    </div>
                </div>
                {/* Right half of screen, for displaying login/signup page */}
                <div className="flex justify-center items-center min-h-screen">
                    <div className="flex flex-col max-w-md mx-4 md:mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
                        {/* Email/Username input box */}
                        <div className="mb-4 p-3 border border-gray-300 rounded text-xl font-light">
                            <label className="block mb-1" htmlFor="email">Email/Username</label>
                            <input type="text" id="email" className="w-full border-none outline-none" />
                        </div>

                        {/* Password input box */}
                        <div className="mb-4 p-3 border border-gray-300 rounded text-xl font-light">
                            <label className="block mb-1" htmlFor="password">Password</label>
                            <input type="password" id="password" className="w-full border-none outline-none" />
                        </div>

                        {/* Login Button */}
                        <button className="mb-4 py-3 bg-emerald-500 rounded text-xl text-white font-bold hover:bg-emerald-600 transition">
                            Log In
                        </button>

                        {/* Forgot Password */}
                        <div className="mb-4 text-center text-sm font-medium text-blue-600 hover:underline cursor-pointer">
                            Forgot Password?
                        </div>

                        {/* Sign Up */}
                        <button className="mt-6 py-3 bg-amber-400 rounded text-xl text-white font-bold hover:bg-amber-500 transition">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage