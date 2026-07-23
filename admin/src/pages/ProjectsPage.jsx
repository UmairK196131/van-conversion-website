import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import Modal from '../components/Modal.jsx';
import ImageUpload from '../components/ImageUpload.jsx';
import { PageHeader, Button, Input, Textarea, Checkbox, Table } from '../components/ui.jsx';

const emptyForm = {
  title: '',
  description: '',
  vehicleModel: '',
  beforeImage: '',
  afterImage: '',
  gallery: [],
  isFeatured: false,
};

export default function ProjectsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    api.projects
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
      vehicleModel: item.vehicleModel,
      beforeImage: item.beforeImage || '',
      afterImage: item.afterImage || '',
      gallery: item.gallery || [],
      isFeatured: item.isFeatured,
    });
    setEditingId(item.id);
    setModalOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.projects.update(editingId, form);
      } else {
        await api.projects.create(form);
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
    await api.projects.delete(item.id);
    load();
  }

  function addGalleryImage(url) {
    setForm({ ...form, gallery: [...form.gallery, url] });
  }

  function removeGalleryImage(index) {
    setForm({ ...form, gallery: form.gallery.filter((_, i) => i !== index) });
  }

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'vehicleModel', label: 'Vehicle' },
    {
      key: 'isFeatured',
      label: 'Featured',
      render: (row) => (row.isFeatured ? 'Yes' : 'No'),
    },
  ];

  return (
    <div>
      <PageHeader title="Projects" action={<Button onClick={openCreate}>Add Project</Button>} />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <Table columns={columns} data={items} onEdit={openEdit} onDelete={handleDelete} />
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Project' : 'New Project'}
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
          <Input
            label="Vehicle Model"
            value={form.vehicleModel}
            onChange={(e) => setForm({ ...form, vehicleModel: e.target.value })}
            required
          />
          <ImageUpload
            label="Before Image"
            value={form.beforeImage}
            onChange={(url) => setForm({ ...form, beforeImage: url })}
          />
          <ImageUpload
            label="After Image"
            value={form.afterImage}
            onChange={(url) => setForm({ ...form, afterImage: url })}
          />
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Gallery</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {form.gallery.map((url, i) => (
                <div key={i} className="relative">
                  <img src={url} alt="" className="w-20 h-20 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(i)}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            <GalleryUploader onUpload={addGalleryImage} />
          </div>
          <Checkbox
            label="Featured"
            checked={form.isFeatured}
            onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
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

function GalleryUploader({ onUpload }) {
  const [uploading, setUploading] = useState(false);

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const media = await api.uploadImage(file);
      onUpload(media.url);
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFile}
      disabled={uploading}
      className="text-sm"
    />
  );
}
