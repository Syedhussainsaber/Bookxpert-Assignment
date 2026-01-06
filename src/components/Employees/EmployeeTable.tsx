import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Search } from 'lucide-react';
import { type Employee } from '../../context/EmployeeContext';
import { Button } from '../UI/Button';
import { Input } from '../UI/Input';

interface EmployeeTableProps {
    employees: Employee[];
    onEdit: (employee: Employee) => void;
    onDelete: (id: number) => void;
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState({ gender: 'All', status: 'All' });

    const filteredEmployees = employees.filter(emp => {
        const matchesSearch = emp.fullName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesGender = filter.gender === 'All' || emp.gender === filter.gender;
        const matchesStatus = filter.status === 'All' ||
            (filter.status === 'Active' && emp.isActive) ||
            (filter.status === 'Inactive' && !emp.isActive);
        return matchesSearch && matchesGender && matchesStatus;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex-1 max-w-md">
                    <Input
                        placeholder="Search employees..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={<Search size={18} />}
                    />
                </div>
                <div className="flex gap-3">
                    <select
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={filter.gender}
                        onChange={(e) => setFilter({ ...filter, gender: e.target.value })}
                    >
                        <option value="All">All Genders</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <select
                        className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role Info</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Joined</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredEmployees.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No employees found matching your criteria.
                                    </td>
                                </tr>
                            ) : (
                                filteredEmployees.map((emp) => (
                                    <motion.tr
                                        key={emp.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={emp.profileImage}
                                                    alt={emp.fullName}
                                                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                                                />
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{emp.fullName}</p>
                                                    <p className="text-xs text-gray-500">{emp.gender}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-900">{emp.state}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${emp.isActive
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                                }`}>
                                                {emp.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(emp.dob).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right space-x-2">
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => onEdit(emp)}
                                                className="!p-2"
                                            >
                                                <Edit2 size={16} className="text-indigo-600" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => onDelete(emp.id)}
                                                className="!p-2 hover:bg-red-50 hover:border-red-100"
                                            >
                                                <Trash2 size={16} className="text-red-500" />
                                            </Button>
                                        </td>
                                    </motion.tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
