import { Button, TableCell, TableRow } from "@mui/material";

export default function CustomTableRow({ row }) {
  const rowChildren = row.children;
  return (
    <>
      <TableRow>
        <TableCell>{row?.label}</TableCell>
        <TableCell>{row?.value}</TableCell>
        <TableCell>Input</TableCell>
        <TableCell>
          <Button variant="outlined" size="small">
            Allocate %
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="outlined" size="small">
            Allocate Val
          </Button>
        </TableCell>
        <TableCell>some</TableCell>
      </TableRow>
      {rowChildren?.length
        ? rowChildren.map((childRow) => (
            <CustomTableRow
              row={{ ...childRow, label: `-- ${childRow.label}` }}
            />
          ))
        : null}
    </>
  );
}
