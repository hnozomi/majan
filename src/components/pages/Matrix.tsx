import { useContext, useState } from "react";

import {
  Box,
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

const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];

export const Matrix = () => {
  const members = localStorage.getItem("Members");
  const rules = localStorage.getItem("Rules");
  const { first, second, third, fourth }: Member = JSON.parse(members!);
  const { chip, yakitori, tobi }: Rules = JSON.parse(rules!);

  const { points } = useContext(PointsContext);

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "editBtn",
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
  return (
    <div style={{ height: 400, width: 800, margin: 10 }}>
      <Grid container columns={2} direction="column">
        {chip && (
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "15ch" }}>
            <FormHelperText id="standard-weight-helper-text">
              チップ
            </FormHelperText>
            <Input
              id="standard-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
            />
          </FormControl>
        )}
        {yakitori && (
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "15ch" }}>
            <FormHelperText id="standard-weight-helper-text">
              焼き鳥
            </FormHelperText>
            <Input
              id="standard-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
            />
          </FormControl>
        )}
        {tobi && (
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "15ch" }}>
            <FormHelperText id="standard-weight-helper-text">
              飛び賞
            </FormHelperText>
            <Input
              id="standard-adornment-weight"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="standard-weight-helper-text"
            />
          </FormControl>
        )}
      </Grid>
      <DataGrid rows={rows} columns={columns} pageSize={5} editMode="row" />
      <Box>{`トータル: ${points[0].member1}`}</Box>
    </div>
  );
};
