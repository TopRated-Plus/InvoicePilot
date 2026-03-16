function StatusBadge({ status }) {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status] || styles.pending}`}>
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}

export default StatusBadge;