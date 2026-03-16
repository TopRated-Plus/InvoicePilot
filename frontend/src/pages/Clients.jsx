import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import axios from 'axios';

function Clients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/clients`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClients(res.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
        <Link
          to="/clients/new"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700">
          + New Client
        </Link>
      </div>

      {/* Clients list */}
      {clients.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            No clients yet.
          </p>
          <Link
            to="/clients/new"
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
            Add First Client
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
          {clients.map(client => (
            <Link
              key={client.id}
              to={`/clients/${client.id}`}
              className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {client.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {client.email} · {client.phone}
                </p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}

export default Clients;