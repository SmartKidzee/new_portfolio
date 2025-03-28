import React from "react";
import { Timeline } from "./ui/timeline";
import { FaGraduationCap, FaYoutube, FaCode, FaSchool, FaLaptopCode, FaGithub } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { LuExternalLink } from "react-icons/lu";

export default function TimelineDemo() {
  const data = [
    {
      title: "📍 2025 - Present | Engineering & AI/ML Focus",
      content: (
        <div className="text-neutral-200">
          <p className="text-[#38BDF8] font-semibold mb-2 text-sm md:text-base">Institution: The National Institute Of Engineering, Mysore</p>
          <p className="mb-2 text-sm md:text-base"><span className="font-semibold">Degree:</span> Bachelor of Engineering (BE, Computer Science - AI & ML)</p>
          <p className="mb-2 text-sm md:text-base"><span className="font-semibold">CGPA:</span> <span className="text-[#FACC15]">9.00</span> (Semester 1)</p>
          <p className="mb-4 text-sm md:text-base">Currently pursuing my engineering degree with a specialization in Artificial Intelligence & Machine Learning. Learning full-stack development, AI concepts, and building projects.</p>
          <p className="mb-2 text-sm md:text-base"><span className="font-semibold">Portfolio:</span> Built my 3D portfolio website (iamshreyas.live) using React, TypeScript, and Vite.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg h-16 md:h-32 w-full shadow-lg bg-[#2a3d5a] flex items-center justify-center">
              <FaGraduationCap className="text-[#38BDF8] text-3xl md:text-4xl" />
            </div>
            <div className="rounded-lg h-16 md:h-32 w-full shadow-lg bg-[#2a3d5a] flex items-center justify-center">
              <PiStudentBold className="text-[#A855F7] text-3xl md:text-4xl" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "💻 2024 - Entered Engineering & Web Development",
      content: (
        <div className="text-neutral-200">
          <p className="mb-4 text-sm md:text-base">Started college at NIE Mysore and developed my first website using HTML & CSS. Later, I upgraded it with Three.js, Framer Motion, and animations.</p>
          <p className="mb-2 flex items-center gap-2 text-sm md:text-base">
            <FaGithub className="text-white" />
            <span className="font-semibold">GitHub:</span> 
            <a 
              href="https://github.com/SmartKidzee" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:text-[#A855F7] transition-colors duration-300 flex items-center gap-1"
            >
              SmartKidzee <LuExternalLink />
            </a>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg h-16 md:h-32 w-full shadow-lg bg-[#2a3d5a] flex items-center justify-center">
              <FaCode className="text-[#38BDF8] text-3xl md:text-4xl" />
            </div>
            <div className="rounded-lg h-16 md:h-32 w-full shadow-lg bg-[#2a3d5a] flex items-center justify-center">
              <FaLaptopCode className="text-[#A855F7] text-3xl md:text-4xl" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🎓 2022 - 2024 | Senior Secondary (Class 11 & 12)",
      content: (
        <div className="text-neutral-200">
          <p className="text-[#38BDF8] font-semibold mb-2 text-sm md:text-base">Institution: Pramati Hillview Academy</p>
          <p className="mb-2 text-sm md:text-base"><span className="font-semibold">Board:</span> Senior Secondary Certificate - 12th Board</p>
          <p className="mb-2 text-sm md:text-base"><span className="font-semibold">CGPA:</span> <span className="text-[#FACC15]">8.0</span></p>
          <p className="mb-4 text-sm md:text-base">Focused on Maths, Physics, and Computer Science while exploring coding, AI, and web development.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg h-16 md:h-32 w-full shadow-lg bg-[#2a3d5a] flex items-center justify-center">
              <FaSchool className="text-[#38BDF8] text-3xl md:text-4xl" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "📹 2020 - Started YouTube Channel",
      content: (
        <div className="text-neutral-200">
          <p className="mb-4 text-sm md:text-base">Launched my YouTube channel dedicated to tech reviews, tutorials, and coding.</p>
          <p className="mb-4 text-sm md:text-base">Created videos about Apple devices, software, and tech tips.</p>
          <p className="mb-2 flex items-center gap-2 text-sm md:text-base">
            <FaYoutube className="text-red-500" /> 
            <span className="font-semibold">YouTube:</span> 
            <a 
              href="https://youtube.com/SmartKidzee" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:text-[#A855F7] transition-colors duration-300 flex items-center gap-1"
            >
              Watch my content here <LuExternalLink />
            </a>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg h-16 md:h-32 w-full shadow-lg bg-[#2a3d5a] flex items-center justify-center">
              <FaYoutube className="text-red-500 text-3xl md:text-4xl" />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "🏆 2022 - 10th Board Exams",
      content: (
        <div className="text-neutral-200">
          <p className="text-[#38BDF8] font-semibold mb-2 text-sm md:text-base">Institution: The Acme School</p>
          <p className="mb-2 text-sm md:text-base"><span className="font-semibold">Board:</span> Secondary School Certificate - 10th Board</p>
          <p className="mb-2 text-sm md:text-base"><span className="font-semibold">Percentage:</span> <span className="text-[#FACC15]">95.2%</span></p>
          <p className="mb-4 text-sm md:text-base">Completed Class 10 with a strong foundation in Mathematics and Computer Science.</p>
        </div>
      ),
    },
    {
      title: "🖥️ 2018 - Started Exploring Tech",
      content: (
        <div className="text-neutral-200">
          <p className="mb-4 text-sm md:text-base">Got interested in computers, coding, and tech gadgets. Began learning basic programming and software development.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="rounded-lg h-16 md:h-32 w-full shadow-lg bg-[#2a3d5a] flex items-center justify-center">
              <FaLaptopCode className="text-[#38BDF8] text-3xl md:text-4xl" />
            </div>
          </div>
        </div>
      ),
    },
  ];
  
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
} 