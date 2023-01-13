package com.nifs.backend.serviceImplementation;

import com.nifs.backend.model.VenueCharge;
import com.nifs.backend.model.VenueMaster;
import com.nifs.backend.repository.ChargeRepository;
import com.nifs.backend.model.Charges;
import com.nifs.backend.model.Facility;
import com.nifs.backend.repository.FacilityRepository;
import com.nifs.backend.repository.VenueChargeRepository;
import com.nifs.backend.repository.VenueMasterRepository;
import com.nifs.backend.service.VenueMasterServiceInterface;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class VenueMasterService implements VenueMasterServiceInterface {

    @Autowired
    private VenueMasterRepository venueRepo;
    @Autowired
    private FacilityRepository facRepo;
    @Autowired
    private ChargeRepository chargeRepo;

    @Autowired
    private VenueChargeRepository venChargeRepo;

    public Boolean createVenue(VenueMaster venueData) {
        try {
            if (venueRepo.getVenue(venueData.getVenueId()) == null) {
                Date d = new Date();
                venueData.setDateCreated(d);
                venueRepo.save(venueData);
                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    //    add facility
    public VenueMaster addFacility(String venueId, Facility[] facData) {
        try {
            Set<Facility> facilitySet = null;
            VenueMaster venueMaster = venueRepo.getVenue(venueId);
            facilitySet = venueMaster.getFacilities();
            for (Facility f : facData) {
                Facility facility = facRepo.returnFacility(f.getFacilityId());
                facilitySet.add(facility);
            }
            venueMaster.setFacilities(facilitySet);
            return venueRepo.save(venueMaster);
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }


//    add charge
    public Boolean addCharge(String venueId, Charges[] chargeData) {

        try {
            VenueMaster venueMaster = venueRepo.getVenue(venueId);
            if (venueMaster != null) {
                for (Charges c : chargeData) {
                    Date d = new Date();
                    Charges charge = chargeRepo.returnCharge(c.getChargeId());
                    if (charge != null) {

                        VenueCharge venCharge = new VenueCharge(venueMaster, charge, d);
//                    venCharge.setVenueMaster(venueMaster);
//                    venCharge.setCharge(charge);
                        System.out.println("b");
                        venChargeRepo.save(venCharge);
                    }
                }
                System.out.println("a");
                return true;
            }

//        venueMaster.setCharges(chargeSet);
//        return venueRepo.save(venueMaster);

            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }



    public List<VenueMaster> getAll() {
        try {
            return venueRepo.findAll();
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public String returnNewVenueId() {
        try {
            String lastId = venueRepo.returnLastId();
            if (lastId != null) {
                String idText = lastId.replaceAll("[^A-Za-z]", "");
                int idNum = Integer.parseInt(lastId.replaceAll("[^0-9]", ""));

                idNum = idNum + 1;

                return idText + idNum;
            }
            else {
                return "VM1001";
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return "Request cannot be completed";
        }

    }

    //delete venue
    public Boolean deleteVenue(String venueId) {
        try {
            VenueMaster venueMaster = venueRepo.getVenue(venueId);
            if (venueMaster != null) {
                venueRepo.deleteById(venueMaster.getVenueId());
                return true;
            }
            return false;
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }

    //   get venue by id
    public Optional<VenueMaster> returnVenue(String venueId) {
        try {
            return venueRepo.findById(venueId);
        } catch (Exception e) {
            System.out.println(e.toString());
            return Optional.empty();
        }
    }

    //    update venue
    public Boolean updateVenue(String venueId, VenueMaster venueData) {
        try {
            if (venueRepo.getVenue(venueId) != null) {
                Date d = new Date();
                venueRepo.updateVenueMaster(venueData.getVenueName(), venueData.getType(), venueData.getCapacity(), venueData.getRemark(), venueData.getLocation(), venueData.getAvailability(), d, venueId);

                return true;
            }
            else {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return false;
        }
    }


    public VenueMaster removeFacility(String venueId, Facility facData) {
        try {
            VenueMaster venueMaster = venueRepo.getVenue(venueId);
            Facility facility = facRepo.returnFacility(facData.getFacilityId());
            if (venueMaster != null && facility != null) {
                Set<Facility> facilitySet = venueMaster.getFacilities();
                facilitySet.remove(facility);
                venueMaster.setFacilities(facilitySet);
                return venueRepo.save(venueMaster);
            }
            else {
                return null;
            }
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

//    return all charges in a venue
    public List<VenueCharge> returnAllCharges() {
        try {
            return venChargeRepo.findAll();
        } catch (Exception e) {
            System.out.println(e.toString());
            return null;
        }
    }

    public Optional<VenueCharge> returnAllChargesById(int id) {
        try {
            return venChargeRepo.returnVenueCharges(id);
        } catch (Exception e) {
            System.out.println(e.toString());
            return Optional.empty();
        }

    }
}
