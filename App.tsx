import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Megaphone,
  Users,
  Award,
  MapPin,
  Target,
  Gift,
  Banknote,
  Shirt,
  Utensils,
  Briefcase,
  FileBadge,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

// --- Assets ---
import DD26LogoImage from './DD26 Icon logo.png';

const DD26Logo = ({ className }: { className?: string }) => (
  <img
    src={DD26LogoImage}
    alt="DD26 Logo"
    className={className}
    aria-hidden="true"
  />
);

// --- Theme Components ---

const GeometricBackground = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>

    {/* Hexagon Pattern - Base Layer (always visible) */}
    <div className="absolute inset-0 opacity-30 z-0">
      <svg width="100%" height="100%" className="honeycomb-base">
        <defs>
          <pattern id="pattern-hex" x="0" y="0" width="100" height="174" patternUnits="userSpaceOnUse" patternTransform="scale(0.3)">
            <path d="M50 0 L100 29 L100 87 L50 116 L0 87 L0 29 Z" fill="none" stroke="#760404" strokeWidth="4" />
            <path d="M50 116 L50 174" fill="none" stroke="#760404" strokeWidth="4" />
            <path d="M100 87 L150 116" fill="none" stroke="#760404" strokeWidth="4" />
            <path d="M0 87 L-50 116" fill="none" stroke="#760404" strokeWidth="4" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-hex)" />
      </svg>
    </div>

    {/* Hexagon Pattern - Glow Layer (fades in/out) */}
    <div className="absolute inset-0 z-0 animate-honeycomb-glow-overlay">
      <svg width="100%" height="100%" className="honeycomb-glow-layer">
        <defs>
          <pattern id="pattern-hex-glow" x="0" y="0" width="100" height="174" patternUnits="userSpaceOnUse" patternTransform="scale(0.3)">
            <path d="M50 0 L100 29 L100 87 L50 116 L0 87 L0 29 Z" fill="none" stroke="#ff3333" strokeWidth="8" />
            <path d="M50 116 L50 174" fill="none" stroke="#ff3333" strokeWidth="8" />
            <path d="M100 87 L150 116" fill="none" stroke="#ff3333" strokeWidth="8" />
            <path d="M0 87 L-50 116" fill="none" stroke="#ff3333" strokeWidth="8" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-hex-glow)" />
      </svg>
      {/* Gradients to fade pattern at edges for 'hint' effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black"></div>
    </div>

    {/* Dotted Grid - Hidden on mobile for performance */}
    <div className="hidden md:block absolute top-12 right-12 grid grid-cols-4 gap-3 opacity-40 z-10">
      {[...Array(8)].map((_, i) => (
        <div
          key={`tr-${i}`}
          className="w-1 h-1 bg-brand-red-light rounded-full animate-dot-pulse"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}
    </div>

    {/* Dotted Grid - Hidden on mobile for performance */}
    <div className="hidden md:block absolute bottom-12 left-12 grid grid-cols-4 gap-3 opacity-40 z-10">
      {[...Array(8)].map((_, i) => (
        <div
          key={`bl-${i}`}
          className="w-1 h-1 bg-brand-red-light rounded-full animate-dot-pulse"
          style={{ animationDelay: `${i * 0.3 + 1}s` }}
        />
      ))}
    </div>

    {/* Simplified texture overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-brand-black/20 via-transparent to-brand-black z-10"></div>
  </div>
);

// --- Layout Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-500 pointer-events-none ${scrolled ? 'pt-3' : 'pt-4'}`}>
      <div className={`
        relative pointer-events-auto flex items-center justify-between 
        transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled ? 'w-[90%] md:w-[45%] py-2 bg-brand-black/80' : 'w-[92%] md:w-[50%] py-2.5 bg-brand-black/50'}
        max-w-xl mx-auto rounded-full 
        border border-brand-white/10 
        backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]
      `}>
        {/* Logo - Anchored Left */}
        {/* Logo - Anchored Left - Scroll to Top */}
        <div
          className="flex items-center gap-2 pl-4 z-10 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center">
            <DD26Logo className="w-7 h-7 md:w-8 md:h-8 object-contain" />
          </div>
          <span className="font-display font-bold text-sm md:text-base tracking-wider text-brand-white">
            DD<span className="text-brand-red-light">26</span>
          </span>
        </div>

        {/* Navigation Links - Centered Absolutely */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-6 md:gap-10">
          <a href="#mission" className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-brand-white/70 hover:text-brand-cream transition-colors">Mission</a>
          <a href="#perks" className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-brand-white/70 hover:text-brand-cream transition-colors">Perks</a>
        </div>

        {/* Right Spacer to Balance Layout if needed (optional, currently empty to just let logo anchor left) */}
        <div className="w-12"></div>
      </div>
    </nav>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 md:pt-20 md:pb-0 bg-brand-black">
      <GeometricBackground />

      {/* Hero Background Elements - Simplified for performance */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central Glow Orb - Static gradient instead of animated blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-radial from-brand-red-dark/40 via-brand-red-dark/10 to-transparent rounded-full z-0" />

        {/* Floating Glass Circles - Simplified without heavy blur */}
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[15%] right-[5%] md:right-[15%] w-32 h-32 md:w-80 md:h-80 rounded-full border border-brand-white/5 bg-brand-white/[0.02] z-0 will-change-transform animate-slow-spin"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-[15%] left-[5%] md:left-[10%] w-24 h-24 md:w-64 md:h-64 rounded-full border border-brand-white/5 bg-brand-red-dark/[0.05] z-0 will-change-transform animate-slow-spin-reverse"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center flex flex-col items-center w-full">


        {/* Massive Typography with Outline Effect - FIXED using VW units for mobile */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display font-black text-brand-white mb-6 md:mb-8 relative leading-none w-full flex flex-col items-center"
        >
          <span className="block text-3xl md:text-6xl lg:text-7xl mb-2 md:mb-4 tracking-tight">
            BECOME A <span className="text-transparent bg-clip-text bg-gradient-to-b from-brand-cream via-brand-white to-brand-white/80">BRAND</span>
          </span>
          {/* Mobile-First: Text scales with Viewport Width to ensure it never overflows */}
          {/* AMBASSADOR with glow overlay technique */}
          <span className="relative block text-[7.5vw] md:text-[8vw] lg:text-[7vw] xl:text-[6rem] tracking-tight text-center w-full">
            {/* Base text layer - SOLID BLACK FILL with SYNCED WHITE STROKE */}
            <span className="text-brand-black [-webkit-text-stroke:1px_rgba(255,234,199,0.3)] md:[-webkit-text-stroke:2px_rgba(255,234,199,0.3)] select-none relative z-10 animate-text-stroke-sync">
              AMBASSADOR
            </span>
            {/* Glow overlay layer - fades in/out */}
            <span className="absolute inset-0 text-transparent [-webkit-text-stroke:1px_rgba(255,234,199,0.9)] md:[-webkit-text-stroke:2px_rgba(255,234,199,0.9)] select-none animate-text-glow-overlay ambassador-glow-text z-20 pointer-events-none">
              AMBASSADOR
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base md:text-xl text-brand-white/60 max-w-sm md:max-w-xl mx-auto mb-10 md:mb-12 font-light leading-relaxed"
        >
          Lead the change. Represent your delegation. <span className="text-brand-cream border-b border-brand-cream/30 pb-1">Win big.</span>
        </motion.p>

        {/* Register button - Hidden on mobile since we have sticky CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <button className="hidden md:block group relative px-8 py-4 md:px-12 md:py-5 bg-brand-red-light rounded-full overflow-hidden hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_50px_rgba(118,4,4,0.4)] border border-brand-cream/20 min-h-[52px] min-w-[200px]">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-red-dark via-brand-red-light to-brand-red-dark opacity-100 group-hover:opacity-90 transition-opacity"></div>
            <span className="relative flex items-center justify-center gap-2 text-brand-cream font-bold text-sm md:text-sm tracking-[0.2em] uppercase">
              Register Now <ChevronRight className="w-5 h-5" />
            </span>
          </button>

          <div className="flex flex-col items-center gap-4 md:gap-5 mt-2">
            <a
              href="#mission"
              className="group text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-white/40 hover:text-brand-cream transition-all duration-300 hover:tracking-[0.25em]"
            >
              What will be my duties?
            </a>
            <a
              href="#perks"
              className="group text-center text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-brand-white/40 hover:text-brand-cream transition-all duration-300 hover:tracking-[0.25em]"
            >
              What will i get as a brand ambassador
            </a>
          </div>
        </motion.div>
      </div>

      {/* Background Logo - Hidden on mobile for performance */}
      <div className="hidden md:block absolute bottom-0 right-0 opacity-20 pointer-events-none mix-blend-overlay">
        <img
          src={DD26LogoImage}
          alt=""
          loading="lazy"
          className="w-[800px] h-[800px] translate-x-1/3 translate-y-1/3"
          aria-hidden="true"
        />
      </div>
    </section>
  );
};

const MissionCard: React.FC<{ icon: any, title: string, description: string, index: number }> = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex items-start gap-4 md:gap-6 p-5 md:p-6 rounded-2xl bg-brand-white/5 border border-brand-white/5 hover:border-brand-red-light/50 hover:bg-brand-red-dark/10 transition-all duration-300 active:bg-brand-red-dark/20"
    >
      <div className="relative shrink-0">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-brand-red-dark to-brand-black flex items-center justify-center border border-brand-red-light/30 group-hover:border-brand-cream/50 transition-colors shadow-lg shadow-brand-red-dark/20">
          <Icon className="w-5 h-5 md:w-6 md:h-6 text-brand-cream" />
        </div>
      </div>
      <div>
        <h3 className="text-lg md:text-xl font-display font-bold text-brand-white mb-2 group-hover:text-brand-cream transition-colors">{title}</h3>
        <p className="text-brand-white/60 leading-relaxed text-sm md:text-base group-hover:text-brand-white/80">{description}</p>
      </div>
    </motion.div>
  );
};

const MissionSection = () => {
  const missions = [
    { icon: Megaphone, title: "Promote & Amplify", description: "Be the voice of DD26 on your campus. Create buzz, share updates, and ignite excitement among your peers." },
    { icon: Users, title: "Encourage Registrations", description: "Drive participation by explaining the value of Developer's Day. The more you bring, the more you win." },
    { icon: Target, title: "Strategic Assistance", description: "Assist our core team in executing promotional drives and mini-events within your university." },
    { icon: MapPin, title: "Guide Participants", description: "Serve as the primary point of contact for your delegation, answering queries and coordinating logistics." },
    { icon: FileBadge, title: "Represent Your Delegation", description: "Hold the banner high. You are the face of your university at the biggest tech event of the year." },
  ];

  return (
    <section id="mission" className="py-20 md:py-32 relative bg-brand-black overflow-hidden">
      {/* Subtle Background touches */}
      <div className="absolute top-1/2 left-0 w-64 h-64 md:w-96 md:h-96 bg-brand-red-dark/20 rounded-full blur-[80px] md:blur-[100px] pointer-events-none" />

      {/* Decorative Connecting Line */}
      <svg className="hidden lg:block absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-full h-full pointer-events-none z-0 opacity-20">
        <path d="M 200,300 C 600,300 600,600 900,600" fill="none" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="10,10" />
        <defs>
          <linearGradient id="lineGradient" gradientTransform="rotate(0)">
            <stop offset="0%" stopColor="#4d0303" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffeac7" />
            <stop offset="100%" stopColor="#4d0303" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        <div className="order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-1 bg-brand-red-light rounded-full" />
              <span className="text-brand-cream font-bold tracking-widest uppercase text-sm">Your Role</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-white mb-6 leading-tight">
              LEAD THE <br /><span className="text-brand-cream drop-shadow-lg">REVOLUTION</span>
            </h2>
            <p className="text-brand-white/70 text-base md:text-lg">
              As a Brand Ambassador, you are not just a volunteer; you are a leader.
              Your actions will directly impact the success of Developer's Day 2026.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4">
            {missions.map((m, i) => (
              <MissionCard key={i} {...m} index={i} />
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 relative h-full min-h-[400px] lg:min-h-[500px] hidden lg:flex items-center justify-center">
          {/* Visual Representation of the "Pills" theme - CSS animations for performance */}
          <div className="relative w-full h-[600px] flex items-center justify-center scale-110 lg:scale-125 origin-center">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-red-dark/10 to-transparent" />

            <div
              className="absolute top-10 right-10 w-40 h-80 bg-gradient-to-b from-brand-red-light to-brand-red-dark rounded-[50px] opacity-80 shadow-[0_0_40px_rgba(118,4,4,0.5)] border border-brand-cream/30 z-10 animate-float-slow"
            />
            <div
              className="absolute bottom-20 left-20 w-32 h-64 bg-gradient-to-t from-brand-red-dark to-[#330000] rounded-[40px] opacity-60 z-0 border border-brand-white/10 animate-float-slow-reverse"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-64 h-64 bg-black/60 rounded-3xl border border-brand-cream/30 flex flex-col items-center justify-center text-center p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-cream/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <DD26Logo className="w-24 h-24 mb-4" />
                <h3 className="text-brand-white font-display font-bold text-xl relative z-10">The Inner Circle</h3>
                <p className="text-brand-white/50 text-xs mt-2 relative z-10">Join the elite network.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PerkCard: React.FC<{ icon: any, title: string, description: string, className?: string, index: number }> = ({ icon: Icon, title, description, className, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className={`
      group relative w-full md:w-auto 
      p-5 md:p-8 rounded-2xl md:rounded-3xl bg-[#080808] border border-brand-white/10 overflow-hidden 
      active:border-brand-cream/40 md:hover:border-brand-cream/40 transition-all duration-300 
      md:hover:-translate-y-2 active:scale-[0.98] md:hover:shadow-[0_10px_40px_rgba(118,4,4,0.1)] 
      ${className}
    `}
  >
    {/* Hover Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-brand-red-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="absolute -right-8 -top-8 text-brand-white/5 group-hover:text-brand-red-light/10 transition-colors duration-500">
      <Icon size={120} strokeWidth={1} />
    </div>

    <div className="relative z-10">
      <div className="w-12 h-12 md:w-14 md:h-14 bg-brand-white/5 rounded-2xl flex items-center justify-center mb-6 text-brand-cream group-hover:scale-110 group-hover:bg-brand-red-light group-hover:text-brand-cream transition-all duration-300 shadow-lg group-hover:shadow-brand-red-light/30">
        <Icon className="w-6 h-6 md:w-7 md:h-7" />
      </div>
      <h3 className="text-lg md:text-xl font-display font-bold text-brand-white mb-3 group-hover:text-brand-cream transition-colors">{title}</h3>
      <p className="text-brand-white/60 text-sm leading-relaxed group-hover:text-brand-white/80 transition-colors">
        {description}
      </p>
    </div>
  </motion.div>
);

const PerksSection = () => {
  const perks = [
    { icon: Banknote, title: "Cash Prize", description: "Significant cash rewards for the top performing Brand Ambassadors." },
    { icon: Gift, title: "Refer & Earn", description: "Earn bonuses for every verified registration that comes through your unique code." },
    { icon: Shirt, title: "Exclusive Merch", description: "Get your hands on limited edition DD26 hoodies, tees, and swag kits." },
    { icon: MapPin, title: "Pre-Event Tour", description: "VIP access to the venue and meet-and-greet with the organizers before the big day." },
    { icon: Megaphone, title: "Social Shoutout", description: "Feature on our official social media handles as a top community leader." },
    { icon: Utensils, title: "Complimentary Meal", description: "Enjoy premium catering on the event day, on the house." },
    { icon: Briefcase, title: "Internship Ops", description: "Direct access to internship interviews with our partner tech companies." },
    { icon: Award, title: "Certification", description: "Official certificate of volunteering and leadership to boost your resume." },
  ];

  return (
    <section id="perks" className="py-20 md:py-32 bg-brand-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red-dark to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-red-dark to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-0 md:px-6">
        <div className="text-center mb-12 md:mb-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border border-brand-red-light/30 bg-brand-red-dark/10 text-brand-red-light text-xs font-bold tracking-widest uppercase mb-6"
          >
            Incentives
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl md:text-6xl font-bold text-brand-white mb-6"
          >
            THE <span className="text-brand-cream drop-shadow-md">PERKS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-brand-white/60 max-w-xl mx-auto text-base md:text-lg"
          >
            We value your effort. Here's what's in it for you when you join the elite squad.
          </motion.p>
        </div>

        {/* Mobile: Vertical Stack | Desktop: Grid */}
        <div className="flex flex-col gap-3 px-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:px-0 pb-4 md:pb-0">
          {perks.map((perk, i) => (
            <PerkCard
              key={i}
              {...perk}
              index={i}
              className={i === 0 || i === 7 ? "lg:col-span-2 md:bg-gradient-to-br from-[#0f0f0f] to-[#050505]" : ""}
            />
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-black border-t border-brand-white/10 pt-20 pb-24 md:pb-10 relative overflow-hidden">
      {/* Footer Background Pattern */}
      <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none">
        <div className="grid grid-cols-6 gap-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-brand-cream rounded-full" />
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <DD26Logo className="w-12 h-12" />
            <span className="font-display text-2xl font-bold text-brand-white">DD26</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-brand-white/60 hover:text-brand-cream transition-colors">Instagram</a>
            <a href="#" className="text-brand-white/60 hover:text-brand-cream transition-colors">LinkedIn</a>
            <a href="#" className="text-brand-white/60 hover:text-brand-cream transition-colors">Twitter</a>
          </div>
        </div>

        <div className="text-center md:text-left border-t border-brand-white/5 pt-8">
          <p className="text-brand-white/30 text-sm">
            © 2026 Developer's Day. All rights reserved. <br className="md:hidden" /> Developed with <span className="text-brand-red-light">♥</span> by the Tech Team.
          </p>
        </div>
      </div>
    </footer>
  );
};

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-brand-black">
      {/* Background Shapes mimicking the pill theme */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[400px] bg-brand-red-dark blur-[100px] rotate-12" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[120%] h-[400px] bg-brand-red-light/50 blur-[100px] -rotate-12" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h2 className="font-display text-4xl md:text-7xl font-bold text-brand-white mb-8 leading-tight">
          READY TO LEAD THE <br /><span className="text-brand-cream">REVOLUTION?</span>
        </h2>
        <p className="text-lg md:text-xl text-brand-white/70 mb-12 max-w-2xl mx-auto">
          Spots are limited. The selection process is competitive. Show us you have what it takes.
        </p>

        <button className="group relative inline-flex items-center justify-center px-12 py-6 bg-brand-red-light overflow-hidden rounded-full hover:bg-brand-red-light/90 active:scale-95 transition-all duration-300 shadow-[0_0_50px_rgba(118,4,4,0.6)] border border-brand-cream/30">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-brand-cream/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
          <span className="relative flex items-center gap-3 text-brand-cream font-bold text-xl uppercase tracking-wider">
            Register Now <ChevronRight className="w-6 h-6" />
          </span>
        </button>
      </div>
    </section>
  );
}

const App = () => {
  return (
    <div className="bg-brand-black min-h-screen text-brand-white selection:bg-brand-red-light selection:text-brand-cream font-body">
      <Navbar />
      <Hero />
      <MissionSection />
      <PerksSection />
      <CTASection />
      <Footer />

      {/* Sticky Mobile CTA - Fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] bg-gradient-to-t from-brand-black via-brand-black/95 to-transparent">
        <button className="w-full py-4 bg-brand-red-light rounded-full text-brand-cream font-bold text-sm uppercase tracking-widest shadow-[0_0_30px_rgba(118,4,4,0.5)] border border-brand-cream/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
          Register Now <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
        
        /* FLAWLESS SYNC: Honeycomb - Active overlap 85%-15% (Fade In), 15%-35% (Peak), 35%-65% (Fade Out) */
        @keyframes honeycomb-glow-overlay {
          0% { opacity: 0.5; }
          15% { opacity: 1; }
          35% { opacity: 1; }
          65% { opacity: 0; }
          85% { opacity: 0; }
          100% { opacity: 0.5; }
        }
        .animate-honeycomb-glow-overlay {
          animation: honeycomb-glow-overlay 8s ease-in-out infinite;
          opacity: 0;
        }
        .honeycomb-glow-layer {
          filter: drop-shadow(0 0 15px rgba(255, 50, 50, 1)) drop-shadow(0 0 35px rgba(255, 50, 50, 0.8)) drop-shadow(0 0 65px rgba(118, 4, 4, 0.6));
        }
        
        /* FLAWLESS SYNC: Text - Active overlap 35%-65% (Fade In), 65%-85% (Peak), 85%-15% (Fade Out) */
        @keyframes text-glow-overlay {
          0% { opacity: 0.5; }
          15% { opacity: 0; }
          35% { opacity: 0; }
          65% { opacity: 1; }
          85% { opacity: 1; }
          100% { opacity: 0.5; }
        }
        .animate-text-glow-overlay {
          animation: text-glow-overlay 8s ease-in-out infinite;
          opacity: 0;
        }
        .ambassador-glow-text {
          filter: drop-shadow(0 0 25px rgba(255, 234, 199, 0.8)) drop-shadow(0 0 50px rgba(255, 234, 199, 0.5));
        }
        
        /* STATIC BORDER: No animation, stays subtle/dull */
        .animate-text-stroke-sync {
          /* Animation removed to keep border dull */
        }
        
        /* GPU-OPTIMIZED: Dot pulse - uses transform for GPU acceleration */
        @keyframes dot-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.1); }
        }
        .animate-dot-pulse {
          animation: dot-pulse 2s ease-in-out infinite;
          will-change: opacity, transform;
        }
        
        /* GPU-OPTIMIZED: Slow spin with will-change hint */
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slow-spin-reverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 100s linear infinite;
          will-change: transform;
        }
        .animate-slow-spin-reverse {
          animation: slow-spin-reverse 120s linear infinite;
          will-change: transform;
        }
        
        /* GPU-OPTIMIZED: Float animations with will-change */
        @keyframes float-slow {
          0%, 100% { transform: translateY(-10px) rotate(0deg); }
          50% { transform: translateY(10px) rotate(5deg); }
        }
        @keyframes float-slow-reverse {
          0%, 100% { transform: translateY(20px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(-5deg); }
        }
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
          will-change: transform;
        }
        .animate-float-slow-reverse {
          animation: float-slow-reverse 7s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default App;