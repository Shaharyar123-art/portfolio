import { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ROLES, SKILLS, PROJECTS, EXP, TESTS, MARKETING_SERVICES, MARKETING_PROCESS } from './data';

import CV from './assets/CV.pdf';
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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [theme, setTheme] = useState('dark');
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
    }, 75);
    
    return () => clearInterval(interval);
  }, [roleIndex]);

  // --- Scroll Effect (Active Navigation & Back To Top) ---
  useEffect(() => {
    const handleScroll = () => {
      // Toggle back to top button
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }

      // Check current visible section
      const secs = ['home', 'about', 'services', 'marketing', 'skills', 'projects', 'experience', 'testimonials', 'contact'];
      let cur = 'home';
      for (const id of secs) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          cur = id;
        }
      }
      setActiveSection(cur);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Apply theme class to root element
  useEffect(() => {
    const root = document.documentElement;
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
    }, 5500);
    return () => clearInterval(interval);
  }, [testIndex]);

  // --- Smooth Scroll Action ---
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(id);
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
      {/* NAVBAR */}
      <nav id="navbar">
        <a className="logo" onClick={() => scrollToSection('home')}>&lt;DevBySahil/&gt;</a>
        <div className="nav-links">
          {['home', 'about', 'services', 'marketing', 'skills', 'projects', 'experience', 'testimonials', 'contact'].map((sec) => (
            <button
              key={sec}
              className={`nl ${activeSection === sec ? 'active' : ''}`}
              onClick={() => scrollToSection(sec)}
            >
              {sec.charAt(0).toUpperCase() + sec.slice(1)}
            </button>
          ))}
          <button 
            className="btn-p" 
            style={{ padding: '10px 22px', fontSize: '13px' }} 
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

      {/* HERO */}
      <section id="home" className="sec gridbg">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left">
              <br/>
              <div className="stag fadeUp">✦ Available for Work</div>
              <h1 className="syne fadeUp d1">Hi, I'm <span className="gtext">Shaharyar</span><br /></h1>
              <div className="hero-role fadeUp d2">
                <span className="prefix">I'm a </span>
                <span className="typed">{typedText}</span>
                <span className="cursor"></span>
              </div>
              <p className="hero-desc fadeUp d3">
                Passionate full-stack developer specializing in React, Angular, React Native, Next.js, and ASP.NET Core. I craft scalable, high-performance applications that solve real business problems.
              </p>
              <div className="hero-btns fadeUp d4">
                <button className="btn-p" onClick={() => scrollToSection('projects')}>View My Work</button>
                <button className="btn-o" onClick={() => scrollToSection('contact')}>Get In Touch</button>
              </div>
              <div className="hero-stats fadeUp d4">
                <div><div className="stat-v">6+</div><div className="stat-l">Years Experience</div></div>
                <div><div className="stat-v">50+</div><div className="stat-l">Projects Completed</div></div>
                <div><div className="stat-v">30+</div><div className="stat-l">Happy Clients</div></div>
                <div><div className="stat-v">5</div><div className="stat-l">Tech Stacks</div></div>
              </div>
            </div>
            <div className="avatar-wrap float fadeUp d3">
              <div className="avatar-ring">
                <div className="orbit"></div>
                <div className="avatar-emoji">👨‍💻</div>
                <div className="badge b1"><span>⚛️</span><span>React</span></div>
                <div className="badge b2"><span>🅰️</span><span>Angular</span></div>
                <div className="badge b3"><span>💜</span><span>.NET Core</span></div>
                <div className="badge b4"><span>📱</span><span>Mobile</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-hint">
          <span>Scroll Down</span>
          <div className="scroll-line"></div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="sec altbg">
        <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(20,184,166,.12),transparent 70%)', right: '-100px', top: 0, filter: 'blur(80px)' }}></div>
        <div className="container">
          <div className="about-grid">
            <div style={{ position: 'relative' }}>
              <div className="about-img">👨‍💻</div>
              <div className="about-card-stat">
                <div className="about-stat-v">6+</div>
                <div className="about-stat-l">Years of Experience</div>
              </div>
            </div>
            <div>
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
                <button className="btn-p" onClick={openCV}>Download CV ↓</button>
                <button className="btn-o" onClick={() => scrollToSection('contact')}>Contact Me</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="sec">
        <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(139,92,246,.12),transparent 70%)', left: '-150px', bottom: 0, filter: 'blur(80px)' }}></div>
        <div className="container">
          <div className="sec-head">
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ What I Do</div>
            <h2 className="syne">Services I <span className="gtext">Provide</span></h2>
            <p>Delivering end-to-end development solutions across web, mobile, and backend platforms.</p>
          </div>
          <div className="services-grid">
            <div className="card service-card" style={{ '--sc': '#8b5cf6' }}>
              <div className="service-num">01</div>
              <div className="service-icon">🌐</div>
              <h3>Web Development</h3>
              <p>Modern, performant web applications built with React, Angular, and Next.js. SEO-optimized, fully responsive, and blazing fast.</p>
            </div>
            <div className="card service-card" style={{ '--sc': '#14b8a6' }}>
              <div className="service-num">02</div>
              <div className="service-icon">📱</div>
              <h3>Mobile Development</h3>
              <p>Cross-platform iOS & Android apps with React Native. Native-like performance, smooth animations, and great UX.</p>
            </div>
            <div className="card service-card" style={{ '--sc': '#f59e0b' }}>
              <div className="service-num">03</div>
              <div className="service-icon">⚙️</div>
              <h3>Backend Development</h3>
              <p>Scalable REST APIs and microservices using ASP.NET Core and C#. Secure, well-documented, and production-ready.</p>
            </div>
            <div className="card service-card" style={{ '--sc': '#ec4899' }}>
              <div className="service-num">04</div>
              <div className="service-icon">🗄️</div>
              <h3>Database Design</h3>
              <p>Efficient schema design and optimization for SQL Server, PostgreSQL, and MongoDB. Performance tuning and data modeling.</p>
            </div>
            <div className="card service-card" style={{ '--sc': '#3b82f6' }}>
              <div className="service-num">05</div>
              <div className="service-icon">☁️</div>
              <h3>Cloud & DevOps</h3>
              <p>Azure deployment, CI/CD pipelines, Docker containerization, and infrastructure management for reliable releases.</p>
            </div>
            <div className="card service-card" style={{ '--sc': '#10b981' }}>
              <div className="service-num">06</div>
              <div className="service-icon">🔍</div>
              <h3>Code Review & Consulting</h3>
              <p>Architecture reviews, performance audits, and technical consulting to elevate your team's code quality and best practices.</p>
            </div>
          </div>
        </div>
      </section>

