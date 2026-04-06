import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../redux/slices/authSlice';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const { name, email, password } = formData;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate('/dashboard');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();
        const userData = { name, email, password };
        dispatch(register(userData));
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 surface-app-alt">
            <div className="app-shell max-w-md w-full p-8">
                <div className="text-center">
                    <p className="hero-kicker">Get Started</p>
                    <h2 className="mt-1 text-4xl font-extrabold">Create Your Account</h2>
                    <p className="text-sm text-app-muted mt-2">Launch your workspace and build professional resumes with speed.</p>
                </div>

                <form className="mt-8 space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label className="field-label">Full Name</label>
                        <input name="name" type="text" required placeholder="Your name" value={name} onChange={onChange} />
                    </div>
                    <div>
                        <label className="field-label">Email</label>
                        <input name="email" type="email" required placeholder="you@example.com" value={email} onChange={onChange} />
                    </div>
                    <div>
                        <label className="field-label">Password</label>
                        <input name="password" type="password" required placeholder="Create a password" value={password} onChange={onChange} />
                    </div>

                    <button type="submit" disabled={isLoading} className="btn-primary w-full disabled:opacity-50">
                        {isLoading ? 'Signing up...' : 'Sign up'}
                    </button>
                </form>

                <div className="text-center text-sm mt-6 text-app-muted">
                    <span>Already have an account? </span>
                    <Link to="/login" className="font-semibold text-[#e63946] hover:text-[#c92233]">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
