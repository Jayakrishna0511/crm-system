import React, { useState } from 'react';
import axios from 'axios';

const LeadForm = ({ close, refresh }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfContact: '',
    level: 'Hot',
    salesNotes: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/leads', form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      close();
      refresh();
    } catch (err) {
      alert('Validation failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="firstName" placeholder="First Name" onChange={handleChange} required />
      <input name="lastName" placeholder="Last Name" onChange={handleChange} required />
      <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
      <input name="dateOfContact" type="date" onChange={handleChange} required />
      <select name="level" onChange={handleChange}>
        <option value="Very Hot">Very Hot</option>
        <option value="Hot">Hot</option>
        <option value="Cold">Cold</option>
      </select>
      <textarea name="salesNotes" placeholder="Sales Notes" onChange={handleChange} required />
      <button type="submit">Submit</button>
      <button onClick={close}>Cancel</button>
    </form>
  );
};

export default LeadForm;
