import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="fixed hidden md:flex top-0 left-0 z-20 flex-col flex-shrink-0 w-64 h-full pt-16 font-normal duration-75 lg:flex transition-width">
            <div className="relative flex flex-col flex-1 min-h-0 pt-0 bg-white border-r border-gray-200">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 space-y-1 bg-white divide-y divide-gray-200">
                        <ul className="pb-2 space-y-2">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center p-2 text-base rounded-lg group ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-900 hover:bg-gray-100'}`
                                    }
                                >
                                    <LayoutDashboard className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                    <span className="ml-3">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/builder"
                                    className={({ isActive }) =>
                                        `flex items-center p-2 text-base rounded-lg group ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-900 hover:bg-gray-100'}`
                                    }
                                >
                                    <FilePlus className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                    <span className="ml-3">Create Resume</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/settings"
                                    className={({ isActive }) =>
                                        `flex items-center p-2 text-base rounded-lg group ${isActive ? 'bg-indigo-50 text-indigo-700' : 'text-gray-900 hover:bg-gray-100'}`
                                    }
                                >
                                    <Settings className="w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                                    <span className="ml-3">Settings</span>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
