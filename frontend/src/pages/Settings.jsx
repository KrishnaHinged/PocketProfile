import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile, reset } from '../redux/slices/authSlice';

const Settings = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message: authMessage } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }

        if (isError) {
            setMessage(authMessage);
        }

        if (isSuccess) {
            setMessage('Profile Updated Successfully!');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, authMessage, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        setMessage(null);

        if (password && password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const updatedData = { name, email };

        if (password) {
            updatedData.password = password;
        }

        dispatch(updateProfile(updatedData));
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 px-2 sm:px-4">
            <section className="hero-panel">
                <p className="hero-kicker">Account</p>
                <h1 className="hero-title mt-2">Settings</h1>
                <p className="hero-subtitle">Manage your account details, credentials, and workspace profile.</p>
            </section>

            {message && (
                <div className={`p-4 rounded-xl border ${message.includes('Success') ? 'bg-[#edf9f1] border-[#bde4c8] text-[#166534]' : 'bg-[#ffeef0] border-[#fac8d0] text-[#be123c]'}`}>
                    {message}
                </div>
            )}

            <div className="feature-card overflow-hidden border-app">
                <div className="px-4 py-5 sm:p-6">
                    <h3 className="text-2xl font-extrabold mb-4">Profile Information</h3>
                    <form onSubmit={submitHandler} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="field-label">Name</label>
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <label className="field-label">Email Address</label>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-app">
                            <h3 className="text-2xl font-extrabold mb-4">Security</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="field-label">New Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Leave blank to keep current"
                                    />
                                </div>
                                <div>
                                    <label className="field-label">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-5 flex justify-end">
                            <button type="submit" disabled={isLoading} className="btn-primary disabled:opacity-50">
                                {isLoading ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Settings;
