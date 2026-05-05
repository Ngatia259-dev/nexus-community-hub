import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Bell, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../context/PostContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { searchQuery, setSearchQuery } = usePosts();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
      <div className="container mx-auto h-full px-4 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-nexus-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">Nexus</span>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search posts, projects..."
              className="input pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => navigate('/posts')}
            />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/posts" className="text-slate-600 hover:text-nexus-500 font-medium">Feed</Link>
          <Link to="/network" className="text-slate-600 hover:text-nexus-500 font-medium">Network</Link>
          <Link to="/careers" className="text-slate-600 hover:text-nexus-500 font-medium">Careers</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden">
            <Search size={20} />
          </button>
          
          {user ? (
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <Link to={`/profile/${user.username}`} className="w-8 h-8 rounded-full overflow-hidden border border-slate-200">
                <img src={user.avatar} alt={user.name} />
              </Link>
            </div>
          ) : (
            <button onClick={() => logout()} className="btn btn-primary py-1.5 px-4 text-sm">
              Login
            </button>
          )}

          <button 
            className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 md:hidden p-4 space-y-4 shadow-xl">
          <nav className="flex flex-col gap-2">
            <Link to="/posts" className="p-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>Feed</Link>
            <Link to="/network" className="p-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>Network</Link>
            <Link to="/careers" className="p-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>Careers</Link>
            <Link to="/about" className="p-3 text-slate-700 hover:bg-slate-50 rounded-lg font-medium" onClick={() => setIsMenuOpen(false)}>About</Link>
          </nav>
          <div className="pt-4 border-t border-slate-100">
            {user ? (
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full btn btn-secondary">Logout</button>
            ) : (
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full btn btn-primary">Login</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
