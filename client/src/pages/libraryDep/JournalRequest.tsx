import React, { useEffect, useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import Stack from "@mui/material/Stack";
import "../pages.css";
import { toast } from "react-toastify";
import IJournalRequest from "../../types/library/IJournalRequest";
import JournalRequestService from "../../services/library/JournalRequestService";

const initialState: IJournalRequest = {
  documentNo: "",
  employee: "",
  designation: "",
  division: "",
  headOfLibrary: "",
  project: "",
  vote: "",
  budget: "", // have to look into this again
  journalName: "",
  date: "",
  periodOfRequest: "",
  totalAmountDue: "",
  currencyType: "",
  ISSN_No: "",
  type: "",
  methodOfPayment: "",
  attachment: "",
  remark: "",
};

export default function JournalRequest() {
  const [values, setValues] = useState<IJournalRequest>(initialState);
  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      employee: values?.employee,
      designation: values?.designation,
      division: values?.division,
      headOfLibrary: values?.headOfLibrary,
      project: values?.project,
      vote: values?.vote,
      budget: values?.budget, // have to look into this again
      journalName: values?.journalName,
      date: date ? date : "",
      currencyType: values?.currencyType,
      periodOfRequest: values?.periodOfRequest,
      totalAmountDue: values?.totalAmountDue,
      ISSN_No: values?.ISSN_No,
      type: values?.type,
      methodOfPayment: values?.methodOfPayment,
      attachment: values?.attachment,
      remark: values?.remark,
    });
  }, [date]);

  const resetForm = () => {
    setValues({
      documentNo: "",
      employee: "",
      designation: "",
      division: "",
      headOfLibrary: "",
      project: "",
      vote: "",
      budget: "", // have to look into this again
      journalName: "",
      date: "",
      periodOfRequest: "",
      totalAmountDue: "",
      currencyType: "",
      ISSN_No: "",
      type: "",
      methodOfPayment: "",
      attachment: "",
      remark: "",
    });
  };

  const onChange = (event: any) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    console.log(values);

    setTimeout(async () => {
      const result = await JournalRequestService.saveJournalRequest(values);

      if (result?.data !== null) {
        toast.success("Journal Request Added Successfully");
        resetForm();
      } else {
        toast.error("Journal Request Cannot be Completed");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Journal Request</h1>
      <hr className="horizontal-line"></hr>
      <form onSubmit={onSubmit} className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="form-left-section">
            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="documentNo">
                Document No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="documentNo"
                onChange={onChange}
                value={values.documentNo}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="employee">
                Employee:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="employee"
                onChange={onChange}
                value={values.employee}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="designation">
                Designation:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="designation"
                onChange={onChange}
                value={values.designation}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="division">
                Division:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="division"
                onChange={onChange}
                value={values.division}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="headOfLibrary">
                Head Of Library:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="headOfLibrary"
                onChange={onChange}
                value={values.headOfLibrary}
                required
              />
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

            <div className="selection">
              <label className="input-label" htmlFor="budget">
                Budget:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="budget"
                onChange={onChange}
                value={values.budget}
              >
                <option value="" disabled>
                  Select Budget Type:
                </option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
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
          </div>

          {/* Form Right Section */}

          <div className="form-right-section">
            <div>
              <label className="input-label" htmlFor="date">
                Date:
              </label>
              <CustomeDataPicker
                date={date}
                setDate={setDate}
                title="Date"
                className="mx-0 lg:ml-10"
                name="date"
              />
            </div>

            <div className="flex">
              <label
                className="input-label basis-1/2"
                htmlFor="periodOfRequest"
              >
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

            {/* Have to add the functionality to upload an file */}
            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="attachment">
                Attachment:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="attachment"
                onChange={onChange}
                value={values.attachment}
                required
              />
            </div>
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
