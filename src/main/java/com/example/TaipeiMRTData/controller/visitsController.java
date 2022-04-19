package com.example.TaipeiMRTData.controller;

import com.example.TaipeiMRTData.service.VisitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class visitsController {
    
    @Autowired
    VisitService visitService;

    @GetMapping("/visits")
    @CrossOrigin("http://localhost:5500/")
    public Map<String, Object> getVisitsList () {
        return visitService.buildDataResponseJson();
    }
}
