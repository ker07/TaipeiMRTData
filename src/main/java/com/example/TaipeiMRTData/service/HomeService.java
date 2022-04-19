package com.example.TaipeiMRTData.service;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

@Service
public class HomeService {

    public Map<String, ArrayList<String>> getStationListForCreatingStationBtn() {

        Map<String, ArrayList<String>> stationsForBtn = new HashMap<String, ArrayList<String>>();
        Arrays.asList(StationCodeToName.values())
            .forEach(station -> {
                ArrayList<String> stationDetail = new ArrayList<String>(Arrays.asList(station.getMetroLineCode(), (station.getStationCode() + ' ' + station.getStationName())));
                stationsForBtn.put(station.getStationCode(), stationDetail);
            });
        return stationsForBtn;
    }
}
