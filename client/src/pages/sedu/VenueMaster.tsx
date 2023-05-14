import { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";


import Box from '@mui/material/Box';
import SelectFacility from './shared/SelectFacility';
import SetChargers from './shared/SetChargers';
import VenueMasterService from '../../services/sedu/VenueMasterService';
import IVenueMaster from '../../types/IVenueMaster';
import Ripple from '../../components/Ripple';
import { generateID } from '../../utils/generateId';

import VenueOtherService from '../../services/sedu/VenueOtherService';
import LocationMasterService from '../../services/admin/LocationMasterService';
import ILocationData from '../../types/ILocationData';

import '../pages.css';
import LocationSelector from '../../components/shared/LocationSelector';
import { useAppSelector } from '../../hooks/hooks';
import { toast } from 'react-toastify';
import { UserStatus } from '../../constant/userStatus';
import { useNavigate } from 'react-router-dom';
import { RouteName } from '../../constant/routeNames';

const initialState: IVenueMaster = {
	venueId: '',
	venueName: '',
	type: '',
	availability: '',
	location: '',
	remark: '',
	capacity: 0,
	dateCreated: '',
};


function VenueMaster() {
  const [facilities, setFacilities] = useState<any[]>([]);
  const [chargers, setChargers] = useState<any[]>([]);
  const [locationData, setLocationData] = useState<ILocationData[]>();

  const [loading, setLoading] = useState(false);

  const [venue, setVenue] = useState([]);

  const [v_id, setV_Id] = useState("");
  const [success, setSuccess] = useState(false);


	const [values, setValues] = useState<IVenueMaster>(initialState);
	const navigate = useNavigate();
	const { auth } = useAppSelector((state) => state.persistedReducer);

	useEffect(() => {
		if (auth?.isAdmin != UserStatus.ADMIN && auth?.division != 'DI1003') {
			navigate(RouteName.ErrorPage);
		}
	}, []);

	// onchange function
	const onChange = (e: any) => {
		setValues((preState) => ({
			...preState,
			[e.target.name]: e.target.value,
		}));
	};
	useEffect(() => {
		setValues({
			...values,
			venueId: v_id,
		});
	}, [v_id]);

    let id = generateID("VM");
    // setV_Id(id)
    // console.log(v_id)
  };


	const resetForm = () => {
		setValues(initialState);
		setV_Id('');
		setFacilities([]);
		setChargers([]);
	};


  useEffect(() => {
    retreiveLocations();
    retrieveVenue();
    // console.log(venue);
  }, []);

  const retreiveLocations = () => {
    LocationMasterService.getAllLocations()
      .then((res: any) => {
        setLocationData(res.data);
        console.log(locationData);
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const retrieveVenue = () => {
    VenueMasterService.getAllVenues()
      .then((res: any) => {
        setVenue(res.data);
        // console.log(venue)
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    if (values.venueId !== null) {
      try {
        setLoading(true);
        console.log(values);
        const venuResult = await VenueMasterService.saveVenue(values);
        const facCharge = await VenueOtherService.setCharges(
          chargers,
          values.venueId
        );
        const facResult = await VenueOtherService.setFacilities(
          facilities,
          values.venueId
        );
        alert("done");
        setSuccess(true);
        resetForm();
      } catch (e: any) {
        setLoading(true);
        setSuccess(false);
        alert(e);
      }

      if (success) {
        resetForm();
      }
      setLoading(false);
    } else {
      alert("Please add a ID");
    }
    // console.log(values)
  };

  return (
    <div className="sub-body-content xl:!w-[60%]">
      <h1 className="page-title">Venue Master</h1>
      <hr className="horizontal-line" />

      {!loading ? (
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="form-left-section">
              <Box className="flex items-center justify-between input-field">
                <p>Venue Id - {v_id ? v_id : ""}</p>
                {/* <TextField fullWidth required
                                id="outlined-basic"
                                label="Venue ID"
                                variant="outlined"
                                type="text"
                                name='venueId'
                                size="small"
                                onChange={onChange}
                                defaultValue={values.venueId}
                                InputProps={{
                                    readOnly: true,
                                }}

                            /> */}
                <button
                  type="button"
                  className="rounded-outline-success-btn"
                  onClick={generateVenueID}
                  style={{ marginLeft: "20px" }}
                >
                  New
                </button>
              </Box>

              <div>
                <label className="input-label" htmlFor="venueName">
                  Venue Name
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[90%]"
                  onChange={onChange}
                  name="venueName"
                  value={values.venueName}
                  required
                />
              </div>
              <div>
                <label className="input-label" htmlFor="type">
                  Venue Type
                </label>
                <select
                  className="tailwind-text-box w-[90%]"
                  value={values.type}
                  id="outlined-basic"
                  name="type"
                  onChange={onChange}
                >
                  <option value="" disabled>
                    Select Venue Type
                  </option>
                  <option value="Room">Room</option>
                  <option value="Lab">Lab</option>
                  <option value="Auditorium">Auditorium</option>
                </select>
              </div>

              <SelectFacility
                setFacilities={setFacilities}
                facilities={facilities}
              />

              <div>
                <label className="input-label" htmlFor="availability">
                  Availability
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[90%]"
                  onChange={onChange}
                  name="availability"
                  value={values.availability}
                  required
                />
              </div>
            </div>

            {/* form right section */}
            <div className="form-right-section">
              <div>
                <label className="input-label" htmlFor="location">
                  Location
                </label>
                <select
                  className="tailwind-text-box w-[90%]"
                  value={values.location}
                  id="location"
                  name="location"
                  onChange={onChange}
                >
                  <option disabled value="">
                    Select Location
                  </option>
                  {locationData?.map((l: ILocationData, i: number) => {
                    return (
                      <option key={i} value={l.locationId}>
                        {l.locationName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="input-label" htmlFor="remark">
                  Remark
                </label>

                <input
                  id="outlined-basic"
                  type="search"
                  className="mr-4 tailwind-text-box w-[90%]"
                  onChange={onChange}
                  name="remark"
                  value={values.remark}
                  required
                />
              </div>

              <div>
                <label className="input-label" htmlFor="capacity">
                  Capacity
                </label>
                <select
                  className="tailwind-text-box w-[90%]"
                  value={values.capacity}
                  id="capacity"
                  name="capacity"
                  onChange={onChange}
                >
                  <option value={0} disabled>
                    Select Capacity
                  </option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>

              <SetChargers chargers={chargers} setChargers={setChargers} />
            </div>
          </div>
          {/* button stack */}
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
      ) : (
        <Ripple />
      )}
    </div>
  );
}

export default VenueMaster;
