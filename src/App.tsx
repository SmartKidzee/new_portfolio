import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  Menu,
  X,
  Github,
  Linkedin,
  Youtube,
  User,
  GraduationCap,
  Code,
  Briefcase,
  BookOpen,
  Phone,
} from 'lucide-react';
import ReactPlayer from 'react-player';
import { useForm } from '@formspree/react';

function App() {
  const [cursorTrails, setCursorTrails] = useState<
    { x: number; y: number; id: number }[]
  >([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [activeBlog, setActiveBlog] = useState<number | null>(null);
  const [state, handleSubmit] = useForm('xkndlgya');

  const sections = [
    'home',
    'about',
    'experience',
    'education',
    'skills',
    'blogs',
    'contact',
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorTrails((prev) => {
        const newTrail = { x: e.clientX, y: e.clientY, id: Date.now() };
        return [...prev, newTrail].slice(-10); // Keep last 10 trails for smoother effect
      });
    };

    const handleScroll = () => {
      const currentPosition = window.scrollY + 100;
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            currentPosition >= offsetTop &&
            currentPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  // Clean up old cursor trails
  useEffect(() => {
    const cleanup = setInterval(() => {
      setCursorTrails((prev) =>
        prev.filter((trail) => Date.now() - trail.id < 800)
      );
    }, 50);
    return () => clearInterval(cleanup);
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const skills = [
    { name: 'C (Programming Language)', level: 'Beginner', progress: '30%' },
    { name: 'Python', level: 'Intermediate', progress: '60%' },
    { name: 'MySQL DBMS', level: 'Beginner', progress: '35%' },
    { name: 'HTML', level: 'Intermediate', progress: '65%' },
    { name: 'React JS', level: 'Beginner', progress: '40%' },
    { name: 'Prompt Engineering', level: 'Intermediate', progress: '70%' },
    { name: 'Computer Networking', level: 'Beginner', progress: '30%' },
    { name: 'Figma', level: 'Beginner', progress: '35%' },
    { name: 'Adobe Premiere Pro', level: 'Intermediate', progress: '65%' },
  ];

  const blogs = [
    {
      title: '1. My PS5 Journey',
      content:
        "Excited to share that I've joined the PS5 family! Stay tuned for an upcoming video showcasing my gaming adventures.",
      image:
        'https://images.unsplash.com/photo-1607853202273-797f1c22a38e?auto=format&fit=crop&w=800',
    },
    {
      title: '2. PS5 Unboxing Video',
      content: 'Check out my PS5 unboxing experience!',
      video: 'https://youtu.be/gM09dY6WKXY',
    },
    {
      title: '3. New Chapter at NIE',
      content:
        "I'm thrilled to announce that I've joined the National Institute of Engineering (NIE), Mysore, for my undergraduate degree in Computer Science and Engineering, with a specialization in Artificial Intelligence and Machine Learning! The campus is amazing, and I'm super excited about the journey ahead in this cutting-edge field. The journey to secure a seat at NIE Mysore was challenging, but I'm glad I made it! I can't wait to dive deep into AI and ML, explore new technologies, and work on exciting projects. This is just the beginning of a great adventure!",
      image: 'https://i.ibb.co/HLv8CcCk/NIEimg.jpg',
    },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#030014] text-white relative">
      {/* Cursor Trails */}
      {cursorTrails.map((trail) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{ left: `${trail.x}px`, top: `${trail.y}px` }}
        />
      ))}

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-[#030014]/80 backdrop-blur-md border-b border-violet-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold gradient-text"
            >
              Shreyas
            </motion.span>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {sections.map((section) => (
                <motion.button
                  key={section}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(section)}
                  className={`transition-all duration-300 capitalize ${
                    activeSection === section
                      ? 'text-violet-400'
                      : 'text-gray-300 hover:text-violet-400'
                  }`}
                >
                  {section}
                </motion.button>
              ))}
            </div>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="md:hidden p-2 rounded-md hover:bg-violet-900/20"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute w-full bg-[#030014]/95 backdrop-blur-md border-b border-violet-900/20"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {sections.map((section) => (
                <motion.button
                  key={section}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(section)}
                  className={`block w-full text-left px-3 py-2 rounded-md capitalize ${
                    activeSection === section
                      ? 'bg-violet-900/20 text-violet-400'
                      : 'hover:bg-violet-900/10'
                  }`}
                >
                  {section}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <motion.section
          id="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="min-h-screen flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://i.ibb.co/ZLYQYf5/App-Brewery-Wallpaper-4.png?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-pink-900/20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-48 h-48 mx-auto mb-8"
              >
                <div className="profile-ring" />
                <img
                  src="https://i.ibb.co/B55KFGh2/IMG-1106.jpg?auto=format&fit=crop&q=80&w=400&h=400"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold mb-6"
              >
                Hello, I'm <span className="gradient-text">Shreyas</span>
              </motion.h1>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl md:text-2xl text-gray-300 mb-8"
              >
                Technophile | Content Creator | Tech Enthusiast
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center space-x-6"
              >
                <a
                  href="https://github.com/SmartKidzee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="https://youtube.com/SmartKidzee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300 text-red-500"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/smartshreyas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform duration-300"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* About Section */}
        <section id="about" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold inline-flex items-center">
                <User className="w-8 h-8 mr-2" /> About Me
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <p className="text-lg text-gray-300">
                  I'm Shreyas, a first-year Computer Science and Engineering
                  undergraduate at The National Institute of Engineering,
                  Mysuru, specializing in Artificial Intelligence and Machine
                  Learning.
                </p>
                <p className="text-lg text-gray-300">
                  I'm passionate about technology and enjoy diving deep into the
                  ever-evolving world of AI and software development. When I'm
                  not exploring the latest tech trends, you'll find me creating
                  content for my YouTube channel, sharing insights as an Apple
                  fanboy, or gaming on my PS5.
                </p>
                <p className="text-lg text-gray-300">
                  This website is built with Vite, React, and TypeScript,
                  designed for speed, flexibility, and a modern experience. It's
                  a step up from my earlier HTML & CSS site, bringing
                  interactive elements and animations to showcase my work more
                  dynamically.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative gradient-border p-1">
                  <img
                    src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800"
                    alt="Tech"
                    className="rounded-lg w-full"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold inline-flex items-center">
                <Briefcase className="w-8 h-8 mr-2" /> Experience
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="gradient-border p-6 hover:scale-105 transition-transform duration-300">
                <div className="flex items-start gap-4">
                  <Youtube className="w-12 h-12 text-red-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Content Creator</h3>
                    <p className="text-violet-400 mb-2">YouTube · Full-time</p>
                    <p className="text-gray-400 mb-4">
                      May 2020 - Present · 4 yrs 11 mos
                    </p>
                    <p className="text-gray-300">
                      I'm a passionate YouTuber creating engaging content!
                    </p>
                    <a
                      href="https://youtube.com/SmartKidzee"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-4 text-red-500 hover:text-red-400 transition-colors duration-300 youtube-link"
                    >
                      <Youtube className="w-5 h-5 mr-2" />
                      Visit my channel
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold inline-flex items-center">
                <GraduationCap className="w-8 h-8 mr-2" /> Education
              </h2>
            </motion.div>
            <div className="space-y-8 max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="gradient-border p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2">
                  The National Institute Of Engineering, Mysore
                </h3>
                <p className="text-violet-400 mb-2">
                  Bachelor of Engineering - BE, Computer Science (Specialisation
                  in AI & ML)
                </p>
                <p className="text-gray-400">Sep 2024 - Jul 2028</p>
                <p className="text-gray-300 mt-2">
                  Activities: Tech Enthusiast, ISSA
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="gradient-border p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2">
                  Pramati Hill View Academy
                </h3>
                <p className="text-violet-400 mb-2">
                  Senior Secondary Certificate - 12th board
                </p>
                <p className="text-gray-400">2022 - 2024</p>
                <p className="text-gray-300 mt-2">CGPA: 8.0</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="gradient-border p-6 hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-xl font-bold mb-2">The Acme School</h3>
                <p className="text-violet-400 mb-2">
                  Secondary School Certificate - 10th board
                </p>
                <p className="text-gray-300 mt-2">Percentage: 95.2%</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold inline-flex items-center">
                <Code className="w-8 h-8 mr-2" /> Skills
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="gradient-border p-6 skill-card"
                >
                  <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                  <p className="text-violet-400 text-sm mb-3">{skill.level}</p>
                  <div
                    className="progress-bar"
                    style={
                      { '--progress': skill.progress } as React.CSSProperties
                    }
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blogs Section */}
        <section id="blogs" className="py-20 bg-black/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold inline-flex items-center">
                <BookOpen className="w-8 h-8 mr-2" /> Blogs
              </h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="gradient-border p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
                  onClick={() => setActiveBlog(index)}
                >
                  <h3 className="text-xl font-bold mb-4">{blog.title}</h3>
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="rounded-lg mb-4"
                    />
                  )}
                  {blog.video && (
                    <div className="rounded-lg overflow-hidden mb-4">
                      <ReactPlayer
                        url={blog.video}
                        width="100%"
                        height="200px"
                        controls
                      />
                    </div>
                  )}
                  <p className="text-gray-300">{blog.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Modal */}
        {activeBlog !== null && (
          <div
            className="modal-overlay active"
            onClick={() => setActiveBlog(null)}
          >
            <div
              className="modal-content active"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setActiveBlog(null)}
              >
                <X size={24} />
              </button>
              <h2 className="text-2xl font-bold mb-4">
                {blogs[activeBlog].title}
              </h2>
              {blogs[activeBlog].image && (
                <img
                  src={blogs[activeBlog].image}
                  alt={blogs[activeBlog].title}
                  className="rounded-lg mb-4 w-full"
                />
              )}
              {blogs[activeBlog].video && (
                <div className="rounded-lg overflow-hidden mb-4">
                  <ReactPlayer
                    url={blogs[activeBlog].video}
                    width="100%"
                    height="400px"
                    controls
                  />
                </div>
              )}
              <p className="text-gray-300">{blogs[activeBlog].content}</p>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold inline-flex items-center">
                <Phone className="w-8 h-8 mr-2" /> Contact Me
              </h2>
            </motion.div>
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none border border-gray-700"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none border border-gray-700"
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 bg-gray-800/50 rounded-lg focus:ring-2 focus:ring-violet-400 outline-none border border-gray-700"
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-violet-600 to-pink-500 py-2 px-4 rounded-lg font-medium hover:from-violet-700 hover:to-pink-600 transition-all duration-300"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </motion.button>
                {state.succeeded && (
                  <p className="text-green-400 text-center mt-4">
                    Message sent successfully!
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">© 2025 Shreyas. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
