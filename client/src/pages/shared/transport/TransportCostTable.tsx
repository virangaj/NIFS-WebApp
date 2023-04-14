import React, { useMemo, useState } from "react";
import RequestStatusView from "../../../components/tableIcons/RequestStatusView";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Ripple from "../../../components/Ripple";

const TransportCostTable = ({ setSelectedData, requests, loading }: any) => {
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
        field: "project",
        headerName: "Project",
        width: 300,
        editable: true,
      },
      {
        field: "tourDate",
        headerName: "Tour Date",
        width: 200,
        editable: true,
      },
      {
        field: "sourceOfFunding",
        headerName: "Source Of Funding",
        width: 200,
        editable: true,
      },
      {
        field: "modeOfTravel",
        headerName: "Mode Of Travel",
        width: 200,
        editable: true,
      },
      {
        field: "vehicleType",
        headerName: "Vehicle Type",
        width: 200,
        editable: true,
      },
      {
        field: "driverName",
        headerName: "Driver Name",
        width: 200,
        editable: true,
      },
      {
        field: "vehicleNo",
        headerName: "Vehicle No",
        width: 200,
        editable: true,
      },
      {
        field: "estimatedKM",
        headerName: "Estimated KM",
        width: 200,
        editable: true,
      },
      {
        field: "ratePerKM",
        headerName: "Rate Per KM",
        width: 200,
        editable: true,
      },
      {
        field: "totalCost",
        headerName: "Total Cost",
        width: 200,
        editable: true,
      },
      {
        field: "startReading",
        headerName: "Start Reading",
        width: 200,
        editable: true,
      },
      {
        field: "endReading",
        headerName: "End Reading",
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

export default TransportCostTable;
