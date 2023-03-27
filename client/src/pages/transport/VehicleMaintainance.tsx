import React, { useState, useEffect } from "react";
import "../pages.css";
import Stack from "@mui/material/Stack";
import CustomeDataPicker from "../../components/DataPicker";
import IVehicleMaintenance from "../../types/IVehicleMaintenance";
import VehicleMaintenanceService from "../../services/transport/VehicleMaintenanceService";
import { toast } from "react-toastify";

const initialState: IVehicleMaintenance = {
  documentNo: "",
  invoiceNo: "",
  vehicleNo: "",
  meter: "",
  workshop: "",
  cost: "",
  date: "",
  invoiceDate: "",
  location: "",
  remark: "",
};

export default function VehicleMaintainanceService() {
  const [values, setValues] = useState<IVehicleMaintenance>(initialState);

  const [date, setDate] = useState<string | null>(null);
  const [invoiceDate, setInvoiceDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      invoiceNo: values?.invoiceNo,
      vehicleNo: values?.vehicleNo,
      meter: values?.meter,
      workshop: values?.workshop,
      cost: values?.cost,
      date: date ? date : "",
      invoiceDate: invoiceDate ? invoiceDate : "",
      location: values?.location,
      remark: values?.remark,
    });
  }, [date, invoiceDate]);

  const resetForm = () => {
    setValues({
      documentNo: "",
      invoiceNo: "",
      vehicleNo: "",
      meter: "",
      workshop: "",
      cost: "",
      date: "",
      invoiceDate: "",
      location: "",
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
        const result = await VehicleMaintenanceService.saveVehicleMaintenance(
          values
        );

        if (result?.data !== null) {
          toast.success("Vehicle Maintenance Details Added Successfully");
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
      <h1 className="page-title">Vehicle Maintainance Service</h1>
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
              <label className="input-label basis-1/2" htmlFor="invoiceNo">
                Invoice No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="invoiceNo"
                onChange={onChange}
                value={values.invoiceNo}
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
              <label className="input-label basis-1/2" htmlFor="meter">
                Meter:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="meter"
                onChange={onChange}
                value={values.meter}
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

            <div className="datepicker">
              <label className="input-label" htmlFor="invoiceDate">
                Invoice Date:
              </label>
              <CustomeDataPicker
                date={invoiceDate}
                setDate={setInvoiceDate}
                title="Date"
                className="mx-0 lg:ml-10"
                name="invoiceDate"
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
