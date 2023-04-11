import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import { useAppSelector } from "../../hooks/hooks";

import { generateID } from "../../utils/generateId";
import Ripple from "../../components/Ripple";
import IContractExtension from "../../types/admin/IContractExtension";
import CustomeDataPicker from "../../components/DataPicker";
import IEmployeeData from "../../types/admin/IEmployeeData";
import DivisionSelector from "../../components/shared/DivisionSelector";
import IResignationRequest from "../../types/admin/IResignationRequest";
import DesignationSelector from "../../components/shared/DesignationSelector";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import ResignationService from "../../services/admin/ResignationService";

const initialState: IResignationRequest = {
  documentNo: "",
  date: "",
  epfNo: 0,
  designationId: "",
  divisionId: "",
  hod: 0,
  remark: "",
  hodApproved: false,
  dirApproved: false,
};

function ResignationRequest() {
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [requestDate, setRequestDate] = React.useState<string | null>(null);
  const [empFoundError, setEmpFoundError] = useState<boolean>(false);
  const [values, setValues] = useState<IResignationRequest>(initialState);
  const [hod, setHod] = useState<IEmployeeData | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const { employees, employeesIsLoading, employeesIsSuccess } = useAppSelector(
    (state) => state.employees
  );
  const { division, divisionIsLoading, divisionIsSuccess } = useAppSelector(
    (state) => state.division
  );
  const { auth } = useAppSelector((state) => state.persistedReducer);

  useEffect(() => {
    setValues({
      ...values,
      date: requestDate ? requestDate : "",
    });
  }, [requestDate]);

  useEffect(() => {
    setValues({
      ...values,
      documentNo: getDocNo && getDocNo,
    });
    console.log(getDocNo);
  }, [getDocNo]);

  useEffect(() => {
    const divisionData = division.find(
      (d) => d.divisionId === values.divisionId
    );

    if (divisionData) {
      const employeeId = divisionData.hod;
      const employee = employees.find((e) => e.epfNo === employeeId);
      // console.log(employee);
      if (employee) {
        setHod(employee);
        setValues({
          ...values,
          hod: employee.epfNo,
        });
      }
    }
  }, [values.divisionId]);

  // generate document ID
  const generateDocNo = () => {
    setDocNo(generateID("RR"));
    setValues(initialState);
  };

  //reset form
  const resetForm = () => {
    setValues(initialState);
    setDocNo("");
    setHod(null);
  };

  //onchange funtion
  const onChange = (e: any) => {
    setValues((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const result = ResignationService.saveResignationRequest(
        values,
        auth?.user?.token
      )
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });

      if (result !== null) {
        toast.success("Resignation Request Added Successfully");
        resetForm();
      } else {
        toast.error("Request Cannot be Completed");
      }
      setLoading(false);
    }, 1000);

    console.log(values);
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Resignation Request</h1>
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

          <EmployeeSelector
            onChange={onChange}
            value={values.epfNo}
            name="epfNo"
          />
        </div>
        {values.epfNo && empFoundError ? (
          <p className="w-[97%] mx-auto error-text-message">User Not Found!</p>
        ) : (
          ""
        )}
        <div className="w-[97%] mx-auto">
          <DesignationSelector
            onChange={onChange}
            value={values.designationId}
            name="designationId"
          />
        </div>
        <div className="w-[97%] mx-auto">
          <DivisionSelector
            onChange={onChange}
            value={values.divisionId}
            name="divisionId"
          />
        </div>

        <div className="w-[97%] mx-auto">
          <div className="grid items-center grid-cols-1 md:grid-cols-2">
            <p className="normal-text">
              HOD :{" "}
              {values.divisionId && hod ? (
                <span className="font-bold">
                  {hod.firstName + " " + hod.lastName}
                </span>
              ) : (
                <span className="italic-sm-text">Please select a Division</span>
              )}
            </p>
          </div>
        </div>

        <div className="w-[97%] mx-auto">
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

export default ResignationRequest;
