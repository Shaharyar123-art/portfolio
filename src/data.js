export const ROLES = [
  'Full-Stack Developer',
  'React Specialist',
  'Angular Expert',
  '.NET Core Engineer',
  'Mobile Developer',
  'Performance Marketing Specialist'
];

export const MARKETING_SERVICES = [
  {
    platform: 'Google Ads',
    icon: '🔍',
    color: '#4285f4',
    gradient: 'linear-gradient(135deg, #4285f4, #34a853)',
    tagline: 'Maximize ROI with precision-targeted campaigns',
    description: 'I create and manage high-performance Google Ads campaigns that drive qualified traffic, boost conversions, and deliver measurable results for your business.',
    features: [
      { title: 'Search Campaigns', desc: 'Keyword-targeted ads on Google Search results', icon: '🎯' },
      { title: 'Display Network', desc: 'Visual banner ads across millions of websites', icon: '🖼️' },
      { title: 'Shopping Campaigns', desc: 'Product listing ads for e-commerce stores', icon: '🛍️' },
      { title: 'YouTube Video Ads', desc: 'Engaging video campaigns on YouTube', icon: '▶️' },
      { title: 'Remarketing', desc: 'Re-engage visitors who left without converting', icon: '🔄' },
      { title: 'Performance Max', desc: 'AI-powered campaigns across all Google channels', icon: '⚡' }
    ],
    stats: [
      { value: '300%', label: 'Avg. ROAS' },
      { value: '45%', label: 'Lower CPC' },
      { value: '2.5x', label: 'Conv. Rate' }
    ]
  },
  {
    platform: 'Facebook & Instagram Ads',
    icon: '📘',
    color: '#1877f2',
    gradient: 'linear-gradient(135deg, #1877f2, #e1306c)',
    tagline: 'Reach your ideal audience on social media',
    description: 'I leverage Facebook Ads Manager to create compelling ad campaigns across Facebook and Instagram that build brand awareness, generate leads, and drive sales.',
    features: [
      { title: 'Lead Generation', desc: 'Capture qualified leads with optimized forms', icon: '📋' },
      { title: 'Brand Awareness', desc: 'Increase visibility and reach new audiences', icon: '📢' },
      { title: 'Conversion Campaigns', desc: 'Drive purchases and sign-ups on your website', icon: '💰' },
      { title: 'Retargeting', desc: 'Target warm audiences with custom segments', icon: '🎯' },
      { title: 'Lookalike Audiences', desc: 'Find new customers similar to your best ones', icon: '👥' },
      { title: 'A/B Testing', desc: 'Data-driven creative and audience optimization', icon: '📊' }
    ],
    stats: [
      { value: '10M+', label: 'Ad Reach' },
      { value: '60%', label: 'Lower CPL' },
      { value: '4.2x', label: 'ROAS' }
    ]
  },
  {
    platform: 'LinkedIn Ads',
    icon: '💼',
    color: '#0077b5',
    gradient: 'linear-gradient(135deg, #0077b5, #0a66c2)',
    tagline: 'Professional B2B lead generation on LinkedIn',
    description: 'I design and manage LinkedIn ad campaigns that target professionals and businesses, driving high-quality leads and brand authority in the B2B space.',
    features: [
      { title: 'Sponsored Content', desc: 'Promoted posts in LinkedIn feed', icon: '📄' },
      { title: 'Message Ads', desc: 'Direct InMail messages to target audience', icon: '✉️' },
      { title: 'Lead Gen Forms', desc: 'Pre-filled forms for easy lead capture', icon: '📝' },
      { title: 'Dynamic Ads', desc: 'Personalized ads with member profiles', icon: '⚙️' }
    ],
    stats: [
      { value: '5M+', label: 'Impressions' },
      { value: '30%', label: 'Lead Conversion' },
      { value: '3x', label: 'ROAS' }
    ]
  }
];

