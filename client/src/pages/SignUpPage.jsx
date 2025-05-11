function SignUpPage() {
    return (
        <div className="flex flex-row justify-center items-center h-screen bg-amber-50">
            {/* Entire box */}
            <div className="flex flex-col items-center w-full h-full min-w-128 min-h-128 max-h-200 max-w-164
                            bg-white rounded-4xl shadow-2xl">
                <div className="font-[ubuntu] text-[#4E937A] text-5xl font-bold mb-4 mt-8">
                    Create your Fridge
                </div>
                <div className="font-[ubuntu] text-2xl m-5">
                    Cooking, made easy.
                </div>
                {/* Name input box */}
                <div className="border-3 w-128 m-2 p-3 border-gray-300 rounded-2xl text-xl font-light hover:border-cyan-400">
                            <input type="text" id="email" placeholder="Name" className="w-full border-none outline-none" />
                </div>
                {/* Username input box */}
                <div className="border-3 w-128 m-2 p-3 border-gray-300 rounded-2xl text-xl font-light hover:border-cyan-400">
                            <input type="text" id="email" placeholder="Username" className="w-full border-none outline-none" />
                </div>
                {/* Email/Username input box */}
                <div className="border-3 w-128 m-2 p-3 border-gray-300 rounded-2xl text-xl font-light hover:border-cyan-400">
                            <input type="text" id="email" placeholder="Email" className="w-full border-none outline-none" />
                </div>
                {/* Password input box */}
                <div className="mb-4 p-3 m-2 w-128 border-3 border-gray-300 rounded-2xl text-xl font-light hover:border-cyan-400">
                    <input type="password" id="password" placeholder="Password" className="w-full border-none outline-none" />
                </div>
                <button 
                    className="mb-4 py-3 w-128 bg-emerald-500 rounded text-xl text-white font-bold hover:bg-emerald-600 transition"
                >
                    Create Account
                </button>
                <div className="">
                    Sign in with google
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;