import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Mail,
  MapPin,
  Phone,
  Building2
} from 'lucide-react';

const ExternalData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAPIData = async () => {
      try {
        const res = await axios.get('https://crm-system-vk24.onrender.com/api/external-data');
        setUsers(res.data);
      } catch (err) {
        console.error('External API error:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchAPIData();
  }, []);

  if (loading) return <p className="text-gray-600 text-center py-8">Loading external data...</p>;
  if (error) return <p className="text-red-500 text-center py-8">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {users.map((user) => (
        <div 
          key={user.id} 
          className="bg-white border border-[#2772A0] p-4 md:p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <h4 className="text-lg md:text-xl font-semibold text-[#2772A0] mb-3 line-clamp-2">
            {user.name}
          </h4>

          <div className="space-y-2 md:space-y-3">
            <div className="flex items-start gap-2 text-sm md:text-base text-gray-600">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="break-all">{user.email}</span>
            </div>

            <div className="flex items-start gap-2 text-sm md:text-base text-gray-600">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="break-words">
                {user.address.city}, {user.address.street}
              </span>
            </div>

            <div className="flex items-start gap-2 text-sm md:text-base text-gray-600">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="break-all">{user.phone}</span>
            </div>

            <div className="flex items-start gap-2 text-sm md:text-base text-gray-600">
              <Building2 className="w-4 h-4 md:w-5 md:h-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <span className="break-words font-medium">
                {user.company.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExternalData;