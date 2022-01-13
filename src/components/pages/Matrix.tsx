import { useContext, useState } from "react";

import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Input, InputAdornment } from "@mui/material";
import { SelectBet } from "../organize/SelectBet";
import { DisplayPoints } from "../organize/DisplayPoints";
import { PointsContext } from "../../context/MembersPointsContext";
import { totalmem } from "os";

import AddCircleIcon from "@mui/icons-material/AddCircle";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

type Member = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

type Rules = {
  chip: boolean;
  yakitori: boolean;
  tobi: boolean;
};

type Result = {
  member1: number;
  member2: number;
  member3: number;
  member4: number;
};

// const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];

export const Matrix = () => {
  const [kaeshi, setKaeshi] = useState(0);
  const members = localStorage.getItem("Members");
  const rules = localStorage.getItem("Rules");
  const {
    first = "なし",
    second = "なし",
    third = "なし",
    fourth = "なし",
  }: Member = JSON.parse(members!);
  const { chip, yakitori, tobi }: Rules = JSON.parse(rules!);
  const [rows, setRows] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  const { points, updateRow } = useContext(PointsContext);
  const [result, setResult] = useState<Result>({
    member1: 0,
    member2: 0,
    member3: 0,
    member4: 0,
  });
  // console.log(points.length);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "bet",
      headerName: "掛け金",
      width: 100,
      sortable: false,
      editable: true,
      renderCell: (params: any) => <SelectBet params={params} />,
    },
    {
      field: "member1",
      headerName: first,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: any) => <DisplayPoints params={params} />,
    },
    {
      field: "member2",
      headerName: second,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: any) => <DisplayPoints params={params} />,
    },
    {
      field: "member3",
      headerName: third,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: any) => <DisplayPoints params={params} />,
    },
    {
      field: "member4",
      headerName: fourth,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: any) => <DisplayPoints params={params} />,
    },
  ];

  const calculatePoints = () => {
    let member1Total: number = 0;
    let member2Total: number = 0;
    let member3Total: number = 0;
    let member4Total: number = 0;
    for (var i = 0; i < points.length; i++) {
      const bet = points[i].bet.slice(1) / 100;
      const pt1 = Number(points[i].member1) - 40000;
      const pt2 = Number(points[i].member2) - 40000;
      const pt3 = Number(points[i].member3) - 40000;
      const pt4 = Number(points[i].member4) - 40000;
      member1Total = member1Total + pt1 * bet;
      member2Total = member2Total + pt2 * bet;
      member3Total = member3Total + pt3 * bet;
      member4Total = member4Total + pt4 * bet;
    }
    setResult({
      ...result,
      member1: member1Total,
      member2: member2Total,
      member3: member3Total,
      member4: member4Total,
    });
  };

  const addRows = () => {
    const addRows = { id: rows.length + 1 };
    updateRow();
    setRows([...rows, addRows]);
  };

  return (
    <div style={{ height: 400 }}>
      <Grid container sx={{ width: "100%" }}>
        {chip && (
          <Grid item xs={3}>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "8ch" }}>
              <FormHelperText id="standard-weight-helper-text">
                チップ
              </FormHelperText>
              <Input
                id="standard-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">/枚</InputAdornment>
                }
                aria-describedby="standard-weight-helper-text"
              />
            </FormControl>
          </Grid>
        )}
        {yakitori && (
          <Grid item xs={3}>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "8ch" }}>
              <FormHelperText id="standard-weight-helper-text">
                焼き鳥
              </FormHelperText>
              <Input
                id="standard-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">pt</InputAdornment>
                }
                aria-describedby="standard-weight-helper-text"
              />
            </FormControl>
          </Grid>
        )}
        {tobi && (
          <Grid item xs={3}>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "8ch" }}>
              <FormHelperText id="standard-weight-helper-text">
                飛び賞
              </FormHelperText>
              <Input
                id="standard-adornment-weight"
                endAdornment={
                  <InputAdornment position="end">pt</InputAdornment>
                }
                aria-describedby="standard-weight-helper-text"
              />
            </FormControl>
          </Grid>
        )}
        <Grid item xs={3}>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "8ch" }}>
            <FormHelperText id="standard-weight-helper-text">
              返し
            </FormHelperText>
            <Input
              id="standard-adornment-weight"
              endAdornment={<InputAdornment position="end">pt</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
              onChange={(e) => setKaeshi(Number(e.target.value))}
            />
          </FormControl>
        </Grid>
      </Grid>
      {/* <Button variant="contained" onClick={addRows}>
        行を追加する
      </Button> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
        }}
      >
        <AddCircleIcon onClick={addRows} />
        <Typography sx={{ verticalAlign: "middle" }}>行を追加する</Typography>
      </Box>
      <DataGrid
        sx={{ boxSizing: "border-box", m: 1 }}
        rows={rows}
        columns={columns}
        pageSize={5}
        editMode="row"
      />
      <Box sx={{ textAlign: "right", p: 1 }}>
        <Button variant="contained" onClick={calculatePoints}>
          計算する
        </Button>
      </Box>
      <Typography variant="h5" sx={{ p: 1 }}>
        結果
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ mb: 5, p: 2, boxSizing: "border-box" }}
      >
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {first}
              </TableCell>
              <TableCell align="left">{`${result.member1}円`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                {second}
              </TableCell>
              <TableCell align="left">{`${result.member2}円`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                {third}
              </TableCell>
              <TableCell align="left">{`${result.member3}円`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                {fourth}
              </TableCell>
              <TableCell align="left">{`${result.member4}円`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
