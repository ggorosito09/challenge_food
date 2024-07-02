// src/components/TruckTable.jsx
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import '../styles/TruckTable.css';

function TruckTable({ trucks, onRowClick }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(20);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowClick = (truck) => {
    setSelectedRow(truck);
    onRowClick(truck);
  };

  return (
    <TableContainer component={Paper} style={{ backgroundColor: '#917b50' }}>
      <Table stickyHeader>
        <TableHead style={{ backgroundColor: '#454545' }}>
          <TableRow>
            <TableCell>Applicant</TableCell>
            {/* <TableCell>Location Description</TableCell> */} 
            <TableCell>Food Items</TableCell>
            <TableCell>Days/Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trucks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((truck, idx) => {
            const { applicant, locationdescription, fooditems, dayshours } = truck.properties;
            return (
              <TableRow
                key={idx}
                onClick={() => handleRowClick(truck)}
                style={{ backgroundColor: selectedRow === truck ? '#5d9cec' : 'inherit', cursor: 'pointer' }}
              >
                <TableCell>{applicant}</TableCell>
                {/* <TableCell>{locationdescription}</TableCell> */} 
                <TableCell>{fooditems}</TableCell>
                <TableCell>{dayshours}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[]}
        component="div"
        count={trucks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
      />
    </TableContainer>
  );
}

export default TruckTable;
