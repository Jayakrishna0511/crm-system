import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Sidebar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#2772A0] text-white p-2 rounded-lg shadow-lg"
      >
        {isOpen ? null  : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:relative
        w-64 min-h-screen bg-[#2772A0] text-white
        transition-transform duration-300 ease-in-out
        z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
      `}>
        <div className="p-4 md:p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-xl md:text-2xl font-bold p-4">CRM System</h2>
            <button
              onClick={closeSidebar}
              className="md:hidden text-white p-1"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-3 md:space-y-4">
            <a 
              href="/leads" 
              className="block hover:text-[#DCF763] py-2 px-3 rounded transition-colors duration-200 hover:bg-[#1f5a80]"
              onClick={closeSidebar}
            >
              Leads
            </a>
            <a 
              href="/external" 
              className="block hover:text-[#DCF763] py-2 px-3 rounded transition-colors duration-200 hover:bg-[#1f5a80]"
              onClick={closeSidebar}
            >
              External Data
            </a>
            
            {/* Logout Button */}
            <button 
              onClick={() => {
                onLogout();
                closeSidebar();
              }} 
              className="mt-8 md:mt-10 w-full text-left text-red-200 hover:text-red-400 py-2 px-3 rounded transition-colors duration-200 hover:bg-red-900 hover:bg-opacity-30"
            >
              Logout
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;