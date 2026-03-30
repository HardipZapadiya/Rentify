import React from "react";
import styles from "./AboutUs.module.css";
import aboutImg from "../assets/images/AboutUsCar.png";

const AboutUs = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <section className={styles.header}>
        <h2>About Rentify</h2>
        <p>
          Redefining mobility with premium vehicles and exceptional service since 2026. 
          Experience the next generation of car rentals.
        </p>
      </section>

      {/* Mission Section */}
      <section className={styles.mission}>
        <div className={styles.imageBox}>
          <img src={aboutImg} alt="Luxury Car" />
        </div>
        <div className={styles.textBox}>
          <h3>Driving Your Dreams Forward</h3>
          <p>
            At Rentify, we’re committed to making car rental effortless, transparent, and enjoyable 
            for every traveler. Whether you’re on business or leisure, we ensure your journey is smooth.
          </p>
          <ul>
            <li><strong>Reliable Fleet:</strong> Rigorous maintenance checks for your safety.</li>
            <li><strong>Top Rated:</strong> Consistently rated 4.9/5 by customers.</li>
          </ul>
        </div>
      </section>

      {/* Stats Section */}
{/* Stats Section */}
<section className={styles.stats}>
  <div><h4>500+</h4><p>Premium Vehicles</p></div>
  <div><h4>10k+</h4><p>Happy Customers</p></div>
  <div><h4>50+</h4><p>Locations</p></div>
  <div><h4>24/7</h4><p>Customer Support</p></div>
</section>


      {/* Vision Section */}
<section className={styles.vision}>
<h3>The Future of Mobility</h3>
<div className={styles.visionGrid}>
  <div><i className="fas fa-leaf"></i><h4>Eco-Friendly</h4>
  <p>Expanding our fleet with hybrid and electric vehicles to reduce carbon footprint.</p></div>
  <div><i className="fas fa-mobile-alt"></i><h4>Digital First</h4>
  <p>A completely paperless, digital booking experience.</p></div>
  <div><i className="fas fa-globe"></i><h4>National Reach</h4>
  <p>Growing our network to provide vehicles in cities and communities nationwide.</p></div>
</div>
</section>
    </div>
  );
};

export default AboutUs;