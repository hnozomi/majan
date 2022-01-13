import { useContext, useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FC } from "react";
import { PointsContext } from "../../context/MembersPointsContext";

type Props = {
  params: any;
};

type BetType = {
  id: number;
};

export const SelectBet: FC<Props> = (props) => {
  const { field, id } = props.params;
  const { points, updateMatrix } = useContext(PointsContext);
  const [bet, setBet] = useState([{}]);

  return (
    <>
      <Select
        variant="standard"
        sx={{ width: "100%" }}
        value={points[id - 1]?.bet}
        label="Bet"
        // onChange={handleChange}
        onChange={(e) => updateMatrix(e, id, field)}
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
