import { Input, InputAdornment, TableCell, TableRow } from "@mui/material";
import { ChangeEvent } from "react";
import { ChipResults } from "../../types/ChipResults";
import { Members } from "../../types/Members";

type Props = {
  member: Members;
  result: ChipResults;
  onChipTotal: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const MatrixTableRow = (props: Props) => {
  const { member, result, onChipTotal } = props;

  // memberを配列に変更してmapする
  console.log([member]);

  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {member}
      </TableCell>
      <TableCell component="th" scope="row">
        <Input
          type="number"
          name="member1"
          onChange={onChipTotal}
          endAdornment={<InputAdornment position="end">枚</InputAdornment>}
        />
      </TableCell>
      <TableCell align="right">{`${result.member1}円`}</TableCell>
    </TableRow>
  );
};
