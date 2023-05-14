import React, { useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import IRepairRequest from "../../types/RepairRequest";
import Stack from "@mui/material/Stack";
import "../pages.css";

export default function RepairRequest() {
  const [values, setValues] = useState<IRepairRequest>({
    documentNo: "",
    employeeNo: "",
    designatiom: "",
    division: "",
    vehicleNo: "",
    date: "",
    attachment: "",
    remark: "",
  });

  const [date, setDate] = useState<string | null>(null);

  const resetForm = () => {
    setValues({
      documentNo: "",
      employeeNo: "",
      designatiom: "",
      division: "",
      vehicleNo: "",
      date: "",
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
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <div className="page-title">Repair Request</div>
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
              <label className="input-label basis-1/2" htmlFor="employeeNo">
                Employee No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="employeeNo"
                onChange={onChange}
                value={values.employeeNo}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="designatiom">
                Designation:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="designatiom"
                onChange={onChange}
                value={values.designatiom}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="division">
                Divsion:
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
              <label className="input-label basis-1/2" htmlFor="vehicleNo">
                Vehicle No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="vehicleNo"
                onChange={onChange}
                value={values.vehicleNo}
                required
              />
            </div>

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
