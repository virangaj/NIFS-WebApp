import React, { useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import IOverseasTelephoneCharges from "../../types/admin/IOverseasTelephoneCharges";
import { Box } from "@mui/material";
import { generateID } from "../../utils/generateId";
import Stack from "@mui/material/Stack";
const initialState: IOverseasTelephoneCharges = {
  // Telephone Details
  documentNo: "",
  date: "",
  remark: "",

  // sender Details
  employee: "",
  sendDate: "",
  project: "",

  // Receiver Details
  name: "",
  address: "",

  // message Details
  telephoneNo: "",
  type: "",
  country: "",
};

function OverseasTelephoneCharges() {
  const [getDocumentNo, setDocumentNo] = useState<String | any>("");
  const [values, setValues] = useState<IOverseasTelephoneCharges>(initialState);
  const [docDate, setDocDate] = React.useState<string | null>(null);
  const [date, setDate] = React.useState<string | null>(null);

  // generate document ID
  const generateDocNo = () => {
    setDocumentNo(generateID("AC"));
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
    setDocumentNo("");
  };

  //onsubmit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);
  };
  return (
    <div className="sub-body-content xl:!w-[80%]">
      <h1 className="page-title">Overseas Telephone Charges</h1>
      <hr className="horizontal-line" />
      <form onSubmit={onSubmit}>
        <h1 className="sub-page-title">Telephone Details</h1>
        <hr className="horizontal-line" />

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-[97%] mx-auto">
              <Box className="flex items-center justify-between input-field">
                Document No - {getDocumentNo && getDocumentNo}
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
                  date={docDate}
                  setDate={setDocDate}
                  title="Date"
                />
              </div>
            </div>

            <div>
              <label className="input-label basis-1/2" htmlFor="remark">
                Remark
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="remark"
                onChange={onChange}
                value={values.remark}
                required
              />
            </div>
          </div>
        </div>

        <h1 className="sub-page-title">Telephone Details</h1>
        <hr className="horizontal-line" />

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div className="flex-1 mr-4">
              <div>
                <label className="input-label basis-1/2" htmlFor="employee">
                  Employee
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[100%]"
                  name="employee"
                  onChange={onChange}
                  value={values.employee}
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex-1 mr-4">
            <div className="flex-1 mr-4">
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
          {/* right section of the flex */}
          <div className="flex-1 mr-4">
            <div className="mx-0 mb-4 lg:ml-10 md:my-0 lg:mt-4">
              <CustomeDataPicker
                date={date}
                setDate={setDate}
                title="Sent Date"
              />
            </div>
          </div>
        </div>

        <h1 className="sub-page-title">Receiver Details</h1>
        <hr className="horizontal-line" />

        <div className="flex-1 mr-4">
          <div className="flex-1 mr-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="name">
                Name
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="name"
                onChange={onChange}
                value={values.name}
                required
              />
            </div>
          </div>
        </div>

        <div className="flex-1 mr-4">
          <div className="flex-1 mr-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="name">
                Address
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="address"
                onChange={onChange}
                value={values.address}
                required
              />
            </div>
          </div>
        </div>

        <h1 className="sub-page-title">Message Details</h1>
        <hr className="horizontal-line" />

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div className="flex-1 mr-4">
              <div className="flex-1 mr-4">
                <div>
                  <label
                    className="input-label basis-1/2"
                    htmlFor="telephoneNo"
                  >
                    Telephone No
                  </label>

                  <input
                    id="outlined-basic"
                    type="search"
                    className="mr-4 tailwind-text-box w-[100%]"
                    name="telephoneNo"
                    onChange={onChange}
                    value={values.telephoneNo}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex-1 mr-4">
              <div className="flex-1 mr-4">
                <div>
                  <label className="input-label basis-1/2" htmlFor="country">
                    Country
                  </label>

                  <input
                    id="outlined-basic"
                    type="search"
                    className="mr-4 tailwind-text-box w-[100%]"
                    name="country"
                    onChange={onChange}
                    value={values.country}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* right section of the flex */}
          <div className="flex-1 mr-4"></div>
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

export default OverseasTelephoneCharges;
