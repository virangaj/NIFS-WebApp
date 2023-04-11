import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import IInsuranceClaim from "../../types/admin/IInsuranceClaim";
import IEmployeeData from "../../types/admin/IEmployeeData";
import { useAppSelector } from "../../hooks/hooks";
import { generateID } from "../../utils/generateId";
import { toast } from "react-toastify";
import InsuranceClaimService from "../../services/admin/InsuranceClaimService";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";
import CustomeDataPicker from "../../components/DataPicker";
import { Stack } from "@mui/material";

const initialState: IInsuranceClaim = {
  documentNo: "",
  epfNo: 0,
  hod: 0,
  designationId: "",
  divisionId: "",
  date: "",

  noOfClaims: 0,
  claimAmount: 0,
  totalBillAmount: 0,
  paidClaimAmount: 0,
  notPaidClaimAmount: 0,
  claimPaidDate: "",
  spectacleClaimDate: "",
  remark: "",
};

function InsuranceClaim() {
  const [values, setValues] = useState<IInsuranceClaim>(initialState);
  const [hod, setHod] = useState<IEmployeeData | null>();
  const [loading, setLoading] = useState(false);
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [requestDate, setRequestDate] = React.useState<string | null>(null);
  const [claimPaidDate, setClaimPaidDate] = React.useState<string | null>(null);
  const [spectacleClaimDate, setSpectacleClaimDate] = React.useState<
    string | null
  >(null);

  const { employees, employeesIsLoading, employeesIsSuccess } = useAppSelector(
    (state) => state.employees
  );
  const { division, divisionIsLoading, divisionIsSuccess } = useAppSelector(
    (state) => state.division
  );

  const { auth } = useAppSelector((state) => state.persistedReducer);

  useEffect(() => {
    setValues({
      date: requestDate ? requestDate : "",
      // generated
      documentNo: values?.documentNo,
      epfNo: values?.epfNo,
      hod: values?.hod,
      designationId: values?.designationId,
      divisionId: values?.divisionId,

      noOfClaims: values?.noOfClaims,
      claimAmount: values?.claimAmount,
      totalBillAmount: values?.totalBillAmount,
      paidClaimAmount: values?.paidClaimAmount,
      notPaidClaimAmount: values?.notPaidClaimAmount,
      claimPaidDate: claimPaidDate ? claimPaidDate : "",
      spectacleClaimDate: spectacleClaimDate ? spectacleClaimDate : "",
      remark: values?.remark,
    });
  }, [requestDate, claimPaidDate, spectacleClaimDate]);

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

  //onsubmit
  const onSubmit = async (e: any) => {
    e.preventDefault();
    console.log(values);

    setLoading(true);
    setTimeout(() => {
      const result = InsuranceClaimService.saveInsuranceClaimRequest(
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
        toast.success("Insurance Claim Request Added Successfully");
        resetForm();
      } else {
        toast.error("Request Cannot be Completed");
      }
      setLoading(false);
    }, 1000);
  };
  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Insurance Details</h1>
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

        <div className="w-[97%] mx-auto">
          <EmployeeSelector
            onChange={onChange}
            value={values.epfNo}
            name="epfNo"
          />
        </div>

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

        <hr className="horizontal-line" />

        <div className="mx-0 mb-4  md:my-0 lg:mb-4">
          <CustomeDataPicker
            date={requestDate}
            setDate={setRequestDate}
            title="Request Date"
            name="requestDate"
          />
        </div>

        <div className="flex w-[100%]">
          {/* left section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="noOfClaims">
                No Of Claims:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="noOfClaims"
                onChange={onChange}
                value={values.noOfClaims}
                required
              />
            </div>

            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="totalBillAmount"
              >
                Total Bill Amount:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="totalBillAmount"
                onChange={onChange}
                value={values.totalBillAmount}
                required
              />
            </div>

            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="notPaidClaimAmount"
              >
                Not Paid Claim Amount:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="notPaidClaimAmount"
                onChange={onChange}
                value={values.notPaidClaimAmount}
                required
              />
            </div>
          </div>

          {/* right section of the flex */}
          <div className="flex-1 mr-4">
            <div>
              <label className="input-label basis-1/2" htmlFor="claimAmount">
                Claim Amount:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="claimAmount"
                onChange={onChange}
                value={values.claimAmount}
                required
              />
            </div>

            <div>
              <label
                className="input-label basis-1/2"
                htmlFor="paidClaimAmount"
              >
                Paid Claim Amount:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[100%]"
                name="paidClaimAmount"
                onChange={onChange}
                value={values.paidClaimAmount}
                required
              />
            </div>

            <div className="mx-0 mb-4  md:my-0 lg:mb-4 lg:mt-4">
              <CustomeDataPicker
                date={claimPaidDate}
                setDate={setClaimPaidDate}
                title="Claim Paid Date"
                name="claimPaidDate"
              />
            </div>

            <div className="mx-0 mb-4  md:my-0 lg:mb-4">
              <CustomeDataPicker
                date={spectacleClaimDate}
                setDate={setSpectacleClaimDate}
                title="Spectacle Claim Date"
                name="spectacleClaimDate"
              />
            </div>
          </div>
        </div>
        <div>
          <label className="input-label basis-1/2" htmlFor="remark">
            Remark:
          </label>

          <input
            id="outlined-basic"
            type="search"
            className="mr-4 tailwind-text-box w-[100%]"
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

export default InsuranceClaim;
