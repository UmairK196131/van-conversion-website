import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { PageHeader } from '../components/ui.jsx';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getDashboard()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  const cards = [
    { label: 'Total Inquiries', value: stats.totalInquiries, color: 'bg-accent' },
    { label: 'New Inquiries', value: stats.newInquiries, color: 'bg-orange-500' },
    { label: 'Active Services', value: stats.activeServices, color: 'bg-green-500' },
  ];

  return (
    <div>
      <PageHeader title="Dashboard" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border p-6">
            <p className="text-sm text-gray-500 mb-1">{card.label}</p>
            <p className="text-3xl font-bold text-primary">{card.value}</p>
            <div className={`w-12 h-1 ${card.color} rounded mt-3`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-primary mb-4">Recent Blog Posts</h2>
          {stats.recentPosts.length === 0 ? (
            <p className="text-gray-400 text-sm">No blog posts yet</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentPosts.map((post) => (
                <li key={post.id} className="flex items-center justify-between text-sm">
                  <span>{post.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${post.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                  >
                    {post.isPublished ? 'Published' : 'Draft'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-xl border p-6">
          <h2 className="font-semibold text-primary mb-4">Recent Activity</h2>
          {stats.recentActivity.length === 0 ? (
            <p className="text-gray-400 text-sm">No activity yet</p>
          ) : (
            <ul className="space-y-3">
              {stats.recentActivity.map((log) => (
                <li key={log.id} className="text-sm">
                  <span className="font-medium">{log.action}</span>
                  <span className="text-gray-500"> on {log.entity}</span>
                  <p className="text-xs text-gray-400">
                    {log.user.email} &middot; {new Date(log.createdAt).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
