import { ChangeEvent } from "react";

import { Input, InputAdornment, TableCell, TableRow } from "@mui/material";

import { ChipResults } from "../../types/ChipResults";
import { Members } from "../../types/Members";

type Props = {
  member: Members;
  result: ChipResults;
  onChipTotal: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const MatrixTableRow = (props: Props) => {
  const { member, result, onChipTotal } = props;

  return (
    <>
      {(Object.keys(member) as (keyof Members)[]).map(
        (
          key: keyof Members, //Object.keyでmemberオブジェクトのキーだけを抜き出し、配列にして返す
          index: number
        ) => (
          <TableRow key={index}>
            <TableCell component="th" scope="row">
              {member[key]}
            </TableCell>
            <TableCell component="th" scope="row">
              <Input
                type="number"
                name={key}
                onChange={onChipTotal}
                endAdornment={
                  <InputAdornment position="end">枚</InputAdornment>
                }
              />
            </TableCell>
            <TableCell align="right">{`${result[key]}円`}</TableCell>
          </TableRow>
        )
      )}
    </>
  );
};
