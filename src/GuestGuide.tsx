import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom'; // <--- Zidna hadi
import {
  translations as configTranslations,
  Icons,
  type Language,
  type Recommendation,
  type GuideData,
} from './config';
import ImageCarousel from './components/ImageCarousel';
import { supabase } from './clients'; // T2kked anna clients.ts kayna

// --- 1. SETUP TRANSLATIONS ---
const extendedTranslations = {
  en: {
    ...configTranslations.en,
    catMustVisit: 'Must Visit',
    catFood: 'Food',
    catSightseeing: 'Sightseeing',
    catNightlife: 'Nightlife',
  },
  fr: {
    ...configTranslations.fr,
    catMustVisit: 'Incontournable',
    catFood: 'Gastronomie',
    catSightseeing: 'Tourisme',
    catNightlife: 'Vie Nocturne',
  },
  es: {
    ...configTranslations.es,
    catMustVisit: 'Imprescindible',
    catFood: 'Gastronomía',
    catSightseeing: 'Turismo',
    catNightlife: 'Vida Nocturna',
  },
};

const getCategoryLabel = (
  category: string,
  t: typeof extendedTranslations.en
) => {
  const map: Record<string, string> = {
    'Must Visit': t.catMustVisit,
    Food: t.catFood,
    Sightseeing: t.catSightseeing,
    Nightlife: t.catNightlife,
  };
  return map[category] || category;
};

// --- SHARED COMPONENTS ---
interface MenuButtonProps {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  bg: string;
  border: string;
  text: string;
  className?: string;
}
const MenuButton: React.FC<MenuButtonProps> = ({
  onClick,
  icon,
  label,
  bg,
  border,
  text,
  className,
}) => (
  <button
    onClick={onClick}
    className={`group ${bg} border ${border} p-4 rounded-[24px] flex flex-col items-center justify-center gap-2 aspect-square shadow-sm hover:shadow-md active:scale-95 transition-all ${
      className || ''
    }`}
  >
    <div
      className={`bg-white ${text} p-3 rounded-2xl transition-transform group-hover:scale-110 flex items-center justify-center w-14 h-14 shadow-sm`}
    >
      {icon}
    </div>
    <span className="text-sm font-bold text-gray-800">{label}</span>
  </button>
);

interface LangSwitcherProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
}
const LangSwitcher: React.FC<LangSwitcherProps> = ({
  currentLang,
  setLang,
}) => (
  <div className="flex bg-gray-100 p-1 rounded-full w-fit mx-auto mb-2">
    {(['en', 'fr', 'es'] as Language[]).map((lang) => (
      <button
        key={lang}
        onClick={() => setLang(lang)}
        className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-all ${
          currentLang === lang
            ? 'bg-white text-gray-900 shadow-sm'
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        {lang}
      </button>
    ))}
  </div>
);

// --- VIEWS ---
interface ViewProps {
  onBack: () => void;
  t: any;
}
interface LocalViewProps extends ViewProps {
  onSelect: (item: Recommendation) => void;
  activeData: GuideData;
}
interface DetailViewProps {
  item: Recommendation;
  onBack: () => void;
  t: any;
}

const DetailView: React.FC<DetailViewProps> = ({ item, onBack, t }) => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
      <div className="relative h-72 w-full flex-shrink-0">
        <ImageCarousel images={item.images} className="h-full" />
        <div className="absolute top-4 left-4 z-30 pt-safe">
          <button
            onClick={onBack}
            className="p-3 bg-black/20 backdrop-blur-md border border-white/10 rounded-full text-white active:scale-90 transition-all hover:bg-black/40"
          >
            <Icons.ArrowLeft />
          </button>
        </div>
        <div className="absolute bottom-0 left-0 p-6 text-white w-full z-20 pointer-events-none bg-gradient-to-t from-black/60 to-transparent">
          <span className="inline-block px-3 py-1 bg-green-500 rounded-lg text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm">
            {getCategoryLabel(item.category, t)}
          </span>
          <h1 className="text-3xl font-bold leading-tight shadow-sm drop-shadow-lg">
            {item.title}
          </h1>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 pb-32">
        <div className="flex items-center gap-6 mb-8 text-sm text-gray-500 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">
              <Icons.Star />
            </span>
            <span className="font-bold text-gray-900">4.9</span> {t.ratings}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500">
              <Icons.Map />
            </span>
            <span className="font-bold text-gray-900">5 min</span> {t.walk}
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-3">{t.aboutPlace}</h3>
        <p className="text-gray-600 leading-relaxed text-lg">{item.desc}</p>
      </div>
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 pb-safe-offset">
        <a
          href={item.mapLink}
          target="_blank"
          className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all hover:bg-gray-800"
        >
          <Icons.Map /> {t.viewMap}
        </a>
      </div>
    </div>
  );
};

