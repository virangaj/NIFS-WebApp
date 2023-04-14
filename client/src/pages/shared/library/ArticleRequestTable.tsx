import React, { useMemo, useState } from "react";
import RequestStatusView from "../../../components/tableIcons/RequestStatusView";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Ripple from "../../../components/Ripple";

const ArticleRequestTable = ({ setSelectedData, requests, loading }: any) => {
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState(0);

  const columns = useMemo(
    () => [
      { field: "documentNo", headerName: "Document No", width: 175 },
      {
        field: "epfNo",
        headerName: "Employee",
        width: 100,
        editable: true,
      },
      {
        field: "divisionId",
        headerName: "Division ID",
        width: 100,
        editable: true,
      },
      {
        field: "designationId",
        headerName: "Designation",
        width: 120,
        editable: true,
      },
      {
        field: "createdOn",
        headerName: "Created on",
        width: 200,
        editable: true,
      },
      {
        field: "hod",
        headerName: "HOD",
        width: 100,
        editable: true,
      },
      {
        field: "actions1",
        headerName: "HOD Approved",
        type: "actions",
        renderCell: (params: any) => (
          <RequestStatusView status={params.row.hodApproved} />
        ),
        width: 200,
      },
      {
        field: "actions2",
        headerName: "Dir / Sec Approved",
        type: "actions",
        renderCell: (params: any) => (
          <RequestStatusView status={params.row.dirApproved} />
        ),
        width: 200,
      },

      {
        field: "date",
        headerName: "Date",
        width: 300,
        editable: true,
      },
      {
        field: "nameOfJournal",
        headerName: "Name Of Journal",
        width: 200,
        editable: true,
      },
      {
        field: "publishYear",
        headerName: "Publish Year",
        width: 200,
        editable: true,
      },
      {
        field: "volume",
        headerName: "Volume",
        width: 200,
        editable: true,
      },
      {
        field: "issue",
        headerName: "Issue",
        width: 200,
        editable: true,
      },
      {
        field: "pages",
        headerName: "Pages",
        width: 200,
        editable: true,
      },
      {
        field: "webLink",
        headerName: "Web Link",
        width: 200,
        editable: true,
      },
      {
        field: "remark",
        headerName: "Remark",
        width: 200,
        editable: true,
      },
    ],
    [rowId]
  );
  return (
    <div className="w-full h-[1000px]">
      {!loading ? (
        <DataGrid
          checkboxSelection={true}
          components={{ Toolbar: GridToolbar }}
          rowHeight={60}
          columns={columns}
          rows={requests && requests}
          getRowId={(row) => row.documentNo}
          rowsPerPageOptions={[10, 20, 30]}
          pageSize={pageSize}
          onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
          onCellEditCommit={(params: any) => setRowId(params.documentNo)}
          onSelectionModelChange={(d: any) => setSelectedData(d)}
        />
      ) : (
        <Ripple />
      )}
    </div>
  );
};

export default ArticleRequestTable;
