const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const loginUser = async (username, password, navigate) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Login failed:', errorData);
            return { success: false, error: errorData };
        }

        const data = await response.json();
        const token = data.token;
        localStorage.setItem('authToken', token); // Store the token
        console.log('Login successful, JWT:', token);

        if (navigate) {
            navigate('/fridgepage', { replace: true }); // Navigate programmatically
        }

        return { success: true, token };
    } catch (error) {
        console.error('Error logging in:', error);
        return { success: false, error };
    }
};
