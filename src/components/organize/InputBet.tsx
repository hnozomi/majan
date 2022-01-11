import { Input, InputAdornment } from "@mui/material";
import { FC, useContext } from "react";
import { PointsContext } from "../../context/MembersPointsContext";

type Props = {
  fieldName: string;
  id: any;
};

export const InputBet: FC<Props> = (props) => {
  const { updateMatrix } = useContext(PointsContext);
  const { fieldName, id } = props;
  return (
    <Input
      sx={{ textAlign: "right" }}
      // value={points[0].member1}
      // onChange={handleChange("member1")}
      onChange={(e) => updateMatrix(e, id, fieldName)}
      endAdornment={<InputAdornment position="end">pt</InputAdornment>}
      inputProps={{
        "aria-label": "member1",
      }}
    />
  );
};
