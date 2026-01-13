"use client";

import { useState, useEffect, useId } from "react";

/**
 * CleaningTransform - Before/After cleaning transformation
 * Animated reveal showing the cleaning difference
 */

interface Props {
  width?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function CleaningTransform({
  width = 420,
  height = 240,
  primaryColor = "#3B82F6",
  secondaryColor = "#60A5FA",
  accentColor = "#FCD34D",
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(0);
  const id = useId().replace(/:/g, "");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let frame: number;
    const animate = (timestamp: number) => {
      setTime(timestamp / 1000);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const cy = height / 2 + 10;

  // Reveal progress (0 to 1, cycles every 5 seconds)
  const cycle = (time * 0.2) % 1;
  const revealProgress = cycle < 0.5 ? cycle * 2 : 1;

  // Room elements
  const roomElements = [
    { type: "couch", x: 50, y: cy + 15, w: 90, h: 40 },
    { type: "table", x: 165, y: cy + 30, w: 50, h: 30 },
    { type: "lamp", x: 240, y: cy - 20, w: 25, h: 60 },
    { type: "plant", x: 310, y: cy + 5, w: 35, h: 50 },
    { type: "rug", x: 120, y: cy + 55, w: 120, h: 25 },
  ];

  // Wall stains for dirty state
  const wallStains = [
    { x: 60, y: 70, w: 25, h: 15 },
    { x: 150, y: 55, w: 35, h: 20 },
    { x: 280, y: 65, w: 20, h: 25 },
    { x: 350, y: 80, w: 30, h: 15 },
    { x: 100, y: 90, w: 18, h: 12 },
  ];

  // Floor stains/dirt
  const floorStains = [
    { x: 70, y: cy + 65, w: 30, h: 12 },
    { x: 180, y: cy + 70, w: 40, h: 10 },
    { x: 290, y: cy + 62, w: 25, h: 15 },
    { x: 130, y: cy + 58, w: 20, h: 8 },
    { x: 340, y: cy + 68, w: 35, h: 12 },
  ];

  // Scattered items (mess)
  const messItems = [
    { type: "sock", x: 200, y: cy + 50 },
    { type: "paper", x: 85, y: cy + 45 },
    { type: "cup", x: 270, y: cy + 48 },
    { type: "paper", x: 320, y: cy + 42 },
    { type: "toy", x: 150, y: cy + 52 },
  ];

  // Dust clouds
  const dustClouds = Array.from({ length: 8 }, (_, i) => ({
    x: 50 + (i * 47) % 320,
    y: 60 + (i * 23) % 50,
    size: 8 + (i % 3) * 4,
  }));

  // Floating dust particles
  const dustParticles = Array.from({ length: 20 }, (_, i) => ({
    x: 40 + (i * 19) % 340,
    y: 50 + (i * 13) % 100,
    size: 2 + (i % 3),
    speed: 0.3 + (i % 5) * 0.1,
  }));

  // Sparkles for after state
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    x: 45 + (i * 33) % 340,
    y: 50 + (i * 17) % 110,
    delay: i * 0.12,
  }));

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id={`glow-${id}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <clipPath id={`reveal-clip-${id}`}>
          <rect x={0} y={0} width={width * revealProgress} height={height} />
        </clipPath>

        <linearGradient id={`clean-floor-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAFAF9" />
          <stop offset="100%" stopColor="#E7E5E4" />
        </linearGradient>

        <linearGradient id={`dirty-floor-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A8A29E" />
          <stop offset="100%" stopColor="#78716C" />
        </linearGradient>

        <linearGradient id={`clean-wall-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0F9FF" />
          <stop offset="100%" stopColor="#E0F2FE" />
        </linearGradient>

        <linearGradient id={`dirty-wall-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D6D3D1" />
          <stop offset="100%" stopColor="#A8A29E" />
        </linearGradient>
      </defs>

      {/* Labels */}
      <text
        x={40}
        y={22}
        fontSize="12"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fill="#78716C"
        opacity={mounted ? 1 : 0}
      >
        BEFORE
      </text>
      <text
        x={width - 40}
        y={22}
        textAnchor="end"
        fontSize="12"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fill={primaryColor}
        opacity={mounted ? 1 : 0}
      >
        AFTER
      </text>

      {/* === BEFORE STATE (Very messy room) === */}
      <g style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s" }}>
        {/* Dirty wall with stains */}
        <rect x={20} y={35} width={width - 40} height={cy + 20} fill={`url(#dirty-wall-${id})`} />

        {/* Wall stains */}
        {wallStains.map((stain, i) => (
          <ellipse
            key={`stain-${i}`}
            cx={stain.x + stain.w / 2}
            cy={stain.y + stain.h / 2}
            rx={stain.w / 2}
            ry={stain.h / 2}
            fill="#8B7355"
            opacity={0.3 + (i % 3) * 0.1}
          />
        ))}

        {/* Dirty floor */}
        <rect x={20} y={cy + 55} width={width - 40} height={45} fill={`url(#dirty-floor-${id})`} />

        {/* Floor stains */}
        {floorStains.map((stain, i) => (
          <ellipse
            key={`floor-stain-${i}`}
            cx={stain.x + stain.w / 2}
            cy={stain.y + stain.h / 2}
            rx={stain.w / 2}
            ry={stain.h / 2}
            fill="#57534E"
            opacity={0.4 + (i % 2) * 0.15}
          />
        ))}

        {/* Baseboards (dirty) */}
        <rect x={20} y={cy + 52} width={width - 40} height={5} fill="#78716C" />

        {/* Furniture (dirty/faded) */}
        {roomElements.map((el, i) => (
          <g key={`before-${i}`}>
            {el.type === "couch" && (
              <g>
                <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={5} fill="#6B7280" />
                <rect x={el.x + 5} y={el.y - 20} width={el.w - 10} height={22} rx={3} fill="#6B7280" />
                {/* Cushion stains */}
                <ellipse cx={el.x + 25} cy={el.y + 15} rx={12} ry={8} fill="#57534E" opacity={0.3} />
                <ellipse cx={el.x + 65} cy={el.y + 20} rx={10} ry={6} fill="#57534E" opacity={0.25} />
              </g>
            )}
            {el.type === "table" && (
              <g>
                <rect x={el.x} y={el.y} width={el.w} height={5} rx={2} fill="#78716C" />
                <rect x={el.x + 5} y={el.y + 5} width={4} height={el.h - 5} fill="#78716C" />
                <rect x={el.x + el.w - 9} y={el.y + 5} width={4} height={el.h - 5} fill="#78716C" />
                {/* Ring stains on table */}
                <circle cx={el.x + 15} cy={el.y + 2} r={6} fill="none" stroke="#57534E" strokeWidth={2} opacity={0.4} />
                <circle cx={el.x + 35} cy={el.y + 2} r={5} fill="none" stroke="#57534E" strokeWidth={2} opacity={0.3} />
              </g>
            )}
            {el.type === "lamp" && (
              <g>
                <rect x={el.x + 10} y={el.y + 25} width={6} height={35} fill="#A8A29E" />
                <ellipse cx={el.x + 13} cy={el.y + 18} rx={14} ry={18} fill="#D6D3D1" />
                {/* Dusty lamp */}
                <ellipse cx={el.x + 13} cy={el.y + 18} rx={14} ry={18} fill="#8B8178" opacity={0.2} />
              </g>
            )}
            {el.type === "plant" && (
              <g>
                <rect x={el.x + 12} y={el.y + 30} width={12} height={20} fill="#78716C" />
                {/* Dead/wilted plant */}
                <ellipse cx={el.x + 18} cy={el.y + 18} rx={18} ry={22} fill="#6B7280" />
                <path d={`M ${el.x + 10} ${el.y + 25} Q ${el.x + 5} ${el.y + 10} ${el.x + 18} ${el.y - 5}`} stroke="#57534E" strokeWidth={2} fill="none" />
              </g>
            )}
            {el.type === "rug" && (
              <g>
                <ellipse cx={el.x + el.w / 2} cy={el.y + el.h / 2} rx={el.w / 2} ry={el.h / 2} fill="#8B7355" />
                {/* Dirty rug stains */}
                <ellipse cx={el.x + 30} cy={el.y + 10} rx={15} ry={8} fill="#57534E" opacity={0.4} />
                <ellipse cx={el.x + 80} cy={el.y + 15} rx={20} ry={6} fill="#57534E" opacity={0.35} />
              </g>
            )}
          </g>
        ))}

        {/* Scattered mess items */}
        {messItems.map((item, i) => (
          <g key={`mess-${i}`}>
            {item.type === "sock" && (
              <ellipse cx={item.x} cy={item.y} rx={8} ry={5} fill="#9CA3AF" transform={`rotate(${20 + i * 15} ${item.x} ${item.y})`} />
            )}
            {item.type === "paper" && (
              <rect x={item.x - 6} y={item.y - 4} width={12} height={8} fill="#E5E7EB" transform={`rotate(${-10 + i * 25} ${item.x} ${item.y})`} />
            )}
            {item.type === "cup" && (
              <g transform={`rotate(${70} ${item.x} ${item.y})`}>
                <ellipse cx={item.x} cy={item.y} rx={6} ry={4} fill="#D6D3D1" />
                <rect x={item.x - 5} y={item.y - 10} width={10} height={10} rx={1} fill="#E5E7EB" />
              </g>
            )}
            {item.type === "toy" && (
              <circle cx={item.x} cy={item.y} r={5} fill="#F87171" opacity={0.7} />
            )}
          </g>
        ))}

        {/* Dust clouds */}
        {dustClouds.map((cloud, i) => (
          <ellipse
            key={`cloud-${i}`}
            cx={cloud.x}
            cy={cloud.y + Math.sin(time * 0.5 + i) * 3}
            rx={cloud.size}
            ry={cloud.size * 0.6}
            fill="#A8A29E"
            opacity={0.2 + Math.sin(time * 0.3 + i * 0.5) * 0.1}
          />
        ))}

        {/* Floating dust particles */}
        {dustParticles.map((p, i) => (
          <circle
            key={`dust-${i}`}
            cx={p.x + Math.sin(time * p.speed + i) * 5}
            cy={p.y + Math.cos(time * p.speed * 0.7 + i) * 3}
            r={p.size}
            fill="#9CA3AF"
            opacity={0.3 + Math.sin(time + i) * 0.15}
          />
        ))}

        {/* Cobweb in corner */}
        <g opacity={0.3}>
          <path d={`M 25 40 Q 45 45 60 40`} stroke="#9CA3AF" strokeWidth={0.5} fill="none" />
          <path d={`M 25 40 Q 40 55 25 70`} stroke="#9CA3AF" strokeWidth={0.5} fill="none" />
          <path d={`M 25 40 L 50 60`} stroke="#9CA3AF" strokeWidth={0.5} fill="none" />
          <path d={`M 30 45 Q 40 50 45 45`} stroke="#9CA3AF" strokeWidth={0.5} fill="none" />
        </g>
      </g>

      {/* === AFTER STATE (Sparkling clean) === */}
      <g clipPath={`url(#reveal-clip-${id})`}>
        {/* Clean wall */}
        <rect x={20} y={35} width={width - 40} height={cy + 20} fill={`url(#clean-wall-${id})`} />

        {/* Clean floor */}
        <rect x={20} y={cy + 55} width={width - 40} height={45} fill={`url(#clean-floor-${id})`} />

        {/* Floor shine lines */}
        {[0, 1, 2].map((i) => (
          <line
            key={`shine-${i}`}
            x1={60 + i * 120}
            y1={cy + 75}
            x2={120 + i * 120}
            y2={cy + 75}
            stroke="white"
            strokeWidth={2}
            opacity={0.5}
          />
        ))}

        {/* Clean baseboards */}
        <rect x={20} y={cy + 52} width={width - 40} height={5} fill="#E5E7EB" />

        {/* Furniture (vibrant/clean) */}
        {roomElements.map((el, i) => (
          <g key={`after-${i}`}>
            {el.type === "couch" && (
              <g>
                <rect x={el.x} y={el.y} width={el.w} height={el.h} rx={5} fill={primaryColor} />
                <rect x={el.x + 5} y={el.y - 20} width={el.w - 10} height={22} rx={3} fill={primaryColor} />
                {/* Clean cushion highlights */}
                <rect x={el.x + 8} y={el.y + 5} width={25} height={3} rx={1} fill="white" opacity={0.3} />
                <rect x={el.x + 55} y={el.y + 5} width={25} height={3} rx={1} fill="white" opacity={0.3} />
              </g>
            )}
            {el.type === "table" && (
              <g>
                <rect x={el.x} y={el.y} width={el.w} height={5} rx={2} fill="#92400E" />
                <rect x={el.x + 5} y={el.y + 5} width={4} height={el.h - 5} fill="#92400E" />
                <rect x={el.x + el.w - 9} y={el.y + 5} width={4} height={el.h - 5} fill="#92400E" />
                {/* Clean shine */}
                <rect x={el.x + 5} y={el.y + 1} width={20} height={2} rx={1} fill="white" opacity={0.4} />
              </g>
            )}
            {el.type === "lamp" && (
              <g>
                <rect x={el.x + 10} y={el.y + 25} width={6} height={35} fill="#78716C" />
                <ellipse cx={el.x + 13} cy={el.y + 18} rx={14} ry={18} fill={accentColor} />
                {/* Lamp glow */}
                <ellipse cx={el.x + 13} cy={el.y + 18} rx={18} ry={22} fill={accentColor} opacity={0.2} />
              </g>
            )}
            {el.type === "plant" && (
              <g>
                <rect x={el.x + 12} y={el.y + 30} width={12} height={20} fill="#92400E" />
                {/* Healthy plant */}
                <ellipse cx={el.x + 18} cy={el.y + 18} rx={18} ry={22} fill="#10B981" />
                <ellipse cx={el.x + 12} cy={el.y + 12} rx={8} ry={10} fill="#34D399" />
              </g>
            )}
            {el.type === "rug" && (
              <g>
                <ellipse cx={el.x + el.w / 2} cy={el.y + el.h / 2} rx={el.w / 2} ry={el.h / 2} fill="#3B82F6" opacity={0.3} />
                <ellipse cx={el.x + el.w / 2} cy={el.y + el.h / 2} rx={el.w / 2 - 10} ry={el.h / 2 - 5} fill="#60A5FA" opacity={0.3} />
              </g>
            )}
          </g>
        ))}

        {/* Sparkles */}
        {sparkles.map((s, i) => {
          const pulse = Math.sin(time * 3 + s.delay * 8);
          const isVisible = pulse > -0.2;
          return (
            <g
              key={`sparkle-${i}`}
              style={{
                opacity: isVisible ? 0.7 + pulse * 0.3 : 0,
                transform: `translate(${s.x}px, ${s.y}px) scale(${0.4 + pulse * 0.3})`,
                transformOrigin: "0 0",
              }}
            >
              <path
                d="M 0 -7 L 2 -2 L 7 0 L 2 2 L 0 7 L -2 2 L -7 0 L -2 -2 Z"
                fill={accentColor}
                filter={`url(#glow-${id})`}
              />
            </g>
          );
        })}
      </g>

      {/* Reveal line */}
      <line
        x1={width * revealProgress}
        y1={30}
        x2={width * revealProgress}
        y2={height - 15}
        stroke={primaryColor}
        strokeWidth={4}
        strokeLinecap="round"
        filter={`url(#glow-${id})`}
        style={{ opacity: mounted && revealProgress > 0.02 && revealProgress < 0.98 ? 1 : 0 }}
      />

      {/* Cleaning wand icon on reveal line */}
      {revealProgress > 0.02 && revealProgress < 0.98 && (
        <g style={{ transform: `translate(${width * revealProgress}px, ${cy + 10}px)` }}>
          <circle r={20} fill={primaryColor} filter={`url(#glow-${id})`} />
          <circle r={16} fill="white" />
          {/* Sparkle wand icon */}
          <line x1={-6} y1={6} x2={6} y2={-6} stroke={primaryColor} strokeWidth={3} strokeLinecap="round" />
          <path d="M 4 -8 L 5 -5 L 8 -4 L 5 -3 L 4 0 L 3 -3 L 0 -4 L 3 -5 Z" fill={accentColor} />
        </g>
      )}

      {/* Progress bar */}
      <g style={{ opacity: mounted ? 1 : 0 }}>
        <rect x={width / 2 - 80} y={height - 15} width={160} height={8} rx={4} fill="#E5E7EB" />
        <rect x={width / 2 - 80} y={height - 15} width={160 * revealProgress} height={8} rx={4} fill={primaryColor} />
      </g>
    </svg>
  );
}
