import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useMemo, useState } from "react";
import RequestStatusView from "../../../components/tableIcons/RequestStatusView";
import Ripple from "../../../components/Ripple";

const QuotationRequestTable = ({ setSelectedData, requests, loading }: any) => {
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
        field: "date",
        headerName: "Date",
        width: 100,
        editable: true,
      },
      {
        field: "project",
        headerName: "Project",
        width: 120,
        editable: true,
      },
      {
        field: "fund",
        headerName: "Fund",
        width: 200,
        editable: true,
      },
      {
        field: "srnNo",
        headerName: "SRN No",
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
        field: "fileNo",
        headerName: "File No",
        width: 300,
        editable: true,
      },
      {
        field: "validityPeriodOfTheQuotation",
        headerName: "Validity Period Of The Quotation",
        width: 200,
        editable: true,
      },
      {
        field: "shippingTerms",
        headerName: "Shipping Terms",
        width: 200,
        editable: true,
      },
      {
        field: "supplierCatergory",
        headerName: "Supplier Catergory",
        width: 200,
        editable: true,
      },
      {
        field: "bidStartingDate",
        headerName: "Bid Starting Date",
        width: 200,
        editable: true,
      },
      {
        field: "bidClosingDate",
        headerName: "Bid Closing Date",
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

export default QuotationRequestTable;
