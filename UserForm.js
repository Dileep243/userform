import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Country, State } from 'country-state-city';

import './UserForm.css';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        fatherName: '',
        motherName: '',
        dob: '',
        gender: 'Male',
        mobileNumber: '',
        emailId: '',
        country: '',
        state: '',
    });

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [submissionStatus, setSubmissionStatus] = useState("");

    // Fetch countries on mount
    useEffect(() => {
        const countryList = Country.getAllCountries();
        setCountries(countryList);
    }, []);

    // Fetch states when the selected country changes
    useEffect(() => {
        if (formData.country) {
            const stateList = State.getStatesOfCountry(formData.country);
            setStates(stateList);
        }
    }, [formData.country]);

    // Handle form inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/add-user', formData)
            .then(() => {
                setSubmissionStatus("Form submitted successfully!");

                // Clear message after 4 seconds
                setTimeout(() => setSubmissionStatus(""), 4000);
            })
            .catch((error) => {
                console.error(error);
                setSubmissionStatus("Error submitting the form.");
            });
    };

    return (
        <div className="form-container">
            <h1>Personal Details Form</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        pattern="[A-Za-z\s]*"
                        required
                    />
                </div>
                <div>
                    <label>Father's Name:</label>
                    <input
                        type="text"
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleChange}
                        pattern="[A-Za-z\s]*"
                        required
                    />
                </div>
                <div>
                    <label>Mother's Name:</label>
                    <input
                        type="text"
                        name="motherName"
                        value={formData.motherName}
                        onChange={handleChange}
                        pattern="[A-Za-z\s]*"
                        required
                    />
                </div>
                <div>
                    <label>Date of Birth:</label>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <div>
                    <label>Mobile Number:</label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        pattern="[0-9]{10}"
                        maxLength="10"
                        required
                    />
                </div>
                <div>
                    <label>Email ID:</label>
                    <input
                        type="email"
                        name="emailId"
                        value={formData.emailId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Country:</label>
                    <select name="country" value={formData.country} onChange={handleChange} required>
                        <option value="">Select Country</option>
                        {countries.map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>
                                {country.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>State:</label>
                    <select name="state" value={formData.state} onChange={handleChange} required>
                        <option value="">Select State</option>
                        {states.map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>
                                {state.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Submit</button>
                {submissionStatus && <p className="submission-status">{submissionStatus}</p>}
            </form>
        </div>
    );
};

export default UserForm;
