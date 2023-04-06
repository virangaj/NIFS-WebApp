import React, { useState } from "react";
import ITravelRequest from "../../types/transport/ITravelReqest";
import Box from "@mui/material/Box";

const initialState: ITravelRequest = {
  documentNo: "",
  name: "",
  designation: "",
  applicantEmail: "",
  sourceOfFunding: "",
  Purpose: "",
  division: "",
  locationAndRoute: "",
  date: "",
  time: "",
  arrivalDate: "",
  otherPassengers: "",
  modeOfTravel: "",
  vehicleType: "",
  HODEmail: "",
};

const TravelRequest = () => {
  const [values, setValues] = useState<ITravelRequest>(initialState);

  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Travel Request</h1>
      <hr className="horizontal-line" />
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 items-center w-[97%] mx-auto"></div>
      </form>
    </div>
  );
};

export default TravelRequest;
