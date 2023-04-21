package com.example.city.controller;

import com.example.city.model.City;
import com.example.city.service.city.ICityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/city")
public class CityController {

    @Autowired
    private ICityService cityService;

    // get all city
    @GetMapping
    public ResponseEntity<List<City>> getAllCity() {
        List<City> cities = (List<City>) cityService.findAll();
        if (cities == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(cities, HttpStatus.OK);
    }

    //Create city
    @PostMapping("/create")
    public ResponseEntity<City> save(@RequestBody City city) {
        return new ResponseEntity<>(cityService.save(city), HttpStatus.CREATED);
    }

    //update city
    @PutMapping("/{id}")
    public ResponseEntity<City> edit(@PathVariable Long id, @RequestBody City city) {
        Optional<City> cityOptional = cityService.findById(id);
        if (cityOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        city.setId(id);
        cityService.save(city);
        return new ResponseEntity<>(city, HttpStatus.OK);
    }

    //delete city
    @DeleteMapping("/{id}")
    public ResponseEntity<City> delete(@PathVariable Long id) {
        Optional<City> cityOptional = cityService.findById(id);
        if (cityOptional.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        cityService.delete(cityOptional.get().getId());
        return new ResponseEntity<>(cityOptional.get(), HttpStatus.OK);
    }

    // get city detail
    @GetMapping("/{id}")
    public ResponseEntity<City> getOne(@PathVariable Long id) {
        Optional<City> bookOptional = cityService.findById(id);
        return bookOptional.map(city
                -> new ResponseEntity<>(city, HttpStatus.OK)).orElseGet(()
                -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
