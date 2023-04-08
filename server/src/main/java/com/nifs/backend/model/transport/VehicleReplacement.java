package com.nifs.backend.model.transport;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.nifs.backend.model.Base;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Table(name = "vehicle_replacement")
public class VehicleReplacement extends Base {

    private String documentNo;

    @Column(name = "invoice_no")
    private String invoiceNo;

    @Column(name = "item_name")
    private String itemName;

    @Column(name = "meter_reading")
    private String meterReading;

    @Column(name = "place_of_purchase")
    private String placeOfPurchase;

    @Column(name = "cost")
    private String cost;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "invoice_date")
    private String invoiceDate;


    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Column(name = "category")
    private String category;

    @Column(name = "location")
    private String location;

    @Column(name = "manufacturer")
    private String manufacturer;

    @Column(name = "description")
    private String description;

    @Column(name = "remark")
    private String remark;

}

