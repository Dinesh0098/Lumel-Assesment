import { Button } from "@mui/material";

export default function CustomButton({ title, onClick, disabled }) {
  return (
    <Button
      variant="outlined"
      size="small"
      sx={{ textTransform: "capitalize" }}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </Button>
  );
}