export const MARKETING_PROCESS = [
  { step: '01', title: 'Audit & Strategy', desc: 'Deep analysis of your business, competitors, and market to craft a winning strategy.', icon: '🔬' },
  { step: '02', title: 'Campaign Setup', desc: 'Precise targeting, compelling ad creatives, and optimized landing pages.', icon: '🛠️' },
  { step: '03', title: 'Launch & Monitor', desc: 'Campaign launch with real-time monitoring, bid management, and budget optimization.', icon: '🚀' },
  { step: '04', title: 'Optimize & Scale', desc: 'Continuous A/B testing, performance analysis, and scaling winning campaigns.', icon: '📈' }
];

export const SKILLS = [
  { n: 'React', l: 95, c: 'Frontend', col: '#61dafb' },
  { n: 'Next.js', l: 90, c: 'Frontend', col: '#a78bfa' },
  { n: 'Angular', l: 85, c: 'Frontend', col: '#dd0031' },
  { n: 'TypeScript', l: 92, c: 'Language', col: '#3178c6' },
  { n: 'React Native', l: 88, c: 'Mobile', col: '#61dafb' },
  { n: 'ASP.NET Core', l: 82, c: 'Backend', col: '#7c3aed' },
  { n: 'C#', l: 80, c: 'Language', col: '#9b4dca' },
  { n: 'SQL Server', l: 78, c: 'Database', col: '#cc2927' },
  { n: 'MongoDB', l: 74, c: 'Database', col: '#47a248' },
  { n: 'Docker', l: 70, c: 'DevOps', col: '#2496ed' },
  { n: 'Git/GitHub', l: 93, c: 'Tools', col: '#f05032' },
  { n: 'REST APIs', l: 91, c: 'Backend', col: '#14b8a6' },
  { n: 'Azure', l: 72, c: 'DevOps', col: '#0078d4' },
  { n: 'Redux', l: 87, c: 'Frontend', col: '#764abc' },
  { n: 'PostgreSQL', l: 75, c: 'Database', col: '#336791' },
  { n: 'HTML/CSS', l: 96, c: 'Frontend', col: '#e34c26' },
  { n: 'WordPress', l: 80, c: 'CMS', col: '#21759b' }
];

export const PROJECTS = [
  {
    t: 'E-Commerce Platform',
    d: 'Full-stack e-commerce with real-time inventory, payment gateway integration, and a powerful admin dashboard.',
    tech: ['Next.js', 'ASP.NET Core', 'SQL Server', 'Stripe'],
    i: '🛒',
    col: '#8b5cf6',
    live:'https://www.fixturesmobel.com/'
  },
  {
    t: 'Task Manager App',
    d: 'Collaborative Kanban board with real-time updates via SignalR, team analytics, and role-based access control.',
    tech: ['React', 'SignalR', 'MongoDB', 'JWT'],
    i: '📋',
    col: '#14b8a6'
  },
  {
    t: 'Fitness Tracker',
    d: 'Cross-platform mobile app for workouts, nutrition tracking, and AI-powered exercise suggestions.',
    tech: ['React Native', 'ASP.NET Core', 'ML.NET', 'Firebase'],
    i: '💪',
    col: '#f59e0b'
  },
  {
    t: 'Banking Dashboard',
    d: 'Enterprise-grade banking portal with real-time transactions, multi-currency support, and advanced analytics.',
    tech: ['Angular', 'ASP.NET Core', 'Azure', 'SQL'],
    i: '🏦',
    col: '#ec4899'
  },
  {
    t: 'Learning Platform',
    d: 'EdTech SaaS with live video classes via WebRTC, quiz engine, progress tracking, and certificate generation.',
    tech: ['Next.js', 'WebRTC', 'AWS S3', 'MongoDB'],
    i: '📚',
    col: '#3b82f6',
    live:'https://myschoolcloud.inventstarts.com/shop/landing'
  },
  {
    t: 'B2B Cloud System',
    d: 'Multi-vendor B2B marketplace enabling businesses to buy and sell products with vendor dashboards, product management, and cloud-based scalability.',
    tech: ['React', 'ASP.NET Core', 'PostgreSQL', 'Maps API'],
    i: '🏠',
    col: '#10b981',
    live:'https://www.order-cloud.co.uk/fatra'
  },
  {
    t: 'Royal Movers Bahrain',
    d: 'A professional website for a moving company in Bahrain, showcasing services, testimonials, and contact information.',
    tech: ['WordPress', 'Elementor', 'SEO'],
    i: '🚚',
    col: '#ffc107',
    live: 'https://royalmoversbahrain.com/'

  }
];

