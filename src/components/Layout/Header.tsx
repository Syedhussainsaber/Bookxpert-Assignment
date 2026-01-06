import React from 'react';
import { Menu, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { user } = useAuth();

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20">
            <div className="flex items-center">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                >
                    <Menu size={24} />
                </button>
            </div>

            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                </button>

                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-medium text-gray-900">{user?.username || 'Admin'}</p>
                        <p className="text-xs text-gray-500">Administrator</p>
                    </div>
                    <div className="h-9 w-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                        {user?.username?.[0]?.toUpperCase() || 'A'}
                    </div>
                </div>
            </div>
        </header>
    );
};
