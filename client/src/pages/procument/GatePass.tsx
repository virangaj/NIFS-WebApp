import React, { useState, useEffect } from "react";
import IGatePass from "../../types/procument/IGatePass";
import Box from "@mui/material/Box";
import { generateID } from "../../utils/generateId";
import CustomeDataPicker from "../../components/DataPicker";
import Stack from "@mui/material/Stack";
import IEmployeeData from "../../types/admin/IEmployeeData";
import { useAppSelector } from "../../hooks/hooks";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";
import GatePassService from "../../services/procument/GatePassService";
import { toast } from "react-toastify";

const initialState: IGatePass = {
  //   generated
  documentNo: "",
  epfNo: 0,
  hod: 0,
  designationId: "",
  divisionId: "",

  // gate pass
  locationAfterRemoval: "",
  purposeOfRemoval: "",
  dateOfRemoval: "",
  expectedReturnDate: "",
  remark: "",

  //   desciption of items to be removed
  itemName: "",
  itemType: "",
  quantity: "",
  inventoryNumber: "",
  description: "",
  currentLocation: "",
  officerInChargeName: "",
  nameOfOfficerOutsideIncharge: "",
  resultOfVerificationBySecurityOfficer: "",
};

function GatePass() {
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [values, setValues] = useState<IGatePass>(initialState);
  const [removalDate, setRemovalDate] = React.useState<string | null>(null);
  const [expectedDate, setExpectedDate] = React.useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hod, setHod] = useState<IEmployeeData | null>();

  const { employees, employeesIsLoading, employeesIsSuccess } = useAppSelector(
    (state) => state.employees
  );
  const { division, divisionIsLoading, divisionIsSuccess } = useAppSelector(
    (state) => state.division
  );

  const { auth } = useAppSelector((state) => state.persistedReducer);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      epfNo: values?.epfNo,
      designationId: values?.designationId,
      divisionId: values?.divisionId,
      hod: values?.hod,
      remark: values?.remark,
      locationAfterRemoval: values?.locationAfterRemoval,
      purposeOfRemoval: values?.purposeOfRemoval,
      dateOfRemoval: removalDate ? removalDate : "",
      expectedReturnDate: expectedDate ? expectedDate : "",

      //   desciption of items to be removed
      itemName: values?.itemName,
      itemType: values?.itemType,
      quantity: values?.quantity,
      inventoryNumber: values?.inventoryNumber,
      description: values?.description,
      currentLocation: values?.currentLocation,
      officerInChargeName: values?.officerInChargeName,
      nameOfOfficerOutsideIncharge: values?.nameOfOfficerOutsideIncharge,
      resultOfVerificationBySecurityOfficer:
        values?.resultOfVerificationBySecurityOfficer,
    });
  }, [expectedDate, removalDate]);

  useEffect(() => {
    setValues({
      documentNo: values?.documentNo,
      epfNo: values?.epfNo,
      designationId: values?.designationId,
      divisionId: values?.divisionId,
      hod: values?.hod,
      remark: values?.remark,
      locationAfterRemoval: values?.locationAfterRemoval,
      purposeOfRemoval: values?.purposeOfRemoval,
      dateOfRemoval: values.dateOfRemoval,
      expectedReturnDate: values.expectedReturnDate,

      //   desciption of items to be removed
      itemName: values?.itemName,
      itemType: values?.itemType,
      quantity: values?.quantity,
      inventoryNumber: values?.inventoryNumber,
      description: values?.description,
      currentLocation: values?.currentLocation,
      officerInChargeName: values?.officerInChargeName,
      nameOfOfficerOutsideIncharge: values?.nameOfOfficerOutsideIncharge,
      resultOfVerificationBySecurityOfficer:
        values?.resultOfVerificationBySecurityOfficer,
    });
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

  //on Submit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);

    setLoading(true);
    setTimeout(() => {
      const result = GatePassService.getDivisionGatePass(
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
        toast.success("Gate Pass Added Successfully");
        resetForm();
      } else {
        toast.error("Request Cannot be Completed");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Gate Pass</h1>
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

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="locationAfterRemoval"
              >
                Location After Removal
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="locationAfterRemoval"
                onChange={onChange}
                value={values.locationAfterRemoval}
                required
              />
            </div>

            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="purposeOfRemoval"
              >
                Purpose Of Removal
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="purposeOfRemoval"
                onChange={onChange}
                value={values.purposeOfRemoval}
                required
              />
            </div>
          </div>
          {/* right section of the flex */}
          <div className="flex-1 mr-4">
            <div className="mx-0 mb-4 lg:mt-5 lg:mb-2 md:my-0 lg:ml-10">
              <CustomeDataPicker
                date={removalDate}
                setDate={setRemovalDate}
                title="Removal Date"
              />
            </div>
            <div className="mx-0 mb-4 lg:mt-5 lg:ml-10 md:my-0">
              <CustomeDataPicker
                date={expectedDate}
                setDate={setExpectedDate}
                title="Expected Return Date"
              />
            </div>
          </div>
        </div>

        <h1 className="page-title">Description of Items To be Removed</h1>
        <hr className="horizontal-line" />

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* left section */}
          <div className="form-left-section">
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
              <label className="input-label basis-1/2" htmlFor="itemType">
                Item Type:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="itemType"
                onChange={onChange}
                value={values.itemType}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="quantity">
                quantity:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="quantity"
                onChange={onChange}
                value={values.quantity}
                required
              />
            </div>

            <div className="flex">
              <label
                className="input-label basis-1/2"
                htmlFor="inventoryNumber"
              >
                Inventory Number:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="inventoryNumber"
                onChange={onChange}
                value={values.inventoryNumber}
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

            <div className="flex">
              <label
                className="input-label basis-1/2"
                htmlFor="currentLocation"
              >
                Current Location:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="currentLocation"
                onChange={onChange}
                value={values.currentLocation}
                required
              />
            </div>
          </div>

          {/* right section */}
          <div className="form-right-section">
            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="officerInChargeName"
              >
                Officer InCharge Name:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="officerInChargeName"
                onChange={onChange}
                value={values.officerInChargeName}
                required
              />
            </div>

            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="nameOfOfficerOutsideIncharge"
              >
                Name Of Officer Outside Incharge:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="nameOfOfficerOutsideIncharge"
                onChange={onChange}
                value={values.nameOfOfficerOutsideIncharge}
                required
              />
            </div>

            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="resultOfVerificationBySecurityOfficer"
              >
                Result Of Verification By Security Officer:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="resultOfVerificationBySecurityOfficer"
                onChange={onChange}
                value={values.resultOfVerificationBySecurityOfficer}
                required
              />
            </div>
          </div>
        </div>

        <div className="w-[97%] mx-auto ml-0">
          <label className="input-label" htmlFor="remark">
            Remark
          </label>

          <textarea
            id="remark"
            className="tailwind-text-box w-[100%] mr-4"
            onChange={onChange}
            name="remark"
            value={values.remark}
          ></textarea>
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

export default GatePass;
