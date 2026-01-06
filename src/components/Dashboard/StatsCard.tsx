import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface StatsCardProps {
    label: string;
    value: number;
    icon: LucideIcon;
    trend?: string;
    color?: 'indigo' | 'green' | 'red' | 'blue';
    delay?: number;
}

const colors = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
    blue: 'bg-blue-50 text-blue-600',
};

export const StatsCard: React.FC<StatsCardProps> = ({
    label,
    value,
    icon: Icon,
    color = 'indigo',
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
                </div>
                <div className={cn("p-4 rounded-xl", colors[color])}>
                    <Icon size={24} />
                </div>
            </div>
        </motion.div>
    );
};
