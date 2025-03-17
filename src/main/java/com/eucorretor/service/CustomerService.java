package com.eucorretor.service;

import com.eucorretor.model.Customer;
import com.eucorretor.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    public CustomerService(CustomerRepository customerRepository) {this.customerRepository = customerRepository;}

    //LIST
    public List<Customer> getAll() {return customerRepository.findAll();}
    //LIST by ID
    public Optional<Customer> getById(Long id) {return customerRepository.findById(id);}
    //CREATE
    public Customer create(Customer customer) {return customerRepository.save(customer);}
    //DELETE
    public void delete(Long id) {customerRepository.deleteById(id);}
    //UPDATE
    public Customer update(Long id, Customer updatedCustomer) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ID not found: " + id));
        existingCustomer.setName(updatedCustomer.getName());
        existingCustomer.setEmail(updatedCustomer.getEmail());
        existingCustomer.setEmail(updatedCustomer.getPhone());
        
        return customerRepository.save(existingCustomer);
    }

}
