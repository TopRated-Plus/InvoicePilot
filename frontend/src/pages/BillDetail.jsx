import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import axios from 'axios';
import StatusBadge from '../components/StatusBadge';

function BillDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bill, setBill] = useState(null);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reminding, setReminding] = useState(false);
  const [marking, setMarking] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBill();
  }, [id]);

  const fetchBill = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const headers = { Authorization: `Bearer ${token}` };

      const [billRes, remindersRes] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/bills/${id}`,
          { headers }
        ),
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/reminders/${id}`,
          { headers }
        )
      ]);

      setBill(billRes.data);
      setReminders(remindersRes.data);
    } catch (error) {
      console.error('Error fetching bill:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkPaid = async () => {
    setMarking(true);
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bills/${id}/paid`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Bill marked as paid');
      fetchBill();
    } catch (error) {
      setMessage('Failed to mark as paid');
    } finally {
      setMarking(false);
    }
  };

  const handleRemind = async () => {
    setReminding(true);
    setMessage('');
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/bills/${id}/remind`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Reminder sent successfully');
      fetchBill();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to send reminder');
    } finally {
      setReminding(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete this bill?')) return;
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bills/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate('/bills');
    } catch (error) {
      setMessage('Failed to delete bill');
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
      month: 'long',
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

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Bill not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {bill.invoiceNumber}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {bill.clientName}
          </p>
        </div>
        <StatusBadge status={bill.status} />
      </div>

      {/* Message */}
      {message && (
        <div className={`text-sm p-3 rounded mb-4 ${
          message.includes('success') || message.includes('paid')
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-600'
        }`}>
          {message}
        </div>
      )}

      {/* Bill details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Amount</span>
            <span className="text-sm font-semibold text-gray-900">
              {formatAmount(bill.amount)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Description</span>
            <span className="text-sm text-gray-900">
              {bill.description}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Due Date</span>
            <span className="text-sm text-gray-900">
              {formatDate(bill.dueDate)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Client Email</span>
            <span className="text-sm text-gray-900">
              {bill.clientEmail}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Client Phone</span>
            <span className="text-sm text-gray-900">
              {bill.clientPhone}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Reminders Sent</span>
            <span className="text-sm text-gray-900">
              {bill.reminderCount} / 5
            </span>
          </div>
          {bill.paidAt && (
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Paid On</span>
              <span className="text-sm text-green-600 font-medium">
                {formatDate(bill.paidAt)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* UPI Link */}
      {bill.status !== 'paid' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
          <p className="text-xs text-green-700 font-medium mb-2">
            UPI Payment Link
          </p>
          <p className="text-xs text-green-600 break-all">
            {bill.upiLink}
          </p>
        </div>
      )}

      {/* Actions */}
      {bill.status !== 'paid' && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleRemind}
            disabled={reminding || bill.reminderCount >= 5}
            className="flex-1 border border-gray-300 text-gray-700 py-2 rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50">
            {reminding ? 'Sending...' : `Send Reminder (${bill.reminderCount}/5)`}
          </button>
          <button
            onClick={handleMarkPaid}
            disabled={marking}
            className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700 disabled:opacity-50">
            {marking ? 'Updating...' : 'Mark as Paid'}
          </button>
        </div>
      )}

      {/* Reminder Log */}
      <div className="bg-white border border-gray-200 rounded-lg">
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-900">
            Reminder History
          </h2>
        </div>
        {reminders.length === 0 ? (
          <p className="text-sm text-gray-500 p-4">
            No reminders sent yet
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {reminders.map(r => (
              <div key={r.id} className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-700 capitalize">
                    {r.type}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    r.status === 'sent'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {r.status}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {r.message}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {formatDate(r.sentAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete */}
      <button
        onClick={handleDelete}
        className="mt-4 text-sm text-red-500 hover:text-red-700">
        Delete this bill
      </button>

    </div>
  );
}

export default BillDetail;