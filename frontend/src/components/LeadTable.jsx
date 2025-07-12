

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const defaultLead = {
  firstName: '',
  lastName: '',
  age: '',
  dateOfContact: '',
  level: 'Hot',
  salesNotes: '',
};

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [formData, setFormData] = useState(defaultLead);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem('token');

  const fetchLeads = async () => {
    try {
      const res = await axios.get('https://crm-system-vk24.onrender.com/api/leads', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeads(res.data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(`https://crm-system-vk24.onrender.com/api/leads/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Lead updated successfully!');
      } else {
        await axios.post('https://crm-system-vk24.onrender.com/api/leads', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Lead added successfully!');
      }

      resetForm();
      fetchLeads();
    } catch (err) {
      toast.error('Error submitting lead. Please check your inputs.');
      console.error('Submit error:', err);
    }
  };

  const handleEdit = (lead) => {
    setFormData(lead);
    setEditingId(lead._id);
    setIsAdding(true);
  };

  const handleDelete = (id) => {
    toast.custom((t) => (
      <div className="bg-white shadow-md border-l-4 border-red-500 px-4 py-3 rounded-md flex flex-col space-y-3 w-full max-w-xs">
        <p className="text-sm text-gray-800 font-medium">Are you sure you want to delete this lead?</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={async () => {
              toast.dismiss(t.id);
              try {
                await axios.delete(`https://crm-system-vk24.onrender.com/api/leads/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                toast.success('Lead deleted successfully!');
                fetchLeads();
              } catch (err) {
                toast.error('Error deleting lead.');
                console.error('Delete error:', err);
              }
            }}
            className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-xs hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  const resetForm = () => {
    setFormData(defaultLead);
    setEditingId(null);
    setIsAdding(false);
  };

  return (
    <div className="bg-white border border-[#2772A0] p-4 md:p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h3 className="text-lg md:text-xl font-bold text-[#2772A0]">Lead List</h3>
        <button
          onClick={() => {
            resetForm();
            setIsAdding(!isAdding);
          }}
          className="bg-[#2772A0] text-white px-3 py-2 md:px-4 md:py-2 rounded hover:bg-[#1f5a80] text-sm md:text-base whitespace-nowrap"
        >
          {isAdding ? 'Cancel' : 'Add New Lead'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-6">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded text-sm md:text-base"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded text-sm md:text-base"
          />
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border p-2 rounded text-sm md:text-base"
          />
          <input
            name="dateOfContact"
            type="date"
            value={formData.dateOfContact}
            onChange={handleChange}
            className="border p-2 rounded text-sm md:text-base"
          />
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="border p-2 rounded text-sm md:text-base"
          >
            <option>Very Hot</option>
            <option>Hot</option>
            <option>Cold</option>
          </select>
          <input
            name="salesNotes"
            value={formData.salesNotes}
            onChange={handleChange}
            placeholder="Sales Notes"
            className="border p-2 rounded md:col-span-2 text-sm md:text-base"
          />
          <button
            type="submit"
            className="md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm md:text-base"
          >
            {editingId ? 'Update Lead' : 'Add Lead'}
          </button>
        </form>
      )}

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {leads.map((lead) => (
          <div key={lead._id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-semibold text-[#2772A0] text-base">
                  {lead.firstName} {lead.lastName}
                </h4>
                <p className="text-sm text-gray-600">Age: {lead.age}</p>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                lead.level === 'Very Hot' ? 'bg-red-100 text-red-800' :
                lead.level === 'Hot' ? 'bg-orange-100 text-orange-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {lead.level}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Contact:</span> {lead.dateOfContact?.slice(0, 10)}</p>
              <p><span className="font-medium">Notes:</span> {lead.salesNotes || 'No notes'}</p>
            </div>
            
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleEdit(lead)}
                className="flex-1 bg-blue-100 text-blue-700 px-3 py-2 rounded text-sm hover:bg-blue-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(lead._id)}
                className="flex-1 bg-red-100 text-red-700 px-3 py-2 rounded text-sm hover:bg-red-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-[#2772A0] text-white">
            <tr>
              <th className="p-3">First</th>
              <th className="p-3">Last</th>
              <th className="p-3">Age</th>
              <th className="p-3">Contact Date</th>
              <th className="p-3">Level</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{lead.firstName}</td>
                <td className="p-3">{lead.lastName}</td>
                <td className="p-3">{lead.age}</td>
                <td className="p-3">{lead.dateOfContact?.slice(0, 10)}</td>
                <td className="p-3">{lead.level}</td>
                <td className="p-3 max-w-xs truncate">{lead.salesNotes}</td>
                <td className="p-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleEdit(lead)}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs hover:bg-blue-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs hover:bg-red-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadTable;