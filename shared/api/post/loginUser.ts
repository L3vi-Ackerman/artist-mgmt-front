import Cookies from 'js-cookie';
const login = async (email:string, password:string) => {
    try {
        const response = await fetch('https://your-api-endpoint.com/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        // Store token in cookies
        Cookies.set('authToken', data.token, { expires: 7, secure: true, sameSite: 'Strict' });

        console.log('Login successful:', data);
        return data.token;
    } catch (error) {
        console.error('Error:', error.message);
    }
};

// Example usage:
login('test@example.com', 'securepassword');
