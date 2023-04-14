import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import QuotationSummaryService from "../../../services/procument/QuotationSummaryService";
import { RequestStatus } from "../../../constant/requestStatus";
import { toast } from "react-toastify";
import QuotationSummaryTable from "../../shared/procument/QuotationSummaryTable";

const ProcumentQuotationSummary = () => {
  const { auth } = useAppSelector((state) => state.persistedReducer);
  const [requests, setRequests] = useState<any>([]);
  const [selectedData, setSelectedData] = useState<Array<string>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    retriveData();
  }, []);

  const retriveData = () => {
    setLoading(true);
    setTimeout(() => {
      QuotationSummaryService.getDivisionQuotationSummary(
        auth?.user?.token,
        auth?.division
      )
        .then((res) => {
          setRequests(res.data);
          console.log(res);
        })
        .then((e) => {
          console.log(e);
        });
      setLoading(false);
    }, 500);
  };

  //send approval request
  const sendApprove = () => {
    console.log(selectedData);
    setLoading(true);
    setTimeout(() => {
      QuotationSummaryService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.APPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.success("Quotation Summary is Confirmed");
          } else {
            toast.error("Request cannot be performed");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Request cannot be performed");
        });
      retriveData();
    }, 500);
  };

  //send reject request
  const sendReject = () => {
    setLoading(true);
    setTimeout(() => {
      QuotationSummaryService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.DISAPPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.warning("Quotation Summary is Declined");
          } else {
            toast.error("Request cannot be performed");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Request cannot be performed");
        });
      retriveData();
      setLoading(false);
    }, 500);
  };

  return (
    <>
      <div className="admin-page-title">
        <p>Quotation Summary</p>

        <hr className="admin-horizontal-line" />
      </div>

      <div className="admin-table-section">
        <div className="flex justify-end mb-4">
          <button className="action-com-model-sucess-btn" onClick={sendApprove}>
            Approve Selected
          </button>
          <button
            className="action-com-model-error-btn"
            type="reset"
            color="error"
            onClick={sendReject}
          >
            Reject Selected
          </button>
        </div>

        <QuotationSummaryTable
          setSelectedData={setSelectedData}
          requests={requests}
          loading={loading}
        />
      </div>
    </>
  );
};

export default ProcumentQuotationSummary;
