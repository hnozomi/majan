import { ChangeEvent } from "react";

import { Input, InputAdornment, TableCell, TableRow } from "@mui/material";

import { ChipResults } from "../../types/ChipResults";
import { Members } from "../../types/Members";
import { UNIT } from "../../const/MatrixConst";

type Props = {
  member: Members;
  result: ChipResults;
  onChipTotal: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const ResultMatrixTableRow = (props: Props) => {
  console.log("ResultMatrixTableRow実行");
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
                  <InputAdornment position="end">
                    {UNIT.distribution}
                  </InputAdornment>
                }
              />
            </TableCell>
            <TableCell align="right">{`${result[key]}${UNIT.total}`}</TableCell>
          </TableRow>
        )
      )}
    </>
  );
};
