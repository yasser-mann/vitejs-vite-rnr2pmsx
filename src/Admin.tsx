import React, { useState, useEffect } from 'react';
import { supabase } from './clients';

export default function Admin() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // --- STATES DYAL DATA ---
  const [guides, setGuides] = useState<any[]>([]);
  const [selectedGuide, setSelectedGuide] = useState<any>(null); // Bash n3rfu wash hna f Dashboard wla Editor
  const [manuals, setManuals] = useState<any[]>([]);

  // --- STATE: ZID CLIENT (HOST) ---
  const [newHost, setNewHost] = useState({
    name: '',
    slug: '',
    wifi: '',
    pass: '',
    phone: '',
  });

  // --- STATE: ZID MANUAL ---
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

  // --- FUNCTION 1: ZID HOST (CLIENT) ---
  const handleAddHost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHost.slug || !newHost.name) return alert('Slug & Name darouri!');

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

    if (error) {
      alert('Erreur: ' + error.message);
    } else {
      alert('Host Tzad! 🎉');
      setNewHost({ name: '', slug: '', wifi: '', pass: '', phone: '' }); // Khwi form
      fetchGuides(); // Refresh list
    }
  };

  // --- FUNCTION 2: ZID MANUAL (DETAILS) ---
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
    if (!confirm('Supprimer had l-manual?')) return;
    const { error } = await supabase.from('manuals').delete().eq('id', id);
    if (!error && selectedGuide) fetchManuals(selectedGuide.id);
  };

  // --- NAVIGATION ---
  const openEditor = (guide: any) => {
    setSelectedGuide(guide);
    fetchManuals(guide.id);
  };

  // =================================================================
  // VIEW 1: LOGIN
  // =================================================================
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Admin Login 🔒
          </h2>
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
  // VIEW 2: EDITOR MODE (MANUALS)
  // =================================================================
  if (selectedGuide) {
    return (
      <div className="p-8 max-w-4xl mx-auto font-sans bg-gray-50 min-h-screen">
        <button
          onClick={() => setSelectedGuide(null)}
          className="mb-4 flex items-center text-gray-600 hover:text-black font-bold"
        >
          ⬅️ Rej3 l Dashboard
        </button>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              Gérer: {selectedGuide.hostName} 🏠
            </h1>
            <p className="text-gray-500">
              Slug:{' '}
              <span className="font-mono text-blue-500">
                {selectedGuide.slug}
              </span>
            </p>
          </div>
        </div>

        {/* --- FORMULAIRE D ZYADA (MANUALS) --- */}
        <div className="bg-white p-6 rounded-2xl shadow-sm mb-8 border border-gray-100">
          <h3 className="text-xl font-bold mb-4">➕ Zid Manual Jdid</h3>
          <form
            onSubmit={handleAddManual}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              placeholder="Category (ex: Kitchen)"
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
              placeholder="Charh (Appuyez sur...)"
              className="p-3 border rounded bg-gray-50 md:col-span-3"
              value={newManual.content}
              onChange={(e) =>
                setNewManual({ ...newManual, content: e.target.value })
              }
            />
            <button className="bg-black text-white p-3 rounded font-bold md:col-span-3 hover:bg-gray-800">
              Enregistrer Manual
            </button>
          </form>
        </div>

        {/* --- LISTA D MANUALS --- */}
        <div className="space-y-4">
          <h3 className="font-bold text-gray-700">
            📋 Liste des Manuels ({manuals.length})
          </h3>
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
          {manuals.length === 0 && (
            <div className="text-center p-8 bg-gray-100 rounded-xl text-gray-500">
              Mazal ma kyn ta manual hna. Zid wahed l-foq! ☝️
            </div>
          )}
        </div>
      </div>
    );
  }

  // =================================================================
  // VIEW 3: DASHBOARD MODE (CLIENTS + ADD CLIENT)
  // =================================================================
  return (
    <div className="p-8 max-w-7xl mx-auto font-sans bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Clients 🚀</h1>
        <button
          onClick={() => {
            supabase.auth.signOut();
            setSession(null);
          }}
          className="bg-red-100 text-red-600 px-4 py-2 rounded font-bold"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* --- 1. FORMULAIRE ZID CLIENT (Hada rjje3nah!) --- */}
        <div className="bg-white p-6 rounded-2xl shadow-sm h-fit border border-gray-100">
          <h2 className="text-xl font-bold mb-4">➕ Zid Client Jdid</h2>
          <form onSubmit={handleAddHost} className="space-y-3">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Smya d Host
              </label>
              <input
                className="w-full p-2 border rounded bg-gray-50"
                placeholder="Ex: Dar Ahmed"
                value={newHost.name}
                onChange={(e) =>
                  setNewHost({ ...newHost, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">
                Slug (Lien URL)
              </label>
              <input
                className="w-full p-2 border rounded bg-gray-50"
                placeholder="Ex: dar-ahmed"
                value={newHost.slug}
                onChange={(e) =>
                  setNewHost({
                    ...newHost,
                    slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
                  })
                }
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="p-2 border rounded bg-gray-50"
                placeholder="Wifi Name"
                value={newHost.wifi}
                onChange={(e) =>
                  setNewHost({ ...newHost, wifi: e.target.value })
                }
              />
              <input
                className="p-2 border rounded bg-gray-50"
                placeholder="Wifi Pass"
                value={newHost.pass}
                onChange={(e) =>
                  setNewHost({ ...newHost, pass: e.target.value })
                }
              />
            </div>
            <input
              className="w-full p-2 border rounded bg-gray-50"
              placeholder="Téléphone"
              value={newHost.phone}
              onChange={(e) =>
                setNewHost({ ...newHost, phone: e.target.value })
              }
            />
            <button className="w-full bg-black text-white p-3 rounded-lg font-bold hover:bg-gray-800 transition">
              Enregistrer Client
            </button>
          </form>
        </div>

        {/* --- 2. LISTA D CLIENTS (TABLE) --- */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Lien</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {guides.map((g) => (
                <tr key={g.id} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-bold">{g.hostName}</td>
                  <td className="p-4 text-blue-500 text-sm">
                    <a
                      href={`/guide/${g.slug}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      /guide/{g.slug}
                    </a>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => openEditor(g)}
                      className="bg-black text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-800 transition shadow-sm"
                    >
                      Gérer / Edit ⚙️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
