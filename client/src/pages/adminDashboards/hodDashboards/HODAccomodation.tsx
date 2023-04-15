import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import AccomodationService from "../../../services/admin/AccomodationService";
import { RequestStatus } from "../../../constant/requestStatus";
import { toast } from "react-toastify";
import AccomodationRequestTable from "../../shared/admin/AccomodationRequestTable";

const HODAccomodation = () => {
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
      AccomodationService.getAccomodationRequests(auth?.user?.token)
        .then((res) => {
          setRequests(res.data);
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
      AccomodationService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.APPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.success("Accomodation is Confirmed");
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
      AccomodationService.sendHodApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.DISAPPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.warning("Accomodation is Declined");
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
        <p>Accomodation Request</p>

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

        <AccomodationRequestTable
          setSelectedData={setSelectedData}
          requests={requests}
          loading={loading}
        />
      </div>
    </>
  );
};

export default HODAccomodation;
