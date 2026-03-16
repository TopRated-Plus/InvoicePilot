import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/bills`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBills(res.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
    } finally {
      setLoading(false);
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

  const filteredBills = bills.filter(bill => {
    if (filter === 'all') return true;
    return bill.status === filter;
  });

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
        <h1 className="text-2xl font-bold text-gray-900">Bills</h1>
        <Link
          to="/bills/new"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700">
          + New Bill
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'overdue', 'paid'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded text-sm font-medium capitalize
              ${filter === f
                ? 'bg-green-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
              }`}>
            {f}
          </button>
        ))}
      </div>

      {/* Bills list */}
      {filteredBills.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500 text-sm mb-4">
            No bills found.
          </p>
          <Link
            to="/bills/new"
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700">
            Create First Bill
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
          {filteredBills.map(bill => (
            <Link
              key={bill.id}
              to={`/bills/${bill.id}`}
              className="flex items-center justify-between p-4 hover:bg-gray-50">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {bill.clientName}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {bill.invoiceNumber} · Due {formatDate(bill.dueDate)}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-semibold text-gray-900">
                  {formatAmount(bill.amount)}
                </p>
                <StatusBadge status={bill.status} />
              </div>
            </Link>
          ))}
        </div>
      )}

    </div>
  );
}

export default Bills;