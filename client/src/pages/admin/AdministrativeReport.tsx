import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import { generateID } from "../../utils/generateId";
import Ripple from "../../components/Ripple";
import IContractExtension from "../../types/admin/IContractExtension";
import CustomeDataPicker from "../../components/DataPicker";
import IEmployeeData from "../../types/admin/IEmployeeData";
import EmployeeService from "../../services/admin/EmployeeService";
import IDesignationData from "../../types/admin/IDesignationData";
import DesignationMasterService from "../../services/admin/DesignationMasterService";
import IDivisionData from "../../types/admin/IDivisionData";
import DivisionMasterService from "../../services/admin/DivisionMasterService";
import IAdministrativeReport from "../../types/admin/IAdministrativeReport";

const initialState: IAdministrativeReport = {
  documentNo: "",
  date: "",
  employee: "",
  designation: "",
  attachment: "",
  details: "",
  division: "",
  hod: "",
};

function AdministrativeReport() {
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [requestDate, setRequestDate] = React.useState<string | null>(null);
  const [designationData, setDesignationData] = useState<IDesignationData>();
  const [divisionData, setDivisionData] = useState<IDivisionData>();

  const [empFoundError, setEmpFoundError] = useState<boolean>(false);
  const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
  const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
  const [values, setValues] = useState<IAdministrativeReport>(initialState);

  useEffect(() => {
    setValues({
      date: requestDate ? requestDate : "",
      documentNo: values?.documentNo,
      employee: values?.employee,
      designation: values?.designation,
      attachment: values?.attachment,
      details: values?.details,
      division: values?.division,
      hod: values?.hod,
    });
  }, [requestDate]);

  useEffect(() => {
    setValues({
      documentNo: getDocNo && getDocNo,
      date: requestDate ? requestDate : "",
      employee: values?.employee,
      designation: values?.designation,
      attachment: values?.attachment,
      details: values?.details,
      division: values?.division,
      hod: values?.hod,
    });
    console.log(getDocNo);
  }, [getDocNo]);

  useEffect(() => {
    retreiveEmployees();
    console.log(empData);
  }, []);

  //get designation and division
  const retriveEmployeeDetails = (emp: any) => {
    //get designation
    DesignationMasterService.getDesignation(emp?.designationId)
      .then((res: any) => {
        setDesignationData(res.data.data);
      })
      .catch((e: any) => {
        console.log(e);
      });

    //get divions

    DivisionMasterService.getDivision(emp?.divisionId)
      .then((res: any) => {
        setDivisionData(res.data.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  //get employees
  const retreiveEmployees = () => {
    EmployeeService.getAllEmployeeData()
      .then((res: any) => {
        setEmpData(res.data.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // generate document ID
  const generateDocNo = () => {
    setDocNo(generateID("CE"));
    setValues(initialState);
  };

  //reset form
  const resetForm = () => {
    setValues(initialState);
    setDocNo("");
  };

  //onchange funtion
  const onChange = (e: any) => {
    setValues((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  //onsubmit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Administrative Report</h1>
      <hr className="horizontal-line" />
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-[97%] mx-auto">
          <Box className="flex items-center justify-between input-field">
            Document No - {getDocNo && getDocNo}
            <button
              type="button"
              className="rounded-outline-success-btn"
              onClick={generateDocNo}
              style={{ marginLeft: "20px" }}
            >
              New
            </button>
          </Box>
          <div className="mx-0 mb-4 lg:ml-10 md:my-0">
            <CustomeDataPicker
              date={requestDate}
              setDate={setRequestDate}
              title="Request Date"
            />
          </div>

          <div className="flex items-center"></div>
        </div>

        <h4 className="sub-page-title">Send To</h4>
        <hr className="horizontal-line" />

        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          spacing={2}
          className="admin-form-buton-stack"
        >
          <button
            className="action-com-model-error-btn"
            type="reset"
            color="error"
            onClick={resetForm}
          >
            Reset
          </button>
          <button className="action-com-model-sucess-btn" type="submit">
            Submit
          </button>
        </Stack>
      </form>
    </div>
  );
}

export default AdministrativeReport;
