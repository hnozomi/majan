import { FC, memo, useContext } from "react";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { PointsContext } from "../../context/MembersPointsContext";
import { BETARRAYS } from "../../const/MatrixTableSelectCellConst";
import { GridRowId } from "@mui/x-data-grid";

type Props = {
  id: GridRowId;
  field: string;
};

export const MatrixTableSelectCell: FC<Props> = memo((props) => {
  const { field, id } = props;
  const numberId = id as number; // params.idは string | number (GridRowId)のため、numberのみにする。しかし、as (型アサーションは型の上書きになるためあまり使わないほうが良さそう)
  const { points, updateMatrix } = useContext(PointsContext);

  return (
    <>
      <Select
        variant="standard"
        sx={{ width: "100%" }}
        value={points[numberId - 1]?.bet}
        label="Bet"
        onChange={(e) => updateMatrix(e, numberId, field)}
      >
        {BETARRAYS.map((array, index) => (
          <MenuItem value={array} key={index}>
            {array}
          </MenuItem>
        ))}
      </Select>
    </>
  );
});
