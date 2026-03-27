import React, { useState } from 'react';
import { Link2 } from 'lucide-react';
import { useUrl } from '../hooks/useUrl';

export default function Home() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const { shorten, loading, error } = useUrl();

  const handleShorten = async (e) => {
    e.preventDefault();
    setShortUrl('');
    
    if (!url) return;

    try {
      const result = await shorten(url);
      setShortUrl(result);
      setUrl('');
    } catch (err) {
      // Error is handled in hook
    }
  };

  return (
    <div className="flex-1 flex flex-col font-sans w-full max-w-[1400px] mx-auto px-6">
      <div className="flex-1 flex flex-col items-center justify-center -mt-10 sm:-mt-20">
        
        {/* Texts */}
        <div className="text-center max-w-2xl mb-12">
          <h1 className="text-4xl sm:text-[56px] font-extrabold text-[#1a1c29] leading-[1.1] tracking-tight mb-6">
            The URLArchitect. <span className="text-[#0e5ef5]">Fluid.</span> Fast. Precise.
          </h1>
          <p className="text-[15px] sm:text-[17px] text-gray-500 font-medium">
            Transform your long, rigid links into beautiful, trackable assets. Built for the modern architect of the web.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleShorten} className="w-full max-w-3xl relative">
          <div className="relative flex items-center bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-gray-100 p-2 pl-7">
            <Link2 className="w-[22px] h-[22px] text-gray-300 pointer-events-none" />
            <input 
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste your long architectural URL here..."
              className="flex-1 bg-transparent border-none outline-none py-4 px-4 text-gray-700 font-semibold sm:text-[15px] placeholder:text-gray-400 placeholder:font-medium"
              required
            />
            <button 
              type="submit" 
              disabled={loading}
              className="bg-[#0e5ef5] hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-8 sm:px-10 rounded-full transition-all shadow-md shadow-blue-500/20 flex items-center justify-center min-w-[140px]"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                'Shorten'
              )}
            </button>
          </div>
          
          {error && <p className="text-red-500 text-[13px] font-semibold mt-6 text-center">{error}</p>}
          
          {shortUrl && (
            <div className="mt-8 mx-auto max-w-md p-4 bg-white/80 backdrop-blur-md rounded-2xl ring-1 ring-green-500/20 text-center flex flex-col items-center justify-center gap-2 shadow-lg shadow-green-500/5 transition-all">
              <span className="text-[11px] font-bold text-green-600 tracking-wider uppercase">Successfully created</span>
              <a href={`http://${shortUrl}`} target="_blank" rel="noreferrer" className="text-[17px] font-extrabold text-[#0e5ef5] hover:underline">
                {shortUrl}
              </a>
            </div>
          )}
        </form>

      </div>
    </div>
  );
}
