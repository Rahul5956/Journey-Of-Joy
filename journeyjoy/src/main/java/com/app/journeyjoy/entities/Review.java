package com.app.journeyjoy.entities;

import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.UpdateTimestamp;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "reviews")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"hotels","tours","users"})
public class Review {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "rating")
	private int rating;
	@Column(length = 200,name = "comment")
	private String comment;
	@UpdateTimestamp
	@Column(name = "reviewDate")
	private LocalDate ReviewDate;
	//Reviews * -> 1 hotels
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "hotel_id",nullable = false)
	private Hotel hotels;
	//Reviews * -> 1 tours
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "tour_id",nullable = false)
	private Tour tours;
	//Reviews * -> 1 user
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "user_id",nullable = false)
	private User users;
}
