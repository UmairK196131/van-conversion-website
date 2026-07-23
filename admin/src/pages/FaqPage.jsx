import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Modal from '../components/Modal.jsx';
import { PageHeader, Button, Input, Textarea, Table } from '../components/ui.jsx';

const emptyForm = { question: '', answer: '', category: '', sortOrder: 0 };

export default function FaqPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    api.faq
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
      question: item.question,
      answer: item.answer,
      category: item.category || '',
      sortOrder: item.sortOrder,
    });
    setEditingId(item.id);
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.faq.update(editingId, form);
      } else {
        await api.faq.create(form);
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
    if (!confirm(`Delete this FAQ item?`)) return;
    await api.faq.delete(item.id);
    load();
  }

  const columns = [
    { key: 'question', label: 'Question' },
    { key: 'category', label: 'Category', render: (row) => row.category || '—' },
    { key: 'sortOrder', label: 'Order' },
  ];

  return (
    <div>
      <PageHeader title="FAQ" action={<Button onClick={openCreate}>Add FAQ Item</Button>} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit FAQ' : 'New FAQ Item'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Question"
            value={form.question}
            onChange={(e) => setForm({ ...form, question: e.target.value })}
            required
          />
          <Textarea
            label="Answer"
            value={form.answer}
            onChange={(e) => setForm({ ...form, answer: e.target.value })}
            required
          />
          <Input
            label="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <Input
            label="Sort Order"
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })}
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
