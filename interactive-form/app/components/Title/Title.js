"use client";
import React, { useEffect } from 'react';
import Styles from './title.module.css';

const Title = () => {
  useEffect(() => {
    const textElement = document.getElementById('text');
    const texts = [
      "Miyapur", "Kukatpally", "Nizampet", "Chanda Nagar", "Lingampally",
      "Patancheru", "Pragathi Nagar", "KPHB", "Bachupally", "Beeramguda",
      "Manikonda", "Banjara Hills", "Jubilee Hills", "Gowliguda", "Kothaguda",
      "Kondapur", "Gachibowli", "Madhapur", "Attapur", "Shaikpet",
      "Panjagutta", "Ameerpet", "SR Nagar", "Erragadda", "Tolichowki",
      "Mehidipatnam", "Secunderabad", "Tirumalagiri", "Abids", "Koti",
      "Khairtabad", "Nampally", "Lakdikapul", "Charminar", "Uppal",
      "Malakpet", "Dilsukhnagar", "LB Nagar", "Vanastalipuram", "Golconda",
      "Suchitra", "Shamshabad", "Mallapur", "Habsiguda", "Shamirpet",
      "Quthbullapur", "Afzalgunj", "Alwal", "Amberpet", "Bahadurpura",
      "Basheerbagh", "Charlapally", "ECIL", "Himayat Nagar", "Jagadgirigutta",
      "Jeedimetla", "Kachiguda", "Kothapet", "Nagole", "Bowenpally", "RTC X Road"
    ];

    const typingSpeed = 200; // Typing speed in milliseconds
    const deleteSpeed = 50; // Deleting speed in milliseconds

    let textIndex = 0;
    let text = texts[textIndex];
    let index = 0;
    let isDeleting = false;

    function type() {
      if (isDeleting) {
        textElement.textContent = "Find your dream property in " + text.substring(0, index);
      } else {
        textElement.textContent = "Find your dream property in " + text.substring(0, index);
      }

      if (isDeleting) {
        index--;
      } else {
        index++;
      }

      if (index === text.length + 1) {
        isDeleting = true;
        setTimeout(type, deleteSpeed);
      } else if (index === 0 && isDeleting) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        text = texts[textIndex];
        setTimeout(type, typingSpeed);
      } else {
        setTimeout(type, isDeleting ? deleteSpeed : typingSpeed);
      }
    }

    // Start the typing animation
    setTimeout(type, typingSpeed);
  }, []);

  return (
    <div className={Styles.textContainer}>
      <header className={Styles.header}>
        <h1 id="text" className={Styles.text}>Field Property Information</h1>
      </header>
    </div>
  );
};

export default Title;
