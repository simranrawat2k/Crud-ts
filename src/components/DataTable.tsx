import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface Employee {
  name: string;
  email: string;
  address: string;
}

interface Column {
  id: string;
  label: string;
  minWidth: number;
  align?: 'right';
}

interface Props {
  employees: Employee[];
  deleteEmployee: (index: number) => void;
  editEmployee: (index: number) => void;
}

const columns: Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170, align: 'right' },
];

const DataTable: React.FC<Props> = ({ employees, deleteEmployee, editEmployee }) => {
  const [loading, setLoading] = useState(true);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const handleEdit = (index: number) => {
    editEmployee(index);
  };

  const handleDelete = (index: number) => {
    setDeletingIndex(index);
    setDeleteConfirmationOpen(true);
  };

  const confirmDelete = () => {
    if (deletingIndex !== null) {
      deleteEmployee(deletingIndex);
      setDeleteConfirmationOpen(false);
      setDeletingIndex(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmationOpen(false);
    setDeletingIndex(null);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
            <CircularProgress />
          </div>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column: Column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No employees found.
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((row: Employee, index: number) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.address}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        color="success"
                        size="small"
                        sx={{ mr: 1 }}
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <Dialog
        open={deleteConfirmationOpen}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default DataTable;
