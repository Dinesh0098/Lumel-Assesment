import { TableCell, TableRow, TextField } from "@mui/material";
import { useState, useMemo } from "react";
import CustomButton from "../../Button";

const ADD_VALUE_ACTION = "addValue";

export default function CustomTableRow({ row, mutateParent }) {
  const [currentRowData, setCurrentRowData] = useState({ ...row });
  const [inputValue, setInputValue] = useState("");

  // Destructure properties from currentRowData using useMemo for memoization
  const { label, value, children, gain } = useMemo(
    () => currentRowData,
    [currentRowData]
  );

  const onInputValueChange = (event) => {
    // Remove non-numeric characters and leading zeros
    const sanitizedValue = event.target.value
      .replace(/[^0-9]/g, "")
      .replace(/^0+/, "");
    setInputValue(sanitizedValue);
  };

  // Calculate the value change based on action and update the state
  const calculateValueChange = (action) => {
    const parsedValue = Number(value ?? 0);
    const parsedInputValue = Number(inputValue ?? 0);
    let newValue = 0;

    if (action === ADD_VALUE_ACTION) {
      // Add input value to the current value
      newValue = parsedValue + parsedInputValue;
      mutateParent?.(parsedInputValue); // Update parent with the input value
    } else {
      // Calculate percentage change
      const percentage = (parsedValue * parsedInputValue) / 100;
      newValue = parsedValue + percentage;
      mutateParent?.(percentage); // Update parent with the percentage value
    }

    // Calculate gain and update the current row data
    const newGain = ((newValue - row.value) / row.value) * 100;
    setCurrentRowData({ ...currentRowData, value: newValue, gain: newGain });
  };

  // Handle changes from child rows
  const onChildValueChange = (childValue) => {
    const newValue = Number(value) + Number(childValue);
    const newGain = ((newValue - row.value) / row.value) * 100;
    setCurrentRowData({ ...currentRowData, value: newValue, gain: newGain });
  };

  return (
    <>
      <TableRow>
        <TableCell align="center">{label}</TableCell>
        <TableCell align="center">{value?.toFixed(2)}</TableCell>
        <TableCell align="center">
          <TextField
            size="small"
            placeholder="Add value"
            onChange={onInputValueChange}
            value={inputValue}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "12px",
              },
            }}
          />
        </TableCell>
        <TableCell align="center">
          <CustomButton
            onClick={() => calculateValueChange()}
            title="Allocate %"
            disabled={!inputValue}
          />
        </TableCell>
        <TableCell align="center">
          <CustomButton
            onClick={() => calculateValueChange(ADD_VALUE_ACTION)}
            title="Allocate Val"
            disabled={!inputValue}
          />
        </TableCell>
        <TableCell align="center">{gain ? `${gain?.toFixed(2)}%` : "0%"}</TableCell>
      </TableRow>
      {children?.length
        ? children.map((childRow) => (
            <CustomTableRow
              key={childRow.label} // Ensure a unique key for each child row
              row={{ ...childRow, label: `-- ${childRow.label}` }}
              mutateParent={onChildValueChange}
            />
          ))
        : null}
    </>
  );
}
