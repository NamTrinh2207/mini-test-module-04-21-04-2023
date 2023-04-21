package com.example.city.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String country;
    private Long area;
    private Long population;
    private Long gdp;
    private String description;

    public City() {
    }

    public City(String name, String country, Long area, Long population, Long gdp, String description) {
        this.name = name;
        this.country = country;
        this.area = area;
        this.population = population;
        this.gdp = gdp;
        this.description = description;
    }

    public City(Long id, String name, String country, Long area, Long population, Long gdp, String description) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.area = area;
        this.population = population;
        this.gdp = gdp;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Long getArea() {
        return area;
    }

    public void setArea(Long area) {
        this.area = area;
    }

    public Long getPopulation() {
        return population;
    }

    public void setPopulation(Long population) {
        this.population = population;
    }

    public Long getGDP() {
        return gdp;
    }

    public void setGDP(Long gdp) {
        this.gdp = gdp;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}