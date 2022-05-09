package com.example.TaipeiMRTData.controller;

import com.example.TaipeiMRTData.service.VisitService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class visitsController {
    
    @Autowired
    VisitService visitService;

    @GetMapping(value = "/visits", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Object getVisitsJSON () {
        Resource resource = new ClassPathResource("/static/test.JSON");
        try {
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(resource.getInputStream(), Object.class);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
