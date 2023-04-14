import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { generateID } from "../../utils/generateId";
import CustomeDataPicker from "../../components/DataPicker";
import IEmployeeData from "../../types/admin/IEmployeeData";
import Stack from "@mui/material/Stack";
import IQuotationRequest from "../../types/procument/IQuotationRequest";

import Projects from "../../components/data/Project.json";
import { useAppSelector } from "../../hooks/hooks";
import { toast } from "react-toastify";
import QuotationRequestService from "../../services/procument/QuotationRequestService";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";

const initialState: IQuotationRequest = {
  documentNo: "",
  designationId: "",
  divisionId: "",
  hod: 0,
  date: "",
  epfNo: 0,
  project: "",
  fund: "",
  srnNo: "",
  fileNo: "",
  validityPeriodOfTheQuotation: "",
  shippingTerms: "",
  supplierCatergory: "",
  bidClosingDate: "",
  bidStartingDate: "",
  remark: "",
};

function QuotationRequest() {
  const [values, setValues] = useState<IQuotationRequest>(initialState);
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [requestDate, setRequestDate] = React.useState<string | null>(null);
  const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
  const [empFoundError, setEmpFoundError] = useState<boolean>(false);
  const [startDate, setStartDate] = React.useState<string | null>(null);
  const [endDate, setEndDate] = React.useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hod, setHod] = useState<IEmployeeData | null>();

  const { employees, employeesIsLoading, employeesIsSuccess } = useAppSelector(
    (state) => state.employees
  );
  const { division, divisionIsLoading, divisionIsSuccess } = useAppSelector(
    (state) => state.division
  );

  const { auth } = useAppSelector((state) => state.persistedReducer);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      date: requestDate ? requestDate : "",
      epfNo: values?.epfNo,
      designationId: values?.designationId,
      divisionId: values?.designationId,
      hod: values?.hod,
      project: values?.project,
      fund: values?.fund,
      srnNo: values?.srnNo,
      fileNo: values?.fileNo,
      validityPeriodOfTheQuotation: values?.validityPeriodOfTheQuotation,
      shippingTerms: values?.shippingTerms,
      supplierCatergory: values?.supplierCatergory,
      bidClosingDate: endDate ? endDate : "",
      bidStartingDate: startDate ? startDate : "",
      remark: values?.remark,
    });
  }, [requestDate, startDate, endDate]);

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

  //  onChange Function
  const onChange = (e: any) => {
    setValues((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //reset form
  const resetForm = () => {
    setValues(initialState);
    setDocNo("");
    setHod(null);
  };

  //on Submit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);

    setLoading(true);
    setTimeout(() => {
      const result = QuotationRequestService.saveQuotationRequest(
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
      <h1 className="page-title">Quotation Request</h1>
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

          <div className="mx-0 mb-4 lg:ml-10 md:my-0">
            <CustomeDataPicker
              date={requestDate}
              setDate={setRequestDate}
              title="Quotation Date"
            />
          </div>
        </div>

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
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

            <div className="mx-0 mb-4 lg:ml-4 md:my-0">
              <CustomeDataPicker
                date={startDate}
                setDate={setStartDate}
                title="Start Date"
              />
            </div>

            <div className="mx-0 mb-4  md:my-0 lg:ml-4 lg:mt-2">
              <CustomeDataPicker
                date={endDate}
                setDate={setEndDate}
                title="End Date"
              />
            </div>
          </div>
          {/* Right section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="validityPeriodOfTheQuotation"
              >
                Validity Period Of The Quotation
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="validityPeriodOfTheQuotation"
                onChange={onChange}
                value={values.validityPeriodOfTheQuotation}
                required
              />
            </div>

            <div className="mx-0 input-field lg:ml-4">
              <label className="input-label" htmlFor="shippingTerms">
                Shipping Terms
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                value={values.shippingTerms}
                id="shippingTerms"
                name="shippingTerms"
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
              <label className="input-label" htmlFor="supplierCatergory">
                Supplier Catergory
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                value={values.supplierCatergory}
                id="supplierCatergory"
                name="supplierCatergory"
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

export default QuotationRequest;
