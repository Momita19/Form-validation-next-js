"use client";
import React, { useState } from 'react';
import FormField from './FormField';
import Dropdown from './Dropdown';
import ErrorMessage from './ErrorMessage';
import Styles from './form.module.css'  

const areaOptions = ["Miyapur", "Kukatpally", "Nizampet", "Chanda Nagar", "Lingampally", "Patancheru", "Pragathi Nagar", "KPHB", "Bachupally", "Beeramguda", "Manikonda", "Banjara Hills", "Jubilee Hills", "Gowliguda", "Kothaguda", "Kondapur", "Gachibowli", "Madhapur", "Attapur", "Shaikpet", "Panjagutta", "Ameerpet", "SR Nagar", "Erragadda", "Tolichowki", "Mehidipatnam", "Secunderabad", "Tirumalagiri", "Abids", "Koti", "Khairtabad", "Nampally", "Lakdikapul", "Charminar", "Uppal", "Malakpet", "Dilsukhnagar", "LB Nagar", "Vanastalipuram", "Golconda", "Suchitra", "Shamshabad", "Mallapur", "Habsiguda", "Shamirpet", "Quthbullapur", "Afzalgunj", "Alwal", "Amberpet", "Bahadurpura", "Basheerbagh", "Charlapally", "ECIL", "Himayat Nagar", "Jagadgirigutta", "Jeedimetla", "Kachiguda", "Kothapet", "Nagole", "Bowenpally", "RTC X Road"]; // Replace with your area options

const propertyTypeOptions = ["1BHk", "2BHK", "3BHK", "4BHK", "Individual House", "Villa", "CommercialProperty"]; // Replace with your property type options

const Form = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    area: '',
    propertyType: '',
    phoneNumber: '',
    alternativeNumber: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validatePhoneNumber = (phoneNumber) => {
    const numericRegex = /^[0-9]+$/;

    if (!numericRegex.test(phoneNumber)) {
      return 'Only numeric values are allowed.';
    }

    if (phoneNumber.length !== 10 && phoneNumber.length !== 11) {
      return 'Phone number must be 10 digits long.';
    }

    return '';
  };

  const validateTextInput = (text) => {
    const alphaRegex = /^[a-zA-Z\s]+$/;

    if (!alphaRegex.test(text)) {
      return 'Only alphabets are allowed.';
    }

    return '';
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
    const alternativeNumberError = validatePhoneNumber(formData.alternativeNumber);
    const nameError = validateTextInput(formData.name);
    const emailError = validateTextInput(formData.email);

    setErrors({
      phoneNumber: phoneNumberError,
      alternativeNumber: alternativeNumberError,
      name: nameError,
      email: emailError,
    });

    if (
      phoneNumberError ||
      alternativeNumberError ||
      nameError ||
      emailError
    ) {
      // Validation failed, do not submit
      return;
    }

    // Data submission to Google Sheets and database can be implemented here

    console.log('Form data submitted:', formData);
  };

  return (
    <div className={Styles.container}>
 
      <form onSubmit={handleSubmit} className={Styles.forms}>
        <FormField
        className={Styles.formElement}
        
          label="Name"
          
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <FormField
        className={Styles.formElement}
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Dropdown
        className={Styles.formElement}
          label="Area"
          name="area"
          options={areaOptions}
          value={formData.area}
          onChange={handleChange}
          error={errors.area}
        />
        <Dropdown
        className={Styles.formElement}
          label="Property Type"
          name="propertyType"
          options={propertyTypeOptions}
          value={formData.propertyType}
          onChange={handleChange}
          error={errors.propertyType}
        />
        <FormField
        className={Styles.formElement}
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
        <FormField
        className={Styles.formElement}
          label="Alternative Number"
          name="alternativeNumber"
          value={formData.alternativeNumber}
          onChange={handleChange}
          error={errors.alternativeNumber}
        /><div className={Styles.buttonParent}>
        <button className={Styles.button}type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Form;


