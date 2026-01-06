import React from 'react';
import { Users, UserCheck, UserX } from 'lucide-react';
import { useEmployee } from '../context/EmployeeContext';
import { StatsCard } from '../components/Dashboard/StatsCard';

export const DashboardPage: React.FC = () => {
    const { employees } = useEmployee();

    const total = employees.length;
    const active = employees.filter(e => e.isActive).length;
    const inactive = total - active;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                    label="Total Employees"
                    value={total}
                    icon={Users}
                    color="indigo"
                    delay={0}
                />
                <StatsCard
                    label="Active Employees"
                    value={active}
                    icon={UserCheck}
                    color="green"
                    delay={0.1}
                />
                <StatsCard
                    label="Inactive Employees"
                    value={inactive}
                    icon={UserX}
                    color="red"
                    delay={0.2}
                />
            </div>

            {/* Additional dashboard content could go here, e.g., recent activity */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center py-20">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                    <Users className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900">Employee Activity</h3>
                <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                    Manage your workforce efficiently through the Employees tab. Add, edit, and track employee status.
                </p>
            </div>
        </div>
    );
};
