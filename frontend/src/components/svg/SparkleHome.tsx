"use client";

import { useState, useEffect, useId } from "react";

/**
 * SparkleHome - Animated SVG showing a clean, sparkling home
 * Perfect for cleaning service hero sections
 */

interface Props {
  width?: number;
  height?: number;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}

export default function SparkleHome({
  width = 300,
  height = 280,
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

  const cx = width / 2;

  // Sparkle positions around the house
  const sparkles = [
    { x: cx - 70, y: 80, delay: 0, size: 1 },
    { x: cx + 75, y: 90, delay: 0.3, size: 0.8 },
    { x: cx - 50, y: 140, delay: 0.6, size: 0.6 },
    { x: cx + 60, y: 160, delay: 0.9, size: 0.9 },
    { x: cx - 30, y: 60, delay: 1.2, size: 0.7 },
    { x: cx + 40, y: 70, delay: 0.4, size: 0.85 },
    { x: cx, y: 50, delay: 0.7, size: 1.1 },
    { x: cx - 80, y: 180, delay: 1.0, size: 0.65 },
    { x: cx + 85, y: 200, delay: 0.2, size: 0.75 },
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

        <linearGradient id={`house-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>

        <linearGradient id={`roof-grad-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>

        <linearGradient id={`shine-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="50%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Ground shadow */}
      <ellipse
        cx={cx}
        cy={height - 25}
        rx={90}
        ry={12}
        fill={primaryColor}
        fillOpacity={0.15}
        style={{
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.5s ease-out",
        }}
      />

      {/* House body */}
      <g
        style={{
          opacity: mounted ? 1 : 0,
          transform: `translateY(${mounted ? 0 : 20}px)`,
          transition: "all 0.6s ease-out",
        }}
      >
        {/* Main house structure */}
        <rect
          x={cx - 65}
          y={130}
          width={130}
          height={100}
          rx={4}
          fill={`url(#house-grad-${id})`}
        />

        {/* Roof */}
        <polygon
          points={`${cx - 80},130 ${cx},60 ${cx + 80},130`}
          fill={`url(#roof-grad-${id})`}
        />

        {/* Roof highlight */}
        <polygon
          points={`${cx - 75},128 ${cx},68 ${cx + 10},95`}
          fill={`url(#shine-${id})`}
        />

        {/* Chimney */}
        <rect
          x={cx + 30}
          y={75}
          width={20}
          height={35}
          fill={primaryColor}
        />

        {/* Door */}
        <rect
          x={cx - 18}
          y={170}
          width={36}
          height={60}
          rx={3}
          fill="#1E3A5F"
        />
        <circle
          cx={cx + 10}
          cy={200}
          r={3}
          fill={accentColor}
        />

        {/* Windows */}
        {[
          { x: cx - 50, y: 150 },
          { x: cx + 30, y: 150 },
        ].map((win, i) => (
          <g key={i}>
            <rect
              x={win.x}
              y={win.y}
              width={30}
              height={35}
              rx={2}
              fill="#87CEEB"
              stroke="white"
              strokeWidth={2}
            />
            {/* Window cross */}
            <line
              x1={win.x + 15}
              y1={win.y}
              x2={win.x + 15}
              y2={win.y + 35}
              stroke="white"
              strokeWidth={2}
            />
            <line
              x1={win.x}
              y1={win.y + 17}
              x2={win.x + 30}
              y2={win.y + 17}
              stroke="white"
              strokeWidth={2}
            />
            {/* Window shine */}
            <rect
              x={win.x + 3}
              y={win.y + 3}
              width={10}
              height={12}
              fill="white"
              fillOpacity={0.3}
            />
          </g>
        ))}

        {/* Attic window */}
        <circle
          cx={cx}
          cy={100}
          r={15}
          fill="#87CEEB"
          stroke="white"
          strokeWidth={2}
        />
        <line
          x1={cx}
          y1={85}
          x2={cx}
          y2={115}
          stroke="white"
          strokeWidth={2}
        />
        <line
          x1={cx - 15}
          y1={100}
          x2={cx + 15}
          y2={100}
          stroke="white"
          strokeWidth={2}
        />
      </g>

      {/* Sparkles */}
      {sparkles.map((sparkle, i) => {
        const pulse = Math.sin(time * 3 + sparkle.delay * 5);
        const isVisible = pulse > -0.3;
        const scale = sparkle.size * (0.5 + (pulse + 1) * 0.5);

        return (
          <g
            key={i}
            style={{
              opacity: mounted && isVisible ? 0.8 + pulse * 0.2 : 0,
              transform: `translate(${sparkle.x}px, ${sparkle.y}px) scale(${scale})`,
              transformOrigin: "0 0",
              transition: "opacity 0.2s",
            }}
          >
            {/* 4-point star sparkle */}
            <path
              d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
              fill={accentColor}
              filter={`url(#glow-${id})`}
            />
            {/* Center dot */}
            <circle r={2} fill="white" />
          </g>
        );
      })}

      {/* Floating clean particles */}
      {mounted && [0, 1, 2, 3, 4].map((i) => {
        const angle = (time * 0.5 + i * 72) * (Math.PI / 180) * 5;
        const radius = 100 + Math.sin(time + i) * 20;
        const x = cx + Math.cos(angle) * radius * 0.8;
        const y = 140 + Math.sin(angle) * radius * 0.4;

        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={2}
            fill={secondaryColor}
            opacity={0.4 + Math.sin(time * 2 + i) * 0.3}
          />
        );
      })}

      {/* "Clean" badge */}
      <g
        style={{
          opacity: mounted ? 1 : 0,
          transform: `scale(${mounted ? 1 : 0}) translate(${cx + 50}px, 45px)`,
          transformOrigin: `${cx + 50}px 45px`,
          transition: "all 0.5s ease-out 0.3s",
        }}
      >
        <circle
          r={22}
          fill={accentColor}
          filter={`url(#glow-${id})`}
        />
        <path
          d="M -8 0 L -3 5 L 8 -6"
          stroke="white"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* Bottom text */}
      <text
        x={cx}
        y={height - 5}
        textAnchor="middle"
        fontSize="11"
        fontFamily="system-ui, sans-serif"
        fontWeight="600"
        fill={primaryColor}
        opacity={mounted ? 0.7 : 0}
        style={{ transition: "opacity 0.5s ease-out 0.4s" }}
      >
        Sparkling Clean
      </text>
    </svg>
  );
}
