export interface Blog {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at?: string;
  image_url?: string;
  category: string;
  tags?: string[];
  src?: string;
  video?: string;
  isAchievement?: boolean;
  _thumbnailOverride?: string;
}

// Blog data
export const blogs: Blog[] = [
  {
    id: '5',
    category: "Tech",
    title: "GPT-4o's Image Generation: Innovation or Imitation? The Studio Ghibli Controversy Unpacked",
    content: "In the ever-evolving landscape of AI, GPT-4o, OpenAI's latest multimodal marvel, has stirred both awe and outrage. Unveiled in May 2024, this powerhouse model seamlessly generates text, images, and even audio—a creative revolution at our fingertips. But when it rolled out image generation on March 25, 2025, one feature stole the spotlight (and sparked heated debates): the Studio Ghibli filter.\n\nThis tool, capable of producing breathtaking visuals inspired by \"Spirited Away\" and \"My Neighbor Totoro,\" went viral—only to be met with backlash from artists, legal experts, and Ghibli fans alike. Why? Because legendary filmmaker Hayao Miyazaki has long condemned AI in animation, famously calling it an \"insult to life itself.\"\n\nSo, is this just another AI breakthrough, or has GPT-4o crossed the line into artistic theft? Let's dive into the technology, the advantages, the controversies, and what it all means for the future of AI-driven creativity.\n\nInside GPT-4o's Image Generation: How It Works\nGPT-4o's image creation isn't just an add-on—it's a game changer. Unlike earlier models like DALL-E 3, which relied on diffusion transformers, GPT-4o integrates image generation directly into its multimodal framework. This unified approach allows it to process complex text prompts and render detailed, highly contextual visuals in seconds.\n\nKey Strengths: Why GPT-4o is a Creative Powerhouse\n✅ Effortless Artistry – No design skills? No problem. A simple text prompt like \"A cyberpunk city under neon rain\" can generate stunning results.\n✅ Interactive Editing – Users can tweak images in real-time. Want more stars in the night sky? Just ask.\n✅ Versatile Styles – From hyper-realistic landscapes to dreamy anime aesthetics, GPT-4o adapts seamlessly.\n✅ Fast and Accessible – No complex software, no manual drawing—just instant creativity at your fingertips.\n\nBut where there's innovation, there's also controversy. And that's where the Studio Ghibli filter enters the scene.\n\nThe Studio Ghibli Filter: A Nostalgic Dream or an Ethical Nightmare?\nAt first glance, the ability to \"Ghiblify\" any image seems magical. Users flocked to social media, sharing AI-generated scenes that looked straight out of a Miyazaki classic. But not everyone was impressed.\n\n**Some of my generations:**\n\n<div class=\"blog-image-grid\">\n  <img src=\"https://i.ibb.co/ZRk7vtrT/Chat-GPT-Image-Mar-29-2025-02-17-16-PM.png\" alt=\"AI Ghibli landscape\" />\n  <img src=\"https://i.ibb.co/ZRTvPz88/Chat-GPT-Image-Mar-29-2025-02-17-24-PM.png\" alt=\"AI Ghibli character\" />\n  <img src=\"https://i.ibb.co/d4Y4nMv1/Chat-GPT-Image-Mar-29-2025-02-22-13-PM.png\" alt=\"AI Ghibli scene\" />\n  <img src=\"https://i.ibb.co/840khZ2X/Chat-GPT-Image-Mar-29-2025-02-57-13-PM.png\" alt=\"AI Ghibli cityscape\" />\n  <img src=\"https://i.ibb.co/WpfYRyt6/Chat-GPT-Image-Mar-29-2025-05-42-15-PM.png\" alt=\"AI Ghibli fantasy\" />\n</div>\n\nWhy Artists (and Fans) Are Outraged\n🎨 Miyazaki's Opposition – The legendary filmmaker has openly despised AI in animation since 2016, seeing it as soulless and inhuman.\n⚖️ Copyright Concerns – If GPT-4o was trained on Ghibli artwork without permission, is it legal—or outright theft?\n🖌️ Artistic Exploitation – Many believe AI-generated Ghibli-style art devalues human creativity, as artists receive no recognition or compensation.\n\nEven more troubling, the filter took a political turn. When the White House posted a Ghibli-style image of a migrant arrest, it ignited global backlash. Many saw it as tone-deaf and exploitative, raising concerns about AI's ability to repurpose art in ways that its original creators would never approve.\n\nThe Future of AI Art: Where Do We Go From Here?\nGPT-4o's image generation is undoubtedly a technological leap, but it also serves as a wake-up call. As AI blurs the lines between creativity and controversy, one question looms large:\n\n🔹 Should AI be allowed to mimic iconic artistic styles without consent?\n\nFor now, OpenAI remains tight-lipped about whether its model was trained on copyrighted material. Legal battles loom on the horizon, with artists like Karla Ortiz calling for greater transparency and protection.\n\nOne thing is clear: AI isn't going away. But if it's to coexist with human artistry, companies must navigate these ethical minefields with respect, responsibility, and a deep appreciation for the creative minds that came before.\n\nSo, is GPT-4o's Studio Ghibli filter an exciting tribute or an artistic trespass? That's for you to decide.",
    created_at: "2025-03-31",
    updated_at: "2025-03-31",
    tags: ["AI", "GPT-4o", "Studio Ghibli", "Image Generation", "Ethics"]
  },
  {
    id: '1',
    category: "Tech & Development",
    title: "🚀 My Portfolio Website 2.0: A Complete Overhaul 🎨💻",
    content: "🌟 The Big Transformation\n\nWhen I first built my portfolio website, it was just another static site with HTML & CSS—functional, yes, but not meant to turn heads. I knew I needed something bigger, better, and bolder. So, I rolled up my sleeves and embarked on an adventure to completely revamp my website from scratch using Vite, React, and TypeScript! 🛠️\n\nAnd wow, what a journey it has been! 🚀 From adding fancy animations to completely overhauling the blog system, I've pushed my skills to the next level to create something that feels modern, interactive, and uniquely mine. Let's dive into every single update I made! 👇\n\n🔥 Every Cool Thing I Added & Upgraded\n\n🏗️ Tech Stack Upgrade - A Stronger Foundation\n\n🔹 Old Site: Static HTML & CSS 💤\n🔹 New Site: Vite + React + TypeScript ⚡\n🔹 Styling: Switched to Tailwind CSS for faster and cleaner designs ✨\n🔹 Animations: Introduced Framer Motion for sleek, professional transitions 🌀\n🔹 Performance Boost: Optimized loading speeds and lazy-loaded assets 🚄\n\n🎨 UI & UX Glow-Up - Making It Visually Stunning ✨\n\n✅ 3D Effects & Glassmorphism: Smooth, futuristic, and modern! 🪩\n✅ Cursor Interactions: Subtle yet effective hover & motion effects\n✅ Smooth Page Transitions: No more clunky reloads! Just sleek animations 🕶️\n✅ Mobile-First Design: It looks gorgeous on ANY screen size 📱💻\n✅ Loading Animations: A little extra magic when you land on the page ✨\n\n📝 Blog Section - The Ultimate Revamp 🔄\n\n💡 Dynamic Blog System: No more basic static posts—blogs are now fully interactive!\n💡 Apple-Style Card Carousel: The latest 3 blogs are displayed in a sleek carousel 🎠\n💡 Dedicated Blog Pages: Each post has its own individual page 📝\n💡 Back Button: Easily return to the main blog list 🔙\n💡 Read More Button: Expands previews into full-length posts 📖\n💡 Blog List Page: A clean, modern interface to browse all posts at once 🌍\n\n❤️ Likes & Comments System - Because Interaction Matters!\n\n💬 Like & React Feature: Users can now express their thoughts with reactions! 🔥💖👍\n💬 Comment System: I'm working on an easy, lightweight way to let users leave comments 📝\n💬 Engaging UI for Likes: Smooth hover animations make it fun to interact 🎭\n\n📩 Contact Form - Smarter & More Responsive\n\n✉️ Formspree Integration: A simple, effective way to handle messages 📬\n✉️ Automatic Email Replies: Users instantly get an email confirmation after submitting the form 📧\n✉️ Basic Email Validation: Prevents spam & fake submissions 🚫\n\n🌐 Additional Tweaks & Polish\n\n✨ SEO Optimization: Now Google & search engines can find me faster! 🔍\n✨ Optimized Performance: Reduced load times by compressing images & removing bloat 🚀\n✨ Cleaned Up Code: Refactored everything to make it more efficient & readable 💻🧹\n\n🎯 The Final Result? A Portfolio That Finally Feels Like Me\n\nThis wasn't just a redesign—it was a passion project. Every color, animation, and interaction was carefully crafted to create a website that feels alive, modern, and professional. 🌟\n\nBut guess what? This is just the beginning. More features, tweaks, and improvements are coming! 🔥 If you have any ideas or feedback, I'd love to hear them. 🤗\n\n📂 Want to See the Source Code? Here's My GitHub Repo! 👨‍💻\n\n<a href=\"https://github.com/SmartKidzee/new_portfolio\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1\">Check out the code on GitHub - SmartKidzee/new_portfolio</a>\n\n🌟 What's Next?\n\n📌 Implementing real-time comments for blog posts 💬\n📌 Adding more interactive elements (think: cool hover effects & sound cues!) 🎵\n📌 Experimenting with new UI animations using GSAP 🎭\n\nThis journey was incredibly rewarding, and I'm so excited to keep refining & improving. What do you think of the new site? Let me know in the comments! 🚀💬",
    created_at: "2025-03-29",
    updated_at: "2025-03-30",
    src: 'https://i.ibb.co/DD3tfFc2/Chat-GPT-Image-Mar-29-2025-04-41-50-PM.png',
    isAchievement: true,
    tags: ["Portfolio", "React", "TypeScript", "Vite", "UI/UX", "Development"]
  },
  {
    id: '2',
    category: "Academic Achievement",
    title: "🎓 Academic Achievement – First Semester Success!",
    content: "Semester 1 results are in – SGPA: 9.00.\n\nBut does it really mean anything? At the end of the day, grades don't define what you know or what you can do. A number on a piece of paper doesn't say whether you actually understood the concepts, built something useful, or developed a skill that matters in the real world.\n\nWhat Actually Mattered:\n📌 Cybersecurity – The theory was fine, but what really counts is understanding real-world threats and how to defend against them.\n📌 Mathematics – Problem-solving is useful, but grades in math? Not so much.\n📌 Physics – The exam tested memorization, but true understanding comes from application.\n📌 Programming & Engineering Fundamentals – This was the most valuable part—learning to think like a problem solver, write code, and debug efficiently.\n\nSome subjects were just there to check a box, while others had real-world relevance. The key lesson? Degrees don't guarantee knowledge—skills do.\n\nWith Semester 2 already in motion (since March 17, 2025), my focus is shifting toward real projects, hands-on coding, and learning things that actually matter. Numbers fade, skills last. Let's build. 🚀",
    created_at: "2025-03-25",
    updated_at: "2025-03-25",
    src: 'https://i.ibb.co/qFLMNXRm/Chat-GPT-Image-Mar-29-2025-02-57-13-PM.png',
    isAchievement: true,
    tags: ["Education", "Academics", "Learning"]
  },
  {
    id: '3',
    category: "Gaming",
    title: "🎮 Gaming – PS5 Unboxing Video!",
    content: "It finally happened—I got a PlayStation 5! 🎮🔥\n\nAfter months of watching unboxings, reading reviews, and debating whether to get one, I finally got my hands on Sony's next-gen beast. And let me tell you, this console does not disappoint.\n\nUnboxing Experience\n📦 What's in the box? PS5 console, DualSense controller, cables, and a stand—all beautifully packed.\n🎮 First Impressions – The console looks futuristic, and the DualSense controller is unlike anything I've used before.\n⚡ Blazing-fast load times – Games start instantly, no waiting, no lag.\n🔥 Graphics & Performance – I tested Spider-Man: Miles Morales and God of War Ragnarök—the ray tracing, the smooth 60 FPS gameplay, the details… absolutely mind-blowing.\n\nThe full unboxing video is up on my YouTube channel! Go check it out and comment which game I should try next! 🎥",
    created_at: "2025-03-22",
    updated_at: "2025-03-23",
    src: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?auto=format&fit=crop&w=800',
    video: 'https://www.youtube.com/embed/gM09dY6WKXY',
    tags: ["Gaming", "PlayStation", "Tech"]
  },
  {
    id: '4',
    category: "Education",
    title: "📚 Education – A New Chapter at NIE",
    content: "Starting my journey at The National Institute of Engineering, Mysuru, has been an exciting, challenging, and eye-opening experience. Studying Computer Science & Engineering (CSE) with a specialization in AI & ML, I'm finally getting to explore cutting-edge technologies that truly excite me.\n\nFirst Impressions & College Life So Far\n✔ Adjusting to the new routine – From school to engineering life, it's a big transition.\n✔ Exploring AI & ML – This is what I signed up for, and I can't wait to build real-world applications.\n✔ Connecting with like-minded people – Meeting peers who share the same enthusiasm for tech.\n✔ Hands-on learning – It's not just about reading, it's about creating, experimenting, and building.\n\nWith Semester 2 in full swing, I'm now focusing on real-world projects, deeper learning, and constantly improving my coding skills. Engineering isn't just about passing subjects—it's about building the future.\n\nLooking forward to everything ahead! 🚀",
    created_at: "2025-03-20",
    updated_at: "2025-03-20",
    src: 'https://i.ibb.co/HLv8CcCk/NIEimg.jpg',
    tags: ["Education", "Engineering", "College"]
  }
];

