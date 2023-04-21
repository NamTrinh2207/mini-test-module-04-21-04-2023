package com.example.city.service;

import java.util.Optional;

public interface IGenericService<T> {
    Iterable<T> findAll();

    Optional<T> findById(Long id);

    T save(T t);

    void delete(Long id);
}