export const EXP = [
  {
    r: 'WordPress Developer',
    co: 'Freelance Projects',
    p: '2025',
    d: 'Mastered WordPress development, specializing in custom theme customization, page building with Elementor, and implementing advanced SEO strategies for client websites.',
    tech: ['WordPress', 'Elementor', 'SEO', 'PHP']
  },
  {
    r: 'Senior Full-Stack Developer',
    co: 'TechCorp Solutions',
    p: '2022 – Present',
    d: 'Lead development of enterprise web applications using Angular and ASP.NET Core, serving 500K+ users. Mentored a team of 5 and improved CI/CD pipeline reducing deployment time by 40%.',
    tech: ['Angular', 'ASP.NET Core', 'Azure', 'SQL Server']
  },
  {
    r: 'Full-Stack Developer',
    co: 'Digital Innovators',
    p: '2020 – 2022',
    d: 'Built scalable SaaS products with React and Next.js. Designed and developed RESTful APIs and integrated third-party services including Stripe and Twilio.',
    tech: ['React', 'Next.js', 'Node.js', 'MongoDB']
  },
  {
    r: 'React Native Developer',
    co: 'MobileFirst Studio',
    p: '2019 – 2020',
    d: 'Developed cross-platform mobile apps for iOS & Android with React Native. Delivered 4 apps that reached a combined 100K+ downloads.',
    tech: ['React Native', 'Redux', 'Firebase', 'Expo']
  },
  {
    r: 'Junior Frontend Developer',
    co: 'Startup Labs',
    p: '2018 – 2019',
    d: 'Built responsive web interfaces and contributed to design system creation. Gained strong foundations in modern JavaScript and component-based architecture.',
    tech: ['React', 'JavaScript', 'CSS3', 'REST APIs']
  }
];

export const TESTS = [
  {
    n: 'Christian Yeates',
    r: 'Owner, Green Triangle (UK)',
    t: "Shaharyar Sahil's exceptional skills in full-stack development transformed our platform. His attention to detail, proactive communication, and ability to deliver complex features on schedule made him an invaluable partner.",
    av: 'CY',
    col: '#8b5cf6'
  },
  {
    n: 'Sufyan Ahmad',
    r: 'Owner, InventStart (Pakistan)',
    t: 'Working with him has been an outstanding experience. He delivered a robust backend and a highly responsive React frontend that exceeded our performance expectations. Truly a top-tier engineer.',
    av: 'SA',
    col: '#14b8a6'
  },
  {
    n: 'Sarah Johnson',
    r: 'CTO, TechCorp Solutions',
    t: 'An exceptional developer who consistently delivers high-quality solutions. Their expertise in both frontend and backend technologies is remarkable — always meets deadlines.',
    av: 'SJ',
    col: '#f59e0b'
  },
  {
    n: 'Marcus Williams',
    r: 'Lead Architect, Startup Labs',
    t: 'A rare combination of technical brilliance and great communication. They always explain complex concepts clearly and take complete ownership of their work.',
    av: 'MW',
    col: '#ec4899'
  },
  {
    n: 'Muhammad Ismail',
    r: 'Owner, Royal Movers Bahrain',
    t: 'Shaharyar Sahil delivered an exceptional website for Royal Movers. His expertise in WordPress and SEO helped us establish a strong online presence. The project was completed on time and exceeded our expectations.',
    av: 'IS',
    col: '#ffc107'
  }
];
