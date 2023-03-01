import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import { generateID } from "../../utils/generateId";
import Ripple from "../../components/Ripple";
import IContractExtension from "../../types/IContractExtension";
import CustomeDataPicker from "../../components/DataPicker";
import IEmployeeData from "../../types/IEmployeeData";
import EmployeeService from "../../services/admin/EmployeeService";
import IDesignationData from "../../types/IDesignationData";
import DesignationMasterService from "../../services/admin/DesignationMasterService";
import IDivisionData from "../../types/IDivisionData";
import DivisionMasterService from "../../services/admin/DivisionMasterService";
import IAccommodation from "../../types/IAccommodation";
import { Box } from "@mui/material";

const initialState: IAccommodation = {
  //gueset details
  documentNo: "",
  documentDate: "",
  guestName: "",
  address: "",
  email: "",
  designation: "",
  nicNo: "",
  nationality: "",
  telephoneNo: "",
  passportNo: "",
  faxNo: "",

  //host details
  hostEmployee: "",
  project: "",

  //reason for request accommodation
  requestType: "",
  officialProgram: "",

  //accommodation
  location: "",
  noOfDays: 0,
  fromDate: "",
  toDate: "",
  roomRates: "",
  roomType: "",
  totalCharges: "",

  //payment
  payee: "",
};

function Accommodation() {
  const [getDocumentNo, setDocumentNo] = useState<String | any>("");
  const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
  const [docDate, setDocDate] = React.useState<string | null>(null);
  const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
  const [empFoundError, setEmpFoundError] = useState<boolean>(false);
  const [designationData, setDesignationData] = useState<IDesignationData>();
  const [divisionData, setDivisionData] = useState<IDivisionData>();
  const [values, setValues] = useState<IAccommodation>(initialState);

  useEffect(() => {
    let employee = empData.find(
      (emp: IEmployeeData) =>
        emp.epfNo.toString() === values.hostEmployee.toString()
    );
    setCurrentEmp(employee);
    if (employee) {
      setEmpFoundError(false);
    } else {
      setEmpFoundError(true);
    }

    retriveEmployeeDetails(employee);
  }, [values.hostEmployee]);

  //get designation and division
  const retriveEmployeeDetails = (emp: any) => {
    //get designation
    DesignationMasterService.getDesignation(emp?.designationId)
      .then((res: any) => {
        setDesignationData(res.data.data);
      })
      .catch((e: any) => {
        console.log(e);
      });

    //get divions

    DivisionMasterService.getDivision(emp?.divisionId)
      .then((res: any) => {
        setDivisionData(res.data.data);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  // generate document ID
  const generateDocNo = () => {
    setDocumentNo(generateID("AC"));
    setValues(initialState);
  };

  //reset form
  const resetForm = () => {
    setValues(initialState);
    setDocumentNo("");
  };

  //onchange funtion
  const onChange = (e: any) => {
    setValues((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  //onsubmit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="sub-body-content xl:!w-[80%]">
      <h1 className="page-title">Accommodation</h1>
      <hr className="horizontal-line" />
      <form onSubmit={onSubmit}>
        <h1 className="sub-page-title">Guest Details</h1>
        <hr className="horizontal-line" />

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center w-[97%] mx-auto">
              <Box className="flex items-center justify-between input-field">
                Document No - {getDocumentNo && getDocumentNo}
                <button
                  type="button"
                  className="rounded-outline-success-btn"
                  onClick={generateDocNo}
                  style={{ marginLeft: "20px" }}
                >
                  New
                </button>
              </Box>
              <div className="mx-0 mb-4 lg:ml-10 md:my-0">
                <CustomeDataPicker
                  date={docDate}
                  setDate={setDocDate}
                  title="Request Date"
                />
              </div>
            </div>

            {/* guest name  */}
            <div>
              <label className="input-label basis-1/2" htmlFor="employee">
                Guest Name
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="guestName"
                onChange={onChange}
                value={values.guestName}
                required
              />
            </div>
            {/* address  */}

            <div>
              <label className="input-label basis-1/2" htmlFor="address">
                Address
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="address"
                onChange={onChange}
                value={values.address}
                required
              />
            </div>
            {/* email */}
            <div>
              <label className="input-label basis-1/2" htmlFor="email">
                Email
              </label>

              <input
                id="outlined-basic"
                type="email"
                className="mr-4 tailwind-text-box w-[100%]"
                name="email"
                onChange={onChange}
                value={values.email}
                required
              />
            </div>
          </div>

          {/* right section of the flex */}
          <div className="flex-1 ml-4 -mt-7">
            <div>
              <label className="input-label basis-1/2" htmlFor="designation">
                Designation
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="designation"
                onChange={onChange}
                value={values.designation}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 mr-2">
                <label className="input-label basis-1/2" htmlFor="nicNo">
                  NIC No
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[100%]"
                  name="nicNo"
                  onChange={onChange}
                  value={values.nicNo}
                  required
                />
              </div>

              <div className="flex-1 ml-2">
                <label className="input-label basis-1/2" htmlFor="passportNo">
                  Passport No
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[100%]"
                  name="passportNo"
                  onChange={onChange}
                  value={values.passportNo}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1 mr-2">
                <label className="input-label basis-1/2" htmlFor="nationality">
                  Nationality
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[100%]"
                  name="nationality"
                  onChange={onChange}
                  value={values.nationality}
                  required
                />
              </div>

              <div className="flex-1 ml-2">
                <label className="input-label basis-1/2" htmlFor="faxNo">
                  Fax No
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[100%]"
                  name="faxNo"
                  onChange={onChange}
                  value={values.faxNo}
                  required
                />
              </div>
            </div>

            <div>
              <label className="input-label basis-1/2" htmlFor="telephoneNo">
                Telephone No
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="telephoneNo"
                onChange={onChange}
                value={values.telephoneNo}
                required
              />
            </div>
          </div>
        </div>

        <h1 className="sub-page-title">Host</h1>
        <hr className="horizontal-line" />

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="hostEmployee">
                Host Employee
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="hostEmployee"
                onChange={onChange}
                value={values.hostEmployee}
                required
              />
            </div>
          </div>

          {/* Right section of the flex */}
          <div className="flex-1 ml-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="project">
                Project
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="project"
                onChange={onChange}
                value={values.project}
                required
              />
            </div>
          </div>
        </div>

        <h1 className="sub-page-title">Reason for Request Accommodation</h1>
        <hr className="horizontal-line" />

        <div>
          <label className="input-label basis-1/2" htmlFor="requestType">
            Request Type
          </label>

          <input
            id="outlined-basic"
            type="search"
            className="mr-4 tailwind-text-box w-[100%]"
            name="requestType"
            onChange={onChange}
            value={values.requestType}
            required
          />
        </div>

        <div>
          <label className="input-label basis-1/2" htmlFor="officialProgram">
            Official Program
          </label>

          <input
            id="outlined-basic"
            type="search"
            className="mr-4 tailwind-text-box w-[100%]"
            name="officialProgram"
            onChange={onChange}
            value={values.officialProgram}
            required
          />
        </div>

        <h1 className="sub-page-title">Accommodation</h1>
        <hr className="horizontal-line" />

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="location">
                Location
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="location"
                onChange={onChange}
                value={values.location}
                required
              />
            </div>
          </div>
          {/* right section of the flex */}
          <div className="flex-1 ml-4"></div>
        </div>
      </form>
    </div>
  );
}

export default Accommodation;
