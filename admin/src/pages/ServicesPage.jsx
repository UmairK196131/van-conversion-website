import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Modal from '../components/Modal.jsx';
import ImageUpload from '../components/ImageUpload.jsx';
import { PageHeader, Button, Input, Textarea, Checkbox, Table } from '../components/ui.jsx';

const emptyForm = { title: '', description: '', imageUrl: '', sortOrder: 0, isActive: true };

export default function ServicesPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    api.services
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
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl || '',
      sortOrder: item.sortOrder,
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
        await api.services.update(editingId, form);
      } else {
        await api.services.create(form);
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
    if (!confirm(`Delete "${item.title}"?`)) return;
    await api.services.delete(item.id);
    load();
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'sortOrder', label: 'Order' },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (
        <span className={row.isActive ? 'text-green-600' : 'text-gray-400'}>
          {row.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Services" action={<Button onClick={openCreate}>Add Service</Button>} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Service' : 'New Service'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
          />
          <ImageUpload
            value={form.imageUrl}
            onChange={(url) => setForm({ ...form, imageUrl: url })}
          />
          <Input
            label="Sort Order"
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
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
