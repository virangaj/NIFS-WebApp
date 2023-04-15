import React, { useEffect, useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import Stack from "@mui/material/Stack";
import "../pages.css";
import { toast } from "react-toastify";
import IJournalRequest from "../../types/library/IJournalRequest";
import JournalRequestService from "../../services/library/JournalRequestService";
import { HiCurrencyBangladeshi } from "react-icons/hi";
import { useAppSelector } from "../../hooks/hooks";
import IEmployeeData from "../../types/admin/IEmployeeData";
import { generateID } from "../../utils/generateId";
import journalRequestService from "../../services/library/JournalRequestService";
import { Box } from "@mui/material";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";
import FileInput from "../../components/FileInput";
import { RequestStatus } from "../../constant/requestStatus";

const initialState: IJournalRequest = {
  documentNo: "",
  epfNo: 0,
  designationId: "",
  divisionId: "",
  hod: 0,
  project: "",
  vote: "",
  journalName: "",
  date: "",
  periodOfRequest: "",
  totalAmountDue: "",
  currencyType: "",
  ISSN_No: "",
  type: "",
  methodOfPayment: "",
  remark: "",

  hodApproved: RequestStatus.PENDING,
  dirApproved: RequestStatus.PENDING,
};

export default function JournalRequest() {
  const [values, setValues] = useState<IJournalRequest>(initialState);
  const [loading, setLoading] = useState(false);
  const [requestDate, setRequestDate] = React.useState<string | null>(null);
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [hod, setHod] = useState<IEmployeeData | null>();
  const [eventAttachment, setEventAttachment] = useState<File | any>();

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

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);
    setLoading(true);
    setTimeout(() => {
      const result = JournalRequestService.saveJournalRequest(
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
        toast.success("Journal Request Added Successfully");
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
      <h1 className="page-title">Journal Request</h1>
      <hr className="horizontal-line"></hr>
      <form onSubmit={onSubmit} className="w-[90%] mx-auto">
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

        <div className="selection">
          <label className="input-label" htmlFor="project">
            Project:
          </label>
          <select
            className="tailwind-text-box w-[90%]"
            id="outlined-basic"
            name="project"
            onChange={onChange}
            value={values.project}
          >
            <option value="" disabled>
              Select Project:
            </option>
            <option value="aiProject">AI project</option>
            <option value="imageProcessing">Image Processing</option>
            <option value="databaseManagement">Database management</option>
          </select>
        </div>

        <div className="selection">
          <label className="input-label" htmlFor="vote">
            Vote:
          </label>
          <select
            className="tailwind-text-box w-[90%]"
            id="outlined-basic"
            name="vote"
            onChange={onChange}
            value={values.vote}
          >
            <option value="" disabled>
              Select Vote:
            </option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>

        <div className="flex">
          <label className="input-label basis-1/2" htmlFor="journalName">
            Journal Name:
          </label>

          <input
            id="outlined-basic"
            type="search"
            className="mr-4 tailwind-text-box w-[90%]"
            name="journalName"
            onChange={onChange}
            value={values.journalName}
            required
          />
        </div>

        {/* Form Right Section */}

        <div className="form-right-section">
          <div>
            <label className="input-label" htmlFor="date">
              Date:
            </label>
            <CustomeDataPicker
              date={requestDate}
              setDate={setRequestDate}
              title="Date"
              className="mx-0 lg:ml-10"
              name="date"
            />
          </div>

          <div className="flex">
            <label className="input-label basis-1/2" htmlFor="periodOfRequest">
              Period Of Request:
            </label>

            <input
              id="outlined-basic"
              type="search"
              className="mr-4 tailwind-text-box w-[90%]"
              name="periodOfRequest"
              onChange={onChange}
              value={values.periodOfRequest}
              required
            />
          </div>

          <div className="flex">
            <label className="input-label basis-1/2" htmlFor="totalAmountDue">
              Total Amount Due:
            </label>

            <input
              id="outlined-basic"
              type="search"
              className="mr-4 tailwind-text-box w-[90%]"
              name="totalAmountDue"
              onChange={onChange}
              value={values.totalAmountDue}
              required
            />
          </div>

          <div className="selection">
            <label className="input-label" htmlFor="currencyType">
              Currency Type:
            </label>
            <select
              className="tailwind-text-box w-[90%]"
              id="outlined-basic"
              name="currencyType"
              onChange={onChange}
              value={values.currencyType}
            >
              <option value="" disabled>
                Select Currency Type:
              </option>
              <option value="lkr">LKR</option>
              <option value="usd">USD</option>
            </select>
          </div>

          <div className="flex">
            <label className="input-label basis-1/2" htmlFor="ISSN_No">
              ISSN No:
            </label>

            <input
              id="outlined-basic"
              type="search"
              className="mr-4 tailwind-text-box w-[90%]"
              name="ISSN_No"
              onChange={onChange}
              value={values.ISSN_No}
              required
            />
          </div>

          {/* have to change this to find what types means */}
          <div className="selection">
            <label className="input-label" htmlFor="type">
              Type:
            </label>
            <select
              className="tailwind-text-box w-[90%]"
              id="outlined-basic"
              name="type"
              onChange={onChange}
              value={values.type}
            >
              <option value="" disabled>
                Type:
              </option>
              <option value="lkr">LKR</option>
              <option value="usd">USD</option>
            </select>
          </div>

          <div className="selection">
            <label className="input-label" htmlFor="methodOfPayment">
              Method Of Payment:
            </label>
            <select
              className="tailwind-text-box w-[90%]"
              id="outlined-basic"
              name="methodOfPayment"
              onChange={onChange}
              value={values.methodOfPayment}
            >
              <option value="" disabled>
                Payment Type:
              </option>
              <option value="online">Online</option>
              <option value="physical">Physical</option>
            </select>
          </div>

          <div className="lg:mt-4">
            <FileInput
              setEventAttachment={setEventAttachment}
              eventAttachment={eventAttachment}
              title="Upload Attachment"
            />
          </div>
        </div>

        <div className="flex ">
          <label className="input-label basis-1/2" htmlFor="remark">
            Remarks:
          </label>

          <input
            id="outlined-basic"
            type="text"
            className="mr-4 tailwind-text-box w-[90%]"
            name="remark"
            onChange={onChange}
            value={values.remark}
            required
          />
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
