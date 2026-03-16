import { useState, useEffect } from 'react';
import { auth } from '../firebase';
import axios from 'axios';

function Settings() {
  const [form, setForm] = useState({
    name: '',
    businessName: '',
    phone: '',
    upiId: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setForm({
        name: res.data.name || '',
        businessName: res.data.businessName || '',
        phone: res.data.phone || '',
        upiId: res.data.upiId || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setSaving(true);

    try {
      const token = await auth.currentUser.getIdToken();
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('Settings saved successfully');
    } catch (error) {
      setMessage('Failed to save settings');
    } finally {
      setSaving(false);
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
    <div className="max-w-2xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Settings
        </h1>
        <p className="text-gray-500 text-sm mt-1">
          Update your business profile
        </p>
      </div>

      {message && (
        <div className={`text-sm p-3 rounded mb-4 ${
          message.includes('success')
            ? 'bg-green-50 text-green-700'
            : 'bg-red-50 text-red-600'
        }`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-900">
            Business Details
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
            />
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <p className="text-sm font-semibold text-gray-900">
            Payment Settings
          </p>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              UPI ID
            </label>
            <input
              type="text"
              name="upiId"
              value={form.upiId}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500"
              placeholder="yourname@okaxis"
            />
            <p className="text-xs text-gray-400 mt-1">
              All payment reminders will include this UPI ID
            </p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-sm font-semibold text-gray-900 mb-1">
            Account
          </p>
          <p className="text-sm text-gray-500">
            {auth.currentUser?.email}
          </p>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Settings'}
        </button>

      </form>

    </div>
  );
}

export default Settings;