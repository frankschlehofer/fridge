function SignUpPage() {
    return (
        <div className="flex flex-row justify-center items-center h-screen bg-[url(/backgrounds/simple2.jpg)] bg-cover">
            {/* Entire box */}
            <div className="flex flex-col justify-center items-center w-full h-full min-w-128 min-h-128 max-h-164 max-w-256
                            bg-white rounded-4xl shadow-2xl">
                <div className="font-[ubuntu] text-7xl font-bold mb-10">
                    Welcome to Fridge
                </div>
                <div className="font-[ubuntu] text-2xl mb-10">
                    Cooking, made easy.
                </div>
                <div className="">
                    Sign in with google
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;