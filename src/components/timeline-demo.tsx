import React from "react";
import { Timeline } from "./ui/timeline";
import { FaGraduationCap, FaYoutube, FaCode, FaSchool, FaLaptopCode, FaGithub } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { LuExternalLink } from "react-icons/lu";
import { motion } from "framer-motion";

export default function TimelineDemo() {
  // Simple animation variants with subtle effects
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  // Simple Apple-inspired styling with clean, minimal design
  const timelineStyle = {
    item: "bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-4 sm:p-5",
    connector: "border-l-2 border-[#38BDF8]/30 ml-4 z-10",
    timelineTitle: "text-xl sm:text-2xl font-medium text-white"
  };

  // Common box styling
  const boxStyle = "rounded-3xl h-20 w-full shadow-md bg-[#2a3d5a]/40 backdrop-blur-md flex items-center justify-center border border-white/10";
  const iconStyle = "text-4xl";

  const data = [
    {
      title: "📍 2025 - Present | Engineering & AI/ML Focus",
      content: (
        <motion.div 
          className="text-neutral-200"
          variants={itemVariants}
        >
          <p className="text-[#38BDF8] font-medium mb-2 text-sm sm:text-base">Institution: The National Institute Of Engineering, Mysore</p>
          <p className="mb-2 text-sm sm:text-base"><span className="font-medium">Degree:</span> BE, Computer Science - AI & ML</p>
          <p className="mb-2 text-sm sm:text-base"><span className="font-medium">CGPA:</span> <span className="text-[#FACC15]">9.00</span> (Semester 1)</p>
          <p className="mb-3 text-sm sm:text-base">Currently pursuing my engineering degree with a specialization in AI & ML.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className={boxStyle}>
              <FaGraduationCap className={`text-[#38BDF8] ${iconStyle}`} />
            </div>
            <div className={boxStyle}>
              <PiStudentBold className={`text-[#A855F7] ${iconStyle}`} />
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "💻 2024 - Entered Engineering & Web Dev",
      content: (
        <motion.div 
          className="text-neutral-200"
          variants={itemVariants}
        >
          <p className="mb-3 text-sm sm:text-base">Started college at NIE Mysore and developed my first website using HTML & CSS. Later upgraded with Three.js and Framer Motion.</p>
          <p className="mb-2 flex items-center gap-2 text-sm sm:text-base">
            <FaGithub className="text-white text-lg" />
            <span className="font-medium">GitHub:</span> 
            <a 
              href="https://github.com/SmartKidzee" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:text-[#A855F7] transition-colors duration-300 flex items-center gap-1 font-medium"
            >
              SmartKidzee <LuExternalLink />
            </a>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className={boxStyle}>
              <FaCode className={`text-[#38BDF8] ${iconStyle}`} />
            </div>
            <div className={boxStyle}>
              <FaLaptopCode className={`text-[#A855F7] ${iconStyle}`} />
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "🎓 2022 - 2024 | Senior Secondary",
      content: (
        <motion.div 
          className="text-neutral-200"
          variants={itemVariants}
        >
          <p className="text-[#38BDF8] font-medium mb-2 text-sm sm:text-base">Institution: Pramati Hillview Academy</p>
          <p className="mb-2 text-sm sm:text-base"><span className="font-medium">Board:</span> Senior Secondary Certificate - 12th</p>
          <p className="mb-2 text-sm sm:text-base"><span className="font-medium">CGPA:</span> <span className="text-[#FACC15]">8.0</span></p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className={boxStyle}>
              <FaSchool className={`text-[#38BDF8] ${iconStyle}`} />
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "📹 2020 - Started YouTube Channel",
      content: (
        <motion.div 
          className="text-neutral-200"
          variants={itemVariants}
        >
          <p className="mb-2 text-sm sm:text-base">Launched my YouTube channel dedicated to tech reviews, tutorials, and coding.</p>
          <p className="mb-2 flex items-center gap-2 text-sm sm:text-base">
            <FaYoutube className="text-red-500 text-lg" /> 
            <span className="font-medium">YouTube:</span> 
            <a 
              href="https://youtube.com/SmartKidzee" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#38BDF8] hover:text-[#A855F7] transition-colors duration-300 flex items-center gap-1 font-medium"
            >
              SmartKidzee <LuExternalLink />
            </a>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className={boxStyle}>
              <FaYoutube className={`text-red-500 ${iconStyle}`} />
            </div>
          </div>
        </motion.div>
      ),
    },
    {
      title: "🏆 2022 - 10th Board Exams",
      content: (
        <motion.div 
          className="text-neutral-200"
          variants={itemVariants}
        >
          <p className="text-[#38BDF8] font-medium mb-2 text-sm sm:text-base">Institution: The Acme School</p>
          <p className="mb-2 text-sm sm:text-base"><span className="font-medium">Board:</span> Secondary School Certificate</p>
          <p className="mb-2 text-sm sm:text-base"><span className="font-medium">Percentage:</span> <span className="text-[#FACC15]">95.2%</span></p>
        </motion.div>
      ),
    },
    {
      title: "🖥️ 2018 - Started Exploring Tech",
      content: (
        <motion.div 
          className="text-neutral-200"
          variants={itemVariants}
        >
          <p className="mb-2 text-sm sm:text-base">Got interested in computers and programming. Began learning basic coding.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
            <div className={boxStyle}>
              <FaLaptopCode className={`text-[#38BDF8] ${iconStyle}`} />
            </div>
          </div>
        </motion.div>
      ),
    },
  ];
  
  return (
    <div className="w-full">
      <Timeline data={data} customStyles={timelineStyle} />
    </div>
  );
} 