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

  {
    console.log(jsonMembers);
  }
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "bet",
      headerName: "掛け金",
      width: 100,
      sortable: false,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableSelectCell params={params} />
      ),
    },
    {
      field: "member1",
      headerName: jsonMembers.member1,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableInputCell params={params} />
      ),
    },
    {
      field: "member2",
      headerName: jsonMembers.member2,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableInputCell params={params} />
      ),
    },
    {
      field: "member3",
      headerName: jsonMembers.member3,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableInputCell params={params} />
      ),
    },
    {
      field: "member4",
      headerName: jsonMembers.member4,
      sortable: false,
      width: 100,
      editable: true,
      renderCell: (params: GridRenderCellParams<Date>) => (
        <MatrixTableInputCell params={params} />
      ),
    },
  ];

  const addRows = () => {
    const addRows = { id: rows.length + 1 };
    updateRow();
    setRows([...rows, addRows]);
  };

  console.log("Tableレンダリング");

  return (
    <>
      {console.log(jsonMembers)}
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
        sx={{ boxSizing: "border-box", m: 1, height: 400 }}
        rows={rows}
        columns={columns}
        pageSize={5}
        editMode="row"
      />
    </>
  );
};
