import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

function TruckTable({ trucks }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Applicant</TableCell>
            <TableCell>Location Description</TableCell>
            <TableCell>Food Items</TableCell>
            <TableCell>Days/Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trucks.map((truck, idx) => (
            <TableRow key={idx}>
              <TableCell>{truck.properties.applicant}</TableCell>
              <TableCell>{truck.properties.locationdescription}</TableCell>
              <TableCell>{truck.properties.fooditems}</TableCell>
              <TableCell>{truck.properties.dayshours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TruckTable;
