import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import CreateData from './components/CreateData';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

interface Employee {
  name: string;
  email: string;
  address: string;
}

function Home() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  //fetching list of data
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => {
        const employeesData = data.map((user: any) => ({
          name: user.name,
          email: user.email,
          address: `${user.address.street}, ${user.address.city}`,
        }));
        setEmployees(employeesData);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, employee]);
    toast.success('New employee added successfully'); 
  };

  const deleteEmployee = (index: number) => {
    const deletedEmployee = employees[index].name;
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
    toast.error(`${deletedEmployee} deleted successfully`); 
  };

  const editEmployee = (index: number) => {
    setEditingIndex(index);
  };


  const saveEditedEmployee = (editedEmployee: Employee) => {
    if (editingIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[editingIndex] = editedEmployee;
      setEmployees(updatedEmployees);
      setEditingIndex(null);
      toast.info('Employee details updated successfully'); 
    }
  };

  return (
    <div className="home">
      <ToastContainer />
      <div className="heading">React-TS CRUD Application</div>
      <div className="container">
        <div className="add-employee">
          <div className="list-heading">Employee List</div>
          <div className="add-div">
            <CreateData
              addEmployee={addEmployee}
              editingIndex={editingIndex}
              saveEditedEmployee={saveEditedEmployee}
              employees={employees}
            />
          </div>
        </div>
        <div className="employee-table">
          <DataTable
            employees={employees}
            deleteEmployee={deleteEmployee}
            editEmployee={editEmployee}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
