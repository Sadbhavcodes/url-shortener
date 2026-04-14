import React, { useContext } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ThemeContext } from '../../context/ThemeContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <nav className="border-b border-gray-100 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 font-sans">
      <div className="max-w-[1400px] mx-auto px-6 h-[72px] flex items-center justify-between">
        
        {/* Brand */}
        <Link to="/" className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          ShortenFlow
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <NavLink to="/" className={({isActive}) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}>Dashboard</NavLink>
          <NavLink to="/analytics" className={({isActive}) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}>Analytics</NavLink>
          <NavLink to="/pricing" className={({isActive}) => `text-[13px] font-semibold transition-colors ${isActive ? 'text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'}`}>Pricing</NavLink>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-5 sm:gap-6">
          <button 
            onClick={toggleTheme}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors hidden sm:block"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          
          {user ? (
            <>
              <button 
                onClick={handleLogout}
                className="text-[13px] font-bold text-[#0e5ef5] hover:text-blue-700 transition-colors hidden sm:block"
              >
                Sign Out
              </button>

              <button className="bg-[#0e5ef5] hover:bg-blue-700 text-white text-[13px] font-bold px-5 py-2 rounded-full transition-all shadow-sm shadow-blue-500/20">
                Upgrade
              </button>

              {/* User Avatar */}
              <button 
                onClick={() => navigate('/account')}
                className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-gray-100/50 outline-none focus:ring-blue-500 transition-all ml-1"
              >
                <img 
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.username || 'User'}&backgroundColor=f4f7fe`} 
                  alt="User Avatar"
                  className="h-full w-full object-cover" 
                />
              </button>
            </>
          ) : (
            <Link to="/auth" className="bg-[#0e5ef5] hover:bg-blue-700 text-white text-[13px] font-bold px-5 py-2 rounded-full transition-all shadow-sm shadow-blue-500/20">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
