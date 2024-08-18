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
@Table(name = "destination")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = "tours")
public class Destination {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "popularity")
	private int popularity;
	@Column(length = 20,name = "name")
	private String name;
	@Column(length = 200,name = "description")
	private String description;
	@Column(length = 100,name = "location")
	private String location;
	//destination*->1 tour
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "tour_id")
	private Tour tours;
	
	
}
