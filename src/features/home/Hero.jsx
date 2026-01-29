import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useInView } from "framer-motion";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const textWrapperRef = useRef(null);
  const titleTextRef = useRef(null);
  const harryRef = useRef(null);
  const professorRef = useRef(null);
  const caseFileRef = useRef(null);
  const uniRef = useRef(null);
  const lightRaysRef = useRef(null);
  const particlesRef = useRef([]);
  const directorsCutRef = useRef(null);
  
  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Logo intro refs
  const logoContainerRef = useRef(null);
  const logoRef = useRef(null);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Logo intro animation - plays on every page load/refresh
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide hero content initially
      gsap.set([directorsCutRef.current, caseFileRef.current, titleTextRef.current, 
                harryRef.current, professorRef.current, uniRef.current], 
        { opacity: 0, visibility: "hidden" });
      
      // Create logo intro timeline
      const introTl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          setIntroComplete(true);
          // Completely hide logo container after animation
          gsap.set(logoContainerRef.current, { 
            display: "none",
            visibility: "hidden",
            opacity: 0
          });
          
          // Ensure hero content is fully visible
          gsap.set([directorsCutRef.current, caseFileRef.current, titleTextRef.current, 
                    harryRef.current, professorRef.current, uniRef.current], 
            { opacity: 1, visibility: "visible" });
        }
      });

      // Logo intro sequence
      introTl
        // Logo appears in center
        .fromTo(logoRef.current,
          {
            scale: 0,
            rotation: -180,
            opacity: 0
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            duration: 1.2,
            ease: "back.out(1.7)"
          }
        )
        // Logo pulse effect
        .to(logoRef.current, {
          scale: 1.1,
          duration: 0.4,
          repeat: 2,
          yoyo: true,
          ease: "sine.inOut"
        })
        .to(logoRef.current, {
          scale: 1,
          duration: 0.3
        })
        // Hold for a moment
        .to(logoRef.current, {
          duration: 0.8
        })
        // Fade out logo container completely
        .to(logoContainerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut"
        })
        // Fade in hero content
        .to([directorsCutRef.current, caseFileRef.current, titleTextRef.current, 
             harryRef.current, professorRef.current, uniRef.current], 
          {
            opacity: 1,
            visibility: "visible",
            duration: 0.8,
            stagger: 0.1
          }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  // Mobile image switching
  useEffect(() => {
    if (!isMobile || !introComplete) return;
    
    const interval = setInterval(() => {
      setMobileImageIndex(prev => (prev === 0 ? 1 : 0));
    }, 10000);

    return () => clearInterval(interval);
  }, [isMobile, introComplete]);

  // Hero section animations (only run after intro is complete)
  useLayoutEffect(() => {
    if (!introComplete) return;

    const ctx = gsap.context(() => {
      // Simple particles
      particlesRef.current.forEach((particle, i) => {
        if (particle) {
          gsap.to(particle, {
            y: `random(-15, 15)`,
            duration: `random(2, 3)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1
          });
        }
      });

      // Character float animations - only if elements exist
      if (harryRef.current) {
        gsap.to(harryRef.current, {
          y: -15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      if (professorRef.current) {
        gsap.to(professorRef.current, {
          y: -10,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5
        });
      }

      // Main hero content timeline - only if elements exist
      const masterTl = gsap.timeline();
      
      if (directorsCutRef.current) {
        masterTl
          .fromTo(directorsCutRef.current,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out"
            }
          );
      }

      if (caseFileRef.current) {
        masterTl
          .fromTo(caseFileRef.current,
            { opacity: 0, y: -30 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            },
            "-=0.3"
          );
      }

      if (titleTextRef.current) {
        masterTl
          .fromTo(titleTextRef.current,
            {
              opacity: 0,
              y: 50
            },
            {
              opacity: 1,
              y: 0,
              duration: 1.2,
              ease: "power3.out"
            },
            "-=0.5"
          );
      }

      if (harryRef.current) {
        masterTl
          .fromTo(harryRef.current,
            {
              x: isMobile ? 0 : -100,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out"
            },
            "-=1"
          );
      }

      if (professorRef.current) {
        masterTl
          .fromTo(professorRef.current,
            {
              x: isMobile ? 0 : 100,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 1.5,
              ease: "power2.out"
            },
            "-=1.2"
          );
      }

      if (uniRef.current) {
        masterTl
          .fromTo(uniRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power2.out"
            },
            "-=0.8"
          );
      }

      // Scroll animations - only if container exists
      if (containerRef.current && !isMobile) {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });

        if (textWrapperRef.current) {
          scrollTl
            .to(textWrapperRef.current, {
              yPercent: 20,
              opacity: 0.8,
              duration: 1
            }, 0);
        }

        if (harryRef.current) {
          scrollTl
            .to(harryRef.current, {
              yPercent: -10,
              duration: 1
            }, 0);
        }

        if (professorRef.current) {
          scrollTl
            .to(professorRef.current, {
              yPercent: -8,
              duration: 1
            }, 0);
        }
      }

      // Mouse move effect - only on desktop
      if (!isMobile && introComplete && containerRef.current) {
        const handleMouseMove = (e) => {
          const { clientX, clientY } = e;
          const { width, height } = containerRef.current.getBoundingClientRect();
          
          const xPercent = (clientX / width - 0.5) * 10;
          const yPercent = (clientY / height - 0.5) * 10;
          
          if (harryRef.current) {
            gsap.to(harryRef.current, {
              xPercent: xPercent * 0.3,
              yPercent: yPercent * 0.3,
              duration: 1,
              ease: "power1.out"
            });
          }
          
          if (professorRef.current) {
            gsap.to(professorRef.current, {
              xPercent: -xPercent * 0.2,
              yPercent: -yPercent * 0.2,
              duration: 1,
              ease: "power1.out"
            });
          }
        };

        containerRef.current.addEventListener('mousemove', handleMouseMove);
        
        return () => {
          containerRef.current?.removeEventListener('mousemove', handleMouseMove);
        };
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isInView, isMobile, introComplete]);

  // Create particle refs
  const addToParticles = (el) => {
    if (el && !particlesRef.current.includes(el)) {
      particlesRef.current.push(el);
    }
  };

  return (
    <section 
      ref={containerRef} 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-br from-[#1a0a0a] via-[#2c1810] to-[#1a0a0a]"
    >
      {/* Logo Intro Animation Container - Plays on every page load */}
      <div
        ref={logoContainerRef}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a0a0a] via-[#2c1810] to-[#1a0a0a] pointer-events-none"
      >
        <img
          ref={logoRef}
          src="/kare.png"
          alt="KARE Logo"
          className="absolute w-40 h-40 md:w-48 md:h-48 object-contain z-50"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))'
          }}
        />
        {/* Glow effect behind logo */}
        <div className="logo-glow absolute w-60 h-60 md:w-72 md:h-72 bg-gradient-to-r from-amber-400/10 to-red-500/10 rounded-full blur-xl"></div>
      </div>

      {/* Simple Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          ref={addToParticles}
          className="absolute w-1 h-1 bg-amber-300/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}

      {/* Simple Light Rays */}
      <div ref={lightRaysRef} className="absolute inset-0 z-10 pointer-events-none opacity-30 mix-blend-soft-light">
        <div className="absolute -top-1/2 -left-1/4 w-3/4 h-[200%] bg-gradient-to-r from-amber-200/10 to-transparent transform -skew-x-[20deg]"></div>
        <div className="absolute -top-1/2 -right-1/4 w-3/4 h-[200%] bg-gradient-to-l from-red-200/10 to-transparent transform skew-x-[20deg]"></div>
      </div>

      {/* Harry Potter - Left Side (Desktop) */}
      {!isMobile && (
        <div 
          ref={harryRef} 
          className="hidden md:block absolute bottom-0 left-[-5%] md:left-[-2%] w-[90%] md:w-[28%] h-[70vh] md:h-screen z-20 pointer-events-none"
          style={{ 
            opacity: introComplete ? 1 : 0,
            visibility: introComplete ? "visible" : "hidden"
          }}
        >
          <img 
            src="/images/harry-potter.png" 
            alt="Harry Potter" 
            className="w-full h-full object-contain object-bottom"
            style={{ 
              filter: 'drop-shadow(0 0 20px rgba(219, 39, 39, 0.2))'
            }} 
          />
        </div>
      )}

      {/* Professor - Right Side (Desktop) */}
      {!isMobile && (
        <div 
          ref={professorRef} 
          className="hidden md:block absolute bottom-0 right-[-5%] md:right-[-2%] w-[90%] md:w-[28%] h-[70vh] md:h-screen z-20 pointer-events-none"
          style={{ 
            opacity: introComplete ? 1 : 0,
            visibility: introComplete ? "visible" : "hidden"
          }}
        >
          <img 
            src="/images/Professor.png" 
            alt="Professor" 
            className="w-full h-full object-contain object-bottom"
            style={{ 
              filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.2))'
            }} 
          />
        </div>
      )}

      {/* Mobile Layout - Single Image with 10s Switching */}
      {isMobile && (
        <div className="md:hidden absolute inset-0 z-15 flex items-center justify-center">
          {/* Harry Potter (Mobile) */}
          <div 
            className={`absolute bottom-35 w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
              mobileImageIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              opacity: introComplete ? (mobileImageIndex === 0 ? 1 : 0) : 0,
              visibility: introComplete ? "visible" : "hidden"
            }}
          >
            <img 
              src="/images/harry-potter.png" 
              alt="Harry Potter" 
              className="w-4/5 h-4/5 object-contain"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(219, 39, 39, 0.15))'
              }} 
            />
          </div>
          
          {/* Professor (Mobile) */}
          <div 
            className={`absolute bottom-25 w-full h-full flex items-center justify-center transition-opacity duration-1000 ${
              mobileImageIndex === 1 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              opacity: introComplete ? (mobileImageIndex === 1 ? 1 : 0) : 0,
              visibility: introComplete ? "visible" : "hidden"
            }}
          >
            <img 
              src="/images/Professor.png" 
              alt="Professor" 
              className="w-4/5 h-4/5 object-contain"
              style={{ 
                filter: 'drop-shadow(0 0 15px rgba(251, 191, 36, 0.15))'
              }} 
            />
          </div>
          
          {/* Mobile Image Indicator */}
          {introComplete && (
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                mobileImageIndex === 0 ? 'bg-amber-400' : 'bg-gray-500'
              }`}></div>
              <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                mobileImageIndex === 1 ? 'bg-amber-400' : 'bg-gray-500'
              }`}></div>
            </div>
          )}
        </div>
      )}

      {/* Text Content */}
      <div ref={textWrapperRef} className="relative z-40 w-full max-w-7xl px-4 md:px-6 flex flex-col items-center justify-center md:items-start md:pl-[20%]">
        
        {/* Director's Cut */}
        <div ref={directorsCutRef} className="mb-2 relative z-20"
          style={{ 
            opacity: introComplete ? 1 : 0,
            visibility: introComplete ? "visible" : "hidden"
          }}
        >
          <span className="text-[#F59E0B] font-mono text-xs md:text-sm tracking-[0.4em] uppercase font-bold">
            DIRECTOR'S CUT
          </span>
        </div>
        
        {/* Case File */}
        <div ref={caseFileRef} className="mb-4 md:mb-[-15px] relative z-20 group"
          style={{ 
            opacity: introComplete ? 1 : 0,
            visibility: introComplete ? "visible" : "hidden"
          }}
        >
          <span className="relative bg-gradient-to-r from-[#8B2626] via-[#B91C1C] to-[#8B2626] text-[#FEF3C7] px-4 py-2 font-mono text-sm md:text-base font-bold tracking-[0.4em] uppercase rotate-[-1deg] inline-block shadow-xl overflow-hidden">
            <span className="relative z-10">CASE FILE NO. 2026</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></span>
          </span>
        </div>

        {/* Main Title */}
        <h1 
          ref={titleTextRef} 
          className="relative text-[#FEF3C7] font-['Cinzel'] text-[18vw] md:text-[11rem] leading-[0.85] font-black uppercase tracking-tighter text-center md:text-left"
          style={{
            textShadow: `
              0 0 15px rgba(251, 191, 36, 0.3),
              0 0 30px rgba(219, 39, 39, 0.2)
            `,
            opacity: introComplete ? 1 : 0,
            visibility: introComplete ? "visible" : "hidden"
          }}
        >
          SPARKZ
        </h1>

        {/* University info */}
        <div ref={uniRef} className="mt-6 md:mt-4 flex flex-col items-center md:items-start md:ml-4 gap-3 relative"
          style={{ 
            opacity: introComplete ? 1 : 0,
            visibility: introComplete ? "visible" : "hidden"
          }}
        >
          <p className="relative text-[#F59E0B] font-mono text-sm md:text-base tracking-[0.3em] uppercase font-bold text-center md:text-left">
            THE CULTURAL PHENOMENON
          </p>
          <p className="font-['Playfair_Display'] text-xl md:text-3xl text-[#FEF3C7] italic leading-tight text-center md:text-left">
            Conducted by <span className="text-amber-200">KARE</span>
          </p>
          <p className="font-['Inter'] text-xs text-[#FEF3C7]/70 font-medium tracking-[0.2em] uppercase text-center md:text-left">
            (KALASALINGAM ACADEMY OF RESEARCH AND EDUCATION)
          </p>
        </div>

        {/* Scroll indicator */}
        {introComplete && (
          <div className="absolute -bottom-50 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
            <span className="font-mono text-xs text-[#FEF3C7]/50 tracking-widest">SCROLL TO EXPLORE</span>
            <div className="w-[2px] h-16 bg-gradient-to-b from-[#F59E0B] to-transparent animate-bounce"></div>
          </div>
        )}
      </div>

      {/* Simple Vignette */}
      <div className="absolute inset-0 pointer-events-none z-30">
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/50"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;