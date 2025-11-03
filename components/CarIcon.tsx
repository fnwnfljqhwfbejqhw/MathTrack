
import React from 'react';

interface CarIconProps {
  className?: string;
}

const CarIcon: React.FC<CarIconProps> = ({ className }) => (
  <svg
    viewBox="0 0 100 180"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.4))' }}
  >
    <g>
      <path
        d="M85,150 C95,140 100,120 100,100 L100,40 C100,20 90,5 80,5 L20,5 C10,5 0,20 0,40 L0,100 C0,120 5,140 15,150 L25,175 L75,175 L85,150 Z"
        fill="#ff5a5a"
      />
      <path
        d="M80,15 L20,15 C15,15 10,20 10,25 L10,90 C10,95 15,100 20,100 L80,100 C85,100 90,95 90,90 L90,25 C90,20 85,15 80,15 Z"
        fill="#2c2c2c"
      />
      <path
        d="M75,20 L25,20 C22,20 20,22 20,25 L20,85 C20,88 22,90 25,90 L75,90 C78,90 80,88 80,85 L80,25 C80,22 78,20 75,20 Z"
        fill="#87ceeb"
        opacity="0.9"
      />
      <rect x="5" y="155" width="20" height="20" rx="5" fill="#222" />
      <rect x="75" y="155" width="20" height="20" rx="5" fill="#222" />
      <circle cx="15" cy="165" r="3" fill="#444" />
      <circle cx="85" cy="165" r="3" fill="#444" />
      
      <rect x="35" y="0" width="10" height="10" rx="3" fill="#fef08a" />
      <rect x="55" y="0" width="10" height="10" rx="3" fill="#fef08a" />
      
    </g>
  </svg>
);

export default CarIcon;
