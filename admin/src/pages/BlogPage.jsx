import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Modal from '../components/Modal.jsx';
import ImageUpload from '../components/ImageUpload.jsx';
import RichTextEditor from '../components/RichTextEditor.jsx';
import { PageHeader, Button, Input, Textarea, Checkbox, Table } from '../components/ui.jsx';

const emptyForm = { title: '', content: '', excerpt: '', coverImage: '', isPublished: false };

export default function BlogPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    api.blog
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
      content: item.content,
      excerpt: item.excerpt || '',
      coverImage: item.coverImage || '',
      isPublished: item.isPublished,
    });
    setEditingId(item.id);
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.blog.update(editingId, form);
      } else {
        await api.blog.create(form);
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
    await api.blog.delete(item.id);
    load();
  }

  const columns = [
    { key: 'title', label: 'Title' },
    {
      key: 'isPublished',
      label: 'Status',
      render: (row) => (
        <span className={row.isPublished ? 'text-green-600' : 'text-gray-400'}>
          {row.isPublished ? 'Published' : 'Draft'}
        </span>
      ),
    },
    {
      key: 'publishedAt',
      label: 'Published',
      render: (row) => (row.publishedAt ? new Date(row.publishedAt).toLocaleDateString() : '—'),
    },
  ];

  return (
    <div>
      <PageHeader title="Blog Posts" action={<Button onClick={openCreate}>New Post</Button>} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Post' : 'New Post'}
      >
        <form onSubmit={handleSave} className="space-y-4">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <Textarea
            label="Excerpt"
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
          <ImageUpload
            label="Cover Image"
            value={form.coverImage}
            onChange={(url) => setForm({ ...form, coverImage: url })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(html) => setForm({ ...form, content: html })}
            />
          </div>
          <Checkbox
            label="Published"
            checked={form.isPublished}
            onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
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
