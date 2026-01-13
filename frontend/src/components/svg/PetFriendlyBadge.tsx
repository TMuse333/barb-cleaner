"use client";

import { useState, useEffect, useId } from "react";

/**
 * PetFriendlyBadge - Animated badge showing pet-safe cleaning
 * Features a happy pet with heart and shield elements
 */

interface Props {
  width?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function PetFriendlyBadge({
  width = 200,
  height = 220,
  primaryColor = "#3B82F6",
  secondaryColor = "#60A5FA",
  accentColor = "#F472B6",
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

  const cx = width / 2;
  const cy = height / 2 - 10;

  // Floating hearts
  const hearts = [
    { x: -50, y: -30, delay: 0, size: 0.6 },
    { x: 55, y: -20, delay: 0.5, size: 0.5 },
    { x: -40, y: 30, delay: 1, size: 0.4 },
    { x: 50, y: 40, delay: 1.5, size: 0.55 },
  ];

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

        <linearGradient id={`badge-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        <linearGradient id={`shield-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={secondaryColor} />
          <stop offset="100%" stopColor={primaryColor} />
        </linearGradient>
      </defs>

      {/* Outer badge circle */}
      <circle
        cx={cx}
        cy={cy}
        r={75}
        fill={`url(#badge-grad-${id})`}
        style={{
          opacity: mounted ? 1 : 0,
          transform: `scale(${mounted ? 1 : 0})`,
          transformOrigin: `${cx}px ${cy}px`,
          transition: "all 0.5s ease-out",
        }}
      />

      {/* Inner circle */}
      <circle
        cx={cx}
        cy={cy}
        r={65}
        fill="white"
        style={{
          opacity: mounted ? 1 : 0,
          transform: `scale(${mounted ? 1 : 0})`,
          transformOrigin: `${cx}px ${cy}px`,
          transition: "all 0.4s ease-out 0.1s",
        }}
      />

      {/* Paw print */}
      <g
        style={{
          opacity: mounted ? 1 : 0,
          transform: `scale(${mounted ? 1 : 0})`,
          transformOrigin: `${cx}px ${cy}px`,
          transition: "all 0.5s ease-out 0.2s",
        }}
      >
        {/* Main pad */}
        <ellipse
          cx={cx}
          cy={cy + 15}
          rx={22}
          ry={18}
          fill={primaryColor}
        />

        {/* Toe pads */}
        {[
          { x: -18, y: -12 },
          { x: -6, y: -22 },
          { x: 8, y: -22 },
          { x: 20, y: -12 },
        ].map((toe, i) => (
          <ellipse
            key={i}
            cx={cx + toe.x}
            cy={cy + toe.y}
            rx={10}
            ry={12}
            fill={primaryColor}
            style={{
              transform: `scale(${1 + Math.sin(time * 2 + i * 0.5) * 0.05})`,
              transformOrigin: `${cx + toe.x}px ${cy + toe.y}px`,
            }}
          />
        ))}

        {/* Heart in center of paw */}
        <path
          d={`M ${cx} ${cy + 8}
              C ${cx - 8} ${cy} ${cx - 12} ${cy + 12} ${cx} ${cy + 20}
              C ${cx + 12} ${cy + 12} ${cx + 8} ${cy} ${cx} ${cy + 8}`}
          fill={accentColor}
          style={{
            transform: `scale(${1 + Math.sin(time * 3) * 0.1})`,
            transformOrigin: `${cx}px ${cy + 12}px`,
          }}
        />
      </g>

      {/* Checkmark shield */}
      <g
        style={{
          opacity: mounted ? 1 : 0,
          transform: `translate(${cx + 45}px, ${cy - 45}px) scale(${mounted ? 1 : 0})`,
          transformOrigin: "0 0",
          transition: "all 0.4s ease-out 0.4s",
        }}
      >
        {/* Shield shape */}
        <path
          d="M 0 -18 L 18 -10 L 18 8 C 18 18 0 26 0 26 C 0 26 -18 18 -18 8 L -18 -10 Z"
          fill="#10B981"
          filter={`url(#glow-${id})`}
        />
        {/* Checkmark */}
        <path
          d="M -7 2 L -2 7 L 8 -5"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Floating hearts */}
      {hearts.map((heart, i) => {
        const floatY = Math.sin(time * 2 + heart.delay) * 8;
        const pulse = 1 + Math.sin(time * 3 + heart.delay) * 0.15;

        return (
          <path
            key={i}
            d={`M 0 3 C -5 -2 -9 3 0 10 C 9 3 5 -2 0 3`}
            fill={accentColor}
            style={{
              opacity: mounted ? 0.6 + Math.sin(time * 2 + heart.delay) * 0.2 : 0,
              transform: `translate(${cx + heart.x}px, ${cy + heart.y + floatY}px) scale(${heart.size * pulse})`,
              transition: "opacity 0.3s",
            }}
          />
        );
      })}

      {/* Rotating sparkle ring */}
      <circle
        cx={cx}
        cy={cy}
        r={80}
        fill="none"
        stroke={secondaryColor}
        strokeWidth={2}
        strokeDasharray="8 20"
        strokeLinecap="round"
        style={{
          opacity: mounted ? 0.3 : 0,
          transform: `rotate(${time * 20}deg)`,
          transformOrigin: `${cx}px ${cy}px`,
        }}
      />

      {/* Text labels */}
      <text
        x={cx}
        y={height - 25}
        textAnchor="middle"
        fontSize="14"
        fontFamily="system-ui, sans-serif"
        fontWeight="700"
        fill={primaryColor}
        opacity={mounted ? 1 : 0}
        style={{ transition: "opacity 0.5s ease-out 0.5s" }}
      >
        Pet Friendly
      </text>
      <text
        x={cx}
        y={height - 8}
        textAnchor="middle"
        fontSize="10"
        fontFamily="system-ui, sans-serif"
        fill={primaryColor}
        opacity={mounted ? 0.6 : 0}
        style={{ transition: "opacity 0.5s ease-out 0.6s" }}
      >
        Safe for your furry family
      </text>
    </svg>
  );
}
