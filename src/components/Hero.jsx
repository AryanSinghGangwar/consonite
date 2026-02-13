import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import poster from "../assets/56.jpg";
import he from "../assets/hero-2.mp4";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  const handleCanPlay = () => setVideoReady(true);

  // 🎬 cinematic animations
  useGSAP(() => {
    // title reveal
    gsap.from(".hero-title", {
      y: 120,
      opacity: 0,
      duration: 1.4,
      ease: "power4.out",
      delay: 0.5,
    });

    gsap.from(".hero-sub", {
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: 1,
      ease: "power3.out",
    });

    // 🎥 slow cinematic zoom
    gsap.to(".bg-video", {
      scale: 1.12,
      duration: 20,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });

    // 🎬 parallax scroll
    gsap.to(".hero-content", {
      y: 120,
      scrollTrigger: {
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });

  return (
    <div id="home" className="relative h-dvh w-screen overflow-hidden bg-black">

      {/* 🎥 VIDEO BACKGROUND */}
      <div className="absolute inset-0">
        {/* poster fallback */}
        <img
          src={poster}
          alt="poster"
          className={`absolute size-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* video */}
        <video
          ref={videoRef}
          src={he}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={handleCanPlay}
          className={`bg-video absolute size-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* 🎥 DARK CINEMATIC OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black pointer-events-none" />

      {/* 🎬 MOVING LIGHT GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-fuchsia-600/20 blur-[140px] top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] bottom-[-200px] right-[-150px] animate-pulse" />
      </div>

      {/* 🎭 HERO CONTENT */}
      <div className="hero-content relative z-20 flex h-full flex-col items-center justify-center text-center px-6 pointer-events-none">

        <h1 className="hero-title special-font text-[13vw] leading-none text-white select-none">
          CO<b className="text-[#dc143c]">N</b>SO
          <span className="text-white">
            <b className="text-[#dc143c]">N</b>ITE
          </span>
        </h1>

        <p className="hero-sub mt-6 text-lg sm:text-xl text-white/80 max-w-xl select-none">
          A night of music, lights & madness.  
          Experience the most electrifying concert of VNIT.
        </p>

      </div>

      {/* 🎬 SCROLL INDICATOR */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm tracking-widest pointer-events-none">
        <div className="animate-bounce">SCROLL ↓</div>
      </div>
    </div>
  );
};

export default Hero;
