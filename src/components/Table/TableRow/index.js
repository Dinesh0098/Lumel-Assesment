import { Button, TableCell, TableRow, TextField } from "@mui/material";
import { useState } from "react";
import CustomButton from "../../Button";

const ADD_VALUE_ACTION = "addValue";

export default function CustomTableRow({ row, mutateParent }) {
  const [currentRowData, setCurrentRowData] = useState({ ...row });
  const [inputValue, setInputValue] = useState();

  const { label, value, children, gain } = currentRowData;
  const rowChildren = children;

  const onInputValueChange = (event) => {
    const value = event.target.value;

    // Remove non-numeric characters, spaces, and ensure no leading zeros
    const sanitizedValue = value.replace(/[^0-9]/g, "").replace(/^0+/, "");

    // Set the sanitized value.
    setInputValue(sanitizedValue ?? 0);
  };

  const calculateValueChange = (action) => {
    let addingValue = 0;

    if (action === ADD_VALUE_ACTION) {
      addingValue = Number(value ?? 0) + Number(inputValue);
      mutateParent?.(value);
    } else {
      const percentage = (value * inputValue) / 100;
      addingValue = Number(value ?? 0) + Number(percentage);
      mutateParent?.(percentage);
    }

    const gain = ((addingValue - row.value) / row.value) * 100;

    // Spreading data to remove the object reference
    setCurrentRowData({
      ...{
        ...currentRowData,
        value: addingValue,
        gain,
      },
    });
  };

  const onChildValueChange = (childValue) => {
    const addingValue = Number(value) + Number(childValue);

    const gain = ((addingValue - row.value) / row.value) * 100;

    // Spreading data to remove the object reference
    setCurrentRowData({
      ...{
        ...currentRowData,
        value: addingValue,
        gain,
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell>{label}</TableCell>
        <TableCell>{value?.toFixed(2)}</TableCell>
        <TableCell>
          <TextField
            size="small"
            placeholder="Add value"
            onChange={onInputValueChange}
            value={inputValue}
          />
        </TableCell>
        <TableCell>
          <CustomButton
            onClick={() => calculateValueChange()}
            title={"Allocate %"}
            disabled={!inputValue}
          ></CustomButton>
        </TableCell>
        <TableCell>
          <CustomButton
            onClick={() => calculateValueChange(ADD_VALUE_ACTION)}
            title={"Allocate Val"}
            disabled={!inputValue}
          ></CustomButton>
        </TableCell>
        <TableCell>{gain?.toFixed(2) ?? "-"}</TableCell>
      </TableRow>
      {rowChildren?.length
        ? rowChildren.map((childRow) => (
            <CustomTableRow
              row={{ ...childRow, label: `-- ${childRow.label}` }}
              mutateParent={onChildValueChange}
            />
          ))
        : null}
    </>
  );
}
