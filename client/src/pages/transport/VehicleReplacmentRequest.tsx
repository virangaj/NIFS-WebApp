import React, { useEffect, useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import IVehicleReplacementRequest from "../../types/transport/IVehicleReplacementRequest";
import Stack from "@mui/material/Stack";
import "../pages.css";
import ReplacementRequestService from "../../services/transport/ReplacementRequestService";
import { toast } from "react-toastify";

export default function VehicleReplacmentRequest() {
  const [values, setValues] = useState<IVehicleReplacementRequest>({
    DocumentNo: "",
    vehicleNo: "",
    driver: "",
    category: "",
    amount: "",
    brand: "",
    attachment: "",
    date: "",
    startMeterReading: "",
    endMeterReading: "",
    remark: "",
  });

  const [date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues({
      DocumentNo: values?.DocumentNo,
      vehicleNo: values?.vehicleNo,
      driver: values?.driver,
      category: values?.category,
      amount: values?.amount,
      brand: values?.brand,
      attachment: values?.attachment,
      date: date ? date : "",
      startMeterReading: values?.startMeterReading,
      endMeterReading: values?.endMeterReading,
      remark: values?.remark,
    });
  }, [date]);

  const resetForm = () => {
    setValues({
      DocumentNo: "",
      vehicleNo: "",
      driver: "",
      category: "",
      amount: "",
      brand: "",
      attachment: "",
      date: "",
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

    if (values.DocumentNo !== "") {
      setTimeout(async () => {
        const result = await ReplacementRequestService.saveReplacementRequest(
          values
        );

        if (result?.data !== null) {
          toast.success("Replacement Request Details added Successfully");
          resetForm();
        } else {
          toast.error("Request Cannot Complete");
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Vehicle Replacement Request</h1>
      <hr className="horizontal-line"></hr>
      <form onSubmit={onSubmit} className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="form-left-section">
            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="DocumentNo">
                Document No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="DocumentNo"
                onChange={onChange}
                value={values.DocumentNo}
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
              <label className="input-label basis-1/2" htmlFor="driver">
                Driver:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="driver"
                onChange={onChange}
                value={values.driver}
                required
              />
            </div>

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

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="amount">
                Amount:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="amount"
                onChange={onChange}
                value={values.amount}
                required
              />
            </div>

            <div className="selection">
              <label className="input-label" htmlFor="brand">
                Brand:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="brand"
                onChange={onChange}
                value={values.brand}
              >
                <option value={""} disabled>
                  Select Brand:
                </option>
                <option value="Toyota">Toyota</option>
                <option value="Nissan">Nissan</option>
                <option value="Mitsubishi">Mitsubishi</option>
              </select>
            </div>
          </div>

          {/* Form Right Section */}

          <div className="form-right-section">
            <div className="datepicker">
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