{/* MARKETING */}
<section id="marketing" className="sec">
  <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(20,184,166,.12),transparent 70%)', right: '-150px', bottom: 0, filter: 'blur(80px)' }}></div>
  <div className="container">
    <div className="sec-head">
      <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Marketing</div>
      <h2 className="syne">Performance <span className="gtext">Marketing</span></h2>
      <p>I combine data-driven strategies with creative ad designs to deliver high‑ROI campaigns on Google and Facebook.</p>
        <p>As a Performance Marketing Specialist, I craft tailored advertising solutions that boost brand visibility, drive qualified leads, and maximize return on ad spend across multiple platforms, including Google Ads, Facebook Ads, and emerging channels. My data‑first approach ensures continuous optimization and measurable results.</p>
    </div>
    <div className="services-grid">
      {MARKETING_SERVICES.map((svc, i) => (
        <div key={svc.platform} className="card service-card" style={{ '--sc': svc.color }}>
          <div className="service-num">{String(i+1).padStart(2, '0')}</div>
          <div className="service-icon">{svc.icon}</div>
          <h3>{svc.platform}</h3>
          <p>{svc.tagline}</p>
          <ul style={{ color: 'var(--m)', fontSize: '14px', marginTop: '12px' }}>
            {svc.features.map(f => (
              <li key={f.title} style={{ marginBottom: '4px' }}>
                <strong>{f.title}:</strong> {f.desc}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="gridbg" style={{ marginTop: '48px' }}>
      <h3 className="syne">My Process</h3>
      <div className="skills-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {MARKETING_PROCESS.map(step => (
          <div key={step.step} className="card skill-card">
            <div className="skill-top">
              <div className="skill-name">{step.step} {step.title}</div>
            </div>
            <p className="skill-foot" style={{ color: 'var(--m)', fontSize: '14px' }}>{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

      {/* SKILLS */}
      <section id="skills" className="sec altbg">
        <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(20,184,166,.12),transparent 70%)', right: '-100px', top: '50%', filter: 'blur(80px)' }}></div>
        <div className="container">
          <div className="sec-head">
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ My Skills</div>
            <h2 className="syne">Technical <span className="gtext">Expertise</span></h2>
            <p>A curated set of technologies I've mastered across frontend, backend, and mobile development.</p>
          </div>
          <div className="filter-row">
            {['All', 'Frontend', 'Mobile', 'Backend', 'Language', 'Database', 'DevOps', 'Tools'].map((cat) => (
              <button
                key={cat}
                className={`filt ${activeCat === cat ? 'active' : ''}`}
                onClick={() => setActiveCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="skills-grid">
            {filteredSkills.map((s, index) => (
              <div key={s.n} className="card skill-card">
                <div className="skill-top">
                  <div className="skill-name">
                    <div className="skill-dot" style={{ background: s.col, boxShadow: `0 0 8px ${s.col}80` }}></div>
                    {s.n}
                  </div>
                  <span className="skill-pct">{s.l}%</span>
                </div>
                <div className="skill-track">
                  <div 
                    className="skill-fill" 
                    style={{ 
                      '--w': `${s.l}%`, 
                      background: `linear-gradient(90deg,#8b5cf6,${s.col})`, 
                      animationDelay: `${index * 0.05}s` 
                    }}
                  ></div>
                </div>
                <div className="skill-foot"><span className="tag" style={{ fontSize: '11px' }}>{s.c}</span></div>
              </div>
            ))}
          </div>
          <div className="tech-cloud">
            {['React', 'Next.js', 'Angular', 'React Native', 'ASP.NET Core', 'TypeScript', 'C#', 'SQL Server', 'MongoDB', 'Docker', 'Azure', 'Git'].map((tech) => (
              <div key={tech} className="tech-pill">{tech}</div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="sec">
        <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(139,92,246,.12),transparent 70%)', left: '30%', top: 0, filter: 'blur(80px)' }}></div>
        <div className="container">
          <div className="sec-head">
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Portfolio</div>
            <h2 className="syne">Featured <span className="gtext">Projects</span></h2>
            <p>Real-world applications built with modern tech stacks — solving real business problems.</p>
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p) => (
              <div key={p.t} className="card proj-card">
                <div className="proj-top">
                  <div className="proj-icon">{p.i}</div>
                  <div className="proj-links">
                    <button className="proj-link">GitHub</button>
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="proj-link">Live Demo →</a>}
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">GitHub</a>}
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="sec altbg">
        <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(139,92,246,.12),transparent 70%)', left: '-100px', top: '20%', filter: 'blur(80px)' }}></div>
        <div className="container">
          <div className="sec-head">
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Career</div>
            <h2 className="syne">Work <span className="gtext">Experience</span></h2>
          </div>
          <div className="exp-wrap">
            {EXP.map((e, index) => (
              <div key={`${e.co}-${e.r}`} className="exp-item">
                <div className="exp-spine">
                  <div className="exp-dot"></div>
                  {index < EXP.length - 1 && <div className="exp-line"></div>}
                </div>
                <div className="card exp-card" style={{ padding: '26px' }}>
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="sec">
        <div className="orb" style={{ width: '500px', height: '500px', background: 'radial-gradient(circle,rgba(20,184,166,.1),transparent 70%)', right: 0, top: 0, filter: 'blur(80px)' }}></div>
        <div className="container">
          <div className="sec-head">
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Testimonials</div>
            <h2 className="syne">What Clients <span className="gtext">Say</span></h2>
          </div>
          <div className="test-wrap">
            <div className="test-card">
              <div className="test-quote">"</div>
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
            </div>
            <div className="test-dots">
              {TESTS.map((_, i) => (
                <button
                  key={i}
                  className={`dot ${i === testIndex ? 'active' : ''}`}
                  style={{ width: i === testIndex ? '28px' : '8px' }}
                  onClick={() => setTestIndex(i)}
                ></button>
              ))}
            </div>
            <div className="test-navs">
              <button className="test-nav" onClick={() => setTestIndex((prev) => (prev - 1 + TESTS.length) % TESTS.length)}>‹</button>
              <button className="test-nav" onClick={() => setTestIndex((prev) => (prev + 1) % TESTS.length)}>›</button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec altbg">
        <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(20,184,166,.1),transparent 70%)', left: 0, top: '50%', filter: 'blur(80px)' }}></div>
        <div className="orb" style={{ width: '400px', height: '400px', background: 'radial-gradient(circle,rgba(139,92,246,.1),transparent 70%)', right: 0, bottom: 0, filter: 'blur(80px)' }}></div>
        <div className="container">
          <div className="sec-head">
            <div className="stag" style={{ margin: '0 auto 20px', display: 'table' }}>✦ Contact</div>
            <h2 className="syne">Let's Work <span className="gtext">Together</span></h2>
            <p>Have a project in mind? Let's discuss how I can help bring your ideas to life.</p>
          </div>
          <div className="contact-grid">
            <div>
              <div className="contact-info">
                <div className="contact-item" style={{ '--hover-border': 'rgba(139,92,246,.3)' }}>
                  <div className="c-ico" style={{ background: 'rgba(139,92,246,.12)', border: '1px solid rgba(139,92,246,.25)' }}>📧</div>
                  <div><div className="c-label">Email</div><div className="c-val">sshaharyar229@gmail.com</div></div>
                </div>
                <div className="contact-item" style={{ '--hover-border': 'rgba(20,184,166,.3)' }}>
                  <div className="c-ico" style={{ background: 'rgba(20,184,166,.1)', border: '1px solid rgba(20,184,166,.2)' }}>📱</div>
                  <div><div className="c-label">Phone</div><div className="c-val">+92 314 0069007</div></div>
                </div>
                <div className="contact-item" style={{ '--hover-border': 'rgba(245,158,11,.3)' }}>
                  <div className="c-ico" style={{ background: 'rgba(245,158,11,.1)', border: '1px solid rgba(245,158,11,.2)' }}>📍</div>
                  <div><div className="c-label">Location</div><div className="c-val">Kamalia, Pakistan</div></div>
                </div>
                <div className="contact-item" style={{ '--hover-border': 'rgba(236,72,153,.3)' }}>
                  <div className="c-ico" style={{ background: 'rgba(236,72,153,.1)', border: '1px solid rgba(236,72,153,.2)' }}>💬</div>
                  <div><div className="c-label">Response Time</div><div className="c-val" style={{ color: '#14b8a6' }}>Within 24 hours</div></div>
                </div>
              </div>
              <div className="socials">
                <a className="soc" data-tooltip="LinkedIn" style={{ '--hover-border': 'rgba(10,102,194,.5)', '--hover-color': '#0a66c2' }} href="https://www.linkedin.com/in/shaharyar-sahil-442b7b184/?skipRedirect=true" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin-in"></i></a>
                <a className="soc" data-tooltip="GitHub" style={{ '--hover-border': 'rgba(255,255,255,.3)', '--hover-color': '#fff' }} href="https://github.com/Shaharyar123-art" target="_blank" rel="noreferrer"><i className="fa-brands fa-github"></i></a>
                <a className="soc" data-tooltip="Twitter/X" style={{ '--hover-border': 'rgba(29,161,242,.5)', '--hover-color': '#1da1f2' }} href="https://x.com/Shaharyar7008" target="_blank" rel="noreferrer"><i className="fa-brands fa-x-twitter"></i></a>
                <a className="soc" data-tooltip="WhatsApp" style={{ '--hover-border': 'rgba(37,211,102,.5)', '--hover-color': '#25d366' }} href="https://wa.me/923041137877" target="_blank" rel="noreferrer"><i className="fa-brands fa-whatsapp"></i></a>
              </div>
            </div>
            <div className="card form-card">
              {!formSubmitted ? (
                <div id="form-area">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input 
                        className="inp" 
                        id="f-name" 
                        type="text" 
                        placeholder="Muhammad Ali" 
                        value={formData.name}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input 
                        className="inp" 
                        id="f-email" 
                        type="email" 
                        placeholder="you@email.com" 
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject</label>
                    <input 
                      className="inp" 
                      id="f-subject" 
                      type="text" 
                      placeholder="Project Discussion" 
                      value={formData.subject}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea 
                      className="inp" 
                      id="f-msg" 
                      placeholder="Tell me about your project, budget, and timeline..."
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <button className="btn-p submit-btn" onClick={handleSubmit}>Send Message ✉️</button>
                </div>
              ) : (
                <div id="success-area" className="success-state">
                  <div className="success-emoji">✅</div>
                  <h3 className="syne" style={{ fontSize: '22px', fontWeight: 700, marginBottom: '10px' }}>Message Sent!</h3>
                  <p style={{ color: 'var(--m)', lineHeight: 1.7 }}>Thank you for reaching out. I'll get back to you within 24 hours.</p>
                </div>
              )}
            </div>
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
              <a className="soc" data-tooltip="LinkedIn" href="https://www.linkedin.com/in/shaharyar-sahil-442b7b184/?skipRedirect=true" target="_blank" rel="noreferrer" style={{ '--hover-border': 'rgba(10,102,194,.5)', '--hover-color': '#0a66c2' }}><i className="fa-brands fa-linkedin-in"></i></a>
              <a className="soc" data-tooltip="GitHub" href="https://github.com/Shaharyar123-art" target="_blank" rel="noreferrer" style={{ '--hover-border': 'rgba(255,255,255,.3)', '--hover-color': '#fff' }}><i className="fa-brands fa-github"></i></a>
              <a className="soc" data-tooltip="Twitter/X" href="https://x.com/Shaharyar7008" target="_blank" rel="noreferrer" style={{ '--hover-border': 'rgba(29,161,242,.5)', '--hover-color': '#1da1f2' }}><i className="fa-brands fa-x-twitter"></i></a>
              <a className="soc" data-tooltip="WhatsApp" href="https://wa.me/923041137877" target="_blank" rel="noreferrer" style={{ '--hover-border': 'rgba(37,211,102,.5)', '--hover-color': '#25d366' }}><i className="fa-brands fa-whatsapp"></i></a>
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

      {/* Back to Top */}
      <button 
        className={`btt ${showBackToTop ? 'visible' : ''}`} 
        onClick={() => scrollToSection('home')}
      >
        ↑
      </button>
    </>
  );
}

export default App;
