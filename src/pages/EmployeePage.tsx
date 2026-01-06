import React, { useState } from 'react';
import { Plus, Printer } from 'lucide-react';
import { useEmployee, type Employee } from '../context/EmployeeContext';
import { EmployeeTable } from '../components/Employees/EmployeeTable';
import { EmployeeForm } from '../components/Employees/EmployeeForm';
import { Modal } from '../components/UI/Modal';
import { Button } from '../components/UI/Button';

export const EmployeePage: React.FC = () => {
    const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployee();
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleAdd = () => {
        setEditingEmployee(null);
        setIsFormOpen(true);
    };

    const handleEdit = (emp: Employee) => {
        setEditingEmployee(emp);
        setIsFormOpen(true);
    };

    const handleSubmit = (data: Omit<Employee, 'id'>) => {
        if (editingEmployee) {
            updateEmployee(editingEmployee.id, data);
        } else {
            addEmployee(data);
        }
        setIsFormOpen(false);
    };

    const confirmDelete = () => {
        if (deleteId) {
            deleteEmployee(deleteId);
            setDeleteId(null);
        }
    };

    const handlePrint = () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        if (!printWindow) return;

        // Simple print template
        const content = `
      <html>
        <head>
          <title>Employee List</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f3f4f6; }
            tr:nth-child(even) { background-color: #f9f9f9; }
          </style>
        </head>
        <body>
          <h1>Employee List</h1>
          <p>Generated on ${new Date().toLocaleDateString()}</p>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>State</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${employees.map(emp => `
                <tr>
                  <td>${emp.id}</td>
                  <td>${emp.fullName}</td>
                  <td>${emp.gender}</td>
                  <td>${emp.state}</td>
                  <td>${emp.isActive ? 'Active' : 'Inactive'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <script>window.print();</script>
        </body>
      </html>
    `;
        printWindow.document.write(content);
        printWindow.document.close();
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Employees</h1>
                    <p className="text-gray-500 mt-1">Manage your team members and their roles.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <Button
                        variant="secondary"
                        onClick={handlePrint}
                        leftIcon={<Printer size={18} />}
                    >
                        Print List
                    </Button>
                    <Button
                        onClick={handleAdd}
                        leftIcon={<Plus size={18} />}
                    >
                        Add Employee
                    </Button>
                </div>
            </div>

            <EmployeeTable
                employees={employees}
                onEdit={handleEdit}
                onDelete={setDeleteId}
            />

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title={editingEmployee ? 'Edit Employee' : 'Add New Employee'}
            >
                <EmployeeForm
                    initialData={editingEmployee}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsFormOpen(false)}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deleteId}
                onClose={() => setDeleteId(null)}
                title="Delete Employee"
            >
                <div className="space-y-4">
                    <p className="text-gray-600">
                        Are you sure you want to delete this employee? This action cannot be undone.
                    </p>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="secondary" onClick={() => setDeleteId(null)}>Cancel</Button>
                        <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
