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
@Table(name = "maintenance_request")
public class MaintenanceRequest extends Base {

    private String documentNo;

    @Temporal(TemporalType.TIMESTAMP)
    @JsonFormat(pattern = "dd/MM/yyyy")
    @DateTimeFormat(pattern = "dd/MM/yyyy")
    @Column(name = "date")
    private String date;

    @Column(name = "vehicle_no")
    private String vehicleNo;

    @Column(name = "workshop")
    private String workshop;

    @Column(name = "cost")
    private String cost;

    @Column(name = "description")
    private String description;

    @Column(name = "attachment")
    private String attachment;

    @Column(name = "start_meter_reading")
    private String startMeterReading;

    @Column(name = "end_meter_reading")
    private String endMeterReading;

    @Column(name = "remark")
    private String remark;
}