const LocalView: React.FC<LocalViewProps> = ({
  onBack,
  t,
  onSelect,
  activeData,
}) => {
  return (
    <div className="animate-fade-in pt-2 pb-10">
      <div className="flex items-center gap-4 mb-6 px-2">
        <button
          onClick={onBack}
          className="p-3 bg-white border border-gray-200 rounded-full shadow-sm active:scale-90 hover:bg-gray-50 transition-all"
        >
          <Icons.ArrowLeft />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900 leading-none">
            {t.localGemsTitle}
          </h2>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
            {t.tangierFavs}
          </p>
        </div>
      </div>
      <div className="space-y-6 px-1">
        {activeData.recommendations.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className="group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-xl transition-all duration-300 active:scale-[0.99] cursor-pointer"
          >
            <div className="relative h-56 w-full">
              <ImageCarousel images={item.images} className="h-full" />
              <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Icons.ExternalLink />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent pt-12 z-20 pointer-events-none text-center">
                <span className="inline-block px-3 py-1 bg-green-500/90 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white mb-2 shadow-sm backdrop-blur-sm">
                  {getCategoryLabel(item.category, t)}
                </span>
                <h3 className="text-2xl font-bold text-white drop-shadow-md leading-tight">
                  {item.title}
                </h3>
              </div>
            </div>
            <div className="p-5">
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {item.desc}
              </p>
              <div className="mt-4 flex items-center gap-2 text-blue-600 text-xs font-bold uppercase tracking-wide group-hover:underline">
                {t.seeDetails} <Icons.ChevronRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedbackView: React.FC<ViewProps & { activeData: GuideData }> = ({
  onBack,
  t,
  activeData,
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const handleSmartSend = () => {
    if (rating === 5 && activeData.airbnbLink) {
      window.open(activeData.airbnbLink, '_blank');
    } else {
      const msg = `${t.feedbackTitle}: ${rating} Star(s).\n\n"${comment}"\n\n- ${activeData.guestName}`;
      const phone = activeData.emergency.hostPhone.replace(/[^0-9]/g, '');
      window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`,
        '_blank'
      );
    }
  };
  return (
    <div className="animate-fade-in pt-2 pb-10">
      <div className="flex items-center gap-4 mb-8 px-2">
        <button
          onClick={onBack}
          className="p-3 bg-white border border-gray-200 rounded-full shadow-sm active:scale-90 hover:bg-gray-50 transition-all"
        >
          <Icons.ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">{t.feedbackTitle}</h2>
      </div>
      <div className="px-1 space-y-6">
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 text-center">
          <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
            {t.rating}
          </p>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`transition-all active:scale-125 ${
                  rating >= star
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                <Icons.Star />
              </button>
            ))}
          </div>
          {rating > 0 && (
            <p
              className={`text-sm font-bold ${
                rating === 5 ? 'text-green-600' : 'text-orange-500'
              } animate-fade-in`}
            >
              {rating === 5 ? t.goodReviewNote : t.badReviewNote}
            </p>
          )}
        </div>
        {rating < 5 && (
          <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-100 animate-fade-in">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
              {t.comment}
            </p>
            <textarea
              className="w-full bg-gray-50 rounded-xl p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 h-32 resize-none"
              placeholder="..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        )}
        <button
          onClick={handleSmartSend}
          disabled={rating === 0}
          className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 transition-all ${
            rating === 0
              ? 'bg-gray-300 cursor-not-allowed'
              : rating === 5
              ? 'bg-red-500 hover:bg-red-600'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {rating === 5 ? <Icons.Star /> : <Icons.Phone />}{' '}
          {rating === 5 ? t.reviewOnAirbnb : t.sendReview}
        </button>
      </div>
    </div>
  );
};

const CheckinView: React.FC<ViewProps & { activeData: GuideData }> = ({
  onBack,
  t,
  activeData,
}) => {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="animate-fade-in pt-2 pb-10">
      <div className="flex items-center gap-4 mb-8 px-2">
        <button
          onClick={onBack}
          className="p-3 bg-white border border-gray-200 rounded-full shadow-sm active:scale-90 hover:bg-gray-50 transition-all"
        >
          <Icons.ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">{t.checkinTitle}</h2>
      </div>
      <div className="mx-1 mb-8 bg-gray-800 rounded-3xl p-6 text-center text-white relative overflow-hidden shadow-xl shadow-gray-200">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
        <div className="relative z-10">
          <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            {t.secureCode}
          </p>
          <div className="bg-black/30 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-white/5 transition-all duration-300">
            {revealed ? (
              <span className="text-4xl font-mono font-bold tracking-[0.3em] text-green-400 animate-pulse block">
                {activeData.checkin.keyboxCode}
              </span>
            ) : (
              <span className="text-4xl font-mono font-bold tracking-[0.3em] text-gray-600 block blur-sm">
                ••••
              </span>
            )}
          </div>
          <button
            onClick={() => setRevealed(!revealed)}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-sm font-bold backdrop-blur-md border border-white/10"
          >
            {revealed ? (
              <>
                <Icons.EyeOff /> {t.hideCode}
              </>
            ) : (
              <>
                <Icons.Eye /> {t.revealCode}
              </>
            )}
          </button>
        </div>
      </div>
      <div className="px-4 space-y-0 relative">
        <div className="absolute left-[30px] top-4 bottom-10 w-0.5 bg-gray-200"></div>
        {activeData.checkin.steps.map((step, idx) => (
          <div key={idx} className="relative pl-12 pb-8 last:pb-0">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-white border-4 border-orange-100 flex items-center justify-center z-10 text-xs font-bold text-orange-500 shadow-sm">
              {idx + 1}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1 leading-none pt-1">
              {step.title}
            </h3>
            <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const ManualView: React.FC<ViewProps & { activeData: GuideData }> = ({
  onBack,
  t,
  activeData,
}) => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="animate-fade-in pt-2">
      <div className="flex items-center gap-4 mb-8 px-2">
        <button
          onClick={onBack}
          className="p-3 bg-white border border-gray-200 rounded-full shadow-sm active:scale-90 hover:bg-gray-50 transition-all"
        >
          <Icons.ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-gray-900">
          {t.houseGuideTitle}
        </h2>
      </div>
      <div className="space-y-4 px-1">
        {activeData.manual.map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              onClick={() => setOpen(open === idx ? null : idx)}
              className="w-full flex items-center justify-between p-5 bg-white text-left"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 mb-1 block">
                  {item.category}
                </span>
                <span className="font-bold text-gray-800 text-lg">
                  {item.title}
                </span>
              </div>
              <div
                className={`transition-transform duration-200 text-gray-400 ${
                  open === idx ? 'rotate-180' : ''
                }`}
              >
                <Icons.ChevronDown />
              </div>
            </button>
            {open === idx && (
              <div className="p-5 pt-0 text-gray-600 bg-white leading-relaxed">
                <p className="pt-2 border-t border-gray-50">{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const EmergencyView: React.FC<ViewProps & { activeData: GuideData }> = ({
  onBack,
  t,
  activeData,
}) => {
  // Logic: Nqiw nmra d telephone mn 'space' w '+' bach tkhdm f lien WhatsApp
  const waNumber = activeData.emergency.hostPhone.replace(/[^0-9]/g, '');

  return (
    <div className="animate-fade-in pt-2 pb-10">
      {/* --- HEADER --- */}
      <div className="flex items-center gap-4 mb-8 px-2">
        <button
          onClick={onBack}
          className="p-3 bg-white border border-gray-200 rounded-full shadow-sm active:scale-90 hover:bg-gray-50 transition-all"
        >
          <Icons.ArrowLeft />
        </button>
        <h2 className="text-2xl font-bold text-red-600">{t.emergencyTitle}</h2>
      </div>

      {/* --- CONTENT --- */}
      <div className="space-y-4 px-1">
        
        {/* POLICE */}
        <a
          href={`tel:${activeData.emergency.police}`}
          className="flex items-center justify-between p-5 bg-white border border-red-50 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-full group-hover:bg-red-500 group-hover:text-white transition-colors">
              <Icons.Phone />
            </div>
            <span className="font-bold text-gray-800 text-lg">{t.police}</span>
          </div>
          <span className="text-xl font-bold text-gray-300 group-hover:text-red-500 transition-colors">
            {activeData.emergency.police}
          </span>
        </a>

        {/* AMBULANCE */}
        <a
          href={`tel:${activeData.emergency.ambulance}`}
          className="flex items-center justify-between p-5 bg-white border border-red-50 rounded-2xl shadow-sm hover:shadow-md active:scale-95 transition-all group"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-full group-hover:bg-red-500 group-hover:text-white transition-colors">
              <Icons.Phone />
            </div>
            <span className="font-bold text-gray-800 text-lg">{t.ambulance}</span>
          </div>
          <span className="text-xl font-bold text-gray-300 group-hover:text-red-500 transition-colors">
            {activeData.emergency.ambulance}
          </span>
        </a>

        {/* --- MANAGER SECTION --- */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <p className="text-sm text-gray-400 mb-4 px-2 font-bold uppercase tracking-wider text-center">
            {t.manager || 'PROPERTY MANAGER'}
          </p>

          <div className="space-y-3">
            
            {/* CALL HOST BUTTON */}
            <a
              href={`tel:${activeData.emergency.hostPhone}`}
              className="flex items-center justify-between p-6 bg-[#1F2937] text-white rounded-3xl shadow-xl shadow-gray-400/20 active:scale-95 transition-all border border-gray-800"
            >
              {/* GROUP 1: Icon + Text (Left Aligned) */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                  <Icons.Phone />
                </div>
                <div className="text-left">
                  <span className="font-bold text-lg block leading-tight">{t.callHost}</span>
                  <span className="text-xs text-gray-400 block mt-1">{t.available}</span>
                </div>
              </div>

              {/* GROUP 2: Arrow (Right Aligned) */}
              <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center shrink-0">
                <Icons.ChevronRight />
              </div>
            </a>

            {/* WHATSAPP BUTTON */}
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-6 bg-[#25D366] text-white rounded-3xl shadow-xl shadow-green-500/20 active:scale-95 transition-all border border-green-400"
            >
              {/* GROUP 1: Icon + Text (Left Aligned - Exactly like Call Host) */}
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  {/* WhatsApp SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                </div>
                <div className="text-left">
                  <span className="font-bold text-lg block leading-tight">{t.whatsappHost || 'WhatsApp Host'}</span>
                  <span className="text-xs text-green-100 block mt-1">{t.chatNow || 'Chat now'}</span>
                </div>
              </div>

              {/* GROUP 2: Icon (Right Aligned) */}
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                <Icons.ExternalLink />
              </div>
            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

const HomeView: React.FC<any> = ({
  onNavigate,
  t,
  lang,
  setLang,
  activeData,
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(activeData.wifi.password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="pt-2">
        <LangSwitcher currentLang={lang} setLang={setLang} />
      </div>
      <div className="flex justify-between items-center px-2">
        <div className="bg-white border border-gray-100 p-2 pr-4 rounded-full flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
            <img
              src={activeData.hostAvatar}
              alt="Host"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
              {t.hostedBy}
            </p>
            <p className="text-sm font-bold text-gray-900 leading-none">
              {activeData.hostName}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
            {t.online}
          </span>
        </div>
      </div>
      <div className="px-2 py-2 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
          {t.welcome} <br />
          <span className="text-blue-600">{activeData.guestName}</span>
        </h1>
        <p className="text-gray-500 text-lg leading-relaxed">{t.enjoy}</p>
      </div>
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1e3a8a] to-[#312e81] text-white p-8 shadow-2xl shadow-blue-900/20 mx-1">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5">
              <Icons.Wifi />
            </div>
            <h2 className="text-lg font-bold">{t.wifiTitle}</h2>
          </div>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center border-b border-white/10 pb-2">
              <span className="text-blue-200 text-sm font-medium">
                {t.network}
              </span>
              <span className="text-lg font-bold text-white">
                {activeData.wifi.network}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-blue-200 text-sm font-medium">
                {t.password}
              </span>
              <span className="text-lg font-mono text-blue-300 tracking-wider">
                {activeData.wifi.password}
              </span>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="w-full bg-white text-blue-900 py-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-blue-50 shadow-lg"
          >
            {copied ? <Icons.Check /> : <Icons.Copy />}{' '}
            {copied ? t.copied : t.copy}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-1">
        <MenuButton
          onClick={() => onNavigate('checkin')}
          icon={<Icons.Key />}
          label={t.checkinTitle}
          bg="bg-orange-50"
          border="border-orange-100"
          text="text-orange-500"
        />
        <MenuButton
          onClick={() => onNavigate('manual')}
          icon={<Icons.Book />}
          label={t.houseGuideTitle}
          bg="bg-blue-50"
          border="border-blue-100"
          text="text-blue-600"
        />
        <MenuButton
          onClick={() => onNavigate('local')}
          icon={<Icons.Map />}
          label={t.localGemsTitle}
          bg="bg-emerald-50"
          border="border-emerald-100"
          text="text-emerald-600"
        />
        <MenuButton
          onClick={() => onNavigate('emergency')}
          icon={<Icons.Phone />}
          label={t.helpTitle}
          bg="bg-rose-50"
          border="border-rose-100"
          text="text-rose-500"
        />
        <div className="col-span-2">
          <button
            onClick={() => onNavigate('feedback')}
            className="w-full bg-yellow-50 border border-yellow-200 p-4 rounded-[24px] flex items-center justify-between gap-3 shadow-sm hover:shadow-md hover:border-yellow-400 active:scale-95 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white text-yellow-500 p-3 rounded-2xl shadow-sm border border-yellow-100 flex items-center justify-center aspect-square h-12 w-12">
                <Icons.Star />
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-gray-800 block">
                  {t.feedbackTitle}
                </span>
                <span className="text-[10px] text-gray-500 font-medium">
                  Click to review
                </span>
              </div>
            </div>
            <div className="text-yellow-500">
              <Icons.ChevronRight />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// --- MAIN GUEST COMPONENT (RENAME FROM APP) ---
const GuestGuide: React.FC = () => {
  const { slug } = useParams<{ slug: string }>(); // <--- HOOK JDID
  const [view, setView] = useState<string>('home');
  const [lang, setLang] = useState<Language>('en');
  const [selectedItem, setSelectedItem] = useState<Recommendation | null>(null);

  const [dbData, setDbData] = useState<GuideData | null>(null);
  const [loading, setLoading] = useState(true);

  const t = extendedTranslations[lang];
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- FETCH DATA FROM SUPABASE ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // ⚠️ NEW: Check slug
        if (!slug) {
          console.error('No slug found!');
          setLoading(false);
          return;
        }

        // 1. Jib Guide Info by Slug (Machi ID direct)
        const { data: guide, error: gErr } = await supabase
          .from('guides')
          .select('*')
          .eq('slug', slug) // <--- SEARCH BY SLUG
          .single();

        if (gErr) throw gErr;

        // 2. Jib lbaqi b ID li lqina
        const guideId = guide.id;

        const { data: manuals } = await supabase
          .from('manuals')
          .select('*')
          .eq('guide_id', guideId);
        const { data: steps } = await supabase
          .from('checkin_steps')
          .select('*')
          .eq('guide_id', guideId)
          .order('step_order');
        const { data: recs } = await supabase
          .from('recommendations')
          .select('*')
          .eq('guide_id', guideId);

        // 3. Format data
        if (guide) {
          // Check wash active (Security)
          if (guide.is_active === false) {
            alert('Had l-guide suspended!'); // Tqder tdir page special hna
            setLoading(false);
            return;
          }

          setDbData({
            hostName: guide.hostName,
            hostAvatar: guide.hostAvatar,
            guestName: guide.guestName,
            airbnbLink: guide.airbnbLink,
            wifi: { network: guide.wifiNetwork, password: guide.wifiPassword },
            manual: manuals || [],
            checkin: { keyboxCode: guide.keyboxCode, steps: steps || [] },
            emergency: {
              police: guide.emergencyPolice,
              ambulance: guide.emergencyAmbulance,
              hostPhone: guide.hostPhone,
            },
            recommendations: recs || [],
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]); // <--- Re-run ila tbeddel slug

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTo(0, 0);
  }, [view, selectedItem]);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Ila makanet ta data
  if (!dbData)
    return (
      <div className="p-10 text-center">
        Guide not found or connection error.
      </div>
    );

  const activeData = dbData;

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans flex justify-center text-gray-900">
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } } .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; } .pt-safe { padding-top: env(safe-area-inset-top, 20px); } .pb-safe-offset { padding-bottom: env(safe-area-inset-bottom, 20px); }`}</style>
      <div className="w-full max-w-md h-screen flex flex-col relative bg-white sm:bg-[#F8FAFC]">
        {selectedItem ? (
          <DetailView
            item={selectedItem}
            onBack={() => setSelectedItem(null)}
            t={t}
          />
        ) : (
          <div
            ref={scrollRef}
            className="flex-1 h-full overflow-y-auto no-scrollbar flex flex-col p-6"
          >
            <div className="flex-1">
              {view === 'home' && (
                <HomeView
                  onNavigate={setView}
                  t={t}
                  lang={lang}
                  setLang={setLang}
                  activeData={activeData}
                />
              )}
              {view === 'manual' && (
                <ManualView
                  onBack={() => setView('home')}
                  t={t}
                  activeData={activeData}
                />
              )}
              {view === 'checkin' && (
                <CheckinView
                  onBack={() => setView('home')}
                  t={t}
                  activeData={activeData}
                />
              )}
              {view === 'emergency' && (
                <EmergencyView
                  onBack={() => setView('home')}
                  t={t}
                  activeData={activeData}
                />
              )}
              {view === 'local' && (
                <LocalView
                  onBack={() => setView('home')}
                  t={t}
                  onSelect={(item) => setSelectedItem(item)}
                  activeData={activeData}
                />
              )}
              {view === 'feedback' && (
                <FeedbackView
                  onBack={() => setView('home')}
                  t={t}
                  activeData={activeData}
                />
              )}
            </div>
            <div className="py-8 pt-10 text-center text-[10px] font-bold text-gray-300 tracking-widest uppercase">
              {t.poweredBy} {activeData.hostName} Guide
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestGuide;
