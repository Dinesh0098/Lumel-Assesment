import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React from "react";
import HeaderCell from "../HeaderCell";
import CustomTableRow from "./TableRow";

const DataTable = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <HeaderCell title="Label" />
            <HeaderCell title="Value" />
            <HeaderCell title="Input" />
            <HeaderCell title="Allocate %" />
            <HeaderCell title="Allocate Val" />
            <HeaderCell title="Variance %" />
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
