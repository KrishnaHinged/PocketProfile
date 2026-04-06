import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FilePlus, Settings } from 'lucide-react';

const Sidebar = () => {
    return (
        <aside className="fixed hidden md:flex top-0 left-0 z-20 flex-col flex-shrink-0 w-64 h-full pt-16 lg:flex transition-width">
            <div className="relative flex flex-col flex-1 min-h-0 pt-2 bg-[#f5f6f3]/95 border-r border-app backdrop-blur-sm">
                <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
                    <div className="flex-1 px-3 space-y-1">
                        <ul className="pb-2 space-y-2">
                            <li>
                                <NavLink
                                    to="/dashboard"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-sm font-semibold rounded-xl transition duration-200 ${isActive ? 'bg-[#e63946] text-white' : 'text-[#2a2f3a] hover:bg-[#e9edf3]'}`
                                    }
                                >
                                    <LayoutDashboard className="w-5 h-5" />
                                    <span className="ml-3">Dashboard</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/builder"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-sm font-semibold rounded-xl transition duration-200 ${isActive ? 'bg-[#e63946] text-white' : 'text-[#2a2f3a] hover:bg-[#e9edf3]'}`
                                    }
                                >
                                    <FilePlus className="w-5 h-5" />
                                    <span className="ml-3">Create Resume</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/settings"
                                    className={({ isActive }) =>
                                        `flex items-center p-3 text-sm font-semibold rounded-xl transition duration-200 ${isActive ? 'bg-[#e63946] text-white' : 'text-[#2a2f3a] hover:bg-[#e9edf3]'}`
                                    }
                                >
                                    <Settings className="w-5 h-5" />
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
