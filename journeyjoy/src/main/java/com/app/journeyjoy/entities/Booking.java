package com.app.journeyjoy.entities;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "bookings")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "tours")
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@UpdateTimestamp
	@Column(name = "bookingdate")
	private LocalDate bookingdate;
	//booking1->1tour
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "tour_id")
	private Tour tours;
	@Enumerated(EnumType.STRING)
	@Column(name = "paymentstatus")
	private PaymentStatus paymentstatus;
	
}
