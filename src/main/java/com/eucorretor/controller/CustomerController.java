package com.eucorretor.controller;

import com.eucorretor.model.Customer;
import com.eucorretor.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/customers")
public class CustomerController {
    
    @Autowired
    private CustomerService customerService;

    // Test frontend communication
    @GetMapping("/hello")
    public String frontTst(){
        return "Hello, Frontend :)";
    }

    // Create new customer
    @PostMapping
    public Customer createCustomers(@RequestBody Customer customer) {
        return customerService.create(customer);
    }

    // List customers
    @GetMapping
    public List<Customer> listCustomers() {
        return customerService.getAll();
    }

    // Search customer by id
    @GetMapping("/{id}")
    public Optional<Customer> findCustomers(@PathVariable Long id) {
        return customerService.getById(id);
    }

    //Upd customer
    @PutMapping("/{id}")
    public Customer updCustomer(@PathVariable Long id, @RequestBody Customer updatedCustomer) {
        return customerService.getById(id).map(customer -> {
            customer.setName(updatedCustomer.getName());
            customer.setEmail(updatedCustomer.getEmail());
            customer.setPhone(updatedCustomer.getPhone());
            return customerService.create(customer);
        }).orElseThrow(() -> new RuntimeException("Failed to find the id"));
    }

    

}
