import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import axios from 'axios';

function Dashboard() {
  const [bills, setBills] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [billsRes, userRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/bills`, { headers }),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/me`, { headers })
      ]);

      setBills(billsRes.data);
      setUser(userRes.data);
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats
  const totalBills = bills.length;
  const paidBills = bills.filter(b => b.status === 'paid').length;
  const pendingBills = bills.filter(b => b.status === 'pending').length;
  const overdueBills = bills.filter(b => b.status === 'overdue').length;

  const totalAmount = bills.reduce((sum, b) => sum + b.amount, 0);
  const collectedAmount = bills
    .filter(b => b.status === 'paid')
    .reduce((sum, b) => sum + b.amount, 0);
  const pendingAmount = bills
    .filter(b => b.status !== 'paid')
    .reduce((sum, b) => sum + b.amount, 0);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome, {user?.name}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {user?.businessName}
          </p>
        </div>
        <Link
          to="/bills/new"
          className="bg-green-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-green-700">
          + New Bill
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Total Bills</p>
          <p className="text-2xl font-bold text-gray-900">{totalBills}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Collected</p>
          <p className="text-2xl font-bold text-green-600">
            {formatAmount(collectedAmount)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {formatAmount(pendingAmount)}
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Overdue</p>
          <p className="text-2xl font-bold text-red-600">{overdueBills}</p>
        </div>
      </div>

      {/* Recent Bills */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold text-gray-900">Recent Bills</h2>
          <Link
            to="/bills"
            className="text-sm text-green-600 hover:underline">
            View all
          </Link>
        </div>

        {bills.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 text-sm mb-4"></p>