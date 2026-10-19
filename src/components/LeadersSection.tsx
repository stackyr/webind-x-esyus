"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

export interface Leader {
  id: string;
  name: string;
  category: string;
  bio: string;
  avatarType: 'yomi' | 'timothee' | 'david' | 'manuel';
}

const LEADERS: Leader[] = [
  {
    id: 'yomi-denzel',
    name: 'Yomi Denzel',
    category: 'E-Commerce 2.0',
    bio: 'Swiss-Nigerian entrepreneur and leading digital pioneer who scaled multiple 8-figure direct-to-consumer e-commerce brands and founded the most recognized training ecosystem across Europe.',
    avatarType: 'yomi'
  },
  {
    id: 'timothee-moiroux',
    name: 'Timothée Moiroux',
    category: 'Investissement Immobilier',
    bio: 'It was in high school, then a student, that Timothée understood the false freedom offered by studies and a full-time professional career. In parallel with his medical studies, he made his first real estate and financial investments and created his first company.',
    avatarType: 'timothee'
  },
  {
    id: 'david-sequiera',
    name: 'David Sequiera',
    category: 'Closing',
    bio: 'Renowned high-ticket closing strategist and sales performance architect who scaled enterprise sales teams and generated tens of millions of euros in closed client revenue.',
    avatarType: 'david'
  },
  {
    id: 'manuel-ravier',
    name: 'Manuel Ravier',
    category: 'Investissement Immobilier',
    bio: 'Co-founder and CEO of France\'s premier turnkey real estate investment company, overseeing hundreds of millions in property acquisitions and delivering high-yield assets to thousands of investors.',
    avatarType: 'manuel'
  }
];

