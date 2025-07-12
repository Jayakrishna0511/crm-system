import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ExternalData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAPIData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/external-data');
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

  if (loading) return <p className="text-gray-600">Loading external data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {users.map((user) => (
        <div key={user.id} className="bg-white border border-[#2772A0] p-4 rounded-lg shadow-md">
          <h4 className="text-lg font-semibold text-[#2772A0] mb-2">{user.name}</h4>
          <p className="text-sm text-gray-600">📧 {user.email}</p>
          <p className="text-sm text-gray-600">📍 {user.address.city}, {user.address.street}</p>
          <p className="text-sm text-gray-600">📞 {user.phone}</p>
          <p className="text-sm text-gray-600">💼 {user.company.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ExternalData;
