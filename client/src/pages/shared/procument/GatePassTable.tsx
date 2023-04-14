import React, { useMemo, useState } from "react";
import RequestStatusView from "../../../components/tableIcons/RequestStatusView";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Ripple from "../../../components/Ripple";

const GatePassTable = ({ setSelectedData, requests, loading }: any) => {
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
        field: "locationAfterRemoval",
        headerName: "Location After Removal",
        width: 300,
        editable: true,
      },
      {
        field: "purposeOfRemoval",
        headerName: "Purpose Of Removal",
        width: 200,
        editable: true,
      },
      {
        field: "dateOfRemoval",
        headerName: "Date Of Removal",
        width: 200,
        editable: true,
      },
      {
        field: "expectedReturnDate",
        headerName: "Expected Return Date",
        width: 200,
        editable: true,
      },
      {
        field: "remark",
        headerName: "Remark",
        width: 200,
        editable: true,
      },
      {
        field: "itemName",
        headerName: "Item Name",
        width: 200,
        editable: true,
      },
      {
        field: "itemType",
        headerName: "Item Type",
        width: 200,
        editable: true,
      },
      {
        field: "quantity",
        headerName: "Quantity",
        width: 200,
        editable: true,
      },
      {
        field: "inventoryNumber",
        headerName: "Inventory Number",
        width: 200,
        editable: true,
      },
      {
        field: "description",
        headerName: "Description",
        width: 200,
        editable: true,
      },
      {
        field: "currentLocation",
        headerName: "Current Location",
        width: 200,
        editable: true,
      },
      {
        field: "officerInChargeName",
        headerName: "Officer InCharge Name",
        width: 200,
        editable: true,
      },
      {
        field: "nameOfOfficerOutsideIncharge",
        headerName: "Name Of Officer Outside Incharge",
        width: 200,
        editable: true,
      },
      {
        field: "resultOfVerificationBySecurityOfficer",
        headerName: "Result Of Verification By Security Officer",
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

export default GatePassTable;
