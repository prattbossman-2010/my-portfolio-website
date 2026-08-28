const projects = [
    {
        id: 1,
        title: "CloudTok",
        description: "My biggest project — a full-stack social network inspired by TikTok. Users share short videos, like, comment, follow, and even make live video calls, all powered by a custom-built frontend engine.",
        longDescription: "CloudTok features a swipeable video feed with a custom player engine, WebRTC-powered video calling, real-time chat and conversations, search & discover pages, a follow system, notification popups, a recommendation engine that personalizes the feed, built-in AI modules for thumbnails and assistance, an onboarding flow, and a full admin dashboard. Everything runs on a hand-written vanilla JS architecture with its own database abstraction and migration layer.",
        category: "fullstack",
        tech: ["HTML", "CSS", "Vanilla JS", "WebRTC", "Real-time Chat", "Recommendation Engine", "AI Integration"],
        image: "images/cloudtok/cloudtok1.png",
        slides: [
            "images/cloudtok/cloudtok2.png",
            "images/cloudtok/cloudtok1.png",
            "images/cloudtok/cloudtok3.png",
            "images/cloudtok/cloudtok4.png",
            "images/cloudtok/cloudtok5.png",
            "images/cloudtok/cloudtok6.png"
        ],
        links: {
            live: "https://prattbossman-2010.github.io/CloudTok",
            github: "https://github.com/prattbossman-2010/CloudTok",
            docs: null
        },
        featured: true,
        year: 2026
    },
    {
        id: 2,
        title: "MotionForge",
        description: "A 3D motion capture and animation studio for game models. Tracks your body with AI pose detection, retargets the motion onto any rigged character, and lets you trim and export animations.",
        longDescription: "MotionForge captures human motion from a webcam using MediaPipe's pose landmarker running on WASM, conditions the raw joint data, generates skeletons, and retargets animations onto imported FBX, GLB and GLTF characters through a skeleton-mapping solver. It includes a multi-view workflow (import → mocap → preview → retarget → trim), project saving, model readers for assets from Mixamo, Sketchfab, Unity, Blender and more, plus PWA support with offline service worker.",
        category: "tools",
        tech: ["JavaScript", "MediaPipe Pose", "Three.js", "FBX / GLB / GLTF", "Skeleton Retargeting", "PWA"],
        image: "images/motionforge/motionforge1.png",
        slides: [
            "images/motionforge/motionforge2.png",
            "images/motionforge/motionforge1.png",
            "images/motionforge/motionforge3.png",
            "images/motionforge/motionforge4.png"
        ],
        links: {
            live: null,
            github: null,
            docs: null
        },
        featured: true,
        year: 2026
    },
    {
        id: 3,
        title: "Script2Video Studio",
        description: "An AI video production studio. Paste a script and every paragraph becomes a scene — the AI researches and fetches matching footage, edits and trims clips, adds a TTS voiceover, and exports the final video.",
        longDescription: "Script2Video Studio turns written scripts into finished videos automatically. A wizard-style interface takes your script and visual style hints, uses an LLM agent to plan scenes and search queries, fetches matching stock footage via a Python helper, trims and sequences clips in a browser editing engine, layers on text-to-speech narration, and exports the result. Modules cover the LLM brain, search agent, TTS engine, state management and exporter.",
        category: "ai",
        tech: ["JavaScript", "Python", "LLM Agent", "Text-to-Speech", "Video Editing", "Automation"],
        image: null,
        links: {
            live: null,
            github: "https://github.com/prattbossman-2010/video-gen",
            docs: null
        },
        featured: true,
        year: 2026
    },
    {
        id: 4,
        title: "AI Image Generator",
        description: "An AI image generator web app with smart prompt engineering — it enhances your prompts, regenerates variations by swapping camera angles, environments and lighting, and keeps a gallery history.",
        longDescription: "Built around an AI image-generation API with a prompt-enhancement layer that expands short ideas into rich prompts. Its signature feature is variation-based regeneration: re-rolling an image intelligently swaps camera shots (close-up, cinematic, low angle), environments and lighting setups while keeping your core idea. Includes a history gallery to browse and revisit past generations.",
        category: "ai",
        tech: ["HTML", "CSS", "JavaScript", "AI Image API", "Prompt Engineering"],
        image: null,
        links: {
            live: "https://prattbossman-2010.github.io/image-gen/",
            github: "https://github.com/prattbossman-2010/image-gen",
            docs: null
        },
        featured: true,
        year: 2025
    },
    {
        id: 5,
        title: "Zeal of Conquest",
        description: "A browser-based empire strategy game — 'Forge Empires. Command Armies. Become Legend.' Complete with scene management, campaign mode, and an options system for music, effects and graphics quality.",
        longDescription: "A strategy game playable entirely in the browser. Features a polished main-menu scene system (play, options, credits, exit), a campaign mode, persistent settings for music volume, effects volume and graphics quality, and an audio system with click feedback sounds and background music. Built from scratch with vanilla HTML, CSS and JavaScript.",
        category: "games",
        tech: ["HTML", "CSS", "JavaScript", "Web Audio", "Scene Management"],
        image: null,
        links: {
            live: "https://prattbossman-2010.github.io/zeal-of-conquest/",
            github: "https://github.com/prattbossman-2010/zeal-of-conquest",
            docs: null
        },
        featured: false,
        year: 2025
    },
    {
        id: 6,
        title: "Pratt Engine",
        description: "My own game engine foundation written in C++ with SDL2 — window management, input event polling and the core game loop. The starting point toward building my own 2D/3D engine from scratch.",
        longDescription: "Pratt Engine is a hands-on systems programming project: a C++ application built directly on SDL2 with manual initialization, window creation, a main loop and full event-polling architecture. It's the groundwork for a larger custom engine — understanding frames, events and rendering at the lowest level before layering on sprites, physics and eventually OpenGL-powered 3D rendering.",
        category: "games",
        tech: ["C++", "SDL2", "Systems Programming", "Game Loop"],
        image: null,
        links: {
            live: null,
            github: null,
            docs: null
        },
        featured: false,
        year: 2025
    },
    {
        id: 7,
        title: "SwiftLine Logistics",
        description: "A complete business website for a logistics company — services showcase, shipment tracking section, company story and contact page, fully responsive with smooth navigation.",
        longDescription: "A client-style business website for SwiftLine Logistics ('Fast, Reliable, Global Delivery'). Includes a marketing landing page, services overview covering freight, warehousing and last-mile delivery, a package tracking section, about and contact pages, and a responsive navbar with mobile menu toggle. Built with clean semantic HTML and modern CSS typography using Google Fonts.",
        category: "web",
        tech: ["HTML", "CSS", "JavaScript", "Responsive Design"],
        image: null,
        links: {
            live: "https://prattbossman-2010.github.io/SwiftLine-Logistics/",
            github: "https://github.com/prattbossman-2010/SwiftLine-Logistics",
            docs: null
        },
        featured: false,
        year: 2025
    },
    {
        id: 8,
        title: "ReggieK Enterprise",
        description: "A production website I built for my mum's natural health supplements business — live at reggiekent.store with seven product pages, SEO structured data and social media integration.",
        longDescription: "A complete business website for ReggieK Enterprise, a natural supplements company based in Dunkwa-On-Offin, Ghana. Features dedicated pages for the Mira supplement line (coffee, curve, lanang, life, miracell, phyll, wedok), an about section with founder profile, contact page, and WhatsApp/social channels. Deployed on a custom domain with proper SEO: Open Graph tags for rich social sharing, meta descriptions, keywords, and JSON-LD Organization structured data.",
        category: "web",
        tech: ["HTML", "CSS", "JavaScript", "SEO / JSON-LD", "Open Graph", "Custom Domain"],
        image: null,
        links: {
            live: "https://www.reggiekent.store",
            github: null,
            docs: null
        },
        featured: true,
        year: 2024
    },
    {
        id: 9,
        title: "WhatsApp Web Clone",
        description: "A pixel-faithful recreation of the WhatsApp Web interface — sidebar, contact list with active states, avatars and a working chat area, brought to life with interactive JavaScript.",
        longDescription: "A front-end challenge recreating WhatsApp Web's UI from scratch: the chat sidebar, searchable contact list with active-contact highlighting, initial-letter avatars and the messaging pane. Interactivity such as switching conversations and UI state is handled in vanilla JavaScript. A great exercise in layout precision and component thinking without frameworks.",
        category: "web",
        tech: ["HTML", "CSS", "JavaScript", "UI Cloning"],
        image: null,
        links: {
            live: "https://prattbossman-2010.github.io/whatsapp-interface-webapp/",
            github: "https://github.com/prattbossman-2010/whatsapp-interface-webapp",
            docs: null
        },
        featured: false,
        year: 2024
    },
    {
        id: 10,
        title: "Early Web Projects",
        description: "Where it all began — a collection of multi-page sites built while learning HTML & CSS: a games catalog with download pages and a media hub for movies, songs and software.",
        longDescription: "My first real websites: a gaming catalog site with dedicated pages for titles like Mortal Kombat 11, GTA V, RDR and Angry Birds; a media mega-hub with movies, songs, comedies and software sections; plus sign-in/sign-up flows and search functionality. Each page had its own stylesheet and scripts — raw practice that taught me layout, navigation, forms and DOM scripting the hard way.",
        category: "web",
        tech: ["HTML", "CSS", "JavaScript", "Multi-page Sites"],
        image: null,
        links: {
            live: null,
            github: null,
            docs: null
        },
        featured: false,
        year: 2023
    }
];

const categories = [
    { id: 'all', label: 'All', count: projects.length },
    { id: 'fullstack', label: 'Full-Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'web', label: 'Web', count: projects.filter(p => p.category === 'web').length },
    { id: 'ai', label: 'AI', count: projects.filter(p => p.category === 'ai').length },
    { id: 'games', label: 'Games', count: projects.filter(p => p.category === 'games').length },
    { id: 'tools', label: 'Tools', count: projects.filter(p => p.category === 'tools').length }
];

function getProjects() { return projects; }
function getCategories() { return categories; }
function getProjectById(id) { return projects.find(p => p.id === id); }
function getProjectsByCategory(category) {
    if (category === 'all') return projects;
    return projects.filter(p => p.category === category);
}
function getFeaturedProjects() { return projects.filter(p => p.featured); }
function getUniqueTech() {
    const techSet = new Set();
    projects.forEach(p => p.tech.forEach(t => techSet.add(t)));
    return Array.from(techSet).sort();
}
function getProjectStats() {
    return {
        total: projects.length,
        featured: projects.filter(p => p.featured).length,
        categories: categories.length - 1,
        technologies: getUniqueTech().length,
        yearsActive: new Date().getFullYear() - Math.min(...projects.map(p => p.year)) + 1
    };
}