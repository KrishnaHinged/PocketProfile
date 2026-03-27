import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut, FileText, User } from 'lucide-react';
import { logout, reset } from '../../redux/slices/authSlice';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/login');
    };

    return (
        <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <Link to="/" className="text-xl font-bold flex items-center lg:ml-2.5">
                            <FileText className="h-6 w-6 mr-2 text-indigo-600" />
                            <span className="self-center whitespace-nowrap">PocketProfile</span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                                    {user.name}
                                </span>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 flex items-center"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span className="sr-only">Logout</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link to="/login" className="text-gray-800 hover:bg-gray-50 font-medium rounded-lg text-sm px-4 py-2">
                                    Log in
                                </Link>
                                <Link to="/register" className="text-white bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-4 py-2">
                                    Get started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
