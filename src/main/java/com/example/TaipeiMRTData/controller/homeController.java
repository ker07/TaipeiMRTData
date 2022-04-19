package com.example.TaipeiMRTData.controller;

import com.example.TaipeiMRTData.service.HomeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class homeController {

    @Autowired
    HomeService homeService;

    @GetMapping("/home")
    public String hello(Model model) {
        model.addAttribute("stationList", homeService.getStationListForCreatingStationBtn());
        System.out.println(homeService.getStationListForCreatingStationBtn());
        return "home";
    }
}
