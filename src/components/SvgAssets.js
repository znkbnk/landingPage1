// SvgAssets.js
import React from 'react';

export const WavyLine = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 1200 200" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M0,100 C150,180 350,0 500,100 C650,200 850,0 1000,100 C1150,180 1350,0 1500,100" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export const CirclePattern = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="5" />
    <circle cx="60" cy="20" r="5" />
    <circle cx="100" cy="20" r="5" />
    <circle cx="140" cy="20" r="5" />
    <circle cx="180" cy="20" r="5" />
    <circle cx="20" cy="60" r="5" />
    <circle cx="60" cy="60" r="5" />
    <circle cx="100" cy="60" r="5" />
    <circle cx="140" cy="60" r="5" />
    <circle cx="180" cy="60" r="5" />
    <circle cx="20" cy="100" r="5" />
    <circle cx="60" cy="100" r="5" />
    <circle cx="100" cy="100" r="5" />
    <circle cx="140" cy="100" r="5" />
    <circle cx="180" cy="100" r="5" />
    <circle cx="20" cy="140" r="5" />
    <circle cx="60" cy="140" r="5" />
    <circle cx="100" cy="140" r="5" />
    <circle cx="140" cy="140" r="5" />
    <circle cx="180" cy="140" r="5" />
    <circle cx="20" cy="180" r="5" />
    <circle cx="60" cy="180" r="5" />
    <circle cx="100" cy="180" r="5" />
    <circle cx="140" cy="180" r="5" />
    <circle cx="180" cy="180" r="5" />
  </svg>
);

export const Blob = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 200 200" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M41.3,-56.1C53.4,-47.6,63.2,-35.2,68.1,-21.1C73,-7,73,-6.8,69.5,-24.1C66,-41.4,58.9,-66.3,44.5,-74C30.1,-81.8,8.4,-72.3,-8.9,-63.9C-26.2,-55.4,-39.1,-48,-47.3,-37.7C-55.5,-27.4,-59,-14.1,-57.8,-1.4C-56.6,11.3,-50.8,22.5,-42.8,31.4C-34.8,40.2,-24.6,46.7,-13.3,56.3C-2,66,0.3,79,-0.7,80C-1.7,81,-14.9,70.2,-24.6,61.5C-34.3,52.8,-40.5,46.3,-50.1,38.5C-59.7,30.8,-72.8,21.9,-77.4,9.9C-82,,-2.2,-78.2,-17.3,-69.3,-27.6C-60.4,-37.9,-46.4,-43.5,-34,-52.4C-21.6,-61.3,-10.8,-73.7,2.5,-77.2C15.7,-80.7,31.5,-75.4,41.3,-65.8C51.1,-56.2,56.9,-42.4,61.6,-28.9C66.3,-15.5,69.8,-2.5,66.3,8C62.8,18.4,52.2,26.4,43.4,37.1C34.6,47.8,27.5,61.2,16.7,69.5C5.9,77.8,-8.8,81,-23.4,77.9C-38.1,74.8,-52.7,65.4,-61.5,52.5C-70.2,39.5,-73.1,23,-70.7,8.6C-68.4,-5.8,-60.8,-18.2,-52.9,-30.7C-45,-43.2,-36.8,-55.8,-25.6,-64.1C-14.4,-72.4,-0.2,-76.4,11.4,-71.7C23,-67,32,-53.7,41.3,-56.1Z" 
      transform="translate(100 100)" 
      fill="currentColor"
    />
  </svg>
);

export const ZigZagPattern = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 1000 100" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline 
      points="0,50 50,0 100,50 150,0 200,50 250,0 300,50 350,0 400,50 450,0 500,50 550,0 600,50 650,0 700,50 750,0 800,50 850,0 900,50 950,0 1000,50" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2"
    />
  </svg>
);

export const DotsGrid = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="1" fill="currentColor" />
    </pattern>
    <rect width="100" height="100" fill="url(#dots)" />
  </svg>
);

export const ArrowRight = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M5,12H19M19,12L12,5M19,12L12,19" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
  </svg>
);

export const Star = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
      fill="currentColor" 
    />
  </svg>
);

export const CheckMark = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M20,6L9,17L4,12" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      fill="none"
    />
  </svg>
);

export const SpiralPath = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 100 100" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M50,90 C70,90 85,75 85,55 C85,35 70,20 50,20 C30,20 15,35 15,55 C15,75 30,90 50,90 Z" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="1"
      id="spiral-path"
    />
  </svg>
);

export default {
  WavyLine,
  CirclePattern,
  Blob,
  ZigZagPattern,
  DotsGrid,
  ArrowRight,
  Star,
  CheckMark,
  SpiralPath
};