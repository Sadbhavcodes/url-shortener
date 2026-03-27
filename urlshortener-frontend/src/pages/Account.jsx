import React, { useEffect, useState } from 'react';
import { Copy, BarChart2, Trash2, Filter, Search } from 'lucide-react';
import { getUserUrls, deleteUrl } from '../services/urlService';
import { useAuth } from '../hooks/useAuth';

export default function Account() {
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback initial data for visual presentation if user has no links yet
  const [hasLoadedMock, setHasLoadedMock] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await getUserUrls(user?.id);
      if(data) {
        const mappedData = data.map(link => ({
          id: link.shortCode,
          shortUrl: `localhost:5173/${link.shortCode}`,
          originalUrl: link.originalUrl,
          timeAgo: link.createdAt ? new Date(link.createdAt).toLocaleDateString() : 'N/A',
          clicks: link.clicks
        }));
        setLinks(mappedData);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (shortCode) => {
    try {
      await deleteUrl(shortCode);
      setLinks(prev => prev.filter(link => link.id !== shortCode));
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(`http://${shortUrl}`);
  };

  // Prepare profile data conditionally
  const username = user?.username || 'Guest Architect';
  const email = user ? `${user.username}@architect.io` : 'guest@shortenflow.io';
  const totalLinks = links.length;
  const totalClicks = links.reduce((acc, curr) => acc + (parseInt(curr.clicks) || 0), 0) || 0;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 w-full font-sans">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
        
        {/* Left Column: Profile */}
        <div className="lg:col-span-4 xl:col-span-3 space-y-6">
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.5rem] p-8 flex flex-col items-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.02)] ring-1 ring-gray-100/50">
            <div className="w-28 h-28 rounded-full bg-[#1b2030] flex items-center justify-center p-3 mb-5 shadow-xl shadow-gray-200/50 ring-[6px] ring-white">
               <img 
                 src={`https://api.dicebear.com/7.x/notionists/svg?seed=${username}&backgroundColor=transparent`} 
                 alt="Avatar" 
                 className="w-full h-full rounded-full object-cover scale-110 translate-y-2"
               />
            </div>
            <h2 className="text-[20px] font-extrabold text-gray-900 mb-1 tracking-tight">{username}</h2>
            <p className="text-[12px] font-medium text-gray-500 mb-8">{email}</p>
            
            <div className="flex w-full gap-3">
              <div className="flex-1 bg-white rounded-[1.5rem] py-5 flex flex-col items-center justify-center shadow-sm ring-1 ring-gray-50">
                <span className="text-[24px] font-extrabold text-[#0e5ef5] leading-none mb-1.5 tracking-tight">{totalLinks}</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">Links</span>
              </div>
              <div className="flex-1 bg-white rounded-[1.5rem] py-5 flex flex-col items-center justify-center shadow-sm ring-1 ring-gray-50">
                <span className="text-[24px] font-extrabold text-[#0e5ef5] leading-none mb-1.5 tracking-tight">{totalClicks}</span>
                <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">Clicks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: History */}
        <div className="lg:col-span-8 xl:col-span-9">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 px-2">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Link History</h1>
              <p className="text-[14px] text-gray-500 font-medium mt-1.5">Manage and track your transformed URLs.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="h-10 w-10 bg-[#eff2f9] hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 transition-colors">
                <Filter className="w-4 h-4" />
              </button>
              <button className="h-10 w-10 bg-[#eff2f9] hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-700 transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {loading ? (
               <div className="py-12 flex justify-center"><p className="text-gray-400 text-sm font-semibold animate-pulse">Loading links...</p></div>
            ) : links.length === 0 ? (
               <div className="py-16 flex flex-col items-center justify-center text-center bg-white/50 rounded-3xl ring-1 ring-gray-100">
                  <p className="text-gray-500 font-semibold">You haven't shortened any links yet.</p>
                  <p className="text-sm text-gray-400 mt-2">Go to the dashboard to create your first link.</p>
               </div>
            ) : (
              links.map((link) => (
                <div key={link.id} className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:px-8 sm:py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between shadow-[0_4px_20px_rgb(0,0,0,0.015)] ring-1 ring-gray-100/80 hover:shadow-md transition-all gap-5 overflow-hidden">
                  
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[15px] font-extrabold text-[#0e5ef5] truncate tracking-tight">{link.shortUrl}</h3>
                      <button onClick={() => handleCopy(link.shortUrl)} className="text-gray-300 hover:text-gray-500 transition-colors" title="Copy shortened URL">
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[12px] text-gray-500 font-medium truncate mb-3" title={link.originalUrl}>{link.originalUrl}</p>
                    <p className="text-[9px] font-extrabold text-gray-400 tracking-widest uppercase">{link.timeAgo}</p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 sm:gap-8 shrink-0 border-t sm:border-0 border-gray-100 pt-4 sm:pt-0">
                    <div className="flex flex-col items-center justify-center min-w-[60px] text-center">
                      <span className="text-[17px] font-extrabold text-gray-900">{link.clicks}</span>
                      <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase mt-0.5">Clicks</span>
                    </div>
                    
                    <div className="flex items-center gap-1 sm:gap-2 text-gray-500">
                      <button className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
                        <BarChart2 className="w-[18px] h-[18px] stroke-[2.5]" />
                      </button>
                      <button onClick={() => handleDelete(link.id)} className="p-2.5 bg-red-50 hover:bg-red-100 rounded-xl transition-colors text-[#ab2b1e]">
                        <Trash2 className="w-[18px] h-[18px] stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {links.length > 0 && (
            <button className="w-full mt-6 py-4 rounded-full border-2 border-dashed border-[#cdd4e8] text-gray-600 font-bold text-[13px] hover:border-[#aebcd8] hover:bg-white/50 transition-all tracking-wide">
              Load Older Links
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
