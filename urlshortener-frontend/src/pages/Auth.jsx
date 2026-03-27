import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login({ username, password });
      } else {
        await signup({ username, password });
      }
      navigate('/'); // Redirect to dashboard on success
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 pt-12 pb-20 w-full h-full font-sans">
      
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-[#1a1c29] tracking-tight">ShortenFlow</h1>
        <p className="text-gray-500 mt-2 text-sm font-medium">Precision architecture for every link.</p>
      </div>

      {/* Card */}
      <div className="bg-white/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 w-full max-w-[420px] mb-8">
        
        {/* Toggle */}
        <div className="flex bg-slate-50/80 p-1.5 rounded-full mb-8 border border-gray-100">
          <button 
            type="button"
            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all ${isLogin ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setIsLogin(true); setError(''); }}
          >
            Login
          </button>
          <button 
            type="button"
            className={`flex-1 py-2.5 text-sm font-semibold rounded-full transition-all ${!isLogin ? 'bg-white text-blue-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => { setIsLogin(false); setError(''); }}
          >
            Signup
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-3 bg-red-50/80 border border-red-100 rounded-xl flex items-center gap-2 text-red-600 text-xs font-semibold">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase ml-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="architect_42" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-transparent outline-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder:text-gray-400 text-gray-900"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-gray-500 tracking-[0.15em] uppercase">Password</label>
              {isLogin && <button type="button" className="text-[10px] font-bold text-blue-600 hover:text-blue-700">FORGOT?</button>}
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-slate-50 border-transparent outline-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 transition-all font-medium placeholder:text-gray-400 text-gray-900"
              />
              <button 
                type="button" 
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 bg-[#0e5ef5] hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-all shadow-md shadow-blue-500/20 flex justify-center items-center"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              isLogin ? 'Continue to Dashboard' : 'Create Account'
            )}
          </button>


        </form>
      </div>

      <p className="text-xs font-semibold text-gray-500 pb-4">
        New to the flow? <a href="#" className="text-[#0e5ef5] hover:text-blue-700 transition-colors">Explore our architecture first.</a>
      </p>
    </div>
  );
}
