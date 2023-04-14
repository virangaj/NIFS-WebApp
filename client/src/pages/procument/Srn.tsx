import React, { useState, useEffect } from "react";
import IOvertime from "../../types/common/IOvertime";
import Box from "@mui/material/Box";
import { generateID } from "../../utils/generateId";
import CustomeDataPicker from "../../components/DataPicker";
import IEmployeeData from "../../types/admin/IEmployeeData";
import EmployeeService from "../../services/admin/EmployeeService";
import DesignationMasterService from "../../services/admin/DesignationMasterService";
import DivisionMasterService from "../../services/admin/DivisionMasterService";
import IDesignationData from "../../types/admin/IDesignationData";
import IDivisionData from "../../types/admin/IDivisionData";
import Stack from "@mui/material/Stack";
import Isrn from "../../types/procument/Isrn";

import Projects from "../../components/data/Project.json";
import { useAppSelector } from "../../hooks/hooks";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";
import SrnService from "../../services/procument/SrnService";
import { toast } from "react-toastify";

const initialState: Isrn = {
  documentNo: "",
  date: "",
  epfNo: 0,
  divisionId: "",
  designationId: "",
  hod: 0,
  project: "",
  srnType: "",
  itemType: "",
  purchaseType: "",
  estimatedValue: "",
  vote: "",
  fundAllocationForTheProject: "",
  description: "",
  googleLink: "",
};

function Srn() {
  const [values, setValues] = useState<Isrn>(initialState);
  const [requestDate, setRequestDate] = useState<String | any>("");
  const [empData, setEmpData] = useState<Array<IEmployeeData>>([]);
  const [empFoundError, setEmpFoundError] = useState<boolean>(false);
  const [currentEmp, setCurrentEmp] = useState<IEmployeeData>();
  const [designationData, setDesignationData] = useState<IDesignationData>();
  const [divisionData, setDivisionData] = useState<IDivisionData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [getDocNo, setDocNo] = useState<String | any>("");
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
      date: requestDate ? requestDate : "",
      epfNo: values?.epfNo,
      divisionId: values?.divisionId,
      designationId: values?.designationId,
      hod: values?.hod,
      project: values?.project,
      srnType: values?.srnType,
      itemType: values?.itemType,
      purchaseType: values?.purchaseType,
      estimatedValue: values?.estimatedValue,
      vote: values?.vote,
      fundAllocationForTheProject: values?.fundAllocationForTheProject,
      description: values?.description,
      googleLink: values?.googleLink,
    });
  }, [requestDate]);

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
      const result = SrnService.saveSRN(values, auth?.user?.token)
        .then((res) => {
          console.log(res);
        })
        .catch((e) => {
          console.log(e);
        });

      if (result !== null) {
        toast.success("Srn Added Successfully");
        resetForm();
      } else {
        toast.error("Request Cannot be Completed");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">SRN</h1>
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

          <div className="mx-0 mb-4 lg:ml-10 md:my-0">
            <CustomeDataPicker
              date={requestDate}
              setDate={setRequestDate}
              title="Request Date"
            />
          </div>
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
            <div className="mx-0 input-field lg:ml-4">
              <label className="input-label" htmlFor="project">
                Project
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                value={values.project}
                id="project"
                name="project"
                onChange={onChange}
              >
                <option value="" disabled>
                  Select a Project
                </option>

                {Projects
                  ? Projects.map((p, index) => (
                      <option value={p.value} key={index}>
                        {p.value}
                      </option>
                    ))
                  : ""}
              </select>
            </div>

            <div className="mx-0 input-field lg:ml-4">
              <label className="input-label" htmlFor="srnType">
                srnType
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                value={values.srnType}
                id="srnType"
                name="srnType"
                onChange={onChange}
              >
                <option value="" disabled>
                  Select a SRN Type
                </option>

                {Projects
                  ? Projects.map((p, index) => (
                      <option value={p.value} key={index}>
                        {p.value}
                      </option>
                    ))
                  : ""}
              </select>
            </div>

            <div className="mx-0 input-field lg:ml-4">
              <label className="input-label" htmlFor="itemType">
                itemType
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                value={values.itemType}
                id="itemType"
                name="itemType"
                onChange={onChange}
              >
                <option value="" disabled>
                  Select a Item Type
                </option>

                {Projects
                  ? Projects.map((p, index) => (
                      <option value={p.value} key={index}>
                        {p.value}
                      </option>
                    ))
                  : ""}
              </select>
            </div>

            <div className="mx-0 input-field lg:ml-4">
              <label className="input-label" htmlFor="purchaseType">
                Purchase Type
              </label>
              <select
                className="tailwind-text-box w-[90%]"
                value={values.purchaseType}
                id="purchaseType"
                name="purchaseType"
                onChange={onChange}
              >
                <option value="" disabled>
                  Select a Item Type
                </option>

                {Projects
                  ? Projects.map((p, index) => (
                      <option value={p.value} key={index}>
                        {p.value}
                      </option>
                    ))
                  : ""}
              </select>
            </div>
          </div>
          {/* right section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="estimatedValue">
                Estimated Value
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="estimatedValue"
                onChange={onChange}
                value={values.estimatedValue}
                required
              />
            </div>

            <div>
              <label className="input-label basis-1/2" htmlFor="vote">
                Vote:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="vote"
                onChange={onChange}
                value={values.vote}
                required
              />
            </div>

            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="fundAllocationForTheProject"
              >
                Fund Allocation For The Project:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="fundAllocationForTheProject"
                onChange={onChange}
                value={values.fundAllocationForTheProject}
                required
              />
            </div>
          </div>
        </div>

        <div>
          <label className="input-label basis-1/2" htmlFor="description">
            Description:
          </label>

          <input
            id="outlined-basic"
            type="search"
            className="mr-4 tailwind-text-box w-[100%]"
            name="description"
            onChange={onChange}
            value={values.description}
            required
          />
        </div>

        <div>
          <label className="input-label basis-1/2" htmlFor="googleLink">
            Google Link:
          </label>

          <input
            id="outlined-basic"
            type="search"
            className="mr-4 tailwind-text-box w-[100%]"
            name="googleLink"
            onChange={onChange}
            value={values.googleLink}
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

export default Srn;
