import { useContext, useState, ChangeEvent, FC } from "react";

import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import {
  Box,
  Button,
  Grid,
  TableHead,
  Typography,
  Input,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { SelectBet } from "../organize/SelectBet";
import { DisplayPoints } from "../organize/DisplayPoints";
import { PointsContext } from "../../context/MembersPointsContext";
import { useCalculatePoints } from "../../hooks/useCalculatePoints";
import { Members } from "../../types/Members";
import { ChipResults } from "../../types/ChipResults";

// type Result = {
//   member1: number;
//   member2: number;
//   member3: number;
//   member4: number;
// };

type Props = {
  setComplete: any;
};

export const Matrix: FC<Props> = (props) => {
  const { setComplete } = props;
  const { points, updateRow } = useContext(PointsContext);
  const { calculatePoints } = useCalculatePoints();

  const [open, setOpen] = useState(false);
  const [totalChip, setTotalChip] = useState<ChipResults>({
    member1: 0,
    member2: 0,
    member3: 0,
    member4: 0,
  });
  const chipInfomation = localStorage.getItem("Chip");
  const { hasChip, total, money } = JSON.parse(chipInfomation!);
  const members = localStorage.getItem("Members");
  const {
    first = "なし",
    second = "なし",
    third = "なし",
    fourth = "なし",
  }: Members = JSON.parse(members!);
  const [rows, setRows] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  const [result, setResult] = useState<ChipResults>({
    member1: 0,
    member2: 0,
    member3: 0,
    member4: 0,
  });

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

  // const calculatePoints = () => {
  //   let member1Total: number = totalChip.member1 * money;
  //   let member2Total: number = totalChip.member2 * money;
  //   let member3Total: number = totalChip.member3 * money;
  //   let member4Total: number = totalChip.member4 * money;

  //   for (var i = 0; i < points.length; i++) {
  //     const bet = points[i].bet.slice(1) / 100;
  //     if (points[i].member1 !== null) {
  //       const pt1 = Number(points[i].member1) - 40000;
  //       member1Total = member1Total + pt1 * bet;
  //     }
  //     if (points[i].member2 !== null) {
  //       const pt2 = Number(points[i].member2) - 40000;
  //       member2Total = member2Total + pt2 * bet;
  //     }
  //     if (points[i].member3 !== null) {
  //       const pt3 = Number(points[i].member3) - 40000;
  //       member3Total = member3Total + pt3 * bet;
  //     }
  //     if (points[i].member4 !== null) {
  //       const pt4 = points[i].member4 - 40000;
  //       member4Total = member4Total + pt4 * bet;
  //     }
  //   }

  //   setResult({
  //     ...result,
  //     member1: member1Total,
  //     member2: member2Total,
  //     member3: member3Total,
  //     member4: member4Total,
  //   });
  // };

  const addRows = () => {
    const addRows = { id: rows.length + 1 };
    updateRow();
    setRows([...rows, addRows]);
  };

  const onChipTotal = (e: ChangeEvent<HTMLInputElement>) => {
    setTotalChip({
      ...totalChip,
      [e.target.name]: Number(e.target.value) - total,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onLocalStorageClear = () => {
    localStorage.removeItem("Members");
    localStorage.removeItem("Rules");
    localStorage.removeItem("Kaeshi");
    localStorage.removeItem("Chip");
    localStorage.removeItem("Complete");
    setComplete(false);
    setOpen(false);
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
    <div style={{ height: 400 }}>
      <Grid container sx={{ width: "100%" }}>
        {/* {chip && (
          <Grid item xs={3}>
            <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "8ch" }}>
              <FormHelperText id="standard-weight-helper-text">
                チップ
              </FormHelperText>
              <Input
                id="standard-adornment-weight"
                name="chip"
                value={200}
                onChange={(e) => setPerChip(Number(e.target.value))}
                endAdornment={
                  <InputAdornment position="end">/枚</InputAdornment>
                }
                aria-describedby="standard-weight-helper-text"
              />
            </FormControl>
          </Grid>
        )} */}
      </Grid>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography variant="h5" sx={{ p: 1, mr: 2 }}>
          スコア表
        </Typography>
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
          結果
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
              <TableCell sx={{ width: 70 }}>メンバー</TableCell>
              <TableCell sx={{ width: 100 }} align="left">
                チップ枚数
              </TableCell>
              <TableCell align="right">合計</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {first}
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
            <TableRow>
              <TableCell component="th" scope="row">
                {second}
              </TableCell>
              <TableCell component="th" scope="row">
                <Input
                  type="number"
                  name="member2"
                  onChange={onChipTotal}
                  endAdornment={
                    <InputAdornment position="end">枚</InputAdornment>
                  }
                />
              </TableCell>
              <TableCell align="right">{`${result.member2}円`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                {third}
              </TableCell>
              <TableCell component="th" scope="row">
                <Input
                  type="number"
                  name="member3"
                  onChange={onChipTotal}
                  endAdornment={
                    <InputAdornment position="end">枚</InputAdornment>
                  }
                />
              </TableCell>
              <TableCell align="right">{`${result.member3}円`}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                {fourth}
              </TableCell>
              <TableCell component="th" scope="row">
                <Input
                  type="number"
                  name="member4"
                  onChange={onChipTotal}
                  endAdornment={
                    <InputAdornment position="end">枚</InputAdornment>
                  }
                />
              </TableCell>
              <TableCell align="right">{`${result.member4}円`}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        sx={{ mt: 1, mb: 1 }}
        variant="contained"
        onClick={() => setOpen(true)}
        // onClick={onLocalStorageClear}
      >
        クリアする
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"クリアしてもいいですか"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            クリアすると、今回のスコア表が削除され設定画面に画面に戻ります
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>いいえ</Button>
          <Button onClick={onLocalStorageClear} autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
