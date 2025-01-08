import { useState } from 'react';
import axios from 'axios';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/login', { email, password });
            setOtpSent(true); // OTP sent successfully
            alert(response.data.message); // Show message from server (e.g., "OTP sent")
        } catch (err) {
            alert('Login failed');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('/api/verify-otp', { email, otp });
            window.location.href = '/thankyou'; // Redirect to ThankYou page after OTP verification
        } catch (err) {
            alert('Invalid OTP');
        }
    };

    return (
        <div>
            <h1>Login</h1>
            {!otpSent ? (
                <>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button onClick={handleLogin}>Login</button>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <button onClick={handleVerifyOtp}>Verify OTP</button>
                </>
            )}
        </div>
    );
}
