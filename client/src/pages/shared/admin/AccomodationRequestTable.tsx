import React, { useMemo, useState } from "react";
import RequestStatusView from "../../../components/tableIcons/RequestStatusView";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Ripple from "../../../components/Ripple";

const AccomodationRequestTable = ({
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
        field: "guestName",
        headerName: "Guest Name",
        width: 300,
        editable: true,
      },
      {
        field: "address",
        headerName: "Address",
        width: 300,
        editable: true,
      },
      {
        field: "email",
        headerName: "Email",
        width: 300,
        editable: true,
      },
      {
        field: "nicNo",
        headerName: "NIC No",
        width: 300,
        editable: true,
      },
      {
        field: "telephoneNo",
        headerName: "Telephone No",
        width: 300,
        editable: true,
      },
      {
        field: "requestType",
        headerName: "Request Type",
        width: 300,
        editable: true,
      },
      {
        field: "roomNumber",
        headerName: "Room Number",
        width: 300,
        editable: true,
      },
      {
        field: "noOfDays",
        headerName: "No Of Days",
        width: 300,
        editable: true,
      },
      {
        field: "fromDate",
        headerName: "From Date",
        width: 300,
        editable: true,
      },
      {
        field: "toDate",
        headerName: "To Date",
        width: 300,
        editable: true,
      },
      {
        field: "roomRates",
        headerName: "Room Rates",
        width: 300,
        editable: true,
      },
      {
        field: "roomType",
        headerName: "Room Type",
        width: 300,
        editable: true,
      },
      {
        field: "totalCharges",
        headerName: "Total Charges",
        width: 300,
        editable: true,
      },
      {
        field: "payee",
        headerName: "Payee",
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

export default AccomodationRequestTable;
