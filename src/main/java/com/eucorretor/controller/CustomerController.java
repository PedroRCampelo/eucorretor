package com.eucorretor.controller;

import com.eucorretor.model.Customer;
import com.eucorretor.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    
    @Autowired
    private CustomerRepository customerRepository;

    // Test frontend communication
    @GetMapping("/hello")
    public String frontTst(){
        return "Hello, Frontend :)";
    }
    
    // List customers
    @GetMapping
    public List<Customer> listCustomers() {
        return customerRepository.findAll();
    }

    // Search customer based on id
    @GetMapping("/{id}")
    public Optional<Customer> findCustomers(@PathVariable Long id) {
        return customerRepository.findById(id);
    }

    // Create new customer
    @PostMapping
    public Customer createCustomers(@RequestBody Customer customer) {
        return customerRepository.save(customer);
    }

    // Upd customer
    @PutMapping("/{id}")
    public Customer updCustomer(@PathVariable Long id, @RequestBody Customer updatedCustomer) {
        return customerRepository.findById(id).map(customer -> {
            customer.setName(updatedCustomer.getName());
            customer.setEmail(updatedCustomer.getEmail());
            customer.setPhone(updatedCustomer.getPhone());
            return customerRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Failed to find the id"));
    }
    
    

}
