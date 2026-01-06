import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../utils/cn';


export const Sidebar: React.FC = () => {
    const { logout } = useAuth();

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Users, label: 'Employees', path: '/employees' },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-30 hidden md:flex">
            <div className="p-6">
                <div className="flex items-center space-x-3 text-indigo-600 mb-8">
                    <div className="bg-indigo-100 p-2 rounded-lg">
                        <Users size={24} />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">HR Portal</span>
                </div>

                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                cn(
                                    'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                                    isActive
                                        ? 'bg-indigo-50 text-indigo-600 font-medium shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )
                            }
                        >
                            <item.icon size={20} className="group-hover:scale-110 transition-transform duration-200" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-gray-100">
                <button
                    onClick={logout}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors duration-200 group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};
