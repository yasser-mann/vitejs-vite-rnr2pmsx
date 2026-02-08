import React from 'react';
import { Link } from 'react-router-dom';
import heroImg from './assets/hero.png'; // On utilise ton image existante

const Home = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-900 font-sans">
      
      {/* 1. BACKGROUND IMAGE AVEC OVERLAY */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImg} 
          alt="Background" 
          className="w-full h-full object-cover opacity-40 scale-105" 
        />
        {/* Dégradé pour rendre le texte lisible */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      </div>

      {/* 2. CONTENU PRINCIPAL */}
      <div className="relative z-10 text-center px-4 max-w-3xl animate-fade-in">
        <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
          Digital Guidebook Platform
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
          L'expérience invité <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
            réinventée.
          </span>
        </h1>
        
        <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
          Créez des livrets d'accueil numériques magnifiques pour vos voyageurs Airbnb. 
          Partagez le WiFi, les codes d'accès et vos meilleures adresses en un clic.
        </p>

        {/* 3. BOUTONS D'ACTION */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Bouton Principal : Admin */}
          <Link
            to="/admin"
            className="group relative px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg shadow-2xl shadow-blue-900/20 transition-all hover:scale-105 hover:shadow-white/20 flex items-center gap-3"
          >
            <span>🔐 Espace Propriétaire</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>

          {/* Bouton Secondaire : Démo (Optionnel, pointe vers un slug exemple) */}
           <span className="text-slate-500 text-sm font-medium mt-4 sm:mt-0 sm:ml-4">
            ou essayez <Link to="/guide/demo" className="text-blue-400 hover:text-blue-300 underline">une démo</Link>
          </span>
        </div>
      </div>

      {/* 4. FOOTER DISCRET */}
      <div className="absolute bottom-8 text-slate-600 text-xs font-bold tracking-widest uppercase z-10">
        © 2026 Your Brand • Made with ❤️ in Morocco
      </div>
    </div>
  );
};

export default Home;