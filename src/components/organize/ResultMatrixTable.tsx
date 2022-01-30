import { useState, ChangeEvent, useContext } from "react";

import {
  Box,
  Button,
  TableHead,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
} from "@mui/material";

import { RESULT_SCREEN } from "../../const/MatrixConst";
import { PointsContext } from "../../context/MembersPointsContext";
import { useCalculatePoints } from "../../hooks/useCalculatePoints";
import { ChipResults } from "../../types/ChipResults";
import { Members } from "../../types/Members";
import { ResultMatrixTableRow } from "./ResultMatrixTableRow";

export const ResultMatrixTable = () => {
  const { points } = useContext(PointsContext);

  const chipInfomation = localStorage.getItem("Chip");
  const { total } = JSON.parse(chipInfomation!);

  const members = localStorage.getItem("Members");
  const jsonMembers: Members = JSON.parse(members!);

  const { calculatePoints } = useCalculatePoints();
  const [totalChip, setTotalChip] = useState<ChipResults>({
    member1: 0,
    member2: 0,
    member3: 0,
    member4: 0,
  });
  const [result, setResult] = useState<ChipResults>({
    member1: 0,
    member2: 0,
    member3: 0,
    member4: 0,
  });

  const onChipTotal = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalChip({
      ...totalChip,
      [e.target.name]: Number(e.target.value) - total,
    });
  };

  const excuteCalculatePoints = () => {
    const res = calculatePoints(points, totalChip);
    setResult({
      ...result,
      member1: res.member1,
      member2: res.member2,
      member3: res.member3,
      member4: res.member4,
    });
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 1,
          mt: 5,
        }}
      >
        <Typography variant="h5" sx={{ p: 1 }}>
          {RESULT_SCREEN.header}
        </Typography>
        <Button variant="contained" onClick={excuteCalculatePoints}>
          計算する
        </Button>
      </Box>
      <TableContainer
        component={Paper}
        sx={{ mb: 5, p: 1, boxSizing: "border-box" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: 70 }}>{RESULT_SCREEN.column1}</TableCell>
              <TableCell sx={{ width: 100 }} align="left">
                {RESULT_SCREEN.column2}
              </TableCell>
              <TableCell align="right">{RESULT_SCREEN.column3}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ResultMatrixTableRow
              member={jsonMembers}
              result={result}
              onChipTotal={onChipTotal}
            />
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
