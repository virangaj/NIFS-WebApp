import React, { useState, useEffect } from "react";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";

import ITransportMaster from "../../types/VehicleMaster";
import { setDate } from "date-fns";
import CustomeDataPicker from "../../components/DataPicker";

function VehicleMaster() {
  const [date, setDate] = useState<string | null>(null);
  const [values, setValues] = useState<ITransportMaster>({
    registration_no: "",
    chassi_no: "",
    engine_no: "",
    category: "",
    brand: "",
    color: "",
    remarks: "",
    registration_date: "",
    assign_pool: "",
    employee: "",
    insurance_company_name: "",
    insurance_expiry_date: "",
    license_expired_date: "",
    emission_test_date: "",
    availability: "",
  });

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Vehicle Master</h1>
      <hr className="horizontal-line" />

      <div className="form-flex">
        <div className="form-left-section">
          <Box className="input-field default-flex">
            <TextField
              fullWidth
              required
              id="outlined-basic"
              label="Registration No"
              variant="outlined"
              type="text"
              name="registration_no"
              size="small"
              defaultValue={values.registration_no}
            ></TextField>
          </Box>

          <Box className="input-field">
            <TextField
              fullWidth
              required
              id="outlined-basic"
              label="Chassi No"
              variant="outlined"
              type="text"
              name="chassi_no"
              size="small"
            />
          </Box>

          <Box className="input-field">
            <TextField
              fullWidth
              required
              id="outlined-basic"
              label="Engine No"
              variant="outlined"
              type="text"
              name="engine_no"
              size="small"
            />
          </Box>

          <Box className="input-field">
            <InputLabel id="demo-simple-select-label" className="input-label">
              Category
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.category}
              name="catergory"
              size="small"
              label="category"
            >
              <MenuItem value={"car"}>Car</MenuItem>
              <MenuItem value={"Van"}>Van</MenuItem>
              <MenuItem value={"Bus"}>Bus</MenuItem>
            </Select>
          </Box>

          <Box className="input-field">
            <InputLabel id="demo-simple-select-label" className="input-label">
              Brand
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.brand}
              name="catergory"
              size="small"
              label="category"
            >
              <MenuItem value={"nissan"}>Nissan</MenuItem>
              <MenuItem value={"toyota"}>Toyota</MenuItem>
              <MenuItem value={"mahindra"}>Mahindra</MenuItem>
            </Select>
          </Box>

          <Box className="input-field">
            <InputLabel id="demo-simple-select-label" className="input-label">
              Color
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.color}
              name="catergory"
              size="small"
              label="category"
            >
              <MenuItem value={"black"}>Black</MenuItem>
              <MenuItem value={"white"}>White</MenuItem>
              <MenuItem value={"blue"}>Blue</MenuItem>
            </Select>
          </Box>

          <CustomeDataPicker
            date={date}
            setDate={setDate}
            title="Date"
            className="lg:ml-10 mx-0"
          />

          <Box className="input-field">
            <InputLabel id="demo-simple-select-label" className="input-label">
              Assign / Pool
            </InputLabel>
            <Select
              fullWidth
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={values.assign_pool}
              name="catergory"
              size="small"
              label="category"
            >
              <MenuItem value={"01"}>01</MenuItem>
              <MenuItem value={"02"}>02</MenuItem>
              <MenuItem value={"03"}>03</MenuItem>
            </Select>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default VehicleMaster;
