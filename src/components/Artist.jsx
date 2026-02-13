import React from "react";
import AnimatedTitle from "./AnimatedTitle";
import img from "../assets/image.png";

const Example = () => {
  const scrollToFooter = () => {
    const footerSection = document.getElementById("Register");
    if (footerSection) {
      footerSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      id="artist"
      className="flex flex-col items-center justify-center gap-16 bg-black py-20 px-4 relative overflow-hidden"
    >
      {/* CYBER GRID BG */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(#0ff_1px,transparent_1px),linear-gradient(90deg,#0ff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* TITLE */}
      <AnimatedTitle
        title="<b>A</b><b>r</b><b>t</b><b>i</b><b>s</b><b>t</b>"
        containerClass="mt-5 !text-white text-center z-30"
      />

      {/* CYBER CARD */}
      <div onClick={scrollToFooter} className="relative group cursor-pointer z-20">
        
        {/* Neon Glow Border */}
        <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-purple-600 blur opacity-70 group-hover:opacity-100 transition duration-500" />

        {/* Main Card */}
        <div className="relative w-[320px] sm:w-[450px] h-[420px] sm:h-[300px] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">

          {/* IMAGE */}
          <img
            src={img}
            alt="Bharat Chandak"
            className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          {/* TEXT */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
            <h2 className="text-white text-2xl sm:text-3xl font-bold tracking-wide">
              Bharat Chandak
            </h2>
            <p className="text-cyan-300 text-sm mt-1 tracking-widest">
              {/* optional subtitle */}
            </p>
          </div>

          {/* Cyber corners */}
          <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-cyan-400 opacity-70" />
          <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-fuchsia-400 opacity-70" />
          <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-fuchsia-400 opacity-70" />
          <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-cyan-400 opacity-70" />
        </div>
      </div>
    </div>
  );
};

export default Example;
