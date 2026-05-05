import React from 'react';
import { Link } from 'react-router-dom';
import { GitHub, Twitter, LinkedIn } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-nexus-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">N</span>
              </div>
              <span className="text-lg font-bold">Nexus</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs">
              Empowering developers to reach their full potential through connection and collaboration.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/posts" className="hover:text-nexus-500">Discussions</Link></li>
              <li><Link to="/network" className="hover:text-nexus-500">Members</Link></li>
              <li><Link to="/about" className="hover:text-nexus-500">Guidelines</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><Link to="/careers" className="hover:text-nexus-500">Jobs</Link></li>
              <li><Link to="/about" className="hover:text-nexus-500">About Us</Link></li>
              <li><Link to="/about" className="hover:text-nexus-500">Support</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 mb-4">Social</h4>
            <div className="flex gap-4">
              <a href="#" className="text-slate-400 hover:text-nexus-500"><GitHub size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-nexus-500"><Twitter size={20} /></a>
              <a href="#" className="text-slate-400 hover:text-nexus-500"><LinkedIn size={20} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 Nexus Community Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
