import React from 'react';

interface MuteIconProps {
  isMuted: boolean;
  className?: string;
}

const MuteIcon: React.FC<MuteIconProps> = ({ isMuted, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    {isMuted ? (
       <path fillRule="evenodd" d="M9.528 2.229a.75.75 0 01.472.693v18.156a.75.75 0 01-1.222.585L3.39 16.5H1.75a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75h1.64L8.778 2.39a.75.75 0 01.75-.16zM11 5.918l3.992 2.662 1.008 1.511L11 7.426v-1.508zM16 10.5l-5 3.333v1.509l5-2.001v-2.84zM11 18.082l5-3.333V12.5l-5 3.333v2.25z" clipRule="evenodd" />

    ) : (
      <path fillRule="evenodd" d="M13.28 3.97a.75.75 0 010 1.06L11.865 6.445a.75.75 0 01-1.06-1.06l1.475-1.475a.75.75 0 011.06 0zm-2.12-.001a.75.75 0 011.06 0l1.475 1.475a.75.75 0 01-1.06 1.06L10.196 5.03a.75.75 0 010-1.06zM9.528 2.229a.75.75 0 01.472.693v18.156a.75.75 0 01-1.222.585L3.39 16.5H1.75a.75.75 0 01-.75-.75V8.25a.75.75 0 01.75-.75h1.64L8.778 2.39a.75.75 0 01.75-.16zM16.5 12a4.5 4.5 0 00-3-4.11V8.04a2.983 2.983 0 011.5 2.46v3.02a2.983 2.983 0 01-1.5 2.46v.07a4.5 4.5 0 003-4.13z" clipRule="evenodd" />
    )}
  </svg>
);

export default MuteIcon;
