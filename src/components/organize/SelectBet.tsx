import { useState } from "react";
import { SelectChangeEvent } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { FC } from "react";

type Props = {
  params: any;
};

type BetType = {
  id: number;
};

export const SelectBet: FC<Props> = (props) => {
  const { id } = props.params;
  console.log(id);
  const [bet, setBet] = useState([{}]);

  const handleChange = (e: SelectChangeEvent<string>) => {
    // console.log(id);
    // const test = { ...bet[1]: { id: 0, bet: "" }};
    const temp = { id: id, bet: e.target.value };
    console.log(temp);
    console.log([...bet, temp]);
    setBet([...bet, temp]);
    // console.log({ ...bet });
    // const temp1 = { ...bet, [id]: temp };
    // console.log(temp1);
    // console.log(test);
    // console.log(bet);

    // const temp = { ...bet[1], id: id, bet: e.target.value };
    // console.log(temp);
    // setBet([...bet, { [id]: temp }]);
    // setBet([{ ...bet, [id]: temp }]);
  };

  // const test: keyof BetType = id;
  const test: any = 0;

  return (
    <>
      {console.log(bet)}
      <Select
        variant="standard"
        sx={{ width: "100%" }}
        // value={bet[0]}
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
