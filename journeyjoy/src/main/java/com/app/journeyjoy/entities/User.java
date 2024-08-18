package com.app.journeyjoy.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(length = 30,name = "fname")
	private String firstName;
	@Column(length = 30,name = "lname")
	private String lastName;
	@Column(length = 30,name = "email",unique = true)
	private String email;
	private LocalDate dob;
	@Column(length = 30,name = "Phoneno")
	private String phoneno;
	@Enumerated(EnumType.STRING)
	@Column(length = 20,name = "role")
	private Role role;
	@Column(length = 100,name = "address")
	private String address;
	@Column(length = 20,name = "password")
	private String password;
	
	
	
	public LocalDate getDob() {
		return dob;
	}

	public void setDob(LocalDate dob) {
		this.dob = dob;
	}
	

}
