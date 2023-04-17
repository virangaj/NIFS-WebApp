import React, { useEffect, useState } from "react";
import ITravelRequest from "../../types/transport/ITravelReqest";
import Box from "@mui/material/Box";
import IEmployeeData from "../../types/admin/IEmployeeData";
import { generateID } from "../../utils/generateId";
import { useAppSelector } from "../../hooks/hooks";
import CustomeDataPicker from "../../components/DataPicker";
import CustomeTimePicker from "../../components/TimePicker";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";
import { Stack } from "@mui/material";
import TravelRequestService from "../../services/transport/TravelRequestService";
import { toast } from "react-toastify";
import { RequestStatus } from "../../constant/requestStatus";

const initialState: ITravelRequest = {
  documentNo: "",
  epfNo: 0,
  hod: 0,
  designationId: "",
  divisionId: "",
  sourceOfFunding: "",
  purpose: "",
  locationAndRoute: "",
  requestDate: "",
  arrivalDate: "",
  time: "",
  otherPassengers: "",
  modeOfTravel: "",
  vehicleType: "",

  hodApproved: RequestStatus.PENDING,
  dirApproved: RequestStatus.PENDING,
};

const TravelRequest = () => {
  const [values, setValues] = useState<ITravelRequest>(initialState);
  const [hod, setHod] = useState<IEmployeeData | null>();
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [requestDate, setRequestDate] = React.useState<string | null>(null);
  const [arrivalDate, setArrivalDate] = React.useState<string | null>(null);
  const [time, setTime] = React.useState<string | null>(null);
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
      requestDate: requestDate ? requestDate : "",
      arrivalDate: arrivalDate ? arrivalDate : "",
      time: time ? time : "",
    });
  }, [requestDate, arrivalDate, time]);

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
      const result = TravelRequestService.saveTravelRequest(
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
      <h1 className="page-title">Travel Request</h1>
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

            <div className="flex">
              <label
                className="input-label basis-1/2"
                htmlFor="locationAndRoute"
              >
                Location And Route :
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="locationAndRoute"
                onChange={onChange}
                value={values.locationAndRoute}
                required
              />
            </div>

            <div className="flex">
              <label
                className="input-label basis-1/2"
                htmlFor="otherPassengers"
              >
                Other Passengers:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="otherPassengers"
                onChange={onChange}
                value={values.otherPassengers}
                required
              />
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
          </div>
          {/* right section */}
          <div className="form-right-section">
            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="purpose">
                Purpose:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="purpose"
                onChange={onChange}
                value={values.purpose}
                required
              />
            </div>

            <div className="mx-0 mb-4 lg:mt-5 md:my-0">
              <CustomeDataPicker
                date={requestDate}
                setDate={setRequestDate}
                title="Request Date"
              />
            </div>

            <div className="mx-0 mb-4 lg:mt-4  md:my-0">
              <CustomeTimePicker
                time={time}
                setTime={setTime}
                title="Start Time"
              />
            </div>

            <div className="mx-0 mb-4 lg:mt-5 md:my-0">
              <CustomeDataPicker
                date={arrivalDate}
                setDate={setArrivalDate}
                title="Arrival Date"
              />
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
};

export default TravelRequest;
