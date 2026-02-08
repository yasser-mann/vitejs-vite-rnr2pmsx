import React, { useState, useEffect } from 'react';
import { supabase } from './clients';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // --- STATES DATA ---
  const [guides, setGuides] = useState<any[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<any>(null); // Pour gérer les Manuels
  const [manuals, setManuals] = useState<any[]>([]);

  // --- STATE: MODIFICATION CLIENT (NOUVEAU ✨) ---
  const [editingGuide, setEditingGuide] = useState<any>(null); // Le client qu'on modifie

  // --- STATE: NOUVEAU CLIENT ---
  const [newHost, setNewHost] = useState({
    name: '',
    slug: '',
    wifi: '',
    pass: '',
    phone: '',
  });

  // --- STATE: NOUVEAU MANUEL ---
  const [newManual, setNewManual] = useState({
    category: '',
    title: '',
    content: '',
  });

  // --- AUTH CHECK ---
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchGuides();
    });
  }, []);

  // --- FETCH GUIDES ---
  const fetchGuides = async () => {
    const { data } = await supabase
      .from('guides')
      .select('*')
      .order('id', { ascending: false });
    if (data) setGuides(data);
  };

  // --- FETCH MANUALS ---
  const fetchManuals = async (guideId: number) => {
    const { data } = await supabase
      .from('manuals')
      .select('*')
      .eq('guide_id', guideId)
      .order('id');
    if (data) setManuals(data);
  };

  // --- LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert('Error: ' + error.message);
    else {
      setSession(data.session);
      fetchGuides();
    }
    setLoading(false);
  };

  // --- 1. AJOUTER CLIENT ---
  const handleAddHost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHost.slug || !newHost.name) return alert('Slug & Name requis!');

    const { error } = await supabase.from('guides').insert([
      {
        slug: newHost.slug,
        hostName: newHost.name,
        wifiNetwork: newHost.wifi,
        wifiPassword: newHost.pass,
        hostPhone: newHost.phone,
        is_active: true,
      },
    ]);

    if (error) alert('Erreur: ' + error.message);
    else {
      alert('Client ajouté ! 🎉');
      setNewHost({ name: '', slug: '', wifi: '', pass: '', phone: '' });
      fetchGuides();
    }
  };

  // --- 2. MODIFIER CLIENT (NOUVEAU ✨) ---
  const handleUpdateGuide = async () => {
    if (!editingGuide) return;

    const { error } = await supabase
      .from('guides')
      .update({
        hostName: editingGuide.hostName,
        slug: editingGuide.slug,
        wifiNetwork: editingGuide.wifiNetwork,
        wifiPassword: editingGuide.wifiPassword,
        hostPhone: editingGuide.hostPhone,
        airbnbLink: editingGuide.airbnbLink, // Ajouté au cas où
      })
      .eq('id', editingGuide.id);

    if (error) {
      alert('Erreur update: ' + error.message);
    } else {
      alert('Infos mises à jour ! ✅');
      setEditingGuide(null); // Fermer le modal
      fetchGuides(); // Rafraîchir la liste
    }
  };

  // --- 3. AJOUTER MANUEL ---
  const handleAddManual = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGuide) return;

    const { error } = await supabase.from('manuals').insert([
      {
        guide_id: selectedGuide.id,
        category: newManual.category,
        title: newManual.title,
        content: newManual.content,
      },
    ]);

    if (error) alert(error.message);
    else {
      setNewManual({ category: '', title: '', content: '' });
      fetchManuals(selectedGuide.id);
    }
  };

  // --- DELETE MANUAL ---
  const handleDeleteManual = async (id: number) => {
    if (!confirm('Supprimer ce manuel ?')) return;
    const { error } = await supabase.from('manuals').delete().eq('id', id);
    if (!error && selectedGuide) fetchManuals(selectedGuide.id);
  };

  // =================================================================
  // VIEW: LOGIN
  // =================================================================
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Admin Login 🔒</h2>
          <input
            className="w-full p-3 border rounded mb-4"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 border rounded mb-6"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded font-bold"
          >
            {loading ? '...' : 'Entrer'}
          </button>
        </form>
      </div>
    );
  }

  // =================================================================
  // VIEW: EDITOR (MANUALS)
  // =================================================================
  if (selectedGuide) {
    return (
      <div className="p-8 max-w-4xl mx-auto font-sans bg-gray-50 min-h-screen">
        <button
          onClick={() => setSelectedGuide(null)}
          className="mb-4 flex items-center text-gray-600 hover:text-black font-bold"
        >
          ⬅️ Retour Dashboard
        </button>
        <h1 className="text-3xl font-bold mb-6">
          Contenu: {selectedGuide.hostName} 🏠
        </h1>
        
        {/* FORM MANUEL */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
          <h3 className="text-xl font-bold mb-4">➕ Ajouter Manuel</h3>
          <form
            onSubmit={handleAddManual}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              placeholder="Catégorie (ex: Cuisine)"
              className="p-3 border rounded bg-gray-50"
              value={newManual.category}
              onChange={(e) =>
                setNewManual({ ...newManual, category: e.target.value })
              }
            />
            <input
              placeholder="Titre (ex: Machine Café)"
              className="p-3 border rounded bg-gray-50"
              value={newManual.title}
              onChange={(e) =>
                setNewManual({ ...newManual, title: e.target.value })
              }
            />
            <input
              placeholder="Description..."
              className="p-3 border rounded bg-gray-50 md:col-span-3"
              value={newManual.content}
              onChange={(e) =>
                setNewManual({ ...newManual, content: e.target.value })
              }
            />
            <button className="bg-black text-white p-3 rounded font-bold md:col-span-3 hover:bg-gray-800">
              Enregistrer
            </button>
          </form>
        </div>

        {/* LISTE MANUELS */}
        <div className="space-y-4">
          {manuals.map((m) => (
            <div
              key={m.id}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center"
            >
              <div>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase">
                  {m.category}
                </span>
                <h4 className="font-bold mt-1 text-lg">{m.title}</h4>
                <p className="text-gray-600 text-sm">{m.content}</p>
              </div>
              <button
                onClick={() => handleDeleteManual(m.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded transition"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =================================================================
  // VIEW: DASHBOARD (LISTE CLIENTS)
  // =================================================================
  return (
    <div className="p-8 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Clients 🚀</h1>
        <button
          onClick={() => {
            supabase.auth.signOut();
            setSession(null);
          }}
          className="bg-red-100 text-red-600 px-4 py-2 rounded font-bold"
        >
          Déconnexion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 1. CREER CLIENT */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit border border-gray-100">
          <h2 className="text-xl font-bold mb-4">➕ Nouveau Client</h2>
          <form onSubmit={handleAddHost} className="space-y-3">
            <input
              className="w-full p-2 border rounded bg-gray-50"
              placeholder="Nom (ex: Dar Ahmed)"
              value={newHost.name}
              onChange={(e) => setNewHost({ ...newHost, name: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded bg-gray-50"
              placeholder="Slug (ex: dar-ahmed)"
              value={newHost.slug}
              onChange={(e) =>
                setNewHost({
                  ...newHost,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                })
              }
            />
            <div className="grid grid-cols-2 gap-2">
              <input
                className="p-2 border rounded bg-gray-50"
                placeholder="Wifi Name"
                value={newHost.wifi}
                onChange={(e) => setNewHost({ ...newHost, wifi: e.target.value })}
              />
              <input
                className="p-2 border rounded bg-gray-50"
                placeholder="Wifi Pass"
                value={newHost.pass}
                onChange={(e) => setNewHost({ ...newHost, pass: e.target.value })}
              />
            </div>
            <input
              className="w-full p-2 border rounded bg-gray-50"
              placeholder="Téléphone"
              value={newHost.phone}
              onChange={(e) => setNewHost({ ...newHost, phone: e.target.value })}
            />
            <button className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition">
              Créer Client
            </button>
          </form>
        </div>

        {/* 2. LISTE CLIENTS */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Client</th>
                <th className="p-4">Lien</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((g) => (
                <tr key={g.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-bold">{g.hostName}</div>
                    <div className="text-xs text-gray-400">{g.hostPhone}</div>
                  </td>
                  <td className="p-4 text-blue-500 text-sm">
                    <a href={`/guide/${g.slug}`} target="_blank" rel="noreferrer">
                      /guide/{g.slug}
                    </a>
                  </td>
                  <td className="p-4 text-center flex justify-center gap-2">
                    {/* BOUTON EDITER INFOS */}
                    <button
                      onClick={() => setEditingGuide(g)}
                      className="bg-gray-100 text-gray-600 px-3 py-2 rounded-lg font-bold text-xs hover:bg-gray-200 transition"
                      title="Modifier les infos"
                    >
                      ✏️ Infos
                    </button>
                    {/* BOUTON GERER CONTENU */}
                    <button
                      onClick={() => {
                        setSelectedGuide(g);
                        fetchManuals(g.id);
                      }}
                      className="bg-black text-white px-3 py-2 rounded-lg font-bold text-xs hover:bg-gray-800 transition"
                      title="Gérer les manuels"
                    >
                      ⚙️ Contenu
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL D'EDITION (POPUP) --- */}
      {editingGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold">Modifier: {editingGuide.hostName}</h3>
              <button
                onClick={() => setEditingGuide(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Nom du Client</label>
                <input
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  value={editingGuide.hostName}
                  onChange={(e) =>
                    setEditingGuide({ ...editingGuide, hostName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Slug (URL)</label>
                <input
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  value={editingGuide.slug}
                  onChange={(e) =>
                    setEditingGuide({ ...editingGuide, slug: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">WiFi Network</label>
                  <input
                    className="w-full p-3 border rounded-xl bg-gray-50"
                    value={editingGuide.wifiNetwork}
                    onChange={(e) =>
                      setEditingGuide({ ...editingGuide, wifiNetwork: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">WiFi Password</label>
                  <input
                    className="w-full p-3 border rounded-xl bg-gray-50"
                    value={editingGuide.wifiPassword}
                    onChange={(e) =>
                      setEditingGuide({ ...editingGuide, wifiPassword: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Téléphone Hôte</label>
                <input
                  className="w-full p-3 border rounded-xl bg-gray-50"
                  value={editingGuide.hostPhone}
                  onChange={(e) =>
                    setEditingGuide({ ...editingGuide, hostPhone: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleUpdateGuide}
                className="w-full bg-green-500 hover:bg-green-600 text-white p-4 rounded-xl font-bold text-lg shadow-lg transition-transform active:scale-95"
              >
                💾 Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}