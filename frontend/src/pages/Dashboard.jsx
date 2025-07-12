import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Sidebar from '../components/sidebar';
import ExternalData from '../components/ExternalData';
import LeadTable from '../components/LeadTable';

const Dashboard = () => {
  const [leads, setLeads] = useState([]);

  const fetchLeads = async () => {
    try {
      const res = await axios.get('https://crm-system-vk24.onrender.com/api/leads', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setLeads(res.data);
    } catch (err) {
      console.error('Failed to fetch leads:', err.response?.data || err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logged out successfully!');
    setTimeout(() => {
      window.location.href = '/login';
    }, 1000);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="flex bg-[#CCDDEA] min-h-screen">
      <Sidebar onLogout={handleLogout} />

     
      <main className="flex-1 w-full md:w-auto">
        
        <div className="pt-16 md:pt-0 p-4 md:p-6 space-y-6 md:space-y-10">
          <section id="leads">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2772A0] mb-4">
              Lead Management
            </h2>
            <LeadTable />
          </section>

          <section id="external">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2772A0] mb-4">
              External API Data
            </h2>
            <ExternalData />
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;