'use client';

import Image from 'next/image';
import React from 'react';



export default function GlobalLoadingOverlay({ visible }) {
  if (!visible) return null;
  return (
    <div className="okdriver-loading-overlay">
      <Image
        src="/assets/OKDriverWhite_logo.png"
        alt="OKDriver Loading"
        width={72}
        height={72}
        className="okdriver-loading-logo"
        priority
      />
    </div>
  );
}


