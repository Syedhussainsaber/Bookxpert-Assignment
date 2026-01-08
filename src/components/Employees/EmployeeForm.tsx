import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { type Employee } from '../../context/EmployeeContext';
import { Input } from '../UI/Input';
import { Button } from '../UI/Button';

interface EmployeeFormProps {
    initialData?: Employee | null;
    onSubmit: (data: Omit<Employee, 'id'>) => void;
    onCancel: () => void;
}

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
    "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
    "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia",
    "Wisconsin", "Wyoming"
];

export const EmployeeForm: React.FC<EmployeeFormProps> = ({ initialData, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Employee, 'id'>>({
        fullName: '',
        gender: '',
        dob: '',
        state: '',
        profileImage: '',
        isActive: true
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [preview, setPreview] = useState<string>('');

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setPreview(initialData.profileImage);
        }
    }, [initialData]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        if (!formData.dob) newErrors.dob = 'Date of Birth is required';
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.profileImage) newErrors.profileImage = 'Profile Image is required';

        // Age Check
        if (formData.dob) {
            const birthDate = new Date(formData.dob);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if (age < 18) newErrors.dob = 'Employee must be at least 18 years old';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit(formData);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrors({ ...errors, profileImage: 'Image must be smaller than 2MB' });
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setFormData({ ...formData, profileImage: result });
                setPreview(result);
                setErrors({ ...errors, profileImage: '' });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center mb-6">
                <div className="relative group cursor-pointer">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 bg-gray-100 flex items-center justify-center">
                        {preview ? (
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <Camera size={40} className="text-gray-400" />
                        )}
                    </div>
                    <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white text-xs font-medium">Change Photo</span>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>
                {errors.profileImage && (
                    <p className="absolute mt-36 text-sm text-red-600 font-medium">{errors.profileImage}</p>
                )}
            </div>

            <Input
                label="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                error={errors.fullName}
                placeholder="e.g. John Doe"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                    <select
                        value={formData.gender}
                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                        className={`w-full bg-white border text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block p-2.5 outline-none transition-all appearance-none cursor-pointer ${errors.gender ? 'border-red-500' : 'border-gray-200'
                            }`}
                        style={{ colorScheme: 'light' }}
                    >
                        <option value="" className="text-gray-500 bg-white">Select Gender</option>
                        <option value="Male" className="text-gray-900 bg-white">Male</option>
                        <option value="Female" className="text-gray-900 bg-white">Female</option>
                        <option value="Other" className="text-gray-900 bg-white">Other</option>
                    </select>
                    {errors.gender && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.gender}</p>}
                </div>

                <Input
                    label="Date of Birth"
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    error={errors.dob}
                    max={new Date().toISOString().split('T')[0]}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">State</label>
                <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className={`w-full bg-white border text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent block p-2.5 outline-none transition-all appearance-none cursor-pointer ${errors.state ? 'border-red-500' : 'border-gray-200'
                        }`}
                    style={{ colorScheme: 'light' }}
                >
                    <option value="" className="text-gray-500 bg-white">Select State</option>
                    {states.map((s) => (
                        <option key={s} value={s} className="text-gray-900 bg-white">{s}</option>
                    ))}
                </select>
                {errors.state && <p className="mt-1.5 text-sm text-red-600 font-medium">{errors.state}</p>}
            </div>

            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <input
                    type="checkbox"
                    id="status"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer"
                />
                <label htmlFor="status" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                    Active Employee
                </label>
            </div>

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 mt-6 border-t border-gray-100">
                <Button
                    type="button"
                    variant="secondary"
                    className="w-full sm:w-auto sm:flex-1"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto sm:flex-1"
                >
                    {initialData ? 'Update Employee' : 'Create Employee'}
                </Button>
            </div>
        </form>
    );
};
