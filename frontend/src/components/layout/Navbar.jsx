import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, Rocket, Home } from 'lucide-react';
import { logout, reset } from '../../redux/slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    };

    return (
        <nav className="fixed z-30 w-full border-b border-app bg-[#f5f6f3]/95 backdrop-blur-sm">
            <div className="px-4 py-3 lg:px-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/" className="flex items-center gap-2">
                            <Rocket className="h-5 w-5 text-[#e63946]" />
                            <span className="text-[1.2rem] font-extrabold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
                                PocketProfile
                            </span>
                        </Link>
                        {user && (
                            <Link to="/" className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-app-muted hover:text-[#e63946] transition ml-2">
                                <Home className="w-3.5 h-3.5" /> Home
                            </Link>
                        )}
                    </div>

                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-app-muted hidden sm:block">{user.name}</span>
                                <button onClick={handleLogout} className="btn-secondary px-3 py-2">
                                    <LogOut className="h-5 w-5" />
                                    <span className="sr-only">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login" className="btn-secondary">Log in</Link>
                                <Link to="/register" className="btn-primary">Get started</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
