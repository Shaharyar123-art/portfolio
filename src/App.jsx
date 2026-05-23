import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import { ROLES, SKILLS, PROJECTS, EXP, TESTS, MARKETING_SERVICES, MARKETING_PROCESS } from './data';

import CV from './assets/CV.pdf';
import { EASE_PREMIUM, springTransition, staggerContainer, fadeInUp, fadeInDown, fadeInLeft, fadeInRight, fadeIn } from './components/animations';
import Magnetic from './components/Magnetic';
import TiltCard from './components/TiltCard';
import MouseGlow from './components/MouseGlow';

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'testimonials', label: 'Say' },
  { id: 'contact', label: 'Contact' }
];

function App() {
  // --- States ---
  const [typedText, setTypedText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [activeCat, setActiveCat] = useState('All');
  const [testIndex, setTestIndex] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formActive, setFormActive] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- Typing Effect ---
  useEffect(() => {
    let i = 0;
    setTypedText('');
    const role = ROLES[roleIndex];
    
    const interval = setInterval(() => {
      if (i < role.length) {
        setTypedText(role.slice(0, ++i));
      } else {
        clearInterval(interval);
        const timeout = setTimeout(() => {
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 2400);
        return () => clearTimeout(timeout);
      }
    }, 70);
    
    return () => clearInterval(interval);
  }, [roleIndex]);

  // --- Performance Scroll Tracker for Back To Top ---
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Active Section Tracking via Intersection Observer ---
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px', 
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTIONS.forEach((section) => {
        const el = document.getElementById(section.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Apply theme class to root element
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('flash-active');
    void root.offsetWidth; // Force reflow
    root.classList.add('flash-active');

    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  // --- Testimonial Slider Auto transition ---
  useEffect(() => {
    const interval = setInterval(() => {
      setTestIndex((prev) => (prev + 1) % TESTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testIndex]);

  // --- Smooth Scroll Action ---
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
    setIsSidebarOpen(false); // Close sidebar
  };

  // --- Form Handling ---
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const keyMap = {
      'f-name': 'name',
      'f-email': 'email',
      'f-subject': 'subject',
      'f-msg': 'message'
    };
    setFormData((prev) => ({
      ...prev,
      [keyMap[id]]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xbdbdeeg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        alert('Something went wrong. Please try again later.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please check your connection.');
    }
  };

  // --- Filtered Skills ---
  const filteredSkills = activeCat === 'All' 
    ? SKILLS 
    : SKILLS.filter(s => s.c === activeCat);

  const currentTestimonial = TESTS[testIndex];
  
  const openCV = () => {
    window.open(CV, '_blank');
  };

  return (
    <>
      {/* Ambient background mouse follow glow (Desktop only) */}
      <MouseGlow />

      {/* NAVBAR */}
      <nav id="navbar">
        <a className="logo" onClick={() => scrollToSection('home')}>&lt;DevBySahil/&gt;</a>
        <div className="nav-links">
          <button
            className="hamburger" 
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open Menu"
          >
            <i className="fa-solid fa-bars-staggered"></i>
          </button>
          {['home', 'about', 'services', 'marketing', 'skills', 'projects', 'experience', 'testimonials', 'contact'].map((sec) => (
            <button
              key={sec}
              className={`nl ${activeSection === sec ? 'active' : ''}`}
              aria-label={`Scroll to ${sec}`}
              onClick={() => scrollToSection(sec)}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
          <button
            className="btn-p nav-hire" 
            onClick={() => scrollToSection('contact')}
          >
            Hire Me
          </button>
          <button
            className="theme-toggle"
            onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle light/dark mode"
          >
            <i className={theme === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun'}></i>
          </button>
        </div>
      </nav>

      {/* MOBILE SIDEBAR WITH ANIMATEPRESENCE */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              className="sidebar-overlay show"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsSidebarOpen(false)}
              style={{ display: 'block' }}
            />
            
            <motion.aside 
              className="sidebar open"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 280, damping: 30 }}
            >
              <div className="sidebar-head">
                <span className="logo">&lt;DevBySahil/&gt;</span>
                <button className="close-sidebar" onClick={() => setIsSidebarOpen(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
              
              <motion.div 
                className="sidebar-links"
                variants={staggerContainer(0.08, 0.1)}
                initial="hidden"
                animate="show"
              >
                {SECTIONS.map((sec) => (
                  <motion.button
                    key={sec.id}
                    variants={fadeInRight}
                    className={`sl ${activeSection === sec.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(sec.id)}
                  >
                    {sec.label}
                  </motion.button>
                ))}
              </motion.div>
              
              <div className="sidebar-footer">
                <button className="btn-p" style={{ width: '100%' }} onClick={() => scrollToSection('contact')}>
                  Hire Me Now
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <section id="home" className={`sec gridbg ${activeSection === 'home' ? 'active-section' : ''}`}>
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        
        <div className="container">
          <motion.div 
            className="hero-grid"
            variants={staggerContainer(0.12, 0.25)}
            initial="hidden"
            animate="show"
          >
            <div className="hero-left">
              <motion.div variants={fadeInUp} className="stag">
                <span className="pulse-dot" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: '#10b981', marginRight: 8, boxShadow: '0 0 8px #10b981' }}></span>
                Available for Work
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="syne">
                Hi, I'm <span className="gtext">Shaharyar</span>
              </motion.h1>
              
              <motion.div variants={fadeInUp} className="hero-role">
                <span className="prefix">I'm a </span>
                <span className="typed">{typedText}</span>
                <span className="cursor"></span>
              </motion.div>
              
              <motion.p variants={fadeInUp} className="hero-desc">
                Passionate full-stack developer specializing in React, Angular, React Native, Next.js, and ASP.NET Core. I craft scalable, high-performance applications that solve real-world problems with premium aesthetics.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="hero-btns" style={{ display: 'flex', gap: 16 }}>
                <Magnetic strength={0.15}>
                  <button className="btn-p" onClick={() => scrollToSection('projects')}>View My Work</button>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <button className="btn-o" onClick={() => scrollToSection('contact')}>Get In Touch</button>
                </Magnetic>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="hero-stats">
                <div><div className="stat-v">6+</div><div className="stat-l">Years Experience</div></div>
                <div><div className="stat-v">50+</div><div className="stat-l">Projects Completed</div></div>
                <div><div className="stat-v">30+</div><div className="stat-l">Happy Clients</div></div>
                <div><div className="stat-v">5</div><div className="stat-l">Tech Stacks</div></div>
              </motion.div>
            </div>
            
            <motion.div 
              variants={fadeInRight}
              className="avatar-wrap"
              style={{ display: 'block' }}
            >
              <div className="avatar-ring">
                <div className="orbit"></div>
                <div className="avatar-emoji">👨‍💻</div>
                
                {/* Orbital tech badges with distinct slow breathing floats */}
                <motion.div 
                  className="badge b1"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span>⚛️</span><span>React</span>
                </motion.div>
                <motion.div 
                  className="badge b2"
                  animate={{ y: [0, -14, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  <span>🅰️</span><span>Angular</span>
                </motion.div>
                <motion.div 
                  className="badge b3"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <span>💜</span><span>.NET Core</span>
                </motion.div>
                <motion.div 
                  className="badge b4"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
                >
                  <span>📱</span><span>Mobile</span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="scroll-hint">
          <span>Scroll Down</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className={`sec altbg ${activeSection === 'about' ? 'active-section' : ''}`}>
        <div className="container">
          <motion.div 
            className="about-grid"
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-20%' }}
          >
            <motion.div variants={fadeInLeft} style={{ position: 'relative' }}>
              <div className="about-img">👨‍💻</div>
              <motion.div 
                className="about-card-stat"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="about-stat-v">6+</div>
                <div className="about-stat-l">Years of Experience</div>
              </motion.div>
            </motion.div>
            
            <motion.div variants={fadeInRight}>
              <div className="stag">✦ About Me</div>
              <h2 className="syne" style={{ fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px' }}>
                Building <span className="gtext">Digital Solutions</span><br />That Truly Matter
              </h2>
              <p style={{ color: 'var(--m)', lineHeight: 1.9, fontSize: '15px', marginBottom: '16px' }}>
                I'm a passionate full-stack developer based in Kamalia, Pakistan with over 6 years of experience creating exceptional digital experiences across web and mobile platforms.
              </p>
              <p style={{ color: 'var(--m)', lineHeight: 1.9, fontSize: '15px', marginBottom: '28px' }}>
                My expertise spans the full stack — from crafting beautiful, responsive UIs with React, Angular, and Next.js to building robust, scalable backends with ASP.NET Core. I'm equally comfortable developing cross-platform mobile apps with React Native and designing clean REST APIs.
              </p>
              
              <div className="about-meta">
                <div className="meta-item"><span className="meta-icon">📍</span><div><div className="meta-label">Location</div><div className="meta-val">Kamalia, Pakistan</div></div></div>
                <div className="meta-item"><span className="meta-icon">📧</span><div><div className="meta-label">Email</div><div className="meta-val">sshaharyar229@gmail.com</div></div></div>
                <div className="meta-item"><span className="meta-icon">💼</span><div><div className="meta-label">Availability</div><div className="meta-val" style={{ color: '#14b8a6' }}>Open to Offers</div></div></div>
                <div className="meta-item"><span className="meta-icon">🎓</span><div><div className="meta-label">Degree</div><div className="meta-val">BS Computer Science</div></div></div>
              </div>
              
              <div className="about-btns">
                <Magnetic strength={0.15}>
                  <button className="btn-p" onClick={openCV}>Download CV ↓</button>
                </Magnetic>
                <Magnetic strength={0.15}>
                  <button className="btn-o" onClick={() => scrollToSection('contact')}>Contact Me</button>
                </Magnetic>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className={`sec ${activeSection === 'services' ? 'active-section' : ''}`}>
        <div className="container">
          <motion.div 
            className="sec-head"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ What I Do</div>
            <h2 className="syne">Services I <span className="gtext">Provide</span></h2>
            <p>Delivering end-to-end development solutions across web, mobile, and backend platforms.</p>
          </motion.div>
          
          <motion.div 
            className="services-grid"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
          >
            {[
              { num: '01', icon: '🌐', title: 'Web Development', desc: 'Modern, performant web applications built with React, Angular, and Next.js. SEO-optimized, fully responsive, and blazing fast.', sc: '#8b5cf6' },
              { num: '02', icon: '📱', title: 'Mobile Development', desc: 'Cross-platform iOS & Android apps with React Native. Native-like performance, smooth animations, and great UX.', sc: '#14b8a6' },
              { num: '03', icon: '⚙️', title: 'Backend Development', desc: 'Scalable REST APIs and microservices using ASP.NET Core and C#. Secure, well-documented, and production-ready.', sc: '#f59e0b' },
              { num: '04', icon: '🗄️', title: 'Database Design', desc: "Efficient schema design and optimization for SQL Server, PostgreSQL, and MongoDB. Performance tuning and data modeling.", sc: '#ec4899' },
              { num: '05', icon: '☁️', title: 'Cloud & DevOps', desc: 'Azure deployment, CI/CD pipelines, Docker containerization, and infrastructure management for reliable releases.', sc: '#3b82f6' },
              { num: '06', icon: '🔍', title: 'Code Review & Consulting', desc: "Architecture reviews, performance audits, and technical consulting to elevate your team's code quality and best practices.", sc: '#10b981' }
            ].map((svc) => (
              <motion.div key={svc.num} variants={fadeInUp}>
                <TiltCard className="service-card" style={{ '--sc': svc.sc }}>
                  <div className="service-num">{svc.num}</div>
                  <div className="service-icon">{svc.icon}</div>
                  <h3>{svc.title}</h3>
                  <p>{svc.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MARKETING SECTION */}
      <section id="marketing" className={`sec ${activeSection === 'marketing' ? 'active-section' : ''}`}>
        <div className="container">
          <motion.div 
            className="sec-head"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Marketing</div>
            <h2 className="syne">Performance <span className="gtext">Marketing</span></h2>
            <p>I combine data-driven strategies with creative ad designs to deliver high‑ROI campaigns on Google and Facebook.</p>
          </motion.div>
          
          <motion.div 
            className="services-grid"
            variants={staggerContainer(0.1, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
          >
            {MARKETING_SERVICES.map((svc, i) => (
              <motion.div key={svc.platform} variants={fadeInUp}>
                <TiltCard className="service-card" style={{ '--sc': svc.color }}>
                  <div className="service-num">{String(i+1).padStart(2, '0')}</div>
                  <div className="service-icon">{svc.icon}</div>
                  <h3>{svc.platform}</h3>
                  <p>{svc.tagline}</p>
                  <ul style={{ color: 'var(--m)', fontSize: '14px', marginTop: '12px', listStyleType: 'none', paddingLeft: 0 }}>
                    {svc.features.map(f => (
                      <li key={f.title} style={{ marginBottom: '6px', display: 'flex', gap: '8px' }}>
                        <span>{f.icon}</span>
                        <span><strong>{f.title}:</strong> {f.desc}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="gridbg" style={{ marginTop: '48px', padding: '36px', borderRadius: '24px', border: '1px solid var(--border)', background: 'var(--bg2)' }}>
            <h3 className="syne" style={{ textAlign: 'center', marginBottom: '32px', fontSize: '22px', fontWeight: 700 }}>My Process</h3>
            
            <motion.div 
              className="skills-grid" 
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {MARKETING_PROCESS.map(step => (
                <motion.div key={step.step} variants={fadeInUp}>
                  <TiltCard className="skill-card" style={{ height: '100%' }}>
                    <div className="skill-top">
                      <div className="skill-name" style={{ gap: '12px' }}>
                        <span style={{ fontSize: '20px' }}>{step.icon}</span>
                        <span>{step.step}. {step.title}</span>
                      </div>
                    </div>
                    <p className="skill-foot" style={{ color: 'var(--m)', fontSize: '13px', lineHeight: 1.6, marginTop: '8px' }}>{step.desc}</p>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className={`sec altbg ${activeSection === 'skills' ? 'active-section' : ''}`}>
        <div className="container">
          <motion.div 
            className="sec-head"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ My Skills</div>
            <h2 className="syne">Technical <span className="gtext">Expertise</span></h2>
            <p>A curated set of technologies I've mastered across frontend, backend, and mobile development.</p>
          </motion.div>
          
          <div className="filter-row">
            {['All', 'Frontend', 'Mobile', 'Backend', 'Language', 'Database', 'DevOps', 'Tools'].map((cat) => (
              <Magnetic key={cat} strength={0.2}>
                <button
                  className={`filt ${activeCat === cat ? 'active' : ''}`}
                  onClick={() => setActiveCat(cat)}
                >
                  {cat}
                </button>
              </Magnetic>
            ))}
          </div>
          
          {/* Dynamic grid key triggers entrance stagger on filter change */}
          <motion.div 
            key={activeCat}
            className="skills-grid"
            variants={staggerContainer(0.05, 0.05)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {filteredSkills.map((s, index) => (
              <motion.div key={s.n} variants={fadeInUp}>
                <TiltCard className="skill-card">
                  <div className="skill-top">
                    <div className="skill-name">
                      <div className="skill-dot" style={{ background: s.col, boxShadow: `0 0 8px ${s.col}80` }}></div>
                      {s.n}
                    </div>
                    <span className="skill-pct">{s.l}%</span>
                  </div>
                  
                  <div className="skill-track">
                    <motion.div 
                      className="skill-fill" 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.l}%` }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 75, damping: 15, delay: index * 0.03 }}
                      style={{ 
                        background: `linear-gradient(90deg,#8b5cf6,${s.col})`
                      }}
                    />
                  </div>
                  <div className="skill-foot"><span className="tag" style={{ fontSize: '11px' }}>{s.c}</span></div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="tech-cloud"
            variants={staggerContainer(0.05, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {['React', 'Next.js', 'Angular', 'React Native', 'ASP.NET Core', 'TypeScript', 'C#', 'SQL Server', 'MongoDB', 'Docker', 'Azure', 'Git'].map((tech) => (
              <motion.div key={tech} variants={fadeInUp} className="tech-pill">{tech}</motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className={`sec ${activeSection === 'projects' ? 'active-section' : ''}`}>
        <div className="container">
          <motion.div 
            className="sec-head"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Portfolio</div>
            <h2 className="syne">Featured <span className="gtext">Projects</span></h2>
            <p>Real-world applications built with modern tech stacks — solving real business problems.</p>
          </motion.div>
          
          <motion.div 
            className="projects-grid"
            variants={staggerContainer(0.12, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
          >
            {PROJECTS.map((p, i) => (
              <motion.div key={p.t} variants={fadeInUp}>
                <TiltCard className="proj-card">
                  <div className="proj-top">
                    <div className="proj-icon">{p.i}</div>
                    <div className="proj-links">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">GitHub</a>
                      )}
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noreferrer" className="proj-link">Live Demo →</a>
                      )}
                    </div>
                  </div>
                  <div className="proj-bar" style={{ background: `linear-gradient(90deg,${p.col}80,${p.col}10)` }}></div>
                  <h3 style={{ marginTop: '14px' }}>{p.t}</h3>
                  <p>{p.d}</p>
                  <div className="proj-tags">
                    {p.tech.map((t) => (
                      <span key={t} className="tag" style={{ borderColor: `${p.col}30`, color: `${p.col}bb` }}>{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className={`sec altbg ${activeSection === 'experience' ? 'active-section' : ''}`}>
        <div className="container">
          <motion.div 
            className="sec-head"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Career</div>
            <h2 className="syne">Work <span className="gtext">Experience</span></h2>
          </motion.div>
          
          <motion.div 
            className="exp-wrap"
            variants={staggerContainer(0.15, 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10%' }}
          >
            {EXP.map((e, index) => (
              <motion.div key={`${e.co}-${e.r}`} variants={fadeInUp} className="exp-item">
                <div className="exp-spine">
                  <div className="exp-dot"></div>
                  {index < EXP.length - 1 && <div className="exp-line"></div>}
                </div>
                
                <TiltCard className="exp-card" style={{ padding: '26px' }}>
                  <div className="exp-head">
                    <div>
                      <div className="exp-role">{e.r}</div>
                      <div className="exp-co">{e.co}</div>
                    </div>
                    <span className="exp-period">{e.p}</span>
                  </div>
                  <p className="exp-desc">{e.d}</p>
                  <div className="exp-tags">
                    {e.tech.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS WITH SLIDING CAROUSEL */}
      <section id="testimonials" className={`sec ${activeSection === 'testimonials' ? 'active-section' : ''}`}>
        <div className="container">
          <motion.div 
            className="sec-head"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Testimonials</div>
            <h2 className="syne">What Clients <span className="gtext">Say</span></h2>
          </motion.div>
          
          <div className="test-wrap">
            <div style={{ position: 'relative', minHeight: 280, overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={testIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: EASE_PREMIUM }}
                  className="test-card"
                  style={{ position: 'relative', width: '100%' }}
                >
                  <motion.div 
                    className="test-quote"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    "
                  </motion.div>
                  <p className="test-text">{currentTestimonial.t}</p>
                  
                  <div className="test-author">
                    <div className="test-av" style={{ background: `linear-gradient(135deg,${currentTestimonial.col},${currentTestimonial.col}80)`, color: '#fff' }}>
                      {currentTestimonial.av}
                    </div>
                    <div>
                      <div className="test-name">{currentTestimonial.n}</div>
                      <div className="test-role">{currentTestimonial.r}</div>
                    </div>
                    <div className="test-stars">★★★★★</div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="test-dots">
              {TESTS.map((_, i) => (
                <motion.button
                  key={i}
                  className={`dot ${i === testIndex ? 'active' : ''}`}
                  animate={{ width: i === testIndex ? 28 : 8 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  onClick={() => setTestIndex(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            
            <div className="test-navs">
              <Magnetic strength={0.3}>
                <button className="test-nav" onClick={() => setTestIndex((prev) => (prev - 1 + TESTS.length) % TESTS.length)}>‹</button>
              </Magnetic>
              <Magnetic strength={0.3}>
                <button className="test-nav" onClick={() => setTestIndex((prev) => (prev + 1) % TESTS.length)}>›</button>
              </Magnetic>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className={`sec altbg ${activeSection === 'contact' ? 'active-section' : ''}`}>
        <div className="container">
          <motion.div 
            className="sec-head"
            variants={fadeInUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Contact</div>
            <h2 className="syne">Let's Work <span className="gtext">Together</span></h2>
            <p>Have a project in mind? Let's discuss how I can help bring your ideas to life.</p>
          </motion.div>
          
          <div className="contact-grid">
            <motion.div 
              variants={staggerContainer(0.08, 0.1)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div className="contact-info">
                {[
                  { icon: '📧', label: 'Email', val: 'sshaharyar229@gmail.com', border: 'rgba(139,92,246,.3)', icoBg: 'rgba(139,92,246,.12)', icoBrd: 'rgba(139,92,246,.25)' },
                  { icon: '📱', label: 'Phone', val: '+92 314 0069007', border: 'rgba(20,184,166,.3)', icoBg: 'rgba(20,184,166,.1)', icoBrd: 'rgba(20,184,166,.2)' },
                  { icon: '📍', label: 'Location', val: 'Kamalia, Pakistan', border: 'rgba(245,158,11,.3)', icoBg: 'rgba(245,158,11,.1)', icoBrd: 'rgba(245,158,11,.2)' },
                  { icon: '💬', label: 'Response Time', val: 'Within 24 hours', border: 'rgba(236,72,153,.3)', icoBg: 'rgba(236,72,153,.1)', icoBrd: 'rgba(236,72,153,.2)', style: { color: '#14b8a6' } }
                ].map((item) => (
                  <motion.div key={item.label} variants={fadeInLeft}>
                    <TiltCard className="contact-item" style={{ '--hover-border': item.border, display: 'flex', width: '100%' }}>
                      <div className="c-ico" style={{ background: item.icoBg, border: `1px solid ${item.icoBrd}` }}>{item.icon}</div>
                      <div>
                        <div className="c-label">{item.label}</div>
                        <div className="c-val" style={item.style || {}}>{item.val}</div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="socials"
                variants={staggerContainer(0.08, 0.1)}
              >
                {[
                  { name: 'LinkedIn', icon: 'fa-linkedin-in', link: 'https://www.linkedin.com/in/shaharyar-sahil-442b7b184/?skipRedirect=true', border: 'rgba(10,102,194,.5)', color: '#0a66c2' },
                  { name: 'GitHub', icon: 'fa-github', link: 'https://github.com/Shaharyar123-art', border: 'rgba(255,255,255,.3)', color: '#fff' },
                  { name: 'Twitter/X', icon: 'fa-x-twitter', link: 'https://x.com/Shaharyar7008', border: 'rgba(29,161,242,.5)', color: '#1da1f2' },
                  { name: 'WhatsApp', icon: 'fa-whatsapp', link: 'https://wa.me/923041137877', border: 'rgba(37,211,102,.5)', color: '#25d366' }
                ].map((soc) => (
                  <Magnetic key={soc.name} strength={0.3}>
                    <motion.a 
                      variants={fadeInUp} 
                      className="soc" 
                      data-tooltip={soc.name} 
                      style={{ '--hover-border': soc.border, '--hover-color': soc.color }} 
                      href={soc.link} 
                      target="_blank" 
                      rel="noreferrer"
                    >
                      <i className={`fa-brands ${soc.icon}`}></i>
                    </motion.a>
                  </Magnetic>
                ))}
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={fadeInRight}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="card form-card"
              style={{ overflow: 'hidden' }}
            >
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.div 
                    key="form-area"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    id="form-area"
                  >
                    <div className="form-row">
                      <div className={`form-group ${formActive.name || formData.name ? 'focused filled' : ''}`}>
                        <label>Your Name *</label>
                        <input 
                          className="inp" 
                          id="f-name" 
                          type="text" 
                          placeholder="Muhammad Ali" 
                          value={formData.name}
                          onFocus={() => setFormActive(prev => ({ ...prev, name: true }))}
                          onBlur={() => setFormActive(prev => ({ ...prev, name: false }))}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className={`form-group ${formActive.email || formData.email ? 'focused filled' : ''}`}>
                        <label>Email Address *</label>
                        <input 
                          className="inp" 
                          id="f-email" 
                          type="email" 
                          placeholder="you@email.com" 
                          value={formData.email}
                          onFocus={() => setFormActive(prev => ({ ...prev, email: true }))}
                          onBlur={() => setFormActive(prev => ({ ...prev, email: false }))}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    
                    <div className={`form-group ${formActive.subject || formData.subject ? 'focused filled' : ''}`}>
                      <label>Subject</label>
                      <input 
                        className="inp" 
                        id="f-subject" 
                        type="text" 
                        placeholder="Project Discussion" 
                        value={formData.subject}
                        onFocus={() => setFormActive(prev => ({ ...prev, subject: true }))}
                        onBlur={() => setFormActive(prev => ({ ...prev, subject: false }))}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div className={`form-group ${formActive.message || formData.message ? 'focused filled' : ''}`}>
                      <label>Message *</label>
                      <textarea 
                        className="inp" 
                        id="f-msg" 
                        placeholder="Tell me about your project, budget, and timeline..."
                        value={formData.message}
                        onFocus={() => setFormActive(prev => ({ ...prev, message: true }))}
                        onBlur={() => setFormActive(prev => ({ ...prev, message: false }))}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                    
                    <Magnetic strength={0.1}>
                      <button className="btn-p submit-btn" onClick={handleSubmit}>Send Message ✉️</button>
                    </Magnetic>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="success-area" 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                    id="success-area" 
                    className="success-state"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.25, 1] }}
                      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
                      className="success-emoji"
                    >
                      ✅
                    </motion.div>
                    <h3 className="syne" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--m)', lineHeight: 1.7 }}>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo syne" style={{ fontSize: '20px', fontWeight: 800, cursor: 'pointer' }} onClick={() => scrollToSection('home')}>&lt;DevBySahil/&gt;</span>
            <p className="footer-tagline">Building exceptional digital experiences with cutting-edge technologies.</p>
            <div className="footer-socials">
              {[
                { name: 'LinkedIn', icon: 'fa-linkedin-in', link: 'https://www.linkedin.com/in/shaharyar-sahil-442b7b184/?skipRedirect=true', border: 'rgba(10,102,194,.5)', color: '#0a66c2' },
                { name: 'GitHub', icon: 'fa-github', link: 'https://github.com/Shaharyar123-art', border: 'rgba(255,255,255,.3)', color: '#fff' },
                { name: 'Twitter/X', icon: 'fa-x-twitter', link: 'https://x.com/Shaharyar7008', border: 'rgba(29,161,242,.5)', color: '#1da1f2' },
                { name: 'WhatsApp', icon: 'fa-whatsapp', link: 'https://wa.me/923041137877', border: 'rgba(37,211,102,.5)', color: '#25d366' }
              ].map(soc => (
                <a key={soc.name} className="soc" data-tooltip={soc.name} href={soc.link} target="_blank" rel="noreferrer" style={{ '--hover-border': soc.border, '--hover-color': soc.color }}><i className={`fa-brands ${soc.icon}`}></i></a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4 style={{ color: '#8b5cf6' }}>Navigation</h4>
            <a className="footer-link" onClick={() => scrollToSection('home')}>Home</a>
            <a className="footer-link" onClick={() => scrollToSection('about')}>About</a>
            <a className="footer-link" onClick={() => scrollToSection('skills')}>Skills</a>
            <a className="footer-link" onClick={() => scrollToSection('projects')}>Projects</a>
          </div>
          <div className="footer-col">
            <h4 style={{ color: '#14b8a6' }}>Explore</h4>
            <a className="footer-link" onClick={() => scrollToSection('experience')}>Experience</a>
            <a className="footer-link" onClick={() => scrollToSection('testimonials')}>Testimonials</a>
            <a className="footer-link" onClick={() => scrollToSection('services')}>Services</a>
            <a className="footer-link" onClick={() => scrollToSection('contact')}>Contact</a>
          </div>
          <div className="footer-col">
            <h4 style={{ color: '#f59e0b' }}>Tech Stack</h4>
            <span className="footer-link" style={{ cursor: 'default' }}>React &amp; Next.js</span>
            <span className="footer-link" style={{ cursor: 'default' }}>Angular</span>
            <span className="footer-link" style={{ cursor: 'default' }}>React Native</span>
            <span className="footer-link" style={{ cursor: 'default' }}>ASP.NET Core</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 devbysahil. All rights reserved.</span>
          <span>Built with ❤️ in React</span>
        </div>
      </footer>

      {/* BACK TO TOP WITH SPRING MOTION */}
      <motion.button 
        className={`btt ${showBackToTop ? 'visible' : ''}`} 
        onClick={() => scrollToSection('home')}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ 
          opacity: showBackToTop ? 1 : 0, 
          scale: showBackToTop ? 1 : 0.5,
          y: showBackToTop ? 0 : 20
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        ↑
      </motion.button>

      {/* Floating Hire Me (Mobile Only) */}
      <button className="btn-p hire-float" onClick={() => scrollToSection('contact')} aria-label="Hire Me">
        <i className="fa-solid fa-briefcase"></i>
      </button>

      {/* Floating Contact Overlays */}
      <a href="https://wa.me/923041137877" className="wa-float" target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp">
        <i className="fa-brands fa-whatsapp"></i>
      </a>
      <button onClick={openCV} className={`edu-float ${showBackToTop ? 'shifted' : ''}`} aria-label="View Resume">
        <i className="fa-solid fa-graduation-cap"></i>
      </button>
      <a href="tel:+923140069007" className={`call-float ${showBackToTop ? 'shifted' : ''}`} aria-label="Call Me">
        <i className="fa-solid fa-phone"></i>
      </a>
    </>
  );
}

export default App;
