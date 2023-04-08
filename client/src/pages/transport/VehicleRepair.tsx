import React, { useState, useEffect } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import Stack from "@mui/material/Stack";
import IVehicleReplacement from "../../types/VehicleRepair";
import "../pages.css";
import IVehicleRepair from "../../types/VehicleRepair";
import VehicleRepairService from "../../services/transport/VehicleRepairService";
import { toast } from "react-toastify";

const initialState: IVehicleRepair = {
  documentNo: "",
  vehicleNo: "",
  invoiceNo: "",
  vehicleType: "",
  workshop: "",
  description: "",
  date: "",
  invoiceDate: "",
  repairStartDate: "",
  repairEndDate: "",
  meterReading: "",
  repairType: "",
  repairCost: "",
  location: "",
  remark: "",
};

export default function VehicleRepair() {
  const [values, setValues] = useState<IVehicleReplacement>(initialState);

  const [date, setDate] = useState<string | null>(null);
  const [invoiceDate, setInvoiceDate] = useState<string | null>(null);
  const [repairStartDate, setRepairStartDate] = useState<string | null>(null);
  const [repairEndDate, setRepairEndDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      vehicleNo: values?.vehicleNo,
      invoiceNo: values?.invoiceNo,
      vehicleType: values?.vehicleType,
      workshop: values?.workshop,
      description: values?.description,
      date: date ? date : "",
      invoiceDate: invoiceDate ? invoiceDate : "",
      repairStartDate: repairStartDate ? repairStartDate : "",
      repairEndDate: repairEndDate ? repairEndDate : "",
      meterReading: values?.meterReading,
      repairType: values?.repairType,
      repairCost: values?.repairCost,
      location: values?.location,
      remark: values?.remark,
    });
  }, [date, invoiceDate, repairStartDate, repairEndDate]);

  const resetForm = () => {
    setValues({
      documentNo: "",
      vehicleNo: "",
      invoiceNo: "",
      vehicleType: "",
      workshop: "",
      description: "",
      date: "",
      invoiceDate: "",
      repairStartDate: "",
      repairEndDate: "",
      meterReading: "",
      repairType: "",
      repairCost: "",
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
        const result = await VehicleRepairService.saveVehicleRepair(values);

        if (result?.data !== null) {
          toast.success("Vehicle Repair Details Added Successfully");
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
      <h1 className="page-title">Vehicle Repair</h1>
      <hr className="horizontal-line" />

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

            <div className="selection">
              <label className="input-label" htmlFor="vehicleType">
                Vehicle Type:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="vehicleType"
                onChange={onChange}
                value={values.vehicleType}
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
              <label className="input-label" htmlFor="workshop">
                Workshop:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="workshop"
                onChange={onChange}
                value={values.workshop}
              >
                <option value="" disabled>
                  Select Category:
                </option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
              </select>
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

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="meterReading">
                Meter Reading:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="meterReading"
                onChange={onChange}
                value={values.meterReading}
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
                name="date"
              />
            </div>

            <div className="datepicker">
              <label className="input-label" htmlFor="repairStartDate">
                Repair Start Date:
              </label>
              <CustomeDataPicker
                date={repairStartDate}
                setDate={setRepairStartDate}
                title="Date"
                className="mx-0 lg:ml-10"
                name="date"
              />
            </div>

            <div className="datepicker">
              <label className="input-label" htmlFor="repairEndDate">
                Repair End Date:
              </label>
              <CustomeDataPicker
                date={repairEndDate}
                setDate={setRepairEndDate}
                title="Date"
                className="mx-0 lg:ml-10"
                name="date"
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="repairCost">
                Repair Cost:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="repairCost"
                onChange={onChange}
                value={values.repairCost}
                required
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
