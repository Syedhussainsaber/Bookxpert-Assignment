import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Employee {
    id: number;
    fullName: string;
    gender: string;
    dob: string;
    state: string;
    profileImage: string;
    isActive: boolean;
}

interface EmployeeContextType {
    employees: Employee[];
    addEmployee: (employee: Omit<Employee, 'id'>) => void;
    updateEmployee: (id: number, employee: Partial<Employee>) => void;
    deleteEmployee: (id: number) => void;
    getEmployee: (id: number) => Employee | undefined;
}

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

const initialEmployees: Employee[] = [
    {
        id: 1,
        fullName: "John Doe",
        gender: "Male",
        dob: "1990-05-15",
        state: "California",
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        isActive: true
    },
    {
        id: 2,
        fullName: "Jane Smith",
        gender: "Female",
        dob: "1988-08-22",
        state: "Texas",
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
        isActive: true
    },
    {
        id: 3,
        fullName: "Michael Johnson",
        gender: "Male",
        dob: "1992-03-10",
        state: "New York",
        profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        isActive: false
    }
];

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [employees, setEmployees] = useState<Employee[]>([]);

    // Load from local storage
    useEffect(() => {
        const stored = localStorage.getItem('employees');
        if (stored) {
            setEmployees(JSON.parse(stored));
        } else {
            setEmployees(initialEmployees);
            localStorage.setItem('employees', JSON.stringify(initialEmployees));
        }
    }, []);

    // Sync to local storage
    useEffect(() => {
        if (employees.length > 0) {
            localStorage.setItem('employees', JSON.stringify(employees));
        }
    }, [employees]);

    const addEmployee = (employee: Omit<Employee, 'id'>) => {
        const newId = Math.max(...employees.map(e => e.id), 0) + 1;
        setEmployees(prev => [...prev, { ...employee, id: newId }]);
    };

    const updateEmployee = (id: number, updatedData: Partial<Employee>) => {
        setEmployees(prev => prev.map(emp => emp.id === id ? { ...emp, ...updatedData } : emp));
    };

    const deleteEmployee = (id: number) => {
        setEmployees(prev => prev.filter(emp => emp.id !== id));
    };

    const getEmployee = (id: number) => {
        return employees.find(emp => emp.id === id);
    };

    return (
        <EmployeeContext.Provider value={{ employees, addEmployee, updateEmployee, deleteEmployee, getEmployee }}>
            {children}
        </EmployeeContext.Provider>
    );
};

export const useEmployee = () => {
    const context = useContext(EmployeeContext);
    if (context === undefined) {
        throw new Error('useEmployee must be used within an EmployeeProvider');
    }
    return context;
};
