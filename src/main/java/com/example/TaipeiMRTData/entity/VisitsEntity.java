package com.example.TaipeiMRTData.entity;


import com.vladmihalcea.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name="visit_table1")
@TypeDef(
        name = "list-array",
        typeClass = ListArrayType.class
)
public class VisitsEntity{

    @Id
    private String station;

    private String line;
    private LocalDate startdate;

    @Type(type = "list-array")
    private List<Integer> visitday;

    private int visits;

    @Type(type = "list-array")
    private List<Integer> hour_sum;

    @Transient
    private static final LocalDate newestDataDate = LocalDate.of(2022, 2, 28);
    @Transient
    private static final LocalDate oldestDataDate = LocalDate.of(2017, 1, 1);

    public VisitsEntity() {

    }

    public VisitsEntity(String station, String line, LocalDate startdate, List<Integer> visitday, int visits, List<Integer> hour_sum) {
        this.station = station;
        this.line = line;
        this.startdate = startdate;
        this.visitday = visitday;
        this.visits = visits;
        this.hour_sum = hour_sum;
    }

    public int getDuration() {
        return (int)((Duration.between(oldestDataDate.atStartOfDay(), newestDataDate.atStartOfDay())).toDays()) + 1;
    }

    public void insertNullToFitDurationDays(){
        ArrayList<Integer> newvisitsDays = new ArrayList<Integer>();
        int daysToAdd = getDuration() - this.getVisitday().size();
        for (int i = 0; i < daysToAdd; i++) {
            newvisitsDays.add(null);
        }
        newvisitsDays.addAll(this.visitday);
        this.setVisitday(newvisitsDays);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof VisitsEntity)) return false;
        VisitsEntity that = (VisitsEntity) o;
        return visits == that.visits && station.equals(that.station) && line.equals(that.line) && startdate.equals(that.startdate) && visitday.equals(that.visitday);
    }

    @Override
    public int hashCode() {
        return Objects.hash(getStation(), getLine(), getStartdate(), getVisitday(), getVisits(), hour_sum);
    }

    public String getStation() {
        return station;
    }

    public String getLine() {
        return line;
    }

    public LocalDate getStartdate() {
        return startdate;
    }

    public List<Integer> getVisitday() {
        return visitday;
    }

    public int getVisits() {
        return visits;
    }

    public void setVisitday(List<Integer> visitday) {
        this.visitday = visitday;
    }

    public List<Integer> getHourSum() {
        return hour_sum;
    }
}
