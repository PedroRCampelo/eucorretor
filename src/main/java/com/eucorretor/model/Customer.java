package com.eucorretor.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;


@Entity
@Table(name="CUSTOMERS")

public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    @Getter
    private Long id;
    
    @Setter
    @Getter
    private String name;
    @Setter
    @Getter
    private String email;
    @Setter
    @Getter
    private String phone;
    @Setter
    @Getter
    private Date birthday;
    @Setter
    @Getter
    private Date validity;
    @Setter
    @Getter
    private String veicPlate;
    @Setter
    @Getter
    private String veicModel;
    @Setter
    @Getter
    private String company;
    @Setter
    @Getter
    private String installment;
    @Setter
    @Getter
    private String award;
    @Setter
    @Getter
    private String endosso;
    @Setter
    @Getter
    private boolean active;
}
