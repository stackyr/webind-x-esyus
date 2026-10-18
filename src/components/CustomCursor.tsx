"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates for instantaneous inner laser dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for outer trailing ring
  const ringX = useSpring(mouseX, { damping: 24, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(mouseY, { damping: 24, stiffness: 220, mass: 0.6 });

  // Ultra-smooth trailing physics for ambient torch / spotlight
  const torchX = useSpring(mouseX, { damping: 32, stiffness: 120, mass: 1.2 });
  const torchY = useSpring(mouseY, { damping: 32, stiffness: 120, mass: 1.2 });

  useEffect(() => {
    // Disable on mobile / touch-only devices
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Detect interactive/clickable elements for magnetic hover scale
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive =
        target.closest("button") ||
        target.closest("a") ||
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest('[role="button"]') ||
        target.closest(".cursor-pointer") ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isInteractive);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice) return null;

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-50 overflow-hidden transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Ambient Dynamic Spotlight Follower (Webind Crimson with subtle luxury glow) */}
      <motion.div
        style={{
          x: torchX,
          y: torchY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="pointer-events-none fixed top-0 left-0 w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,56,76,0.13)_0%,rgba(0,102,255,0.05)_45%,transparent_70%)] blur-2xl"
      />

      {/* 2. Outer Smooth Trailing Ring (Expands on hover, compresses on click) */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.85 : isHovered ? 1.6 : 1,
          borderColor: isHovered ? "rgba(255, 56, 76, 0.9)" : "rgba(255, 56, 76, 0.45)",
          backgroundColor: isHovered ? "rgba(255, 56, 76, 0.12)" : "rgba(255, 56, 76, 0.04)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="pointer-events-none fixed top-0 left-0 w-9 h-9 rounded-full border border-[#FF384C]/50 shadow-[0_0_15px_rgba(255,56,76,0.25)] backdrop-blur-[0.5px]"
      />

      {/* 3. Inner Precision Red Laser Dot (Zero-lag instantaneous snap) */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isClicked ? 0.7 : isHovered ? 0.5 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="pointer-events-none fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF384C] shadow-[0_0_10px_#FF384C]"
      />
    </div>
  );
};
