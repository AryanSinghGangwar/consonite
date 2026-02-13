import React, { useState, useRef } from "react";
import { User, Smartphone, Mail } from "lucide-react";
import AnimatedTitle from "./AnimatedTitle";
import QRCode from "qrcode";

const Register = () => {

  const [formData,setFormData] = useState({
    name:"",
    phone:"",
    email:"",
    enrollment:""
  });

  const [submitted,setSubmitted] = useState(false);
  const [loading,setLoading] = useState(false); // 🔥 loading state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const qrX = 1655;
  const qrY = 82;
  const qrSize = 260;

  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    setLoading(true);

    // send to mongo
    try{
      await fetch("https://consonitebackend.onrender.com/register",{
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify(formData)
      });
    }catch(err){
      console.log("DB optional");
    }

    setSubmitted(true);
    setTimeout(generateTicket,200);
  };

  // 🎟️ generate ticket
  const generateTicket = async()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;

    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    const base = new Image();
    base.src="/ticket.png";

    base.onload = async()=>{
      canvas.width = base.width;
      canvas.height = base.height;

      ctx.drawImage(base,0,0);

      const qrText = `
Name:${formData.name}
Phone:${formData.phone}
Email:${formData.email}
Enroll:${formData.enrollment}
`;

      const qrURL = await QRCode.toDataURL(qrText,{
        margin:1,
        width:qrSize
      });

      const qrImg = new Image();
      qrImg.src = qrURL;

      qrImg.onload = ()=>{
        ctx.fillStyle="white";
        ctx.fillRect(qrX-20, qrY-20, qrSize+40, qrSize+40);

        ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

        autoDownload();
        setLoading(false); // 🔥 stop loading after ready
      };
    };
  };

  const autoDownload = ()=>{
    const canvas = canvasRef.current;
    if(!canvas) return;

    const link=document.createElement("a");
    link.download="consonite-ticket.png";
    link.href=canvas.toDataURL("image/png");
    link.click();
  };

  return(
  <div id="Register" className="bg-black min-h-screen flex flex-col items-center justify-center p-6">

    <AnimatedTitle
      title="<b>R</b><b>e</b><b>g</b><b>i</b><b>s</b><b>t</b><b>e</b><b>r</b>"
      containerClass="!text-white text-center mb-10"
    />

    {!submitted && (
      <form onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-md space-y-5 border border-gray-800">

        <div className="relative">
          <User className="absolute left-3 top-3 text-gray-400"/>
          <input
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={(e)=>setFormData({...formData,name:e.target.value})}
            className="w-full pl-10 p-3 rounded-lg bg-gray-800 text-white"
          />
        </div>

        <div className="relative">
          <Smartphone className="absolute left-3 top-3 text-gray-400"/>
          <input
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={(e)=>setFormData({...formData,phone:e.target.value})}
            className="w-full pl-10 p-3 rounded-lg bg-gray-800 text-white"
          />
        </div>

        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400"/>
          <input
            placeholder="Email"
            required
            value={formData.email}
            onChange={(e)=>setFormData({...formData,email:e.target.value})}
            className="w-full pl-10 p-3 rounded-lg bg-gray-800 text-white"
          />
        </div>

        <input
          placeholder="Enrollment Number"
          required
          value={formData.enrollment}
          onChange={(e)=>setFormData({...formData,enrollment:e.target.value})}
          className="w-full p-3 rounded-lg bg-gray-800 text-white"
        />

        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-gray-600 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Generating Ticket..." : "Generate Ticket"}
        </button>
      </form>
    )}

    {submitted && (
      <div className="flex flex-col items-center gap-6">

        {loading && (
          <div className="text-white text-lg animate-pulse">
            Generating your ticket...
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="max-w-full rounded-xl border border-red-500 shadow-2xl"
        />

        {!loading && (
          <p className="text-white text-lg font-semibold">
            See you on <span className="text-red-500">15th</span> Feb'26!
          </p>
        )}
      </div>
    )}

  </div>
  );
};

export default Register;
