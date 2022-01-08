import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FC } from "react";

export const SelectBet: FC = () => {
  const [bet, setBet] = useState("");

  const handleChange = (e: SelectChangeEvent<string>) => {
    setBet(e.target.value);
  };

  return (
    <>
      <Select
        variant="standard"
        sx={{ width: "100%" }}
        value={bet}
        label="Bet"
        onChange={handleChange}
      >
        {arrays.map((array, index) => (
          <MenuItem sx={{ width: "100%" }} value={array} key={index}>
            {array}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

const arrays = [
  "点1",
  "点2",
  "点3",
  "点4",
  "点5",
  "点6",
  "点7",
  "点8",
  "点9",
  "点10",
];
