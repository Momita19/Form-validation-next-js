"use client";
import React, { useState } from 'react';
import FormField from './FormField';
import Dropdown from './Dropdown';
import Checkbox from './Checkbox';

import Styles from './form.module.css'

const areaOptions = ["Miyapur", "Kukatpally", "Nizampet", "Chanda Nagar", "Lingampally", "Patancheru", "Pragathi Nagar", "KPHB", "Bachupally", "Beeramguda", "Manikonda", "Banjara Hills", "Jubilee Hills", "Gowliguda", "Kothaguda", "Kondapur", "Gachibowli", "Madhapur", "Attapur", "Shaikpet", "Panjagutta", "Ameerpet", "SR Nagar", "Erragadda", "Tolichowki", "Mehidipatnam", "Secunderabad", "Tirumalagiri", "Abids", "Koti", "Khairtabad", "Nampally", "Lakdikapul", "Charminar", "Uppal", "Malakpet", "Dilsukhnagar", "LB Nagar", "Vanastalipuram", "Golconda", "Suchitra", "Shamshabad", "Mallapur", "Habsiguda", "Shamirpet", "Quthbullapur", "Afzalgunj", "Alwal", "Amberpet", "Bahadurpura", "Basheerbagh", "Charlapally", "ECIL", "Himayat Nagar", "Jagadgirigutta", "Jeedimetla", "Kachiguda", "Kothapet", "Nagole", "Bowenpally", "RTC X Road"]; // Replace with your area options

const propertyTypeOptions = ["1BHk", "2BHK", "3BHK", "4BHK", "Individual House", "Villa", "CommercialProperty"]; // Replace with your property type options

const Form = () => {

  const [formData, setFormData] = useState({
    name: '',
    employeeCode: '',
    appartmentName: '',
    area: '',
    propertyType: '',
    flatNo: '',
    address: '',
    phoneNumber: '',
    alternativeNumber: '',
    locationPin: '',
    option1: false, // Initialize checkboxes to false
    option2: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox input differently
    const newValue = type === 'checkbox' ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateEmpCode = (employeeCode) => {
    const numericRegex = /^[0-9]+$/;

    if (!numericRegex.test(employeeCode)) {
      return 'Only numeric values are allowed.';
    }
    return
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneNumberError = validatePhoneNumber(formData.phoneNumber);
    const alternativeNumberError = validatePhoneNumber(formData.alternativeNumber);
    const nameError = validateTextInput(formData.name);
    const employeeError = validateEmpCode(formData.employeeCode);
    const flatNoError = validateTextInput(formData.flatNo);
    const locationPinError = validateEmpCode(formData.locationPin);
    const appartmentError = validateTextInput(formData.appartmentName);
    const updatedFormData = {
      ...formData,
      option1: formData.option1 || false,
      option2: formData.option2 || false,
    };
    setFormData(updatedFormData);
    setErrors({
      phoneNumber: phoneNumberError,
      alternativeNumber: alternativeNumberError,
      name: nameError,
      employeeCode: employeeError,
      flatNo: flatNoError,
      locationPin: locationPinError,
      appartmentName: appartmentError
    });

    if (
      phoneNumberError ||
      alternativeNumberError ||
      nameError ||
      employeeError ||
      appartmentError ||
      flatNoError ||
      locationPinError
    ) {
      // Validation failed, do not submit
      return;
    }

    try {
      const response = await fetch('/app/api/submit.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify(updateformData), // Send FormData with the image
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Server response:', data);
        // Optionally, reset the form fields here
        setFormData({
          name: '',
          employeeCode: '',
          appartmentName: '',
          area: '',
          propertyType: '',
          flatNo: '',
          address: '',
          phoneNumber: '',
          alternativeNumber: '',
          locationPin: '',
          option1: false, // Reset checkboxes to false
          option2: false,
        });
        setErrors({}); // Clear any previous errors
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    // setSelectedImage(null); // Clear the selected image
    console.log('Form data submitted:', updatedFormData);
  };

  return (
    <div className={Styles.container}>
      <form onSubmit={handleSubmit} className={Styles.forms}>
        <h1 id="title" className={Styles.text}>Field Property Information</h1>

        <FormField
          className={Styles.formElement}
          placeholder='Enter your name'
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />
        <div className={Styles.formElement} id="checkbox">
          <div className={Styles.checkboxGroup}>
            <Checkbox
              name="option1"
              label="Rent"
              checked={formData.option1}
              onChange={handleChange}
            />
            <Checkbox
              name="option2"
              label="Sale"
              checked={formData.option2}
              onChange={handleChange}
            />
          </div>
        </div>
        <FormField
          className={Styles.formElement}
          placeholder='Enter your Employee code'
          label="Employee code"
          name="employeeCode"
          value={formData.employeeCode}
          onChange={handleChange}
          error={errors.employeeCode}
        />
        <FormField
          className={Styles.formElement}
          placeholder='Enter your appartment name'
          label="Appartment Name"
          name="appartmentName"
          value={formData.appartmentName}
          onChange={handleChange}
          error={errors.appartmentName}
        />
        <FormField
          className={Styles.formElement}
          placeholder='Enter your address'
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />
        <Dropdown
          className={Styles.formElement}
          placeholder='Select your Area'
          label="Area"
          name="area"
          options={areaOptions}
          value={formData.area}
          onChange={handleChange}
          error={errors.area}
        />
        <Dropdown
          className={Styles.formElement}
          placeholder='Select your Property type'
          label="Property Type"
          name="propertyType"
          options={propertyTypeOptions}
          value={formData.propertyType}
          onChange={handleChange}
          error={errors.propertyType}
        />
        <FormField
          className={Styles.formElement}
          placeholder='Enter your Phone no'
          label="Phone Number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
        <FormField
          className={Styles.formElement}
          placeholder='Enter your Alternative no'
          label="Alternative Number"
          name="alternativeNumber"
          value={formData.alternativeNumber}
          onChange={handleChange}
          error={errors.alternativeNumber}
        />
        <FormField
          className={Styles.formElement}
          placeholder='Enter your location pin'
          label="Location Pin"
          name="locationPin"
          value={formData.locationPin}
          onChange={handleChange}
          error={errors.locationPin}
        />
        {/* <FormField
          className={Styles.formElement}
          label="Image"
          name="image"
          type="file" // Set the input type to file
          onChange={handleImageChange} // Handle file input changes
          error={errors.image}
        /> */}
        {/* Display a preview of the selected image if available */}
{/* {selectedImage && (
  <div className={Styles.imagePreview}>
    <img src={URL.createObjectURL(selectedImage)} alt="Selected" />
  </div>
)} */}
        {/* <div className={Styles.buttonParent}>
          <button className={Styles.button} type="submit">Submit</button>
        </div> */}
        <div className={Styles.buttonParent}>
          <button className={`${Styles.button} ${Styles.buttonAnimated}`} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;


