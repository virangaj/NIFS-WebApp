import React, { useEffect, useState } from "react";
import ITransportCost from "../../types/transport/ITransportCost";
import { useAppSelector } from "../../hooks/hooks";
import IEmployeeData from "../../types/admin/IEmployeeData";
import { generateID } from "../../utils/generateId";
import { Box, Stack } from "@mui/material";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";
import CustomeDataPicker from "../../components/DataPicker";
import TransportCostSerice from "../../services/transport/TransportCostService";
import { toast } from "react-toastify";
import { RequestStatus } from "../../constant/requestStatus";

const initialState: ITransportCost = {
  documentNo: "",
  epfNo: 0,
  hod: 0,
  designationId: "",
  divisionId: "",
  project: "",
  tourDate: "",
  sourceOfFunding: "",
  modeOfTravel: "",
  vehicleType: "",
  driverName: "",
  vehicleNo: "",
  estimatedKM: 0,
  ratePerKM: 0,
  totalCost: 0,
  startReading: 0,
  endReading: 0,
  remark: "",

  hodApproved: RequestStatus.PENDING,
  dirApproved: RequestStatus.PENDING,
};

const TransportCost = () => {
  const [tourDate, setTourDate] = React.useState<string | null>(null);
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [values, setValues] = useState<ITransportCost>(initialState);
  const [hod, setHod] = useState<IEmployeeData | null>();
  const [loading, setLoading] = useState<boolean>(false);

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
      tourDate: tourDate ? tourDate : "",
    });
  }, [tourDate]);

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
      const result = TransportCostSerice.saveTransportCost(
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
        toast.success("Travel Request Added Successfully");
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
      <h1 className="page-title">Travel Cost</h1>
      <hr className="horizontal-line" />
      <form onSubmit={onSubmit}>
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

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* left section */}
          <div className="form-left-section">
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
                <option value="Van">kandawala</option>
                <option value="Car">kegalle</option>
              </select>
            </div>

            <div className="selection">
              <label className="input-label" htmlFor="sourceOfFunding">
                Source Of Funding:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="sourceOfFunding"
                onChange={onChange}
                value={values.sourceOfFunding}
              >
                <option value="" disabled>
                  Select Source Of Funding:
                </option>
                <option value="Van">Local</option>
                <option value="Car">Grant</option>
              </select>
            </div>

            <div className="selection">
              <label className="input-label" htmlFor="modeOfTravel">
                Mode Of Travel:
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                id="outlined-basic"
                name="modeOfTravel"
                onChange={onChange}
                value={values.modeOfTravel}
              >
                <option value="" disabled>
                  Select source Of Funding:
                </option>
                <option value="Van">local</option>
                <option value="Car">foreign</option>
              </select>
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
                  Select Vehicle Type:
                </option>
                <option value="Van">Bus</option>
                <option value="Car">Van</option>
              </select>
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="driverName">
                Driver Name:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="driverName"
                onChange={onChange}
                value={values.driverName}
                required
              />
            </div>
          </div>

          {/* right section */}
          <div className="form-right-section">
            <div className="mx-0 mb-4 lg:mt-5 md:my-0">
              <CustomeDataPicker
                date={tourDate}
                setDate={setTourDate}
                title="Arrival Date"
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="vehicleNo">
                Vehicle Number:
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

            <div className="form-right-section">
              <div className="flex">
                <label className="input-label basis-1/2" htmlFor="estimatedKM">
                  Estimated KM:
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[90%]"
                  name="estimatedKM"
                  onChange={onChange}
                  value={values.estimatedKM}
                  required
                />
              </div>

              <div className="flex">
                <label className="input-label basis-1/2" htmlFor="ratePerKM">
                  Rate Per KM:
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[90%]"
                  name="ratePerKM"
                  onChange={onChange}
                  value={values.ratePerKM}
                  required
                />
              </div>

              <div className="flex">
                <label className="input-label basis-1/2" htmlFor="totalCost">
                  Total Cost:
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[90%]"
                  name="totalCost"
                  onChange={onChange}
                  value={values.totalCost}
                  required
                />
              </div>

              <div className="flex">
                <label className="input-label basis-1/2" htmlFor="startReading">
                  Start Reading:
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[90%]"
                  name="startReading"
                  onChange={onChange}
                  value={values.startReading}
                  required
                />
              </div>

              <div className="flex">
                <label className="input-label basis-1/2" htmlFor="endReading">
                  End Reading:
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[90%]"
                  name="endReading"
                  onChange={onChange}
                  value={values.endReading}
                  required
                />
              </div>
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
};

export default TransportCost;
