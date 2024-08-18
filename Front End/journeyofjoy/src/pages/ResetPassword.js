import React, { useState } from 'react';
import UserService from '../service/UserService';
import 'bootstrap/dist/css/bootstrap.min.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await UserService.resetPassword(email, newPassword);
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <div className="text-center mb-4">
                    <img
                        alt="Your Company"
                        src="https://img.icons8.com/?size=100&id=nMSSSpYre8pz&format=png&color=000000"
                        className="mb-4"
                        style={{ height: '40px' }}
                    />
                    <h2 className="h4 mb-3 font-weight-normal">Reset Your Password</h2>
                </div>
                <form onSubmit={handleResetPassword}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="newPassword">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block mt-3">
                        Reset Password
                    </button>
                    {message && (
                        <div className={`mt-3 ${message.startsWith('Error') ? 'text-danger' : 'text-success'}`}>
                            {message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
