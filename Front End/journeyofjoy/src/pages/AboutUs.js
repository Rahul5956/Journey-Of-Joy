import React from 'react';
import './AboutUs.css'; // Optional: for custom styles

function AboutUs() {
  return (
    <div className="about-us container mt-4">
      <h1 className="text-center">About Us</h1>

      <section className="mission-vision">
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide the best travel experiences through our curated tours and services. We aim to deliver exceptional customer service and create memorable adventures for all our clients.
        </p>
        <h2>Our Vision</h2>
        <p>
          We envision a world where every journey is a unique and enriching experience. Our goal is to become the leading travel service provider, known for our quality, reliability, and commitment to customer satisfaction.
        </p>
      </section>

      <section className="our-team">
        <h2>Meet Our Team</h2>
        <div className="team-member">
          <img src="/path/to/team-member1.jpg" alt="Team Member 1" className="team-photo" />
          <h3>Rahul Rautrao</h3>
          <p>CEO & Founder</p>
          <p>Rahul leads our team with a passion for travel and a commitment to excellence. With over 20 years in the industry, he brings a wealth of experience and innovation to our company.</p>
        </div>
        <div className="team-member">
          <img src="/path/to/team-member2.jpg" alt="Team Member 2" className="team-photo" />
          <h3>Rohit Meshram</h3>
          <p>Head of Operations</p>
          <p>Rohit oversees the day-to-day operations of our company, ensuring that everything runs smoothly. Her organizational skills and attention to detail help us deliver seamless travel experiences.</p>
        </div>
        {/* Add more team members as needed */}
      </section>

      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions or need further information, feel free to reach out to us:</p>
        <ul>
          <li><strong>Email:</strong> rahulrautrao1122@gmail.com</li>
          <li><strong>Phone:</strong> +91 7720832111</li>
          <li><strong>Address:</strong> IACSD Akurdi,Pune,Maharashtra,India</li>
        </ul>
      </section>
    </div>
  );
}

export default AboutUs;
