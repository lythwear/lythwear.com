'use client';
import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};

export default function Input({ fullWidth = true, ...props }: Props) {
  return (
    <>
      <input {...props} className={`lyth-input${fullWidth ? ' full' : ''}`} />
      <style jsx>{`
        .lyth-input {
          padding: 0.75rem 0.9rem;
          border-radius: 8px;
          border: 1px solid #333;
          background: #111;
          color: #fff;
          box-sizing: border-box;
        }
        .lyth-input.full { width: 100%; }
        .lyth-input::placeholder { color: #bbb; }
      `}</style>
    </>
  );
}

