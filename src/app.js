import React, { useState, useEffect } from 'react';
import { BarChart3, Users, Globe, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function App() {
  const [stats, setStats] = useState({ total_views: 0, top_pages: [] });
  const siteId = "mon-site-demo"; // ID de test

  useEffect(() => {
    // Connexion directe à ton API FastAPI sur ton VPS OVH
    fetch(`http://vps-3902a53c.vps.ovh.net:8001/api/stats/${siteId}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch((err) => {
        console.warn("Impossible de joindre l'API VPS, utilisation des données de secours", err);
        // Données de secours si le VPS est temporairement injoignable (ex: CORS ou hors réseau)
        setStats({
          total_views: 1,
          top_pages: [
            { path: "/accueil", count: 1 }
          ]
        });
      });
  }, []);

  return (
    <div className="min-h-screen p-6 md:p-12">
      <header className="flex justify-between items-center mb-10 pb-6 border-b border-[#1A1A1A]/10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">ASHIATO</h1>
          <p className="text-sm text-[#8C8C8C]">足跡 • Web Analytics & Interaction</p>
        </div>
        <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-full border border-[#1A1A1A]/10 text-xs font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>RGPD Conforme • Souverain</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-[#1A1A1A]/10 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-[#8C8C8C]">Vues Totales (Traces)</span>
            <Users className="w-5 h-5 text-[#E8A598]" />
          </div>
          <div className="text-3xl font-bold font-serif-jp">{stats.total_views}</div>
          <div className="text-xs text-emerald-600 mt-2 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> Données en direct du VPS
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-[#1A1A1A]/10 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-[#8C8C8C]">Visiteurs Uniques</span>
            <Globe className="w-5 h-5 text-[#E8A598]" />
          </div>
          <div className="text-3xl font-bold font-serif-jp">-</div>
          <div className="text-xs text-[#8C8C8C] mt-2">Calcul en cours</div>
        </div>

        <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-[#1A1A1A]/10 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-[#8C8C8C]">Taux de Rebond</span>
            <BarChart3 className="w-5 h-5 text-[#E8A598]" />
          </div>
          <div className="text-3xl font-bold font-serif-jp">-</div>
          <div className="text-xs text-[#8C8C8C] mt-2">Optimal</div>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur p-6 rounded-2xl border border-[#1A1A1A]/10 shadow-sm">
        <h3 className="text-lg font-bold mb-4 font-serif-jp">Pages les plus visitées</h3>
        <div className="space-y-3">
          {stats.top_pages && stats.top_pages.length > 0 ? (
            stats.top_pages.map((p, idx) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 text-sm">
                <span className="font-mono text-gray-700">{p.path}</span>
                <span className="font-semibold bg-[#F4F1EA] px-3 py-1 rounded-full text-xs">{p.count} vues</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-[#8C8C8C]">Aucune trace enregistrée pour le moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}