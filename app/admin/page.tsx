"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Stats {
  totalWishes: number;
  totalAttendingRSVPs: number;
  totalDeclinedRSVPs: number;
  totalGuests: number;
}

interface Wish {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface RSVP {
  id: string;
  name: string;
  phone: string | null;
  isAttending: boolean;
  guestsCount: number;
  note: string | null;
  createdAt: string;
}

export default function AdminDashboard() {
  const [token, setToken] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [stats, setStats] = useState<Stats | null>(null);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);

  // Check storage on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      fetchData(savedToken);
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    await fetchData(token);
  }

  async function fetchData(authToken: string) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      
      if (!res.ok) {
        throw new Error("Mật khẩu không đúng");
      }
      
      const resData = await res.json();
      setStats(resData.data.stats);
      setWishes(resData.data.wishes);
      setRsvps(resData.data.rsvps);
      setIsAuthenticated(true);
      sessionStorage.setItem("adminToken", authToken);
    } catch {
      setError("Mật khẩu không đúng hoặc máy chủ lỗi.");
      setIsAuthenticated(false);
      sessionStorage.removeItem("adminToken");
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("adminToken");
    setIsAuthenticated(false);
    setToken("");
  }

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-serif text-primary mb-2">Quản Trị Lễ Cưới</h1>
            <p className="text-sm text-slate-500">Vui lòng nhập mật khẩu để tiếp tục</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password"
              placeholder="Nhập mật khẩu..."
              value={token}
              onChange={e => setToken(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <button
              type="submit"
              disabled={loading || !token.trim()}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-all disabled:opacity-50"
            >
              {loading ? "Đang xác thực..." : "Đăng Nhập"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-serif text-primary font-bold">Dashboard Cưới</h1>
            <p className="text-xs text-slate-500">Quản lý khách mời và lời chúc</p>
          </div>
          <button 
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors border border-red-200"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* STATS BANNERS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Đồng ý tham dự (Vé)"
            value={stats?.totalAttendingRSVPs ?? 0}
            desc="Lượt xác nhận Có tham gia"
            color="bg-green-500"
          />
          <StatCard 
            title="TỔNG SỐ KHÁCH"
            value={stats?.totalGuests ?? 0}
            desc="Gồm cả người đi cùng"
            color="bg-primary"
          />
          <StatCard 
            title="Sẽ vắng mặt (Cáo lỗi)"
            value={stats?.totalDeclinedRSVPs ?? 0}
            desc="Lượt xác nhận KHÔNG đi"
            color="bg-red-500"
          />
          <StatCard 
            title="Tổng lời chúc"
            value={stats?.totalWishes ?? 0}
            desc="Sổ lưu bút"
            color="bg-accent"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* RSVP TABLE */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50">
              <h2 className="text-lg font-semibold text-slate-800">Danh Sách Tham Dự (RSVP)</h2>
            </div>
            <div className="overflow-x-auto max-h-[600px]">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 font-medium">Tên khách</th>
                    <th className="px-6 py-3 font-medium text-center">Tình trạng</th>
                    <th className="px-6 py-3 font-medium text-center">Số Lượng</th>
                    <th className="px-6 py-3 font-medium">Điện thoại / Ghi chú</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rsvps.map(r => (
                    <tr key={r.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">{r.name}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-xs font-medium",
                          r.isAttending ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                          {r.isAttending ? "Sẽ đến" : "Vắng mặt"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-semibold text-slate-700">
                        {r.isAttending ? r.guestsCount : "-"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xs text-slate-500">{r.phone || "—"}</div>
                        {r.note && <div className="text-xs text-slate-700 mt-1 italic whitespace-pre-wrap truncate max-w-[200px]" title={r.note}>{r.note}</div>}
                      </td>
                    </tr>
                  ))}
                  {rsvps.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">Chưa có ai xác nhận tham dự.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* WISHES BOX */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            <div className="px-6 py-5 border-b border-slate-200 bg-slate-50 flex-shrink-0">
              <h2 className="text-lg font-semibold text-slate-800">Sổ Lưu Bút</h2>
            </div>
            <div className="overflow-y-auto max-h-[600px] p-6 space-y-6">
              {wishes.map(w => (
                <div key={w.id} className="border-l-4 border-primary/30 pl-4 py-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-slate-900">{w.name}</p>
                    <time className="text-xs text-slate-400">
                      {new Date(w.createdAt).toLocaleDateString('vi-VN')}
                    </time>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed italic">&ldquo;{w.content}&rdquo;</p>
                </div>
              ))}
              {wishes.length === 0 && (
                <p className="text-center text-slate-500 italic py-12">Chưa có lời chúc nào.</p>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// Helper Component
function StatCard({ title, value, desc, color }: { title: string, value: number, desc: string, color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-shadow">
      <div className={cn("absolute top-0 right-0 w-2 h-full opacity-80", color)} />
      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{title}</p>
      <div className="flex items-baseline gap-2">
        <h3 className="text-4xl font-black text-slate-800">{value}</h3>
      </div>
      <p className="text-xs text-slate-400 mt-3 font-medium bg-slate-50 inline-block px-2 py-1 rounded">{desc}</p>
    </div>
  );
}
