import { useState } from 'react';
import { api } from '../lib/api.js';

export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError('');
    try {
      const media = await api.uploadImage(file);
      onChange(media.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {value && (
        <img src={value} alt="Preview" className="w-32 h-32 object-cover rounded-lg mb-2" />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFile}
        disabled={uploading}
        className="text-sm"
      />
      {uploading && <p className="text-sm text-accent mt-1">Uploading...</p>}
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="text-sm text-red-600 mt-1 hover:underline"
        >
          Remove image
        </button>
      )}
    </div>
  );
}
