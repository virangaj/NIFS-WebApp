import React, { useEffect, useMemo, useState } from "react";
import ArticleRequestService from "../../services/library/ArticleRequestService";
import { RequestStatus } from "../../constant/requestStatus";
import IArticleRequest from "../../types/library/IArticleRequest";
import { toast } from "react-toastify";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useAppSelector } from "../../hooks/hooks";

const initialState: IArticleRequest = {
  documentNo: "",
  epfNo: 0,
  designationId: "",
  divisionId: "",
  hod: 0,
  date: "",
  nameOfJournal: "",
  publishYear: "",
  volume: "",
  issue: "",
  pages: "",
  webLink: "",
  remark: "",

  hodApproved: RequestStatus.PENDING,
  dirApproved: RequestStatus.PENDING,
};

export default function CatalogSearch() {
  const [values, setValues] = useState<Array<IArticleRequest>>([]);
  const [rowId, setRowId] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { auth } = useAppSelector((state) => state.persistedReducer);

  useEffect(() => {
    retreiveArticle();
  }, []);

  const retreiveArticle = () => {
    ArticleRequestService.getAllArticleRequest(values)
      .then((res: any) => {
        if (res.data.status === RequestStatus.SUCCESS) {
          setValues(res.data.data);
        } else {
          toast.error(`${res.data.message}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const columns = useMemo(
    () => [
      { field: "epfNo", headerName: "EPF NO", width: 100 },
      {
        field: "documentNo",
        headerName: "Document No",
        width: 120,
        editable: true,
      },
      {
        field: "designationId",
        headerName: "Designation Id",
        width: 150,
        editable: true,
      },
      {
        field: "divisionId",
        headerName: "Division Id",
        width: 150,
        editable: true,
      },
      {
        field: "date",
        headerName: "date",
        width: 100,
        editable: true,
      },
      {
        field: "nameOfJournal",
        headerName: "Name Of Journal",
        width: 150,
        editable: true,
      },
      {
        field: "publishYear",
        headerName: "Publish Year",
        width: 250,
        editable: true,
      },
      {
        field: "volume",
        headerName: "Volume",
        width: 150,
        editable: true,
      },
      {
        field: "issue",
        headerName: "Issue",
        width: 100,
        editable: true,
      },
      {
        field: "pages",
        headerName: "Pages",
        width: 150,
        editable: true,
      },
      {
        field: "webLink",
        headerName: "WebLink",
        width: 250,
        editable: true,
      },
      {
        field: "remark",
        headerName: "Remark",
        width: 250,
        editable: true,
      },
    ],
    [rowId]
  );

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Catalog Search</h1>
      <hr className="horizontal-line"></hr>

      <Box sx={{ width: "100%", height: "1000px" }}>
        <DataGrid
          checkboxSelection={true}
          components={{ Toolbar: GridToolbar }}
          rowHeight={60}
          columns={columns}
          rows={values}
          getRowId={(row) => row.epfNo}
          rowsPerPageOptions={[20, 40, 60]}
          pageSize={pageSize}
          onPageSizeChange={(newPagesize) => setPageSize(newPagesize)}
          onCellEditCommit={(params: any) => setRowId(params.id)}
        />
      </Box>
    </div>
  );
}
