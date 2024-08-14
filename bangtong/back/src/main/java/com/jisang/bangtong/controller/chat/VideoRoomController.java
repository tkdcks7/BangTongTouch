package com.jisang.bangtong.controller.chat;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
class WebController {

  @GetMapping("/")
  public ModelAndView home() {
    return new ModelAndView("home");
  }

  @GetMapping("/**")
  public String redirect() {
    return "redirect:/";
  }
  
}