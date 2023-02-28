import React, { useState } from "react";
import CustomeDataPicker from "../../components/DataPicker";
import IAccomodation from "../../types/Accomodation";

function Accomodation() {
  const [values, setValues] = useState<IAccomodation>({
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
    employee: "",
    division: "",
    hostDesignation: "",
    project: "",
    officialOrPersonal: "",
    details: "",
    location: "",
    from: "",
    to: "",
    roomRates: "",
    noOfDays: "",
    totalCharges: "",
  });

  const resetForm = () => {
    setValues({
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
      employee: "",
      division: "",
      hostDesignation: "",
      project: "",
      officialOrPersonal: "",
      details: "",
      location: "",
      from: "",
      to: "",
      roomRates: "",
      noOfDays: "",
      totalCharges: "",
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

  const [documentDate, setDocumentDate] = useState<string | null>(null);

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Accomodation</h1>
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

            <div>
              <label className="input-label" htmlFor="documentDate">
                Document Date:
              </label>
              <CustomeDataPicker
                date={documentDate}
                setDate={setDocumentDate}
                title="Date"
                className="mx-0 lg:ml-10"
                name="documentDate"
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="guestName">
                Guest Name:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="guestName"
                onChange={onChange}
                value={values.guestName}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="address">
                Address:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="address"
                onChange={onChange}
                value={values.address}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="email">
                Email:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="email"
                onChange={onChange}
                value={values.email}
                required
              />
            </div>
          </div>
          {/* Form Right Section */}
          <div className="form-right-section">
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
              <label className="input-label basis-1/2" htmlFor="nicNo">
                NIC No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="nicNo"
                onChange={onChange}
                value={values.nicNo}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="nationality">
                Nationality:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="nationality"
                onChange={onChange}
                value={values.nationality}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="telephoneNo">
                Telephone No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="telephoneNo"
                onChange={onChange}
                value={values.telephoneNo}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="passportNo">
                Passport No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="passportNo"
                onChange={onChange}
                value={values.passportNo}
                required
              />
            </div>

            <div className="flex">
              <label className="input-label basis-1/2" htmlFor="faxNo">
                Fax No:
              </label>

              <input
                id="outlined-basic"
                type="search"
                className="mr-4 tailwind-text-box w-[90%]"
                name="faxNo"
                onChange={onChange}
                value={values.faxNo}
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Accomodation;