// High-fidelity rendered SVG portraits with natural human features & studio lighting
function LeaderPortrait({ type }: { type: Leader['avatarType'] }) {
  if (type === 'yomi') {
    // Yomi Denzel: Young black male, clean buzz fade, neat full beard, charismatic smile, dark crewneck
    return (
      <svg viewBox="0 0 300 400" className="w-full h-full object-cover select-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="yomi-spot" cx="50%" cy="56%" r="52%">
            <stop offset="0%" stopColor="#2546a8" stopOpacity="0.9" />
            <stop offset="42%" stopColor="#122460" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#060918" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="yomi-skin-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#98603e" />
            <stop offset="45%" stopColor="#804a2c" />
            <stop offset="100%" stopColor="#5b301a" />
          </linearGradient>
          <linearGradient id="yomi-highlight" x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#af734e" />
            <stop offset="100%" stopColor="#804a2c" />
          </linearGradient>
        </defs>

        {/* Studio spotlight halo */}
        <circle cx="150" cy="215" r="145" fill="url(#yomi-spot)" />

        {/* Shoulders / Dark Crewneck Sweater */}
        <path d="M 45 400 L 45 385 C 55 330 95 308 150 308 C 205 308 245 330 255 385 L 255 400 Z" fill="#0f1422" />
        <path d="M 120 308 C 135 324 165 324 180 308 C 168 316 132 316 120 308 Z" fill="#1b233a" />

        {/* Strong neck */}
        <path d="M 126 245 L 126 312 C 142 320 158 320 174 312 L 174 245 Z" fill="#713e23" />
        <ellipse cx="150" cy="250" rx="26" ry="10" fill="#4d2714" opacity="0.6" />

        {/* Ears with inner detail */}
        <ellipse cx="97" cy="202" rx="10" ry="17" fill="#804a2c" />
        <ellipse cx="98" cy="202" rx="6" ry="11" fill="#5b301a" />
        <ellipse cx="203" cy="202" rx="10" ry="17" fill="#804a2c" />
        <ellipse cx="202" cy="202" rx="6" ry="11" fill="#5b301a" />

        {/* Head / Jaw structure */}
        <path d="M 104 182 C 104 125 116 118 150 118 C 184 118 196 125 196 182 C 196 235 180 260 150 260 C 120 260 104 235 104 182 Z" fill="url(#yomi-skin-base)" />

        {/* Skin cheekbone highlights */}
        <ellipse cx="128" cy="195" rx="14" ry="10" fill="url(#yomi-highlight)" opacity="0.35" />
        <ellipse cx="172" cy="195" rx="14" ry="10" fill="url(#yomi-highlight)" opacity="0.35" />
        <ellipse cx="150" cy="155" rx="28" ry="18" fill="url(#yomi-highlight)" opacity="0.4" />

        {/* Fade Buzzcut Hair */}
        <path d="M 103 170 C 103 115 114 98 150 98 C 186 98 197 115 197 170 C 197 150 190 125 180 120 C 165 112 135 112 120 120 C 110 125 103 150 103 170 Z" fill="#141111" />
        <path d="M 106 142 C 108 112 124 104 150 104 C 176 104 192 112 194 142 C 184 122 170 115 150 115 C 130 115 116 122 106 142 Z" fill="#1e1a1a" />

        {/* Eyebrows */}
        <path d="M 117 168 Q 132 161 144 167" stroke="#161212" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 156 167 Q 168 161 183 168" stroke="#161212" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* Almond-shaped expressive eyes */}
        <ellipse cx="132" cy="177" rx="7.5" ry="4.8" fill="#ffffff" />
        <ellipse cx="132" cy="177" rx="3.8" ry="3.8" fill="#29180f" />
        <circle cx="134" cy="175.5" r="1.3" fill="#ffffff" />

        <ellipse cx="168" cy="177" rx="7.5" ry="4.8" fill="#ffffff" />
        <ellipse cx="168" cy="177" rx="3.8" ry="3.8" fill="#29180f" />
        <circle cx="170" cy="175.5" r="1.3" fill="#ffffff" />

        {/* Nose structure */}
        <path d="M 149 174 L 146 205 Q 150 210 154 205 L 151 174" fill="#713e23" />
        <ellipse cx="150" cy="207" rx="9.5" ry="5.5" fill="#65351c" />
        <ellipse cx="144" cy="208" rx="2.4" ry="1.4" fill="#361a0b" />
        <ellipse cx="156" cy="208" rx="2.4" ry="1.4" fill="#361a0b" />

        {/* Broad smiling mouth with white teeth */}
        <path d="M 130 223 Q 150 250 170 223 Q 150 219 130 223 Z" fill="#441717" />
        <path d="M 133 224 Q 150 229 167 224 Q 164 235 150 236 Q 136 235 133 224 Z" fill="#ffffff" />
        <path d="M 135 238 Q 150 245 165 238" stroke="#8d4c38" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Well-manicured beard and mustache */}
        <path d="M 134 216 Q 150 220 166 216" stroke="#161212" strokeWidth="2.8" strokeLinecap="round" fill="none" />
        <path d="M 112 205 Q 115 252 150 258 Q 185 252 188 205 Q 183 249 150 252 Q 117 249 112 205 Z" fill="#141111" opacity="0.95" />
      </svg>
    );
  }

  if (type === 'timothee') {
    // Timothée Moiroux: Handsome European face, dark stylish hair, neat stubble, dark turtleneck
    return (
      <svg viewBox="0 0 300 400" className="w-full h-full object-cover select-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="tim-spot" cx="50%" cy="56%" r="52%">
            <stop offset="0%" stopColor="#2c4cb8" stopOpacity="0.88" />
            <stop offset="42%" stopColor="#14266c" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#060918" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="tim-skin-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d1ba" />
            <stop offset="50%" stopColor="#e5b89a" />
            <stop offset="100%" stopColor="#ca9674" />
          </linearGradient>
        </defs>

        <circle cx="150" cy="215" r="145" fill="url(#tim-spot)" />

        {/* Turtleneck & coat */}
        <path d="M 45 400 L 45 385 C 55 325 95 300 150 300 C 205 300 245 325 255 385 L 255 400 Z" fill="#0c1120" />
        <path d="M 124 265 L 124 305 Q 150 316 176 305 L 176 265 Q 150 273 124 265 Z" fill="#161d30" />
        <ellipse cx="150" cy="266" rx="26" ry="6" fill="#202a42" />

        {/* Ears */}
        <ellipse cx="98" cy="200" rx="9" ry="16" fill="#e5b89a" />
        <ellipse cx="202" cy="200" rx="9" ry="16" fill="#e5b89a" />

        {/* Face */}
        <path d="M 106 175 C 106 125 116 118 150 118 C 184 118 194 125 194 175 C 194 230 178 256 150 256 C 122 256 106 230 106 175 Z" fill="url(#tim-skin-base)" />

        {/* Hair */}
        <path d="M 101 162 C 99 110 112 92 150 92 C 188 92 201 110 199 162 C 194 135 182 120 168 116 C 145 110 125 115 109 135 Z" fill="#1c1817" />
        <path d="M 115 120 Q 148 100 186 115 Q 155 108 122 130 Z" fill="#2c2422" />

        {/* Eyebrows */}
        <path d="M 118 165 Q 132 160 144 164" stroke="#251f1e" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M 156 164 Q 168 160 182 165" stroke="#251f1e" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Eyes */}
        <ellipse cx="132" cy="175" rx="7" ry="4.5" fill="#ffffff" />
        <ellipse cx="132" cy="175" rx="3.5" ry="3.5" fill="#36251b" />
        <circle cx="134" cy="173.5" r="1.1" fill="#ffffff" />

        <ellipse cx="168" cy="175" rx="7" ry="4.5" fill="#ffffff" />
        <ellipse cx="168" cy="175" rx="3.5" ry="3.5" fill="#36251b" />
        <circle cx="170" cy="173.5" r="1.1" fill="#ffffff" />

        {/* Nose */}
        <path d="M 149 172 L 147 202 Q 150 206 153 202 L 151 172" fill="#d39976" />
        <ellipse cx="150" cy="204" rx="7.8" ry="4.5" fill="#c38865" />

        {/* Mouth */}
        <path d="M 136 224 Q 150 231 164 224" stroke="#9e5e4d" strokeWidth="3" strokeLinecap="round" fill="none" />

        {/* 2-day stubble */}
        <path d="M 114 198 Q 118 248 150 252 Q 182 248 186 198 Q 178 244 150 246 Q 122 244 114 198 Z" fill="#382c27" opacity="0.45" />
      </svg>
    );
  }

  if (type === 'david') {
    // David Sequiera: Sharp buzzcut, green/blue eyes, manicured beard, beige overshirt with white tee
    return (
      <svg viewBox="0 0 300 400" className="w-full h-full object-cover select-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="dav-spot" cx="50%" cy="56%" r="52%">
            <stop offset="0%" stopColor="#2547aa" stopOpacity="0.88" />
            <stop offset="42%" stopColor="#122464" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#060918" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="dav-skin-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4ceb5" />
            <stop offset="50%" stopColor="#e3b292" />
            <stop offset="100%" stopColor="#ca916b" />
          </linearGradient>
          <linearGradient id="dav-overshirt" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#b6a896" />
            <stop offset="100%" stopColor="#877a67" />
          </linearGradient>
        </defs>

        <circle cx="150" cy="215" r="145" fill="url(#dav-spot)" />

        {/* Beige overshirt with white inner tee */}
        <path d="M 45 400 L 45 385 C 55 325 95 300 150 300 C 205 300 245 325 255 385 L 255 400 Z" fill="url(#dav-overshirt)" />
        <path d="M 130 300 Q 150 326 170 300 L 176 400 L 124 400 Z" fill="#f8fafc" />
        <path d="M 104 305 L 128 355 L 138 310 Z" fill="#9e907d" />
        <path d="M 196 305 L 172 355 L 162 310 Z" fill="#9e907d" />

        {/* Neck */}
        <path d="M 124 245 L 124 305 Q 150 318 176 305 L 176 245 Z" fill="#be8560" />
        <ellipse cx="150" cy="252" rx="26" ry="10" fill="#9d6744" opacity="0.45" />

        {/* Ears */}
        <ellipse cx="96" cy="202" rx="10" ry="17" fill="#e3b292" />
        <ellipse cx="204" cy="202" rx="10" ry="17" fill="#e3b292" />

        {/* Face */}
        <path d="M 104 180 C 104 125 116 116 150 116 C 184 116 196 125 196 180 C 196 235 180 260 150 260 C 120 260 104 235 104 180 Z" fill="url(#dav-skin-base)" />

        {/* Sharp buzzcut */}
        <path d="M 104 165 C 104 112 116 98 150 98 C 184 98 196 112 196 165 C 194 132 184 115 150 115 C 116 115 106 132 104 165 Z" fill="#2d231e" />

        {/* Eyebrows */}
        <path d="M 118 167 Q 133 161 144 166" stroke="#221b17" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 156 166 Q 167 161 182 167" stroke="#221b17" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* Hazel / green-blue luminous eyes */}
        <ellipse cx="132" cy="177" rx="7.2" ry="4.6" fill="#ffffff" />
        <ellipse cx="132" cy="177" rx="3.6" ry="3.6" fill="#46736f" />
        <circle cx="132" cy="177" r="1.8" fill="#182725" />
        <circle cx="134" cy="175.5" r="1.1" fill="#ffffff" />

        <ellipse cx="168" cy="177" rx="7.2" ry="4.6" fill="#ffffff" />
        <ellipse cx="168" cy="177" rx="3.6" ry="3.6" fill="#46736f" />
        <circle cx="168" cy="177" r="1.8" fill="#182725" />
        <circle cx="170" cy="175.5" r="1.1" fill="#ffffff" />

        {/* Nose */}
        <path d="M 149 173 L 147 204 Q 150 209 153 204 L 151 173" fill="#c48862" />
        <ellipse cx="150" cy="206" rx="8" ry="4.8" fill="#b47750" />

        {/* Lips */}
        <path d="M 136 225 Q 150 231 164 225" stroke="#ac6753" strokeWidth="2.8" strokeLinecap="round" fill="none" />

        {/* Sharp manicured beard */}
        <path d="M 110 198 Q 115 256 150 260 Q 185 256 190 198 Q 182 250 150 253 Q 118 250 110 198 Z" fill="#29201a" opacity="0.95" />
        <path d="M 136 217 Q 150 221 164 217" stroke="#29201a" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  // Manuel Ravier: Swept hair, stubble, crisp open-collar white shirt and dark blazer
  return (
    <svg viewBox="0 0 300 400" className="w-full h-full object-cover select-none pointer-events-none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="man-spot" cx="50%" cy="56%" r="52%">
          <stop offset="0%" stopColor="#294cb4" stopOpacity="0.88" />
          <stop offset="42%" stopColor="#13256a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#060918" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="man-skin-base" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8d6bf" />
          <stop offset="50%" stopColor="#e5b89c" />
          <stop offset="100%" stopColor="#c89270" />
        </linearGradient>
      </defs>

      <circle cx="150" cy="215" r="145" fill="url(#man-spot)" />

      {/* Dark business blazer */}
      <path d="M 45 400 L 45 385 C 55 320 95 295 150 295 C 205 295 245 320 255 385 L 255 400 Z" fill="#0c1222" />
      
      {/* Crisp open-collar white shirt */}
      <path d="M 124 290 L 150 350 L 176 290 Z" fill="#ffffff" />
      <path d="M 106 290 L 132 342 L 126 290 Z" fill="#f1f5f9" />
      <path d="M 194 290 L 168 342 L 174 290 Z" fill="#f1f5f9" />
      {/* Blazer lapels */}
      <path d="M 100 298 L 138 385 L 80 400 Z" fill="#131b2e" />
      <path d="M 200 298 L 162 385 L 220 400 Z" fill="#131b2e" />

      {/* Neck */}
      <path d="M 125 245 L 125 300 Q 150 312 175 300 L 175 245 Z" fill="#c38d6a" />

      {/* Ears */}
      <ellipse cx="96" cy="198" rx="9" ry="16" fill="#e5b89c" />
      <ellipse cx="204" cy="198" rx="9" ry="16" fill="#e5b89c" />

      {/* Face */}
      <path d="M 106 172 C 106 122 116 114 150 114 C 184 114 194 122 194 172 C 194 228 178 255 150 255 C 122 255 106 228 106 172 Z" fill="url(#man-skin-base)" />

      {/* Swept brown hair */}
      <path d="M 100 158 C 98 105 115 88 150 88 C 185 88 201 105 199 158 C 192 128 178 114 150 112 C 124 112 110 126 100 158 Z" fill="#312117" />
      <path d="M 112 115 Q 148 95 188 110 Q 155 105 122 122 Z" fill="#442f22" />

      {/* Eyebrows */}
      <path d="M 118 163 Q 132 157 144 162" stroke="#291c14" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 156 162 Q 168 157 182 163" stroke="#291c14" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Eyes with warm smile */}
      <ellipse cx="132" cy="174" rx="7" ry="4.5" fill="#ffffff" />
      <ellipse cx="132" cy="174" rx="3.5" ry="3.5" fill="#33241b" />
      <circle cx="134" cy="172.5" r="1.1" fill="#ffffff" />

      <ellipse cx="168" cy="174" rx="7" ry="4.5" fill="#ffffff" />
      <ellipse cx="168" cy="174" rx="3.5" ry="3.5" fill="#33241b" />
      <circle cx="170" cy="172.5" r="1.1" fill="#ffffff" />

      {/* Nose */}
      <path d="M 149 170 L 147 201 Q 150 205 153 201 L 151 170" fill="#c38d6b" />
      <ellipse cx="150" cy="203" rx="7.8" ry="4.5" fill="#b37c59" />

      {/* Warm smile */}
      <path d="M 134 223 Q 150 235 166 223" stroke="#482017" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 136 223 Q 150 229 164 223" fill="#ffffff" />

      {/* Neat 3-day stubble */}
      <path d="M 114 195 Q 118 248 150 252 Q 182 248 186 195 Q 178 244 150 246 Q 122 244 114 195 Z" fill="#38281f" opacity="0.5" />
    </svg>
  );
}

export function LeadersSection() {
  // Mobile/click flip state map
  const [clickedFlipped, setClickedFlipped] = useState<Record<string, boolean>>({});
  // Desktop hover flip state
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Slide index (0 to 3)
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Smoothly scroll the mobile carousel to the given index
  const scrollToIndex = (index: number) => {
    const nextIdx = (index + LEADERS.length) % LEADERS.length;
    setActiveIndex(nextIdx);
    if (carouselRef.current) {
      const container = carouselRef.current;
      const card = container.children[nextIdx] as HTMLElement;
      if (card) {
        const targetScroll = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
        container.scrollTo({ left: targetScroll, behavior: 'smooth' });
      }
    }
  };

  // Auto-slide loop timer: advances every 4s unless paused or hovered
  useEffect(() => {
    if (isPaused || hoveredCard !== null) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % LEADERS.length;
        if (carouselRef.current && window.innerWidth < 640) {
          const container = carouselRef.current;
          const card = container.children[next] as HTMLElement;
          if (card) {
            const targetScroll = card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
            container.scrollTo({ left: targetScroll, behavior: 'smooth' });
          }
        }
        return next;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [isPaused, hoveredCard]);

  // Touch scroll listener: detects closest card to center on manual horizontal swipe
  const handleMobileScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const center = container.scrollLeft + container.offsetWidth / 2;
    const cards = Array.from(container.children) as HTMLElement[];
    let closestIndex = activeIndex;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const diff = Math.abs(center - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const handlePrev = () => {
    scrollToIndex(activeIndex - 1);
  };

  const handleNext = () => {
    scrollToIndex(activeIndex + 1);
  };

  const toggleClickFlip = (id: string) => {
    setClickedFlipped((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section 
      id="leaders"
      className="relative z-10 w-full min-h-screen bg-black text-white flex flex-col items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden select-none scroll-mt-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* 100% Seamless Top & Bottom Black Melt (Zero visible boundary) */}
      <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black via-black/85 to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none z-20" />

      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] pointer-events-none opacity-40 blur-[130px]"
        style={{
          background: 'radial-gradient(circle, rgba(37, 72, 195, 0.45) 0%, rgba(18, 32, 95, 0.25) 50%, transparent 80%)'
        }}
      />

      {/* Decorative Large Orbital Circle from the reference image */}
      <div 
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-blue-500/15 pointer-events-none"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black 65%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 65%, transparent 100%)'
        }}
      />
      <div 
        className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-indigo-400/8 pointer-events-none"
      />

      {/* Main Content Container - Fitted cleanly so NO card gets cut off */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto flex flex-col items-center">
        
        {/* Title Lockup matching image */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-medium tracking-tight text-white mb-1">
            Partnered with most of the
          </h2>
          <p className="font-editorial italic text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-normal tracking-wide bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-400 bg-clip-text text-transparent pb-1">
            top people at each industry
          </p>
        </div>

        {/* Carousel Row with Prev/Next Navigation Controls */}
        <div className="relative w-full flex items-center justify-center">

          {/* Left Arrow Button (Desktop) */}
          <button
            onClick={handlePrev}
            aria-label="Previous partner"
            className="hidden sm:flex absolute -left-3 lg:-left-6 z-30 w-11 h-11 rounded-full border border-white/10 bg-[#0c1228]/85 backdrop-blur-md items-center justify-center text-white/80 transition-all duration-200 hover:bg-white/15 hover:text-white hover:border-white/25 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
          >
            <ChevronLeft size={18} strokeWidth={2.2} />
          </button>

          {/* Cards Container: Horizontal snap carousel on mobile with peeking side cards; 4 columns on desktop */}
          <div className="w-full">
            <div 
              ref={carouselRef}
              onScroll={handleMobileScroll}
              data-lenis-prevent
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none gap-4 sm:gap-5 w-full pb-4 sm:pb-0 px-6 sm:px-0 scroll-smooth items-stretch"
              style={{
                WebkitOverflowScrolling: 'touch',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {LEADERS.map((leader, idx) => {
                const isManuallyFlipped = !!clickedFlipped[leader.id];
                const isHoverFlipped = hoveredCard === leader.id;
                const isFlipped = isHoverFlipped || isManuallyFlipped;
                const isActive = idx === activeIndex;

                return (
                  <div
                    key={leader.id}
                    className={`w-[78vw] sm:w-auto max-w-[310px] sm:max-w-none shrink-0 sm:shrink snap-center transition-all duration-300 ease-out ${
                      isActive 
                        ? 'scale-100 opacity-100' 
                        : 'scale-[0.96] opacity-75 sm:scale-100 sm:opacity-100'
                    }`}
                  >
                    {/* 3D Flip Card Container */}
                    <div
                      onMouseEnter={() => setHoveredCard(leader.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      onClick={() => toggleClickFlip(leader.id)}
                      style={{
                        perspective: '1200px',
                        WebkitPerspective: '1200px'
                      }}
                      className={`group relative h-[385px] sm:h-[400px] w-full rounded-[22px] cursor-pointer select-none transition-all duration-300 ${
                        isActive ? 'sm:ring-0 ring-1 ring-blue-400/50 shadow-[0_0_30px_rgba(37,72,195,0.35)]' : ''
                      }`}
                    >
                      <div
                        style={{
                          transformStyle: 'preserve-3d',
                          WebkitTransformStyle: 'preserve-3d',
                          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          WebkitTransform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
                        }}
                        className="relative w-full h-full rounded-[22px] transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
                      >
                        {/* ================= FRONT SIDE (Portrait View) ================= */}
                        <div 
                          style={{
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(0deg)',
                            WebkitTransform: 'rotateY(0deg)',
                            background: 'radial-gradient(circle at 50% 65%, #18285c 0%, #0b112c 55%, #060918 100%)'
                          }}
                          className="absolute inset-0 w-full h-full rounded-[22px] overflow-hidden border border-blue-900/30 group-hover:border-blue-500/40 transition-colors duration-500 flex flex-col justify-end p-5"
                        >
                          {/* Inner Vignette */}
                          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#060918] via-transparent to-transparent opacity-85" />

                          {/* Mobile Tap Cue Badge */}
                          <div className="sm:hidden absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10.5px] tracking-wider font-mono text-blue-200 flex items-center gap-1 shadow-md pointer-events-none">
                            <span>Bio</span>
                            <span className="text-white/60">→</span>
                          </div>

                          {/* High-Fidelity Portrait */}
                          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                            <LeaderPortrait type={leader.avatarType} />
                          </div>

                          {/* Bottom Gradient Fade for Crisp Typography */}
                          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050816] via-[#050816]/75 to-transparent pointer-events-none" />

                          {/* Typography at Bottom-Left */}
                          <div className="relative z-10">
                            <h3 className="text-white font-medium text-[19px] tracking-tight leading-tight">
                              {leader.name}
                            </h3>
                            <p className="text-blue-300/60 text-[13px] font-normal tracking-wide mt-1">
                              {leader.category}
                            </p>
                          </div>
                        </div>

                        {/* ================= BACK SIDE (Active Blue Grid Bio Card on Hover) ================= */}
                        <div 
                          style={{
                            transform: 'rotateY(180deg)',
                            WebkitTransform: 'rotateY(180deg)',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            background: 'linear-gradient(175deg, #1d33a6 0%, #1a2e96 50%, #15257c 100%)'
                          }}
                          className="absolute inset-0 w-full h-full rounded-[22px] overflow-hidden border border-blue-400/40 p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(30,64,175,0.45)]"
                        >
                          {/* The Blueprint Tech Grid Texture from reference */}
                          <div className="absolute inset-0 bg-tech-grid pointer-events-none opacity-85" />
                          
                          {/* Top ambient corner glow */}
                          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-300/20 blur-xl pointer-events-none" />

                          {/* Mobile Flip-back badge */}
                          <div className="sm:hidden absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-[10.5px] tracking-wider font-mono text-blue-100 flex items-center gap-1 shadow-md pointer-events-none">
                            <span>Photo</span>
                            <span className="text-white/60">↺</span>
                          </div>

                          {/* Top Header Information */}
                          <div className="relative z-10">
                            <h3 className="text-white font-semibold text-[20px] tracking-tight leading-snug">
                              {leader.name}
                            </h3>
                            <p className="text-blue-200/75 text-[12.5px] font-normal tracking-wide mt-0.5">
                              {leader.category}
                            </p>
                          </div>

                          {/* Bottom Bio Prose matching the exact wording */}
                          <div className="relative z-10 mt-auto">
                            <p className="text-blue-100/95 text-[12.5px] leading-[1.65] font-light tracking-normal">
                              {leader.bio}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Arrow Button (Desktop) */}
          <button
            onClick={handleNext}
            aria-label="Next partner"
            className="hidden sm:flex absolute -right-3 lg:-right-6 z-30 w-11 h-11 rounded-full border border-white/10 bg-[#0c1228]/85 backdrop-blur-md items-center justify-center text-white/80 transition-all duration-200 hover:bg-white/15 hover:text-white hover:border-white/25 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
          >
            <ChevronRight size={18} strokeWidth={2.2} />
          </button>

        </div>

        {/* Bottom Horizontal Progress & Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-center mt-7 sm:mt-9 gap-4">
          
          {/* Desktop Progress Indicator */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="w-48 h-[2.5px] bg-white/10 rounded-full relative overflow-hidden">
              <div 
                className="h-full bg-white/70 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${100 / LEADERS.length}%`,
                  transform: `translateX(${activeIndex * 100}%)`
                }}
              />
            </div>

            {/* Subtle Pause / Play indicator */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play auto slide" : "Pause auto slide"}
              className="text-white/30 hover:text-white/70 transition-colors p-1 rounded-full cursor-pointer"
              title={isPaused ? "Resume auto slide" : "Pause auto slide"}
            >
              {isPaused ? <Play size={12} /> : <Pause size={12} />}
            </button>
          </div>

          {/* Mobile Interactive Pagination Controls */}
          <div className="flex sm:hidden items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous partner card"
              className="w-9 h-9 rounded-full border border-white/15 bg-[#0c1228]/90 backdrop-blur-md flex items-center justify-center text-white/80 active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Interactive Dot/Pill buttons */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              {LEADERS.map((leader, i) => (
                <button
                  key={leader.id}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${leader.name}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    i === activeIndex 
                      ? 'w-6 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]' 
                      : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              aria-label="Next partner card"
              className="w-9 h-9 rounded-full border border-white/15 bg-[#0c1228]/90 backdrop-blur-md flex items-center justify-center text-white/80 active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronRight size={16} />
            </button>

            {/* Mobile Pause / Play indicator */}
            <button
              onClick={() => setIsPaused(!isPaused)}
              aria-label={isPaused ? "Play auto slide" : "Pause auto slide"}
              className="w-8 h-8 rounded-full border border-white/10 bg-[#0c1228]/70 flex items-center justify-center text-white/40 active:scale-95 ml-1"
            >
              {isPaused ? <Play size={11} /> : <Pause size={11} />}
            </button>
          </div>

        </div>

      </div>

      <style>{`
        .perspective-1200 {
          perspective: 1200px;
          -webkit-perspective: 1200px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @keyframes fadeInSlide {
          0% {
            opacity: 0.5;
            transform: scale(0.97);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
export default LeadersSection;
