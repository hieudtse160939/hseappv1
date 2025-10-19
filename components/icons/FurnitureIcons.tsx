
import React from 'react';

const iconProps = {
  className: "w-full h-full",
  preserveAspectRatio: "xMidYMid meet",
};

export const StudentDeskIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" {...iconProps}>
    <rect x="3" y="8" width="18" height="10" rx="1" fill="#c7d2fe" stroke="#6366f1" strokeWidth="1.5"/>
    <rect x="7" y="4" width="10" height="5" rx="1" fill="#a5b4fc" stroke="#6366f1" strokeWidth="1.5"/>
  </svg>
);

export const TeacherDeskIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...iconProps}>
    <rect x="2" y="5" width="20" height="14" rx="2" fill="#6366f1"/>
    <rect x="3" y="6" width="18" height="12" rx="1" fill="#c7d2fe"/>
    <path d="M5 19v2M19 19v2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="15" y="8" width="4" height="3" rx="1" fill="#6366f1" stroke="none"/>
  </svg>
);

export const BookshelfIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" {...iconProps}>
    <rect x="3" y="3" width="18" height="18" rx="2" fill="#818cf8"/>
    <path d="M3 9h18M3 15h18" stroke="#e0e7ff" strokeWidth="2"/>
    <path d="M9 3v18M15 3v18" stroke="#e0e7ff" strokeWidth="2"/>
  </svg>
);

export const WhiteboardIcon: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...iconProps}>
    <rect x="2" y="4" width="20" height="14" rx="2" fill="#f1f5f9" />
    <path d="M2 18h20" strokeLinecap="round"/>
    <path d="M12 18v2M8 20h8" strokeLinecap="round"/>
  </svg>
);

export const DoorIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...iconProps}>
        <path d="M20 21H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1z" fill="#a5b4fc" stroke="#6366f1"/>
        <path d="M15 11v.01" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
);

export const PlantIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...iconProps}>
        <path d="M12 22a7 7 0 0 0 7-7h-1.5a5.5 5.5 0 0 1-11 0H5a7 7 0 0 0 7 7z" fill="#a78bfa"/>
        <path d="M12 15V3" stroke="#4d7c0f"/>
        <path d="M12 9l4-4" stroke="#4d7c0f"/>
        <path d="M12 9L8 5" stroke="#4d7c0f"/>
        <path d="M12 15l-4-4" stroke="#4d7c0f"/>
        <path d="M12 15l4-4" stroke="#4d7c0f"/>
    </svg>
);