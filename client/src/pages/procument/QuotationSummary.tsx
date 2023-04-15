import IQuotationSummary from "../../types/procument/IQuotationSummary";
import React, { useState, useEffect } from "react";
import IOvertime from "../../types/common/IOvertime";
import Box from "@mui/material/Box";
import { generateID } from "../../utils/generateId";
import CustomeDataPicker from "../../components/DataPicker";
import IEmployeeData from "../../types/admin/IEmployeeData";
import EmployeeService from "../../services/admin/EmployeeService";
import DesignationMasterService from "../../services/admin/DesignationMasterService";
import DivisionMasterService from "../../services/admin/DivisionMasterService";
import IDesignationData from "../../types/admin/IDesignationData";
import IDivisionData from "../../types/admin/IDivisionData";
import Stack from "@mui/material/Stack";

import Projects from "../../components/data/Project.json";
import { useAppSelector } from "../../hooks/hooks";
import QotationSummaryService from "../../services/procument/QuotationSummaryService";
import { toast } from "react-toastify";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";
import { RequestStatus } from "../../constant/requestStatus";

const initialState: IQuotationSummary = {
  fundType: "",
  documentNo: "",
  date: "",

  //   auto generated
  epfNo: 0,
  designationId: "",
  divisionId: "",
  hod: 0,
  quotationRequestNo: "",
  fileNo: "",
  srnNo: "",
  value: "",
  fund: "",
  project: "",
  remark: "",

  hodApproved: RequestStatus.PENDING,
  dirApproved: RequestStatus.PENDING,
};

function QuotationSummary() {
  const [values, setValues] = useState<IQuotationSummary>(initialState);
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [requestDate, setRequestDate] = React.useState<string | null>(null);
  const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
  const [empFoundError, setEmpFoundError] = useState<boolean>(false);
  const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
  const [designationData, setDesignationData] = useState<IDesignationData>();
  const [divisionData, setDivisionData] = useState<IDivisionData>();
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

  // generate Doc number ID
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

  //  onChange Function
  const onChange = (e: any) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //on Submit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);

    setLoading(true);
    setTimeout(() => {
      const result = QotationSummaryService.saveQuotationSummary(
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
        toast.success("Quotation Summary Added Successfully");
        resetForm();
      } else {
        toast.error("Request Cannot be Completed");
      }
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Quotation Summary</h1>
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
        </div>

        <EmployeeSelector
          onChange={onChange}
          value={values.epfNo}
          name="epfNo"
        />

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

        <div className="mx-0 mb-4 lg:ml-10 md:my-0">
          <CustomeDataPicker
            date={requestDate}
            setDate={setRequestDate}
            title="Request Date"
          />
        </div>

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="quotationRequestNo"
              >
                Quotation Request No
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="quotationRequestNo"
                onChange={onChange}
                value={values.quotationRequestNo}
                required
              />
            </div>

            <div>
              <label className="input-label basis-1/2" htmlFor="fileNo">
                fileNo
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="fileNo"
                onChange={onChange}
                value={values.fileNo}
                required
              />
            </div>

            <div>
              <label className="input-label basis-1/2" htmlFor="srnNo">
                SRN No
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="srnNo"
                onChange={onChange}
                value={values.srnNo}
                required
              />
            </div>
          </div>
          {/* Right section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="value">
                value
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="value"
                onChange={onChange}
                value={values.value}
                required
              />
            </div>

            <div className="mx-0 input-field lg:ml-4">
              <label className="input-label" htmlFor="project">
                Project
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                value={values.project}
                id="project"
                name="project"
                onChange={onChange}
              >
                <option value="" disabled>
                  Select a Project
                </option>

                {Projects
                  ? Projects.map((p, index) => (
                      <option value={p.value} key={index}>
                        {p.value}
                      </option>
                    ))
                  : ""}
              </select>
            </div>

            <div className="mx-0 input-field lg:ml-4">
              <label className="input-label" htmlFor="fund">
                External /Fund Internal / Budget
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                value={values.fund}
                id="fund"
                name="fund"
                onChange={onChange}
              >
                <option value="" disabled>
                  Select a Fund type
                </option>

                {Projects
                  ? Projects.map((p, index) => (
                      <option value={p.value} key={index}>
                        {p.value}
                      </option>
                    ))
                  : ""}
              </select>
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

export default QuotationSummary;
