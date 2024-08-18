package com.app.journeyjoy.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "hotel")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "destinations")
public class Hotel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length = 20, name = "name")
	private String name;
	@Column(length = 100, name = "address")
	private String address;
	@Column(name = "starRating")
	private int starRating;
	// hotel*->1 destination
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "destination_id")
	private Destination destinations;

}
