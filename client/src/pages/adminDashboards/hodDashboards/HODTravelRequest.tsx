import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import TravelRequestService from "../../../services/transport/TravelRequestService";
import { RequestStatus } from "../../../constant/requestStatus";
import { toast } from "react-toastify";
import TravelRequestTable from "../../shared/transport/TravelRequestTable";

const HODTravelRequest = () => {
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
      TravelRequestService.getDivisionTravelRequest(
        auth?.user?.token,
        auth?.division
      )
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
      TravelRequestService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.DISAPPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.warning("Travel Request is Declined");
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
      TravelRequestService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.APPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.success("Travel Request is Confirmed");
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
        <p>Contract Extension</p>

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
        <TravelRequestTable
          setSelectedData={setSelectedData}
          requests={requests}
          loading={loading}
        />
      </div>
    </>
  );
};

export default HODTravelRequest;
