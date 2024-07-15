import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
} from "@mui/material";
import CustomTableRow from "./TableRow";

const DataTable = ({ data }) => {
  console.log("data", data);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Label</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Input</TableCell>
            <TableCell>Allocate %</TableCell>
            <TableCell>Allocate Val</TableCell>
            <TableCell>Variance %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <CustomTableRow row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;
