import React, { useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import Stack from "@mui/material/Stack";
import IArticleRequest from "../../types/ArticleRequest";
import "../pages.css";
export default function ArticleRequest() {
  const [values, setValues] = useState<IArticleRequest>({
    documentNo: "",
    employee: "",
    designation: "",
    division: "",
    headOfLibrary: "",
    date: "",
    nameOfJournal: "",
    year: "",
    volume: "",
    issue: "",
    pages: "",
    webLink: "",
    attachment: "",
    remark: "",
  });

  const [date, setDate] = useState<string | null>(null);
  const [year, setYear] = useState<string | null>(null);

  const resetForm = () => {
    setValues({
      documentNo: "",
      employee: "",
      designation: "",
      division: "",
      headOfLibrary: "",
      date: "",
      nameOfJournal: "",
      year: "",
      volume: "",
      issue: "",
      pages: "",
      webLink: "",
      attachment: "",
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
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Article Request</h1>
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
              <label className="input-label basis-1/2" htmlFor="employee">
                Employee:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="employee"
                onChange={onChange}
                value={values.employee}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="designation">
                Designation:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="designation"
                onChange={onChange}
                value={values.designation}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="division">
                Division:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="division"
                onChange={onChange}
                value={values.division}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="headOfLibrary">
                Head Of Library:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="headOfLibrary"
                onChange={onChange}
                value={values.headOfLibrary}
                required
              />
            </div>

            <div className="flex">
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

            {/* have to convert this to show only the year */}
            <div>
              <label className="input-label" htmlFor="emissionTestDate">
                Year:
              </label>
              <CustomeDataPicker
                date={year}
                setDate={setYear}
                title="Date"
                className="mx-0 lg:ml-10"
                name="emissionTestDate"
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

            <div className="flex">
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

            <div className="flex">
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

            <div className="flex">
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

            <div className="flex">
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

            {/* Have to add the functionality to upload an file */}
            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="attachment">
                Attachment:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="attachment"
                onChange={onChange}
                value={values.attachment}
                required
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
