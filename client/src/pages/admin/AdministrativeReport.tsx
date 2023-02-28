import React, { useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import IAdministrativeReport from "../../types/AdministrativeReport";

function AdministrativeReport() {
  const [values, setValues] = useState<IAdministrativeReport>({
    documentNo: "",
    date: "",
    employee: "",
    designation: "",
    attachment: "",
    details: "",
    division: "",
    hod: "",
  });

  const [date, setDate] = useState<string | null>(null);

  const resetForm = () => {
    setValues({
      documentNo: "",
      date: "",
      employee: "",
      designation: "",
      attachment: "",
      details: "",
      division: "",
      hod: "",
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
      <h1 className="page-title">Administrative Report</h1>
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
              <label className="input-label basis-1/2" htmlFor="hod">
                HOD:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="hod"
                onChange={onChange}
                value={values.hod}
                required
              />
            </div>
          </div>
        </div>
        <div className="flex ">
          <label className="input-label basis-1/2" htmlFor="details">
            Details:
          </label>

          <input
            id="outlined-basic"
            type="text"
            className="mr-4 tailwind-text-box w-[90%]"
            name="details"
            onChange={onChange}
            value={values.details}
            required
          />
        </div>

        {/* TODO Send To section will have similar form elements  */}
      </form>
    </div>
  );
}

export default AdministrativeReport;
