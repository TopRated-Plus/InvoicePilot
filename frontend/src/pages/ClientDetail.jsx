import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { auth } from '../firebase';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClient();
  }, [id]);

  const fetchClient = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/clients/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClient(res.data);
    } catch (error) {
      console.error('Error fetching client:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this client?')) return;
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/clients/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/clients');
    } catch (error) {
      setError('Failed to delete client');
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (date) => {
    if (!date) return '';
    const d = date._seconds
      ? new Date(date._seconds * 1000)
      : new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Client not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {client.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {client.email} · {client.phone}
          </p>
        </div>
        <Link
          to="/bills/new"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700">
          + New Bill
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Client Bills */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">
            Bills ({client.bills?.length || 0})
          </h2>
        </div>

        {!client.bills || client.bills.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500 text-sm mb-3">
              No bills for this client yet.
            </p>
            <Link
              to="/bills/new"
              className="text-green-600 text-sm hover:underline">
              Create first bill
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {client.bills.map(bill => (
              <Link
                key={bill.id}
                to={`/bills/${bill.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {bill.invoiceNumber}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Due {formatDate(bill.dueDate)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatAmount(bill.amount)}
                  </span>
                  <StatusBadge status={bill.status} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Delete client */}
      <button
        onClick={handleDelete}
        className="mt-6 text-sm text-red-500 hover:text-red-700">
        Delete this client
      </button>

    </div>
  );
}

export default ClientDetail;