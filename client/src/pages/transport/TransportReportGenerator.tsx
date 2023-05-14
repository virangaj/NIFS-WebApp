import React, { useState } from "react";
import "../pages.css";
import Stack from "@mui/material/Stack";
import CustomeDataPicker from "../../components/DataPicker";
import ITransportReportGenerator from "../../types/TransportReportGenerator";

export default function TransportReportGenerator() {
  const [values, setValues] = useState<ITransportReportGenerator>({
    startDate: "",
    endDate: "",
    location: "",
    repairType: "",
    category: "",
    type: "",
  });

  const [date, setDate] = useState<string | null>(null);

  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const resetForm = () => {
    setValues({
      startDate: "",
      endDate: "",
      location: "",
      repairType: "",
      category: "",
      type: "",
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
      <h1 className="page-title">Transport Report Generator</h1>
      <hr className="horizontal-line"></hr>

      <form onSubmit={onSubmit} className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="form-left-section">
            <div className="datepicker">
              <label className="input-label" htmlFor="startDate">
                Start Date:
              </label>
              <CustomeDataPicker
                date={startDate}
                setDate={setStartDate}
                title="Date"
                className="mx-0 lg:ml-10"
                name="startDate"
              />
            </div>

            <div className="datepicker">
              <label className="input-label" htmlFor="endDate">
                End Date:
              </label>
              <CustomeDataPicker
                date={endDate}
                setDate={setEndDate}
                title="Date"
                className="mx-0 lg:ml-10"
                name="endDate"
              />
            </div>

            <div className="selection">
              <label className="input-label" htmlFor="location">
                location:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="location"
                onChange={onChange}
                value={values.location}
              >
                <option value="" disabled>
                  Select Location:
                </option>
                <option value="colombo">Colombo</option>
                <option value="kandy">Kandy</option>
                <option value="perdeniya">Peradeniya</option>
              </select>
            </div>

            <div className="selection">
              <label className="input-label" htmlFor="repairType">
                Repair Type:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="repairType"
                onChange={onChange}
                value={values.repairType}
              >
                <option value="" disabled>
                  Select repairType:
                </option>
                <option value="full">Full</option>
                <option value="half">Half</option>
              </select>
            </div>
          </div>

          {/* Form Right Section */}

          <div className="form-right-section">
            <div className="selection">
              <label className="input-label" htmlFor="category">
                Category:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="category"
                onChange={onChange}
                value={values.category}
              >
                <option value="" disabled>
                  Select Category:
                </option>
                <option value="Van">Cab</option>
                <option value="Car">Car</option>
                <option value="Lorry">Lorry</option>
              </select>
            </div>

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
                  Select Type:
                </option>
                <option value="full">Full</option>
                <option value="half">Half</option>
              </select>
            </div>
          </div>
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
