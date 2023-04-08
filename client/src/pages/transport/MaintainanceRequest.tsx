import React, { useEffect, useState } from "react";
import "../pages.css";
import Stack from "@mui/material/Stack";
import CustomeDataPicker from "../../components/DataPicker";
import IMaintainanceRequest from "../../types/transport/IMaintainanceRequest";
import MaintenanceRequestService from "../../services/transport/MaintenanceRequestService";
import { toast } from "react-toastify";

const initialState: IMaintainanceRequest = {
  documentNo: "",
  date: "",
  vehicleNo: "",
  workshop: "",
  cost: "",
  description: "",
  attachment: "",
  startMeterReading: "",
  endMeterReading: "",
  remark: "",
};

export default function MaintainanceRequest() {
  const [values, setValues] = useState<IMaintainanceRequest>(initialState);

  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      date: date ? date : "",
      vehicleNo: values?.vehicleNo,
      workshop: values?.workshop,
      cost: values?.cost,
      description: values?.description,
      attachment: values?.attachment,
      startMeterReading: values?.startMeterReading,
      endMeterReading: values?.endMeterReading,
      remark: values?.remark,
    });
  }, [date]);

  const resetForm = () => {
    setValues({
      documentNo: "",
      date: "",
      vehicleNo: "",
      workshop: "",
      cost: "",
      description: "",
      attachment: "",
      startMeterReading: "",
      endMeterReading: "",
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

    if (values.documentNo !== "") {
      setTimeout(async () => {
        const result = await MaintenanceRequestService.saveMaintenanceRequest(
          values
        );

        if (result?.data !== null) {
          toast.success("Maintenance Request Added Successfully");
          resetForm();
        } else {
          toast.error("Request Cannot be Completed");
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Maintainance Request</h1>
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
              <label className="input-label basis-1/2" htmlFor="workshop">
                Workshop:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="workshop"
                onChange={onChange}
                value={values.workshop}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="cost">
                Cost:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="cost"
                onChange={onChange}
                value={values.cost}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="description">
                Description:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="description"
                onChange={onChange}
                value={values.description}
                required
              />
            </div>
          </div>

          {/* Form Right Section */}

          <div className="form-right-section">
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

            <div className="flex">
              <label
                className="input-label basis-1/2"
                htmlFor="startMeterReading"
              >
                Start Meter Reading:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="startMeterReading"
                onChange={onChange}
                value={values.startMeterReading}
                required
              />
            </div>

            <div className="flex">
              <label
                className="input-label basis-1/2"
                htmlFor="endMeterReading"
              >
                End Meter Reading:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="endMeterReading"
                onChange={onChange}
                value={values.endMeterReading}
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
