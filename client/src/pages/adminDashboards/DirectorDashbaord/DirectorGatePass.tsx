import React from "react";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../hooks/hooks";
import { toast } from "react-toastify";
import { RequestStatus } from "../../../constant/requestStatus";
import getContractExtensionService from "../../../services/admin/ContractExtensionService";
import ContractExtesnsionTable from "../../shared/ContractExtesnsionTable";
import GatePassService from "../../../services/procument/GatePassService";
import GatePassTable from "../../shared/procument/GatePassTable";

const DirectorGatePass = () => {
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
      GatePassService.getAllGatePass(auth?.user?.token)
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
      GatePassService.sendDirApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.APPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.success("Gate Pass is Confirmed");
          } else {
            toast.error("Request cannot be performed");
          }
        })
        .catch((e) => {
          console.log(e);
          toast.error("Request cannot be performed");
        });
      setLoading(false);
      retriveData();
    }, 500);
  };
  //send reject request
  const sendReject = () => {
    setLoading(true);
    setTimeout(() => {
      GatePassService.sendDirApproval(
        selectedData,
        auth?.user?.token,
        RequestStatus.DISAPPROVED
      )
        .then((res) => {
          if (res.data) {
            toast.warning("Gate Pass is Declined");
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
    <div>
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
    </div>
  );
};

export default DirectorGatePass;
