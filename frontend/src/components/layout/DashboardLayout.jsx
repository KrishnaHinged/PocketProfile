import { Outlet, Navigate, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LayoutDashboard, FilePlus, Settings } from 'lucide-react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen text-app">
            <Navbar />
            <div className="flex pt-16 overflow-hidden w-full pb-16 md:pb-0">
                <Sidebar />
                <div className="relative w-full h-full overflow-y-auto md:ml-64">
                    <main className="p-3 sm:p-6 lg:p-8 max-w-[92rem] mx-auto w-full">
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-app bg-[#f5f6f3]/95 backdrop-blur-sm">
                <div className="flex justify-around py-2">
                    {[
                        { to: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard' },
                        { to: '/builder', icon: <FilePlus className="w-5 h-5" />, label: 'Builder' },
                        { to: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
                    ].map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                `flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-bold transition duration-200 ${
                                    isActive ? 'text-[#e63946]' : 'text-[#636773]'
                                }`
                            }
                        >
                            {item.icon}
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default DashboardLayout;
