import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Modal from '../components/Modal.jsx';
import { PageHeader, Button, Select } from '../components/ui.jsx';

const STATUS_OPTIONS = ['', 'NEW', 'RESPONDED', 'ARCHIVED'];

const statusColors = {
  NEW: 'bg-blue-100 text-blue-700',
  RESPONDED: 'bg-green-100 text-green-700',
  ARCHIVED: 'bg-gray-100 text-gray-500',
};

export default function InquiriesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  function load(status = filter) {
    setLoading(true);
    api.inquiries
      .list(status || undefined)
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, [filter]);

  async function handleStatusChange(status) {
    setUpdating(true);
    try {
      const updated = await api.inquiries.updateStatus(selected.id, status);
      setSelected(updated);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div>
      <PageHeader title="Inquiries" />

      <div className="mb-4">
        <Select label="Filter by status" value={filter} onChange={(e) => setFilter(e.target.value)}>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s || 'All'}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Email</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Service</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="text-right px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-400">
                    No inquiries found
                  </td>
                </tr>
              )}
              {items.map((row) => (
                <tr key={row.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">{row.service}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${statusColors[row.status]}`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => setSelected(row)}
                      className="text-accent hover:underline text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Inquiry Details">
        {selected && (
          <div className="space-y-4">
            <Detail label="Name" value={selected.name} />
            <Detail label="Email" value={selected.email} />
            <Detail label="Phone" value={selected.phone || '—'} />
            <Detail label="Vehicle Model" value={selected.vehicleModel || '—'} />
            <Detail label="Service" value={selected.service} />
            <Detail label="Budget" value={selected.budget || '—'} />
            <Detail label="Message" value={selected.message} />
            <Detail label="Submitted" value={new Date(selected.createdAt).toLocaleString()} />

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Update Status</p>
              <div className="flex gap-2">
                {['NEW', 'RESPONDED', 'ARCHIVED'].map((status) => (
                  <Button
                    key={status}
                    variant={selected.status === status ? 'primary' : 'secondary'}
                    onClick={() => handleStatusChange(status)}
                    disabled={updating || selected.status === status}
                  >
                    {status}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 uppercase">{label}</p>
      <p className="text-sm mt-0.5">{value}</p>
    </div>
  );
}
