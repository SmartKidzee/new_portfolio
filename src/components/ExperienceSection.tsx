import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Link as LinkIcon } from 'lucide-react';
import SplitText from '../cpmponents/TextAnimations/SplitText/SplitText';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { FaYoutube, FaSchool, FaLaptopCode, FaGraduationCap, FaCode } from 'react-icons/fa';

type ExperienceItem = {
  role: string;
  company?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  link?: string;
  achievements: React.ReactNode[];
  skills?: string[];
  icon?: React.ReactNode;
  iconLink?: string;
  iconLabel?: string;
};

const experiences: ExperienceItem[] = [
  {
    role: '2018 - Started Exploring Tech',
    startDate: '2018',
    endDate: '2018',
    achievements: [
      'Got interested in computers and programming. Began learning basic coding.',
    ],
    icon: <FaLaptopCode className="text-[#FF0000]" />,
    iconLabel: 'Tech',
  },
  {
    role: '2020 - Started YouTube Channel',
    startDate: '2020',
    endDate: '2020',
    achievements: [
      'Launched my YouTube channel dedicated to tech reviews, tutorials, and coding.',
      (
        <span key="yt">
          YouTube: {' '}
          <a
            href="https://youtube.com/SmartKidzee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF0000] hover:text-[#FF4444]"
            aria-label="SmartKidzee YouTube"
          >
            SmartKidzee
          </a>
        </span>
      ),
    ],
    link: 'https://youtube.com/SmartKidzee',
    icon: <FaYoutube className="text-red-500" />,
    iconLink: 'https://youtube.com/SmartKidzee',
    iconLabel: 'YouTube',
  },
  {
    role: '2022 - 10th Board Exams',
    startDate: '2022',
    endDate: '2022',
    achievements: [
      'Institution: The Acme School',
      'Board: Secondary School Certificate',
      'Percentage: 95.2%',
    ],
    icon: <FaSchool className="text-[#FF0000]" />,
    iconLabel: 'School',
  },
  {
    role: '2022 - 2024 | Senior Secondary',
    startDate: '2022',
    endDate: '2024',
    achievements: [
      'Institution: Pramati Hillview Academy',
      'Board: Senior Secondary Certificate - 12th',
      'CGPA: 8.0',
    ],
    icon: <FaSchool className="text-[#800000]" />,
    iconLabel: 'Senior Secondary',
  },
  {
    role: '2024 - Entered Engineering & Web Dev',
    startDate: '2024',
    endDate: '2024',
    achievements: [
      'Started college at NIE Mysore and developed my first website using HTML & CSS. Later upgraded with Three.js and Framer Motion.',
      (
        <span key="gh">
          GitHub: {' '}
          <a
            href="https://github.com/SmartKidzee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#FF0000] hover:text-[#FF4444]"
            aria-label="SmartKidzee GitHub"
          >
            SmartKidzee
          </a>
        </span>
      ),
    ],
    link: 'https://github.com/SmartKidzee',
    icon: <FaCode className="text-[#FF0000]" />,
    iconLink: 'https://github.com/SmartKidzee',
    iconLabel: 'GitHub',
  },
  {
    role: '2025 - Present | Engineering & AI/ML Focus',
    startDate: '2025',
    endDate: 'Present',
    achievements: [
      'Institution: The National Institute Of Engineering, Mysore',
      'Degree: BE, Computer Science - AI & ML',
      'CGPA: 9.33',
      'Currently in my Sophomore year, pursuing my engineering degree with a specialization in AI & ML.',
    ],
    icon: <FaGraduationCap className="text-[#800000]" />,
    iconLabel: 'Engineering',
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
};

export default function ExperienceSection() {
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section id="experience" aria-label="Experience" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold inline-flex items-center bg-gradient-to-r from-[#FF0000] to-[#800000] py-2 px-6 rounded-lg shadow-lg">
            <Briefcase className="w-8 h-8 mr-3 text-[#0F172A]" />
            <SplitText
              text="Experience"
              delay={40}
              className="text-[#0F172A]"
              animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
              animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
            />
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#FF0000]/15" aria-hidden="true" />

          <div className="space-y-8">
            {experiences.map((item, index) => (
              <motion.div
                key={`${item.company}-${item.role}-${index}`}
                className="relative pl-12 sm:pl-14"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                custom={index}
                variants={containerVariants}
              >
                <div className="absolute left-4 top-4 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FF0000] ring-4 ring-[#000000]" aria-hidden="true" />

                <Card 
                  className="experience-card bg-white/5 border-white/10 backdrop-blur-md transition-transform duration-200 will-change-transform hover:-translate-y-0.5"
                  onMouseMove={handleCardMouseMove}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.removeProperty('--mouse-x');
                    e.currentTarget.style.removeProperty('--mouse-y');
                  }}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        item.iconLink ? (
                          <a 
                            href={item.iconLink} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="shrink-0"
                            aria-label={item.iconLabel || 'link'}
                          >
                            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 border border-white/10 shadow-sm transition-transform duration-200 hover:scale-110">
                              {item.icon}
                            </span>
                          </a>
                        ) : (
                          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 border border-white/10 shadow-sm">
                            {item.icon}
                          </span>
                        )
                      )}
                      <div>
                        <CardTitle className="text-xl md:text-2xl text-white">
                          {item.role}
                        </CardTitle>
                        {item.company && (
                          <CardDescription className="text-[#94A3B8]">
                            <span className="inline-flex items-center mr-3">
                              <span className="font-medium text-[#E2E8F0] mr-1">{item.company}</span>
                            </span>
                          </CardDescription>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-[#94A3B8]">
                      {item.startDate && item.endDate && (
                        <span className="inline-flex items-center">
                          <Calendar className="w-4 h-4 mr-2 text-[#FF0000]" />
                          <time dateTime={item.startDate}>{item.startDate}</time>
                          <span className="mx-1">—</span>
                          <time dateTime={item.endDate}>{item.endDate}</time>
                        </span>
                      )}
                      {item.location && (
                        <span className="inline-flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-[#800000]" />
                          {item.location}
                        </span>
                      )}
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-[#FF0000] hover:text-[#FF4444]"
                          aria-label="external link"
                        >
                          <LinkIcon className="w-4 h-4 mr-2" /> Visit
                        </a>
                      )}
                    </div>

                    <ul className="mt-4 list-disc pl-5 space-y-2 text-[#E2E8F0]">
                      {item.achievements.map((point, i) => (
                        <li key={i} className="leading-relaxed text-sm md:text-base">{point}</li>
                      ))}
                    </ul>

                    {item.skills && item.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#0B1220] border border-white/10 text-[#D1D5DB]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


