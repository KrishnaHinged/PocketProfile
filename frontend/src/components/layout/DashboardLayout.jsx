import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const DashboardLayout = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="flex h-screen bg-gray-50">
            <Navbar />
            <div className="flex pt-16 overflow-hidden w-full">
                <Sidebar />
                <div className="relative w-full h-full overflow-y-auto bg-gray-50 md:ml-64">
                    <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;
