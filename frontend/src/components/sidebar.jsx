import React from 'react';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="w-64 min-h-screen bg-[#2772A0] text-white p-6 space-y-6">
      <h2 className="text-2xl font-bold">CRM System</h2>
      <nav className="space-y-4">
        <a href="#leads" className="block hover:text-[#DCF763]">Leads</a>
        <a href="#external" className="block hover:text-[#DCF763]">External Data</a>
        <button onClick={onLogout} className="mt-10 w-full text-left text-red-200 hover:text-red-400">
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
