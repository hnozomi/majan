import { Input, InputAdornment, TableCell, TableRow } from "@mui/material";
import { ChangeEvent } from "react";
import { ChipResults } from "../../types/ChipResults";
import { Members } from "../../types/Members";

type Props = {
  member: Keys;
  result: ChipResults;
  onChipTotal: (e: ChangeEvent<HTMLInputElement>) => void;
};

type Keys = {
  [key: string]: {
    content: string;
  };
};

export const MatrixTableRow = (props: Props) => {
  const { member, result, onChipTotal } = props;

  return (
    <>
      {Object.keys(member).map(
        (
          key: string //Object.keyでmemberオブジェクトのキーだけを抜き出し、配列にして返す
        ) => (
          <TableRow>
            <TableCell component="th" scope="row">
              {member[key]}
            </TableCell>
            <TableCell component="th" scope="row">
              <Input
                type="number"
                name="member1"
                onChange={onChipTotal}
                endAdornment={
                  <InputAdornment position="end">枚</InputAdornment>
                }
              />
            </TableCell>
            <TableCell align="right">{`${result.member1}円`}</TableCell>
          </TableRow>
        )
      )}
      {/* {Object.values(member).map((value) => (
        <TableRow>
          <TableCell component="th" scope="row">
            {value}
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
      ))} */}
      {/* {Object.values(member).map((value) => {
        return (
          <TableRow>
            <TableCell component="th" scope="row">
              {value}
            </TableCell>
            <TableCell component="th" scope="row">
              <Input
                type="number"
                name="member1"
                onChange={onChipTotal}
                endAdornment={
                  <InputAdornment position="end">枚</InputAdornment>
                }
              />
            </TableCell>
            <TableCell align="right">{`${result.member1}円`}</TableCell>
          </TableRow>
        );
      })} */}
      {/* {Object.values(member).forEach((value) => {
        let elements = [];
        elements.push(
          <TableRow>
            <TableCell component="th" scope="row">
              {value}
            </TableCell>
            <TableCell component="th" scope="row">
              <Input
                type="number"
                name="member1"
                onChange={onChipTotal}
                endAdornment={
                  <InputAdornment position="end">枚</InputAdornment>
                }
              />
            </TableCell>
            <TableCell align="right">{`${result.member1}円`}</TableCell>
          </TableRow>
        );
        return elements;
      })} */}

      {/* {(() => {
        let elements: any = [];
        Object.values(obj1).forEach((value) => {
          elements.push(
            <tr>
              <td>{value}</td>
            </tr>
          );
        });
        return elements;
      })()} */}
    </>
    // test.map((m) => <p>{m}</p>)
    // member.map((test) => <p>{test}</p>)
    // member.map((test) => console.log(test))
    // Object.keys(member).forEach((key: any) => {
    //   console.log(`${key}: ${member[key]}`);
    // })

    // <TableRow>
    //   <TableCell component="th" scope="row">
    //     {person.member1}
    //   </TableCell>
    //   <TableCell component="th" scope="row">
    //     <Input
    //       type="number"
    //       name="member1"
    //       onChange={onChipTotal}
    //       endAdornment={<InputAdornment position="end">枚</InputAdornment>}
    //     />
    //   </TableCell>
    //   <TableCell align="right">{`${result.member1}円`}</TableCell>
    // </TableRow>
  );
};
