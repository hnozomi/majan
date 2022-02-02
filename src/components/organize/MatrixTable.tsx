import { useContext, useState } from "react";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { Box, Typography } from "@mui/material";

import { Members } from "../../types/Members";
import { SCORE_SCREEN } from "../../const/MatrixConst";
import { MatrixTableSelectCell } from "./MatrixTableSelectCell";
import { MatrixTableInputCell } from "./MatrixTableInputCell";
import { PointsContext } from "../../context/MembersPointsContext";

export const MatrixTable = () => {
  const members = localStorage.getItem("Members");
  const jsonMembers: Members = JSON.parse(members!);
  const { updateRow } = useContext(PointsContext);

  const [rows, setRows] = useState([{ id: 1 }, { id: 2 }, { id: 3 }]);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "bet",
      headerName: "掛け金",
      width: 100,
      sortable: false,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableSelectCell id={params.id} field={params.field} />
      ),
    },
    {
      field: "member1",
      headerName: jsonMembers.member1,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableInputCell id={params.id} field={params.field} />
      ),
    },
    {
      field: "member2",
      headerName: jsonMembers.member2,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableInputCell id={params.id} field={params.field} />
      ),
    },
    {
      field: "member3",
      headerName: jsonMembers.member3,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableInputCell id={params.id} field={params.field} />
      ),
    },
    {
      field: "member4",
      headerName: jsonMembers.member4,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableInputCell id={params.id} field={params.field} />
      ),
    },
  ];

  const addRows = () => {
    const addRows = { id: rows.length + 1 };
    updateRow();
    setRows([...rows, addRows]);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mt: 3,
        }}
      >
        <Typography variant="h5" sx={{ mr: 2 }}>
          {SCORE_SCREEN.header}
        </Typography>
        <AddCircleIcon onClick={addRows} />
        <Typography sx={{ verticalAlign: "middle" }}>行を追加</Typography>
      </Box>
      <Typography sx={{ color: "red", mb: 1, fontSize: "0.85em" }}>
        飛び賞・焼き鳥・オカの得点も追加しておく
      </Typography>
      <DataGrid
        sx={{ boxSizing: "border-box", height: 400 }}
        rows={rows}
        columns={columns}
        pageSize={5}
        editMode="row"
      />
    </>
  );
};
