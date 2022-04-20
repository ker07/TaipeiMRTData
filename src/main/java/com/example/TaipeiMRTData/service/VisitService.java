package com.example.TaipeiMRTData.service;

import com.example.TaipeiMRTData.dao.VisitsDao;
import com.example.TaipeiMRTData.entity.VisitsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

import static com.example.TaipeiMRTData.service.StationCodeToName.getStationInfo;

@Service
public class VisitService {

    @Autowired
    VisitsDao visitdao;

    public Iterable<VisitsEntity> getVisits () {
        return visitdao.findAll();
    }

    public Iterable<VisitsEntity> adjustVisitsdaysLengthInVisits (Iterable<VisitsEntity> list) {
        for (VisitsEntity entity: list) {
            entity.insertNullToFitDurationDays();
        }
        return list;
    }

    public Map<String, Object> buildDataResponseJson () {
        ArrayList<VisitsEntity> list = (ArrayList<VisitsEntity>) adjustVisitsdaysLengthInVisits(getVisits());
        Map<String, Object> data = new TreeMap<>();

        data.put("dataStartDate", "2017-01-01");
        data.put("dataEndDate", "2022-02-28");

        Map<String, Map<String, Object>> stationDataList = new TreeMap<String, Map<String, Object>>();
        for (VisitsEntity entity: list) {
            Map<String, Object> element = new HashMap<String, Object>();
            StationCodeToName stationInfo = getStationInfo(entity.getStation());
            String stationCodeStationName = stationInfo.getStationCode() + " " + stationInfo.getStationName();
            String metroLineCode = stationInfo.getMetroLineCode();
            element.put("stationName", stationCodeStationName);
            element.put("metroLineCode", metroLineCode);
            element.put("visitDataSince20170101", entity.getVisitday());
            stationDataList.put(stationInfo.getStationCode(), element);
        }
        data.put("data", stationDataList);

        return data;
    }
}
