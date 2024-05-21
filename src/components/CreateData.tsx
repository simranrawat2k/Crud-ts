import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

interface Employee {
  name: string;
  email: string;
  address: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Props {
  addEmployee: (employee: Employee) => void;
  editingIndex: number | null;
  saveEditedEmployee: (editedEmployee: Employee) => void;
  employees: Employee[]; 
}

const CreateData: React.FC<Props> = ({ addEmployee, editingIndex, saveEditedEmployee, employees }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (editingIndex !== null) {
      // Pre-fill form fields with employee details during edit
      const editedEmployee = employees[editingIndex]; 
      setName(editedEmployee.name);
      setEmail(editedEmployee.email);
      setAddress(editedEmployee.address);
      setOpen(true); 
    } else {
      // Reset form fields when not in edit mode
      setName('');
      setEmail('');
      setAddress('');
      setOpen(false); 
    }
  }, [editingIndex]);

  const handleClose = () => {
    setOpen(false);
    setName('');
    setEmail('');
    setAddress('');
  };

  const handleSave = () => {
    if (editingIndex !== null) {
      saveEditedEmployee({ name, email, address });
    } else {
      addEmployee({ name, email, address });
    }
    handleClose();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)}>Add Employee</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {editingIndex !== null ? 'Edit Employee' : 'Add Employee'}
          </Typography>
          <TextField
            margin="normal"
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateData;
