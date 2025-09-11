'use client';
import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { fullWidth?: boolean };

export default function Button({ fullWidth = true, children, ...props }: Props) {
  return (
    <>
      <button {...props} className={`lyth-btn${fullWidth ? ' full' : ''}`}>
        {children}
      </button>
      <style jsx>{`
        .lyth-btn {
          padding: 0.8rem 1rem;
          border-radius: 8px;
          border: none;
          background: var(--color-accent);
          color: #fff;
          cursor: pointer;
          font-weight: 600;
        }
        .lyth-btn.full { width: 100%; }
        .lyth-btn[disabled] { opacity: 0.7; cursor: not-allowed; }
      `}</style>
    </>
  );
}

