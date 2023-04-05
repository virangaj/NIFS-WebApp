import React, { useEffect, useState } from "react";
import Stack from "@mui/material/Stack";
import CustomeDataPicker from "../../components/DataPicker";
import IVehicleReplacement from "../../types/IVehicleReplacement";
import "../pages.css";
import VehicleReplacementService from "../../services/transport/VehicleReplacementService";
import { toast } from "react-toastify";

const initialState: IVehicleReplacement = {
  documentNo: "",
  invoiceNo: "",
  itemName: "",
  meterReading: "",
  placeOfPurchase: "",
  cost: "",
  date: "",
  invoiceDate: "",
  vehicleNo: "",
  category: "",
  location: "",
  manufacturer: "",
  description: "",
  remark: "",
};

export default function VehicleReplacement() {
  const [values, setValues] = useState<IVehicleReplacement>(initialState);
  const [date, setDate] = useState<string | null>(null);
  const [invoiceDate, setInvoiceDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      invoiceNo: values?.invoiceNo,
      itemName: values?.itemName,
      meterReading: values?.meterReading,
      placeOfPurchase: values?.placeOfPurchase,
      cost: values?.cost,
      date: date ? date : "",
      invoiceDate: invoiceDate ? invoiceDate : "",
      vehicleNo: values?.vehicleNo,
      category: values?.category,
      location: values?.location,
      manufacturer: values?.manufacturer,
      description: values?.description,
      remark: values?.remark,
    });
  }, [date, invoiceDate]);

  const resetForm = () => {
    setValues({
      documentNo: "",
      invoiceNo: "",
      itemName: "",
      meterReading: "",
      placeOfPurchase: "",
      cost: "",
      date: "",
      invoiceDate: "",
      vehicleNo: "",
      category: "",
      location: "",
      manufacturer: "",
      description: "",
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
        const result = await VehicleReplacementService.saveVehicleReplacement(
          values
        );

        if (result?.data !== null) {
          toast.success("Vehicle Replacement Details Added Successfully");
          resetForm();
        } else {
          toast.error("Request Cannot be Complete");
        }
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Vehicle Replacement</h1>
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
              <label className="input-label basis-1/2" htmlFor="itemName">
                Item Name:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="itemName"
                onChange={onChange}
                value={values.itemName}
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

            <div className="flex">
              <label
                className="input-label basis-1/2"
                htmlFor="placeOfPurchase"
              >
                Place Of Purchase:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="placeOfPurchase"
                onChange={onChange}
                value={values.placeOfPurchase}
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
              <label className="input-label basis-1/2" htmlFor="manufacturer">
                Manufacturer:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="manufacturer"
                onChange={onChange}
                value={values.manufacturer}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="description">
                description:
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
