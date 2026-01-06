import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Lock, ChevronRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';

export const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (username === 'admin' && password === 'admin123') {
            login(username);
            navigate('/');
        } else {
            setError('Invalid username or password');
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            >
                <div className="p-8 sm:p-10">
                    <div className="text-center mb-10">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full mb-6"
                        >
                            <Users className="text-indigo-600" size={40} />
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-gray-900 tracking-tight"
                        >
                            Welcome Back
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-gray-500 mt-2"
                        >
                            Sign in to manage your employees
                        </motion.p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-4">
                            <Input
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                icon={<Users size={18} />}
                                placeholder="Enter your username"
                                required
                            />
                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                icon={<Lock size={18} />}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="flex items-center gap-2 bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm"
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        <Button
                            type="submit"
                            isLoading={isLoading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0"
                            size="lg"
                            rightIcon={<ChevronRight size={18} />}
                        >
                            Sign In
                        </Button>
                    </form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 pt-6 border-t border-gray-100"
                    >
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                            <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide mb-2">Demo Credentials</p>
                            <div className="flex justify-between text-sm text-blue-900">
                                <span>Username: <span className="font-mono font-medium">admin</span></span>
                                <span>Password: <span className="font-mono font-medium">admin123</span></span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};
