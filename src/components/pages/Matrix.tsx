import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { SelectBet } from "../organize/SelectBet";
import { DisplayPoints } from "../organize/DisplayPoints";
// import { FormSelect } from "./FormSelect";
// import { FormInput } from "./FormInput";

type Member = {
  first: string;
  second: string;
  third: string;
  fourth: string;
};

const rows = [{ id: 1 }, { id: 2 }, { id: 3 }];
// const rows = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

// カラムではなくてRowsでRenderCellsはできる？
// const columns = [
//   { field: "id", headerName: "ID", width: 100 },
//   // 詳細ボタン
//   {
//     field: "editBtn",
//     headerName: "詳細",
//     sortable: false,
//     width: 130,
//     editable: true,
//     renderCell: <div>AAA</div>,
//     // renderCell: (params) => <FormSelect param={params} />,
//   },
//   {
//     field: "member1",
//     headerName: [member1],
//     sortable: false,
//     width: 100,
//     editable: true,
//     renderCell: <div>BBB</div>,
//     // renderCell: (params) => <FormInput rows={rows} />,
//     // disableClickEventBubbling: true
//   },
//   {
//     field: "member2",
//     headerName: [member2],
//     sortable: false,
//     width: 100,
//     editable: true,
//     renderCell: <div>CCC</div>,
//     // disableClickEventBubbling: true
//     // renderCell: (params) => <FormInput rows={rows} />
//   },
//   {
//     field: "member3",
//     headerName: [member3],
//     sortable: false,
//     width: 100,
//     editable: true,
//     renderCell: <div>DDD</div>,
//     // disableClickEventBubbling: true
//     // renderCell: renderRatingEditInputCell,
//   },
//   {
//     field: "member4",
//     headerName: [member4],
//     sortable: false,
//     width: 100,
//     editable: true,
//     renderCelss: <div>EEE</div>,
//   },
// ];

export const Matrix = () => {
  const member = localStorage.getItem("Members");
  const { first, second, third, fourth }: Member = JSON.parse(member!);
  const [editRowsModel, setEditRowsModel] = useState();

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "editBtn",
      headerName: "掛け金",
      width: 100,
      sortable: false,
      editable: true,
      renderCell: () => <SelectBet />,
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
    <div style={{ height: 400, width: 800 }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} editMode="row" />
    </div>
  );
};
