import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {

  useGSAP(() => {

    // 🔥 title reveal
    gsap.from(".about-title", {
      y: 150,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });

    // 🔥 paragraph cinematic reveal
    gsap.from(".about-para", {
      scrollTrigger: {
        trigger: ".about-para",
        start: "top 80%",
        end: "top 30%",
        scrub: 1,
      },
      opacity: 0,
      y: 80,
      duration: 1.5,
      ease: "power3.out",
    });

    // 🔥 glow parallax
    gsap.to(".glow1", {
      y: -200,
      scrollTrigger: {
        trigger: "#consonite",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.to(".glow2", {
      y: 200,
      scrollTrigger: {
        trigger: "#consonite",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // 🔥 light sweep
    gsap.fromTo(
      ".light-sweep",
      { x: "-120%" },
      {
        x: "120%",
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".about-title",
          start: "top 70%",
        },
      }
    );

  }, []);

  return (
    <section
      id="consonite"
      className="relative min-h-screen w-screen overflow-hidden bg-black flex flex-col items-center justify-center px-6 py-32"
    >

      {/* 🔥 glow background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="glow1 absolute w-[600px] h-[600px] bg-red-600/20 blur-[160px] top-[5%] left-[-250px]" />
        <div className="glow2 absolute w-[600px] h-[600px] bg-fuchsia-600/20 blur-[160px] bottom-[0%] right-[-250px]" />
      </div>

      {/* 🔥 cyber grid */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:70px_70px]" />
      </div>

      {/* top text */}
      <p className="text-white/50 tracking-[0.4em] text-xs md:text-sm uppercase mb-6">
        CONSORTIUM PRESENTS
      </p>

      {/* 🔥 TITLE */}
      <div className="relative about-title">
        <AnimatedTitle
          title="<b>Unshackling</b> The <br/> <b>Future</b>"
          containerClass="!text-white text-center z-20 text-6xl md:text-8xl"
        />

        {/* light sweep */}
        <div className="light-sweep absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent blur-md pointer-events-none" />
      </div>

      {/* divider */}
      <div className="w-40 h-[2px] bg-gradient-to-r from-red-600 to-fuchsia-500 my-10" />

      {/* 🔥 DESCRIPTION */}
      <p className="about-para max-w-3xl text-center text-white/80 text-lg md:text-xl leading-relaxed z-20">
        Consonite isn’t just a concert — it’s an ignition point.  
        A convergence of music, lights, and raw energy where the present
        dissolves and the <span className="text-red-500 font-semibold">future</span> takes over.  

        Step into an atmosphere engineered for goosebumps.  
        Feel the bass in your chest.  
        Watch the night transform into an electrifying spectacle.  

        This is where boundaries break.  
        This is where chaos becomes rhythm.  
        This is where we step forward — unshackled.
      </p>

      {/* bottom tag */}
      <div className="mt-16 text-white/40 tracking-[0.5em] text-xs md:text-sm">
        VNIT • CONSORTIUM 2026 • CONSONITE
      </div>

      {/* 🔴 make FUTURE red */}
      <style jsx>{`
        .about-title b:last-child{
          color:#dc2626;
        }
      `}</style>

    </section>
  );
};

export default About;
