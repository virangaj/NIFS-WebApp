import React, { useState, useEffect } from "react";
import IGatePass from "../../types/common/IGatePass";
import Box from "@mui/material/Box";
import { generateID } from "../../utils/generateId";
import CustomeDataPicker from "../../components/DataPicker";
import IEmployeeData from "../../types/IEmployeeData";
import IDesignationData from "../../types/IDesignationData";
import IDivisionData from "../../types/IDivisionData";
import Stack from "@mui/material/Stack";
import EmployeeService from "../../services/admin/EmployeeService";
import DesignationMasterService from "../../services/admin/DesignationMasterService";
import DivisionMasterService from "../../services/admin/DivisionMasterService";

const initialState: IGatePass = {
  // gate pass
  documentNo: "",
  date: "",
  locationAfterRemoval: "",
  purposeOfRemoval: "",
  dateOfRemoval: "",
  project: "",
  attachment: "",
  remark: "",

  //   generated
  epfNo: "",
  designation: "",
  division: "",
};

function GatePass() {
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [requestDate, setRequestDate] = React.useState<string | null>(null);
  const [values, setValues] = useState<IGatePass>(initialState);
  const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
  const [empFoundError, setEmpFoundError] = useState<boolean>(false);
  const [designationData, setDesignationData] = useState<IDesignationData>();
  const [divisionData, setDivisionData] = useState<IDivisionData>();
  const [removalDate, setRemovalDate] = React.useState<string | null>(null);
  const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      date: requestDate ? requestDate : "",
      epfNo: values?.epfNo,
      designation: values?.designation,
      division: values?.division,
      remark: values?.remark,
      locationAfterRemoval: values?.locationAfterRemoval,
      purposeOfRemoval: values?.purposeOfRemoval,
      dateOfRemoval: values.dateOfRemoval,
      project: values?.project,
      attachment: values?.attachment,
    });
  }, [requestDate]);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      date: requestDate ? requestDate : "",
      epfNo: values?.epfNo,
      designation: values?.designation,
      division: values?.division,
      remark: values?.remark,
      locationAfterRemoval: values?.locationAfterRemoval,
      purposeOfRemoval: values?.purposeOfRemoval,
      dateOfRemoval: values.dateOfRemoval,
      project: values?.project,
      attachment: values?.attachment,
    });
  }, [getDocNo]);

  useEffect(() => {
    retreiveEmployees();
    console.log(empData);
  }, []);

  useEffect(() => {
    let employee = empData.find(
      (emp: IEmployeeData) => emp.epfNo.toString() === values.epfNo.toString()
    );
    setCurrentEmp(employee);
    if (employee) {
      setEmpFoundError(false);
    } else {
      setEmpFoundError(true);
    }
    setValues({
      documentNo: values?.documentNo,
      date: requestDate ? requestDate : "",
      epfNo: values?.epfNo,
      designation: values?.designation,
      division: values?.division,
      remark: values?.remark,
      locationAfterRemoval: values?.locationAfterRemoval,
      purposeOfRemoval: values?.purposeOfRemoval,
      dateOfRemoval: values.dateOfRemoval,
      project: values?.project,
      attachment: values?.attachment,
    });
    retriveEmployeeDetails(employee);
  }, [values.epfNo]);

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

    //get divisions

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
        console.log(res.data);
        setEmpData(res.data.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const generateDocNo = () => {
    setDocNo(generateID("CE"));
    setValues(initialState);
  };

  //onchange funtion
  const onChange = (e: any) => {
    setValues((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };
  //reset form
  const resetForm = () => {
    setValues(initialState);
    setDocNo("");
  };

  //on Submit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Gate Pass</h1>
      <hr className="horizontal-line" />
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-[97%] mx-auto">
          <Box className="flex items-center justify-between input-field">
            Document No - {getDocNo}
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

          <div className="flex items-center">
            <div>
              <label className="input-label" htmlFor="epfNo">
                Employee EPF No
              </label>

              <input
                id="epfNo"
                type="text"
                className="tailwind-text-box w-[40%] mr-4"
                onChange={onChange}
                name="epfNo"
                value={values.epfNo}
              />
            </div>
            <div>
              <label className="input-label" htmlFor="epfNo">
                Employee Name
              </label>
              <select
                className="tailwind-text-box"
                value={values.epfNo}
                id="epfNo"
                name="epfNo"
                onChange={onChange}
              >
                <option disabled value={0}>
                  Select Employee
                </option>

                {empData?.map((l: IEmployeeData, i: number) => {
                  return (
                    <option key={i} value={l.epfNo}>
                      {l.firstName + " " + l.lastName}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        {values.epfNo && empFoundError ? (
          <p className="w-[97%] mx-auto error-text-message">User Not Found!</p>
        ) : (
          ""
        )}

        <div className="w-[97%] mx-auto">
          <p className="normal-text">
            Designation :{" "}
            {values.epfNo && designationData ? (
              <span className="font-bold">
                {designationData.designationName}
              </span>
            ) : (
              <span className="italic-sm-text">Please select an employee</span>
            )}
          </p>

          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <p className="normal-text">
              Division :{" "}
              {values.epfNo && divisionData ? (
                <span className="font-bold">{divisionData.name}</span>
              ) : (
                <span className="italic-sm-text">
                  Please select an employee
                </span>
              )}
            </p>

            <p className="normal-text">
              HOD :{" "}
              {values.epfNo && divisionData ? (
                <span className="font-bold">{divisionData.name}</span>
              ) : (
                <span className="italic-sm-text">
                  Please select an employee
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="locationAfterRemoval"
              >
                Location After Removal
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="locationAfterRemoval"
                onChange={onChange}
                value={values.locationAfterRemoval}
                required
              />
            </div>

            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="purposeOfRemoval"
              >
                Purpose Of Removal
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="purposeOfRemoval"
                onChange={onChange}
                value={values.purposeOfRemoval}
                required
              />
            </div>
            <div>
              <label className="input-label basis-1/2" htmlFor="attachment">
                Attachment
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="attachment"
                onChange={onChange}
                value={values.attachment}
                required
              />
            </div>
          </div>
          {/* right section of the flex */}
          <div className="flex-1 mr-4">
            <div className="mx-0 mb-4 lg:mt-5 lg:mb-2 md:my-0">
              <CustomeDataPicker
                date={removalDate}
                setDate={setRemovalDate}
                title="Request Date"
              />
            </div>

            <div>
              <label className="input-label basis-1/2" htmlFor="project">
                Project
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="project"
                onChange={onChange}
                value={values.project}
                required
              />
            </div>
          </div>
        </div>
        <div className="w-[97%] mx-auto ml-0">
          <label className="input-label" htmlFor="remark">
            Remark
          </label>

          <textarea
            id="remark"
            className="tailwind-text-box w-[100%] mr-4"
            onChange={onChange}
            name="remark"
            value={values.remark}
          ></textarea>
        </div>
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

export default GatePass;
