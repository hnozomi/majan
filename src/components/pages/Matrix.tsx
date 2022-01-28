import { useContext, useState, ChangeEvent, FC } from "react";

import { DataGrid } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { MatrixTableSelectCell } from "../organize/MatrixTableSelectCell";
import { MatrixTableInputCell } from "../organize/MatrixTableInputCell";
import { PointsContext } from "../../context/MembersPointsContext";
import { useCalculatePoints } from "../../hooks/useCalculatePoints";
import { ChipResults } from "../../types/ChipResults";
import { ResultMatrixTableRow } from "../organize/ResultMatrixTableRow";
import { Members } from "../../types/Members";
import { RESULT_SCREEN } from "../../const/MatrixConst";
import { SCORE_SCREEN } from "../../const/MatrixConst";

type Props = {
  setComplete: any;
};

export const Matrix: FC<Props> = (props) => {
  const { setComplete } = props;

  const { points, updateRow } = useContext(PointsContext);

  const chipInfomation = localStorage.getItem("Chip");
  const { total } = JSON.parse(chipInfomation!);

  const members = localStorage.getItem("Members");
  const jsonMembers: Members = JSON.parse(members!);

  const { calculatePoints } = useCalculatePoints();

  const [open, setOpen] = useState(false);
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

  const [rows, setRows] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "bet",
      headerName: "掛け金",
      width: 100,
      sortable: false,
      editable: true,
      renderCell: (params: any) => <MatrixTableSelectCell params={params} />,
    },
    {
      field: "member1",
      headerName: jsonMembers.member1,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: any) => <MatrixTableInputCell params={params} />,
    },
    {
      field: "member2",
      headerName: jsonMembers.member2,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: any) => <MatrixTableInputCell params={params} />,
    },
    {
      field: "member3",
      headerName: jsonMembers.member3,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: any) => <MatrixTableInputCell params={params} />,
    },
    {
      field: "member4",
      headerName: jsonMembers.member4,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: any) => <MatrixTableInputCell params={params} />,
    },
  ];

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography variant="h5" sx={{ p: 1, mr: 2 }}>
          {SCORE_SCREEN.header}
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
      <Button
        sx={{ mt: 1, mb: 1 }}
        variant="contained"
        onClick={() => setOpen(true)}
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
          {RESULT_SCREEN.dialog_title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {RESULT_SCREEN.dialog_message}
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
