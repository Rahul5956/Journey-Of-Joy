package com.app.journeyjoy.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.journeyjoy.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment,Long> {

}