// Get only the latest N blogs
export const getLatestBlogs = (count: number): Blog[] => {
  // Sort blogs by date and get the latest ones
  const sortedBlogs = [...blogs].sort((a, b) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  ).slice(0, count);
  
  // Apply special thumbnail for blog #5 if present
  return sortedBlogs.map(blog => {
    if (blog.id === '5') {
      return {
        ...blog,
        _thumbnailOverride: "https://i.ibb.co/27jPk2CL/chatgpt-4o-ghibli-style-images-jpg.webp"
      };
    }
    return blog;
  });
};

// Get blog with the corresponding ID
export const getBlogById = (id: string): Blog | undefined => {
  return blogs.find(blog => blog.id === id);
};

// Get the latest blog indices (for correct linking)
export const getLatestBlogIndices = (count: number): string[] => {
  return getLatestBlogs(count).map(blog => blog.id);
};

// Search blogs by query
export const searchBlogs = (query: string): Blog[] => {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) return blogs;
  
  return blogs.filter(blog => 
    blog.title.toLowerCase().includes(normalizedQuery) || 
    blog.content.toLowerCase().includes(normalizedQuery) ||
    blog.category.toLowerCase().includes(normalizedQuery) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery))
  );
};

// Filter blogs by category
export const filterBlogsByCategory = (category: string): Blog[] => {
  if (!category || category === 'All') return blogs;
  
  return blogs.filter(blog => blog.category === category);
};

// Get all blog categories
export const getBlogCategories = (): string[] => {
  const categories = new Set(blogs.map(blog => blog.category));
  return Array.from(categories);
};

// Get all blog tags
export const getBlogTags = (): string[] => {
  const tagsSet = new Set<string>();
  
  blogs.forEach(blog => {
    blog.tags?.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  
  return Array.from(tagsSet);
}; 