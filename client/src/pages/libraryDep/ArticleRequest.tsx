import React, { useEffect, useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import Stack from "@mui/material/Stack";
import IArticleRequest from "../../types/library/IArticleRequest";
import "../pages.css";
import { toast } from "react-toastify";
import ArticleRequestService from "../../services/library/ArticleRequestService";
import IEmployeeData from "../../types/admin/IEmployeeData";
import { useAppSelector } from "../../hooks/hooks";
import { generateID } from "../../utils/generateId";
import Box from "@mui/material/Box";
import EmployeeSelector from "../../components/shared/EmployeeSelector";
import DesignationSelector from "../../components/shared/DesignationSelector";
import DivisionSelector from "../../components/shared/DivisionSelector";
import FileInput from "../../components/FileInput";

const initialState: IArticleRequest = {
  documentNo: "",
  epfNo: 0,
  designationId: "",
  divisionId: "",
  hod: 0,
  date: "",
  nameOfJournal: "",
  publishYear: "",
  volume: "",
  issue: "",
  pages: "",
  webLink: "",
  remark: "",
};

export default function ArticleRequest() {
  const [values, setValues] = useState<IArticleRequest>(initialState);
  const [hod, setHod] = useState<IEmployeeData | null>();
  const [getDocNo, setDocNo] = useState<String | any>("");
  const [requestDate, setRequestDate] = useState<string | null>(null);
  const [publishedYear, setPublishedYear] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [eventAttachment, setEventAttachment] = useState<File | any>();

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
      date: requestDate ? requestDate : "",
      nameOfJournal: values?.nameOfJournal,
      publishYear: publishedYear ? publishedYear : "",
      volume: values?.volume,
      issue: values?.issue,
      pages: values?.pages,
      webLink: values?.webLink,
      remark: values?.remark,
    });
  }, [requestDate, publishedYear]);

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
      const result = ArticleRequestService.saveArticleRequest(
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
        toast.success("Article Request Added Successfully");
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
      <h1 className="page-title">Article Request</h1>
      <hr className="horizontal-line"></hr>
      <form onSubmit={onSubmit} className="w-[90%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2">
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
                  <span className="italic-sm-text">
                    Please select a Division
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* left section */}
          <div className="form-left-section">
            <div className="flex items-center">
              <label className="input-label basis-1/2" htmlFor="nameOfJournal">
                Name Of Journal:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="nameOfJournal"
                onChange={onChange}
                value={values.nameOfJournal}
                required
              />
            </div>

            <div className="flex items-center">
              <label className="input-label basis-1/2" htmlFor="volume">
                Volume:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="volume"
                onChange={onChange}
                value={values.volume}
                required
              />
            </div>

            <div className="flex items-center">
              <label className="input-label basis-1/2" htmlFor="issue">
                Issue:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="issue"
                onChange={onChange}
                value={values.issue}
                required
              />
            </div>

            <div className="flex items-center">
              <label className="input-label basis-1/2" htmlFor="pages">
                Pages:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="pages"
                onChange={onChange}
                value={values.pages}
                required
              />
            </div>

            <div className="flex items-center">
              <label className="input-label basis-1/2" htmlFor="webLink">
                WebLink:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="webLink"
                onChange={onChange}
                value={values.webLink}
                required
              />
            </div>
          </div>

          {/* right section */}
          <div className="form-right-section">
            <div>
              <label className="input-label" htmlFor="date">
                Request Date:
              </label>
              <CustomeDataPicker
                date={requestDate}
                setDate={setRequestDate}
                title="Date"
                className="mx-0 lg:ml-10"
                name="date"
              />
            </div>

            <div>
              <label className="input-label" htmlFor="publishedYear">
                Published Year:
              </label>
              <CustomeDataPicker
                date={publishedYear}
                setDate={setPublishedYear}
                title="publishedYear"
                className="mx-0 lg:ml-10"
                name="publishedYear"
              />
            </div>

            <div className="lg:mt-4">
              <FileInput
                setEventAttachment={setEventAttachment}
                eventAttachment={eventAttachment}
                title="Upload Attachment"
              />
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
