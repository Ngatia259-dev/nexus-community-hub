import React, { useEffect } from 'react';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRight, Users, Briefcase, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const { posts, fetchPosts, loading } = usePosts();
  const { user } = useAuth();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-sm">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            The nexus for <span className="text-nexus-500">developers</span> to build, connect, and grow.
          </h1>
          <p className="mt-6 text-xl text-slate-600 leading-relaxed">
            A community hub blending networking, project building, and career opportunities for the next generation of tech talent.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/posts/create" className="btn btn-primary px-8 py-3 text-lg">
              Start a Discussion
            </Link>
            <Link to="/network" className="btn btn-secondary px-8 py-3 text-lg">
              Grow Your Network
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6 flex flex-col items-start gap-4">
          <div className="p-3 bg-nexus-50 rounded-lg text-nexus-600">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-xl font-bold">Networking</h3>
          <p className="text-slate-600">Share knowledge, ask questions, and collaborate on projects with peers.</p>
        </div>
        <div className="card p-6 flex flex-col items-start gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <Users size={24} />
          </div>
          <h3 className="text-xl font-bold">Community</h3>
          <p className="text-slate-600">Connect with developers globally and find your next project partner.</p>
        </div>
        <div className="card p-6 flex flex-col items-start gap-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
            <Briefcase size={24} />
          </div>
          <h3 className="text-xl font-bold">Careers</h3>
          <p className="text-slate-600">Explore hand-picked opportunities and take the next step in your career.</p>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Discussions</h2>
          <Link to="/posts" className="text-nexus-600 font-medium flex items-center gap-1 hover:underline">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {posts.slice(0, 3).map(post => (
              <Link key={post.id} to={`/posts/${post.id}`} className="card p-6 hover:border-nexus-300 transition-colors block">
                <div className="flex items-center gap-2 mb-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full" />
                  <span className="text-sm font-medium text-slate-700">{post.author.name}</span>
                  <span className="text-xs text-slate-400">• {post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-nexus-600">{post.title}</h3>
                <p className="mt-2 text-slate-600 line-clamp-2">{post.body}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-slate-500">
                  <span>{post.likes} likes</span>
                  <span>{Math.floor(Math.random() * 20)} comments</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
