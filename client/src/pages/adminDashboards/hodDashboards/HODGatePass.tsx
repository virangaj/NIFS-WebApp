import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import GatePassService from "../../../services/procument/GatePassService";
import { RequestStatus } from "../../../constant/requestStatus";
import { toast } from "react-toastify";
import GatePassTable from "../../shared/procument/GatePassTable";

const HODGatePass = () => {
  const { auth } = useAppSelector((state) => state.persistedReducer);
  const [requests, setRequests] = useState<any>([]);
  const [rowId, setRowId] = useState(0);
  const [selectedData, setSelectedData] = useState<Array<string>>([]);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState(false);

  //load data
  useEffect(() => {
    retriveData();
  }, []);

  const retriveData = () => {
    setLoading(true);
    setTimeout(() => {
      GatePassService.getDivisionGatePass(auth?.user?.token, auth?.division)
        .then((res) => {
          setRequests(res.data);
        })
        .then((e) => {
          console.log(e);
        });
      setLoading(false);
    }, 500);
  };

  //send reject request
  const sendReject = () => {
    console.log(selectedData);
    setLoading(true);
    setTimeout(() => {
      GatePassService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.DISAPPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.warning("Gate Pass Request is Declined");
          } else {
            toast.error("Request cannot be performed");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Request cannot be performed");
        });
      retriveData();
      setGetData((val) => !val);
    }, 500);
  };

  //send approvérequest
  const sendApprove = () => {
    console.log(selectedData);
    setLoading(true);
    setTimeout(() => {
      GatePassService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.APPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.success("Gate Pass Request is Confirmed");
          } else {
            toast.error("Request cannot be performed");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Request cannot be performed");
        });
      retriveData();
      setGetData((val) => !val);
    }, 500);
  };
  return (
    <>
      <div className="admin-page-title">
        <p>Gate Pass</p>

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

        <GatePassTable
          setSelectedData={setSelectedData}
          requests={requests}
          loading={loading}
        />
      </div>
    </>
  );
};

export default HODGatePass;
