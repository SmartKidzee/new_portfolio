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
    id: '6',
    category: "Tech",
    title: "🚀 Vibe Coding: The Future of AI-Powered Software Creation",
    content: "**🔑 Key Points**\n\nVibe coding seems likely to be an AI-assisted programming method where developers use natural language to generate code, potentially transforming software development.\n\nResearch suggests it increases productivity, makes coding accessible to non-coders, and allows focus on creativity, but challenges like code accuracy and debugging remain.\n\nThe evidence leans toward vibe coding being used by startups and individuals for quick app development, with potential for future industry impact.\n\n**🌟 Introduction to Vibe Coding**\n\nVibe coding is an emerging approach in software development, where developers describe what they want in natural language, and AI generates the code. Coined by AI expert Andrej Karpathy in February 2025, it shifts the focus from manual coding to guiding AI, making it accessible even to those without deep programming knowledge.\n\n**🔄 The Process and Benefits**\n\nThe process involves describing ideas in prompts, letting AI generate code, and refining it. This can boost productivity, enable non-coders to create software, and free up time for creative design. However, challenges like ensuring code accuracy and debugging AI-generated code require human oversight.\n\n**🌍 Real-World Impact and Future Outlook**\n\nStartups and individuals are already using vibe coding for quick app development, like personalized tools or lean startup teams. Looking ahead, it seems likely to evolve, potentially democratizing software creation and reshaping the industry, though concerns about quality and security persist.\n\n**📑 Survey Note: Detailed Analysis of Vibe Coding in Software Development**\n\n**🧩 Overview and Definition**\n\nVibe coding, a term introduced by computer scientist Andrej Karpathy in February 2025, is an AI-dependent programming technique that relies on large language models (LLMs) to generate code from natural language prompts. This method marks a significant departure from traditional coding, where developers manually write code line by line, requiring extensive knowledge of programming languages and syntax.\n\nInstead, vibe coding allows individuals to describe their software ideas in plain English, with AI tools like Cursor Composer, GitHub Copilot, and Replit Agent translating these descriptions into functional code. This shift redefines the programmer's role, focusing on guiding, testing, and refining AI-generated outputs rather than writing code from scratch.\n\nThe concept gained traction quickly, with Merriam-Webster listing it as a \"slang & trending\" noun in March 2025, reflecting its rapid adoption in tech circles. It is particularly noted for enabling amateur programmers and non-coders to produce software, potentially democratizing the field.\n\n**🧠 Origins and Historical Context**\n\nThe origins of vibe coding can be traced to the advancements in AI, particularly the development of LLMs capable of understanding and generating code from natural language.\n\nKarpathy, a co-founder of OpenAI and former AI leader at Tesla, introduced the term in an X post on February 2, 2025, describing it as:\n\n*\"A new kind of coding where you fully give in to the vibes, embrace exponentials, and forget that the code even exists.\"*\n\nThis casual description highlights the intuitive, less technical approach, contrasting with traditional software development's emphasis on precision and control.\n\nThe rise of tools like ChatGPT (released in late 2022) laid the groundwork, with Karpathy noting in an X post at the time:\n\n*\"The hottest new programming language is English,\"*\n\nunderscoring the potential of prompt-driven coding. Vibe coding builds on this, formalizing the practice with a catchy name that resonates in Silicon Valley and beyond.\n\n**🔧 The Process: How It Works**\n\nThe vibe coding process is iterative and user-friendly, designed to simplify software development:\n\n1. **Conceptualization**: Developers or creators start by thinking about the desired functionality, such as building a simple website or a utility app.\n\n2. **Prompt Creation**: They articulate their idea in natural language, providing detailed prompts to the AI. For example:\n*\"Create a React app that takes a photo of a restaurant menu, translates it, and shows a list of food with photos.\"*\n\n3. **Code Generation**: The AI, using tools like Cursor or Replit, generates the corresponding code based on the prompt. This can include front-end, back-end, database integration, and more, depending on the complexity.\n\n4. **Review and Refinement**: The developer tests the generated code, identifies issues, and provides further prompts for adjustments. This might involve fixing bugs, enhancing features, or optimizing performance.\n\nThis process contrasts with traditional coding, where developers write every line manually, often requiring deep technical expertise. Vibe coding's reliance on AI shifts the burden, allowing for rapid prototyping and iteration, as seen in guides like Getting Started with Vibe Coding, which recommend starting with small projects to leverage AI effectively.\n\n**⚡ Benefits: Enhancing Productivity and Accessibility**\n\nVibe coding offers several compelling benefits, supported by early adopters and industry observations:\n\n✅ **Increased Productivity**: By automating code generation, developers can focus on higher-level design and functionality, significantly reducing development time.\nBusiness Insider reports that engineers using AI tools can get \"twice as much done,\" highlighting efficiency gains.\n\n✅ **Accessibility for Non-Coders**: It lowers the barrier to entry, enabling individuals without formal coding training to create software.\nExamples like New York Times journalist Kevin Roose, who used vibe coding to build \"LunchBox Buddy\" (a personalized app analyzing fridge contents for lunch suggestions), highlight this shift.\n\n✅ **Focus on Creative Aspects**: With AI handling the technical details, developers can concentrate on user experience, design, and innovation.\nArs Technica describes vibe coding as \"surrendering to the flow,\" emphasizing creative freedom.\n\nThese benefits are particularly appealing in industries where rapid prototyping and customization are valued, potentially accelerating software adoption in sectors like education, healthcare, and small businesses.\n\n**⚠️ Challenges: Navigating Accuracy and Oversight**\n\nDespite its promise, vibe coding faces several challenges that require careful consideration:\n\n❌ **Code Accuracy**: AI-generated code may contain errors or suboptimal solutions, necessitating thorough testing.\nHacker News discussions highlight concerns about AI fabricating fake reviews in e-commerce apps, underscoring reliability issues.\n\n❌ **Debugging Difficulties**: Understanding and fixing errors in AI-generated code can be challenging, especially for developers unfamiliar with the underlying logic.\nAs Ars Technica notes, the process often involves \"feeding errors back to AI and hoping for fixes,\" which may not always work.\n\n❌ **Need for Human Oversight**: Even with AI assistance, human intervention is crucial to ensure code quality, security, and compliance with standards.\nLovable Blog addresses this, noting concerns about long-term maintainability and security, particularly for critical applications.\n\nThese challenges suggest that while vibe coding is transformative, it is not a complete replacement for traditional coding—especially in complex or high-stakes projects.\n\n**🧪 Real-World Examples: Case Studies and Applications**\n\nVibe coding is already being implemented across various contexts, demonstrating its practical utility:\n\n🚀 **Startups and Lean Teams**: Y Combinator CEO Garry Tan, in an interview with Business Insider, highlighted how vibe coding enables startups to achieve significant revenue with small teams (e.g., reaching millions with under ten employees). This is attributed to AI handling much of the coding workload, allowing leaner operations.\n\n👤 **Individual Creators**: Kevin Roose's experiment, detailed in Wikipedia: Vibe coding, involved creating \"software for one,\" like LunchBox Buddy, showing how non-coders can build personalized tools.\nAnother example is a developer building a plane game with enemy UFO AI, as mentioned in 12 Rules to Vibe Code Without Frustration, illustrating hobbyist applications.\n\n🧱 **Full-Stack Projects**: A Comprehensive Guide to Vibe Coding Tools catalogs tools for building full-stack apps, including front-end, back-end, and database integration—showing its versatility for more complex projects.\n\nThese examples underscore vibe coding's role in enabling rapid development and innovation, particularly for startups and individual creators.\n\n**🔮 Future Outlook: Potential Evolution and Industry Impact**\n\nThe future of vibe coding appears promising, with potential to reshape the software development landscape:\n\n🧠 **Technological Advancements**: As AI improves, vibe coding is likely to handle more complex tasks, potentially generating code with higher accuracy and sophistication.\nAndrew Chen's Substack predicts adaptive software that adjusts based on user behavior, specified by outcomes rather than code, akin to spreadsheets for non-technical users.\n\n🏭 **Industry Transformation**: It could democratize software development, allowing more industries to create custom solutions, as noted in UX Tigers, where it is seen as intent-based outcome specification.\nThis might accelerate software adoption in long-tail industries, as suggested by Andrew Chen.\n\n🛡 **Challenges and Controversies**: However, concerns about code quality, security, and the need for professional oversight remain, as discussed in Hacker News, potentially increasing demand for specialized services to complement vibe coding.\n\nThe debate around whether traditional coding skills will remain relevant is ongoing, with figures like GitHub COO Kyle Daigle, in Moneycontrol, arguing that problem-solving skills are timeless, even as AI automates coding.\n\n**⚖️ Comparative Analysis: Traditional vs. Vibe Coding**\n\n<BlogTable\n  headers={[\"Aspect\", \"Traditional Coding\", \"Vibe Coding\"]}\n  rows={[\n    {\n      \"Aspect\": \"Skill Requirement\",\n      \"Traditional Coding\": \"High (programming languages, syntax)\",\n      \"Vibe Coding\": \"Low (natural language prompts)\"\n    },\n    {\n      \"Aspect\": \"Development Speed\",\n      \"Traditional Coding\": \"Slower, manual process\",\n      \"Vibe Coding\": \"Faster, AI-assisted\"\n    },\n    {\n      \"Aspect\": \"Accessibility\",\n      \"Traditional Coding\": \"Limited to coders\",\n      \"Vibe Coding\": \"Open to non-coders\"\n    },\n    {\n      \"Aspect\": \"Debugging\",\n      \"Traditional Coding\": \"Easier for coder, familiar with code\",\n      \"Vibe Coding\": \"Potentially harder, less familiarity\"\n    },\n    {\n      \"Aspect\": \"Oversight Needed\",\n      \"Traditional Coding\": \"Less, coder controls process\",\n      \"Vibe Coding\": \"More, to ensure AI output quality\"\n    }\n  ]}\n/>\n\n**📢 Conclusion and Call to Action**\n\nVibe coding represents a paradigm shift in software development, offering increased efficiency, accessibility, and creativity. While challenges like code accuracy and debugging persist, its real-world applications in startups and individual projects demonstrate its transformative potential.\n\nAs AI continues to evolve, it seems likely to play a significant role in the future, potentially reshaping industry practices.\n\n💡 For those interested, exploring tools like Cursor, GitHub Copilot, or Replit Agent can provide a hands-on introduction to vibe coding. Whether you're a seasoned developer or a curious beginner, now is the time to experiment and see how this approach can enhance your software creation process.",
    created_at: "2025-04-01",
    updated_at: "2025-04-11",
    tags: ["AI", "Programming", "Vibe Coding", "Software Development", "Future Tech"],
    src: "/blogassets/blog6.jpeg"
  },
  {
    id: '5',
    category: "Tech",
    title: "GPT-4o's Image Generation: Innovation or Imitation? The Studio Ghibli Controversy Unpacked",
    content: "In the ever-evolving landscape of AI, GPT-4o, OpenAI's latest multimodal marvel, has stirred both awe and outrage. Unveiled in May 2024, this powerhouse model seamlessly generates text, images, and even audio—a creative revolution at our fingertips. But when it rolled out image generation on March 25, 2025, one feature stole the spotlight (and sparked heated debates): the Studio Ghibli filter.\n\nThis tool, capable of producing breathtaking visuals inspired by \"Spirited Away\" and \"My Neighbor Totoro,\" went viral—only to be met with backlash from artists, legal experts, and Ghibli fans alike. Why? Because legendary filmmaker Hayao Miyazaki has long condemned AI in animation, famously calling it an \"*insult to life itself.*\"\n\nSo, is this just another AI breakthrough, or has GPT-4o crossed the line into artistic theft? Let's dive into the technology, the advantages, the controversies, and what it all means for the future of AI-driven creativity.\n\n**Inside GPT-4o's Image Generation: How It Works**\n\nGPT-4o's image creation isn't just an add-on—it's a game changer. Unlike earlier models like DALL-E 3, which relied on diffusion transformers, GPT-4o integrates image generation directly into its multimodal framework. This unified approach allows it to process complex text prompts and render detailed, highly contextual visuals in seconds.\n\n**Key Strengths: Why GPT-4o is a Creative Powerhouse**\n\n✅ **Effortless Artistry** – No design skills? No problem. A simple text prompt like \"A cyberpunk city under neon rain\" can generate stunning results.\n✅ **Interactive Editing** – Users can tweak images in real-time. Want more stars in the night sky? Just ask.\n✅ **Versatile Styles** – From hyper-realistic landscapes to dreamy anime aesthetics, GPT-4o adapts seamlessly.\n✅ **Fast and Accessible** – No complex software, no manual drawing—just instant creativity at your fingertips.\n\nBut where there's innovation, there's also controversy. And that's where the Studio Ghibli filter enters the scene.\n\n**The Studio Ghibli Filter: A Nostalgic Dream or an Ethical Nightmare?**\n\nAt first glance, the ability to \"Ghiblify\" any image seems magical. Users flocked to social media, sharing AI-generated scenes that looked straight out of a Miyazaki classic. But not everyone was impressed.\n\n**Some of my generations:**\n\n<div class=\"blog-image-grid\">\n  <img src=\"https://i.ibb.co/ZRk7vtrT/Chat-GPT-Image-Mar-29-2025-02-17-16-PM.png\" alt=\"AI Ghibli landscape\" />\n  <img src=\"https://i.ibb.co/ZRTvPz88/Chat-GPT-Image-Mar-29-2025-02-17-24-PM.png\" alt=\"AI Ghibli character\" />\n  <img src=\"https://i.ibb.co/d4Y4nMv1/Chat-GPT-Image-Mar-29-2025-02-22-13-PM.png\" alt=\"AI Ghibli scene\" />\n  <img src=\"https://i.ibb.co/840khZ2X/Chat-GPT-Image-Mar-29-2025-02-57-13-PM.png\" alt=\"AI Ghibli cityscape\" />\n  <img src=\"https://i.ibb.co/WpfYRyt6/Chat-GPT-Image-Mar-29-2025-05-42-15-PM.png\" alt=\"AI Ghibli fantasy\" />\n</div>\n\n**Why Artists (and Fans) Are Outraged**\n\n🎨 **Miyazaki's Opposition** – The legendary filmmaker has openly despised AI in animation since 2016, seeing it as soulless and inhuman.\n⚖️ **Copyright Concerns** – If GPT-4o was trained on Ghibli artwork without permission, is it legal—or outright theft?\n🖌️ **Artistic Exploitation** – Many believe AI-generated Ghibli-style art devalues human creativity, as artists receive no recognition or compensation.\n\nEven more troubling, the filter took a political turn. When the White House posted a Ghibli-style image of a migrant arrest, it ignited global backlash. Many saw it as tone-deaf and exploitative, raising concerns about AI's ability to repurpose art in ways that its original creators would never approve.\n\n**The Future of AI Art: Where Do We Go From Here?**\n\nGPT-4o's image generation is undoubtedly a technological leap, but it also serves as a wake-up call. As AI blurs the lines between creativity and controversy, one question looms large:\n\n🔹 Should AI be allowed to mimic iconic artistic styles without consent?\n\nFor now, OpenAI remains tight-lipped about whether its model was trained on copyrighted material. Legal battles loom on the horizon, with artists like Karla Ortiz calling for greater transparency and protection.\n\nOne thing is clear: AI isn't going away. But if it's to coexist with human artistry, companies must navigate these ethical minefields with respect, responsibility, and a deep appreciation for the creative minds that came before.\n\nSo, is GPT-4o's Studio Ghibli filter an exciting tribute or an artistic trespass? That's for you to decide.",
    created_at: "2025-03-31",
    updated_at: "2025-04-11",
    tags: ["AI", "GPT-4o", "Studio Ghibli", "Image Generation", "Ethics"]
  },
  {
    id: '1',
    category: "Tech & Development",
    title: "🚀 My Portfolio Website 2.0: A Complete Overhaul 🎨💻",
    content: "**🌟 The Big Transformation**\n\nWhen I first built my portfolio website, it was just another static site with HTML & CSS—functional, yes, but not meant to turn heads. I knew I needed something bigger, better, and bolder. So, I rolled up my sleeves and embarked on an adventure to completely revamp my website from scratch using Vite, React, and TypeScript! 🛠️\n\nAnd wow, what a journey it has been! 🚀 From adding fancy animations to completely overhauling the blog system, I've pushed my skills to the next level to create something that feels modern, interactive, and uniquely mine. Let's dive into every single update I made! 👇\n\n**🔥 Every Cool Thing I Added & Upgraded**\n\n**🏗️ Tech Stack Upgrade - A Stronger Foundation**\n\n🔹 Old Site: Static HTML & CSS 💤\n🔹 New Site: Vite + React + TypeScript ⚡\n🔹 Styling: Switched to Tailwind CSS for faster and cleaner designs ✨\n🔹 Animations: Introduced Framer Motion for sleek, professional transitions 🌀\n🔹 Performance Boost: Optimized loading speeds and lazy-loaded assets 🚄\n\n**🎨 UI & UX Glow-Up - Making It Visually Stunning ✨**\n\n✅ 3D Effects & Glassmorphism: Smooth, futuristic, and modern! 🪩\n✅ Cursor Interactions: Subtle yet effective hover & motion effects\n✅ Smooth Page Transitions: No more clunky reloads! Just sleek animations 🕶️\n✅ Mobile-First Design: It looks gorgeous on ANY screen size 📱💻\n✅ Loading Animations: A little extra magic when you land on the page ✨\n\n**📝 Blog Section - The Ultimate Revamp 🔄**\n\n💡 Dynamic Blog System: No more basic static posts—blogs are now fully interactive!\n💡 Apple-Style Card Carousel: The latest 3 blogs are displayed in a sleek carousel 🎠\n💡 Dedicated Blog Pages: Each post has its own individual page 📝\n💡 Back Button: Easily return to the main blog list 🔙\n💡 Read More Button: Expands previews into full-length posts 📖\n💡 Blog List Page: A clean, modern interface to browse all posts at once 🌍\n\n**❤️ Likes & Comments System - Because Interaction Matters!**\n\n💬 Like & React Feature: Users can now express their thoughts with reactions! 🔥💖👍\n💬 Comment System: I'm working on an easy, lightweight way to let users leave comments 📝\n💬 Engaging UI for Likes: Smooth hover animations make it fun to interact 🎭\n\n**📩 Contact Form - Smarter & More Responsive**\n\n✉️ Formspree Integration: A simple, effective way to handle messages 📬\n✉️ Automatic Email Replies: Users instantly get an email confirmation after submitting the form 📧\n✉️ Basic Email Validation: Prevents spam & fake submissions 🚫\n\n**🌐 Additional Tweaks & Polish**\n\n✨ SEO Optimization: Now Google & search engines can find me faster! 🔍\n✨ Optimized Performance: Reduced load times by compressing images & removing bloat 🚀\n✨ Cleaned Up Code: Refactored everything to make it more efficient & readable 💻🧹\n\n**🎯 The Final Result? A Portfolio That Finally Feels Like Me**\n\nThis wasn't just a redesign—it was a passion project. Every color, animation, and interaction was carefully crafted to create a website that feels alive, modern, and professional. 🌟\n\nBut guess what? This is just the beginning. More features, tweaks, and improvements are coming! 🔥 If you have any ideas or feedback, I'd love to hear them. 🤗\n\n**📂 Want to See the Source Code? Here's My GitHub Repo! 👨‍💻**\n\n<a href=\"https://github.com/SmartKidzee/new_portfolio\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-indigo-400 hover:text-indigo-300 hover:underline inline-flex items-center gap-1\">Check out the code on GitHub - SmartKidzee/new_portfolio</a>\n\n**🌟 What's Next?**\n\n📌 Implementing real-time comments for blog posts 💬\n📌 Adding more interactive elements (think: cool hover effects & sound cues!) 🎵\n📌 Experimenting with new UI animations using GSAP 🎭\n\nThis journey was incredibly rewarding, and I'm so excited to keep refining & improving. What do you think of the new site? Let me know in the comments! 🚀💬",
    created_at: "2025-03-29",
    updated_at: "2025-04-11",
    src: 'https://i.ibb.co/DD3tfFc2/Chat-GPT-Image-Mar-29-2025-04-41-50-PM.png',
    isAchievement: true,
    tags: ["Portfolio", "React", "TypeScript", "Vite", "UI/UX", "Development"]
  },
  {
    id: '2',
    category: "Academic Achievement",
    title: "🎓 Academic Achievement – First Semester Success!",
    content: "Semester 1 results are in – SGPA: 9.00.\n\nBut does it really mean anything? At the end of the day, grades don't define what you know or what you can do. A number on a piece of paper doesn't say whether you actually understood the concepts, built something useful, or developed a skill that matters in the real world.\n\n**What Actually Mattered:**\n\n📌 **Cybersecurity** – The theory was fine, but what really counts is understanding real-world threats and how to defend against them.\n📌 **Mathematics** – Problem-solving is useful, but grades in math? Not so much.\n📌 **Physics** – The exam tested memorization, but true understanding comes from application.\n📌 **Programming & Engineering Fundamentals** – This was the most valuable part—learning to think like a problem solver, write code, and debug efficiently.\n\nSome subjects were just there to check a box, while others had real-world relevance. The key lesson? Degrees don't guarantee knowledge—*skills do*.\n\nWith Semester 2 already in motion (since March 17, 2025), my focus is shifting toward real projects, hands-on coding, and learning things that actually matter. Numbers fade, skills last. Let's build. 🚀",
    created_at: "2025-03-25",
    updated_at: "2025-04-11",
    src: 'https://i.ibb.co/qFLMNXRm/Chat-GPT-Image-Mar-29-2025-02-57-13-PM.png',
    isAchievement: true,
    tags: ["Education", "Academics", "Learning"]
  },
  {
    id: '3',
    category: "Gaming",
    title: "🎮 Gaming – PS5 Unboxing Video!",
    content: "It finally happened—I got a PlayStation 5! 🎮🔥\n\nAfter months of watching unboxings, reading reviews, and debating whether to get one, I finally got my hands on Sony's next-gen beast. And let me tell you, this console does not disappoint.\n\n**Unboxing Experience**\n\n📦 **What's in the box?** PS5 console, DualSense controller, cables, and a stand—all beautifully packed.\n🎮 **First Impressions** – The console looks futuristic, and the DualSense controller is unlike anything I've used before.\n⚡ **Blazing-fast load times** – Games start instantly, no waiting, no lag.\n🔥 **Graphics & Performance** – I tested Spider-Man: Miles Morales and God of War Ragnarök—the ray tracing, the smooth 60 FPS gameplay, the details… absolutely mind-blowing.\n\nThe full unboxing video is up on my YouTube channel! Go check it out and comment which game I should try next! 🎥",
    created_at: "2025-03-22",
    updated_at: "2025-04-11",
    src: 'https://images.unsplash.com/photo-1622297845775-5ff3fef71d13?auto=format&fit=crop&w=800',
    video: 'https://www.youtube.com/embed/gM09dY6WKXY',
    tags: ["Gaming", "PlayStation", "Tech"]
  },
  {
    id: '4',
    category: "Education",
    title: "📚 Education – A New Chapter at NIE",
    content: "Starting my journey at The National Institute of Engineering, Mysuru, has been an exciting, challenging, and eye-opening experience. Studying Computer Science & Engineering (CSE) with a specialization in AI & ML, I'm finally getting to explore cutting-edge technologies that truly excite me.\n\n**First Impressions & College Life So Far**\n\n✔ **Adjusting to the new routine** – From school to engineering life, it's a big transition.\n✔ **Exploring AI & ML** – This is what I signed up for, and I can't wait to build real-world applications.\n✔ **Connecting with like-minded people** – Meeting peers who share the same enthusiasm for tech.\n✔ **Hands-on learning** – It's not just about reading, it's about creating, experimenting, and building.\n\nWith Semester 2 in full swing, I'm now focusing on real-world projects, deeper learning, and constantly improving my coding skills. Engineering isn't just about passing subjects—*it's about building the future*.\n\nLooking forward to everything ahead! 🚀",
    created_at: "2025-03-20",
    updated_at: "2025-04-11",
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