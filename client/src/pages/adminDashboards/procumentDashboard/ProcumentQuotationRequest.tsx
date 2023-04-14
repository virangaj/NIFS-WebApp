import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import GatePassService from "../../../services/procument/GatePassService";
import { RequestStatus } from "../../../constant/requestStatus";
import { toast } from "react-toastify";
import GatePassTable from "../../shared/procument/GatePassTable";
import QuotationRequestService from "../../../services/procument/QuotationRequestService";
import QuotationRequestTable from "../../shared/procument/QuotationRequestTable";

const ProcumentQuotationRequest = () => {
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
      QuotationRequestService.getDivisionQuotationRequest(
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
      QuotationRequestService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.APPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.success("Quotation Request is Confirmed");
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
      QuotationRequestService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.DISAPPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.warning("Quotation Request is Declined");
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
        <p>Quotation Request</p>

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

        <QuotationRequestTable
          setSelectedData={setSelectedData}
          requests={requests}
          loading={loading}
        />
      </div>
    </>
  );
};

export default ProcumentQuotationRequest;
