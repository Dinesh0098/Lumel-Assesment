import { TableCell } from "@mui/material";

// Define the HeaderCell component with styling
export default function HeaderCell({ title }) {
  return (
    <TableCell
      sx={{
        fontWeight: "bold",
        backgroundColor: "#e0e0e0",
        textAlign: "center",
      }}
    >
      {title}
    </TableCell>
  );
}
