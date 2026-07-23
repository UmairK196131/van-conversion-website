import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Modal from '../components/Modal.jsx';
import ImageUpload from '../components/ImageUpload.jsx';
import { PageHeader, Button, Input, Textarea, Checkbox, Table } from '../components/ui.jsx';

const emptyForm = { clientName: '', quote: '', rating: 5, imageUrl: '', isActive: true };

export default function TestimonialsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    api.testimonials
      .list()
      .then(setItems)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEdit(item) {
    setForm({
      clientName: item.clientName,
      quote: item.quote,
      rating: item.rating,
      imageUrl: item.imageUrl || '',
      isActive: item.isActive,
    });
    setEditingId(item.id);
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.testimonials.update(editingId, form);
      } else {
        await api.testimonials.create(form);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Delete testimonial from "${item.clientName}"?`)) return;
    await api.testimonials.delete(item.id);
    load();
  }

  const columns = [
    { key: 'clientName', label: 'Client' },
    {
      key: 'rating',
      label: 'Rating',
      render: (row) => '★'.repeat(row.rating) + '☆'.repeat(5 - row.rating),
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (row.isActive ? 'Active' : 'Inactive'),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Testimonials"
        action={<Button onClick={openCreate}>Add Testimonial</Button>}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Testimonial' : 'New Testimonial'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Client Name"
            value={form.clientName}
            onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            required
          />
          <Textarea
            label="Quote"
            value={form.quote}
            onChange={(e) => setForm({ ...form, quote: e.target.value })}
            required
          />
          <Input
            label="Rating (1-5)"
            type="number"
            min={1}
            max={5}
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
          />
          <ImageUpload
            value={form.imageUrl}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
          />
          <Checkbox
            label="Active"
            checked={form.isActive}
            onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
