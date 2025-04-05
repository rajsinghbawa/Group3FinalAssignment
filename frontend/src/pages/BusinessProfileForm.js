import React, { useState } from 'react';
import API from '../api';

const BusinessProfileForm = () => {
  const [form, setForm] = useState({
    businessName: '',
    incorporationType: '',
    description: '',
    contactInfo: {
      email: '',
      phone: '',
      website: '',
      address: ''
    },
    offerings: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in form.contactInfo) {
      setForm({ ...form, contactInfo: { ...form.contactInfo, [name]: value } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...form,
      offerings: form.offerings.split(',').map(item => item.trim())
    };

    try {
      await API.post('/business/profile', dataToSend);
      alert('Business profile saved successfully!');
    } catch (err) {
      alert('Error saving profile.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-lg rounded-xl w-full max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Business Profile</h2>

        <input
          name="businessName"
          placeholder="Business Name"
          value={form.businessName}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <input
          name="incorporationType"
          placeholder="Incorporation Type (e.g., Corporation, Partnership)"
          value={form.incorporationType}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          rows="3"
        />

        <div className="grid grid-cols-2 gap-4">
          <input name="email" placeholder="Contact Email" value={form.contactInfo.email}
            onChange={handleChange} className="p-3 border rounded-lg" />
          <input name="phone" placeholder="Phone" value={form.contactInfo.phone}
            onChange={handleChange} className="p-3 border rounded-lg" />
          <input name="website" placeholder="Website" value={form.contactInfo.website}
            onChange={handleChange} className="p-3 border rounded-lg" />
          <input name="address" placeholder="Address" value={form.contactInfo.address}
            onChange={handleChange} className="p-3 border rounded-lg" />
        </div>

        <input
          name="offerings"
          placeholder="Offerings (comma separated, e.g., Consulting, Web Dev)"
          value={form.offerings}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default BusinessProfileForm;
