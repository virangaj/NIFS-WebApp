import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import Ripple from "../../../components/Ripple";
import RequestStatusView from "../../../components/tableIcons/RequestStatusView";

const InsuranceClaimRequestTable = ({
  setSelectedData,
  requests,
  loading,
}: any) => {
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
        headerName: "date",
        width: 300,
        editable: true,
      },
      {
        field: "noOfClaims",
        headerName: "No Of Claims",
        width: 300,
        editable: true,
      },
      {
        field: "claimAmount",
        headerName: "Claim Amount",
        width: 300,
        editable: true,
      },
      {
        field: "totalBillAmount",
        headerName: "Total Bill Amount",
        width: 300,
        editable: true,
      },
      {
        field: "paidClaimAmount",
        headerName: "Paid Claim Amount",
        width: 300,
        editable: true,
      },
      {
        field: "notPaidClaimAmount",
        headerName: "Not Paid Claim Amount",
        width: 300,
        editable: true,
      },
      {
        field: "claimPaidDate",
        headerName: "Claim Paid Date",
        width: 300,
        editable: true,
      },
      {
        field: "spectacleClaimDate",
        headerName: "Spectacle Claim Date",
        width: 300,
        editable: true,
      },
      {
        field: "remark",
        headerName: "remark",
        width: 300,
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

export default InsuranceClaimRequestTable;
