import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Hash, Info } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="space-y-8">
      {/* About Section */}
      <section className="card p-6">
        <div className="flex items-center gap-2 mb-4 text-nexus-600">
          <Info size={20} />
          <h3 className="font-bold">About Nexus</h3>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          Nexus is a community-driven platform for developers to share projects, find jobs, and build meaningful connections in tech.
        </p>
        <Link to="/about" className="mt-4 block text-sm font-medium text-nexus-600 hover:underline">
          Learn more
        </Link>
      </section>

      {/* Trending Tags */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-slate-900">
          <Hash size={20} />
          <h3 className="font-bold">Trending Topics</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {['react', 'node', 'mongodb', 'careers', 'vite', 'tailwindcss'].map(tag => (
            <Link 
              key={tag} 
              to={`/posts?tag=${tag}`}
              className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 hover:border-nexus-300 hover:text-nexus-600 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Posts Mini List */}
      <section>
        <div className="flex items-center gap-2 mb-4 text-slate-900">
          <TrendingUp size={20} />
          <h3 className="font-bold">Popular Now</h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Link key={i} to="/posts" className="block group">
              <h4 className="text-sm font-medium text-slate-800 group-hover:text-nexus-600 line-clamp-2">
                How I built a full-stack community hub in 12 weeks...
              </h4>
              <span className="text-xs text-slate-400">42 comments • 120 likes</span>
            </Link>
          ))}
        </div>
      </section>
    </aside>
  );
};

export default Sidebar;
