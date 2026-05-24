'use client';
import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';

const leftCol = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1601233718955-b3b2ab79d37c?w=600&auto=format&fit=crop',
];

const centerCol = [
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop',
];

const rightCol = [
  'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1488509082528-cefbba5ad692?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&auto=format&fit=crop',
];

const StickyScrollGallery = forwardRef<HTMLElement>((_, ref) => {
  return (
    <ReactLenis root>
      <main style={{ background: '#0a0a0a' }} ref={ref}>
        {/* Sticky intro */}
        <section className='h-screen w-full grid place-content-center sticky top-0 overflow-hidden' style={{ background: '#0a0a0a' }}>
          <div className='absolute bottom-0 left-0 right-0 top-0' style={{
            backgroundImage: 'linear-gradient(to right,rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.03) 1px,transparent 1px)',
            backgroundSize: '54px 54px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%,#000 60%,transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%,#000 60%,transparent 100%)',
          }} />
          <div style={{ textAlign: 'center', padding: '0 24px', position: 'relative', zIndex: 10 }}>
            <span className='font-dm' style={{ fontSize: 11, letterSpacing: '0.3em', color: '#00e5ff', textTransform: 'uppercase', display: 'block', marginBottom: 24 }}>— Mon travail</span>
            <h2 className='font-bebas' style={{ fontSize: 'clamp(52px, 10vw, 110px)', lineHeight: 0.9, letterSpacing: '0.02em', color: '#fff', marginBottom: 24 }}>
              CHAQUE PROJET<br />
              <span style={{ color: '#00e5ff' }}>EST UNE ŒUVRE</span>
            </h2>
            <p className='font-dm' style={{ fontSize: 15, color: 'rgba(255,255,255,0.45)', maxWidth: 420, margin: '0 auto' }}>
              Personal branding, corporate B2B, mariages & événements — scroll pour explorer.
            </p>
            <div style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <span className='font-dm' style={{ fontSize: 10, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>Scroll</span>
                <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(0,229,255,0.5), transparent)', animation: 'scrollPulse 1.8s ease-in-out infinite' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Sticky scroll gallery */}
        <section className='w-full' style={{ background: '#0a0a0a' }}>
          <div className='grid grid-cols-12 gap-2 px-2'>

            {/* Left col – scrolls */}
            <div className='grid gap-2 col-span-4'>
              {leftCol.map((src, i) => (
                <figure key={i} className='w-full overflow-hidden rounded-xl' style={{ margin: 0 }}>
                  <img
                    src={src}
                    alt={`Portfolio ${i + 1}`}
                    className='transition-all duration-500 w-full h-96 object-cover hover:scale-105'
                    style={{ display: 'block', filter: 'brightness(0.9) saturate(0.85)' }}
                    onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1) saturate(1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(0.9) saturate(0.85)'; }}
                  />
                </figure>
              ))}
            </div>

            {/* Center col – sticky */}
            <div className='sticky top-0 h-screen col-span-4 gap-2 grid grid-rows-3'>
              {centerCol.map((src, i) => (
                <figure key={i} className='w-full h-full overflow-hidden rounded-xl' style={{ margin: 0 }}>
                  <img
                    src={src}
                    alt={`Portfolio center ${i + 1}`}
                    className='transition-all duration-500 h-full w-full object-cover hover:scale-105'
                    style={{ display: 'block', filter: 'brightness(0.9) saturate(0.85)' }}
                    onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1) saturate(1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(0.9) saturate(0.85)'; }}
                  />
                </figure>
              ))}
            </div>

            {/* Right col – scrolls */}
            <div className='grid gap-2 col-span-4'>
              {rightCol.map((src, i) => (
                <figure key={i} className='w-full overflow-hidden rounded-xl' style={{ margin: 0 }}>
                  <img
                    src={src}
                    alt={`Portfolio ${i + 1}`}
                    className='transition-all duration-500 w-full h-96 object-cover hover:scale-105'
                    style={{ display: 'block', filter: 'brightness(0.9) saturate(0.85)' }}
                    onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1) saturate(1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(0.9) saturate(0.85)'; }}
                  />
                </figure>
              ))}
            </div>
          </div>
        </section>

        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.3; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.15); }
          }
          @media (max-width: 768px) {
            .grid-cols-12 { display: flex !important; flex-direction: column; }
            .col-span-4 { width: 100%; }
            .sticky.top-0.h-screen { position: relative !important; height: auto !important; }
            .grid-rows-3 { grid-template-rows: none; }
          }
        `}</style>
      </main>
    </ReactLenis>
  );
});

StickyScrollGallery.displayName = 'StickyScrollGallery';

export default StickyScrollGallery;
