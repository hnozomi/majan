import { FC, useContext, useState } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { PointsContext } from "../../context/MembersPointsContext";
import { betArrays } from "../../const/SelectBetConst";

type Props = {
  params: any;
};

export const SelectBet: FC<Props> = (props) => {
  const { field, id } = props.params;
  const { points, updateMatrix } = useContext(PointsContext);

  return (
    <>
      <Select
        variant="standard"
        sx={{ width: "100%" }}
        value={points[id - 1]?.bet}
        label="Bet"
        onChange={(e) => updateMatrix(e, id, field)}
      >
        {betArrays.map((array, index) => (
          <MenuItem sx={{ width: "100%" }} value={array} key={index}>
            {array}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
