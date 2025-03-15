package com.eucorretor.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.eucorretor.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
}