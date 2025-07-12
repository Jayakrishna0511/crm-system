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
      const res = await axios.get('http://localhost:5000/api/leads', {
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
        await axios.put(`http://localhost:5000/api/leads/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('Lead updated successfully!');
      } else {
        await axios.post('http://localhost:5000/api/leads', formData, {
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
                await axios.delete(`http://localhost:5000/api/leads/${id}`, {
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
    <div className="bg-white border border-[#2772A0] p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <h3 className="text-xl font-bold text-[#2772A0]">Lead List</h3>
        <button
          onClick={() => {
            resetForm();
            setIsAdding(!isAdding);
          }}
          className="bg-[#2772A0] text-white px-4 py-2 rounded hover:bg-[#1f5a80]"
        >
          {isAdding ? 'Cancel' : 'Add New Lead'}
        </button>
      </div>

      {isAdding && (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="border p-2 rounded"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="border p-2 rounded"
          />
          <input
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="border p-2 rounded"
          />
          <input
            name="dateOfContact"
            type="date"
            value={formData.dateOfContact}
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="border p-2 rounded"
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
            className="border p-2 rounded sm:col-span-2"
          />
          <button
            type="submit"
            className="sm:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {editingId ? 'Update Lead' : 'Add Lead'}
          </button>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border">
          <thead className="bg-[#2772A0] text-white">
            <tr>
              <th className="p-2">First</th>
              <th className="p-2">Last</th>
              <th className="p-2">Age</th>
              <th className="p-2">Contact Date</th>
              <th className="p-2">Level</th>
              <th className="p-2">Notes</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{lead.firstName}</td>
                <td className="p-2">{lead.lastName}</td>
                <td className="p-2">{lead.age}</td>
                <td className="p-2">{lead.dateOfContact?.slice(0, 10)}</td>
                <td className="p-2">{lead.level}</td>
                <td className="p-2">{lead.salesNotes}</td>
                <td className="p-2 flex gap-2 flex-wrap">
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
