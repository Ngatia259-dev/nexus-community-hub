import React, { useEffect, useRef, useState } from 'react';

/* ─── Intersection Observer hook for scroll-reveal ─── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─── Animated counter ─── */
function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView(0.3);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / 60);
    const id = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(id); }
      else setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

/* ─── Reveal wrapper ─── */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Team data ─── */
const team = [
  { name: 'Amara Osei', role: 'Co-founder & CEO', initials: 'AO', color: '#6366f1' },
  { name: 'Lena Müller', role: 'Head of Engineering', initials: 'LM', color: '#0ea5e9' },
  { name: 'Raj Patel', role: 'Head of Community', initials: 'RP', color: '#10b981' },
  { name: 'Sofia Reyes', role: 'Design Lead', initials: 'SR', color: '#f59e0b' },
];

function TeamCard({ member, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: '#fff',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          cursor: 'default',
          transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
          boxShadow: hovered ? '0 20px 40px rgba(0,0,0,0.10)' : '0 2px 8px rgba(0,0,0,0.04)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: member.color,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '1.4rem', fontWeight: 700, color: '#fff',
            transform: hovered ? 'scale(1.08)' : 'scale(1)',
            transition: 'transform 0.3s ease',
            fontFamily: "'Syne', sans-serif",
          }}
        >
          {member.initials}
        </div>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '0.25rem' }}>{member.name}</p>
        <p style={{ fontSize: '0.825rem', color: '#64748b' }}>{member.role}</p>
      </div>
    </Reveal>
  );
}

/* ─── Values data ─── */
const values = [
  { emoji: '🤝', title: 'Radical Openness', desc: 'We believe in sharing knowledge freely — no gatekeeping, ever.' },
  { emoji: '⚡', title: 'Bias for Action', desc: 'Build, ship, learn. Perfection is the enemy of progress.' },
  { emoji: '🌍', title: 'Global by Default', desc: 'Our community spans continents, timezones, and tech stacks.' },
  { emoji: '🧠', title: 'Curiosity First', desc: 'Every question is worth asking. Growth lives at the edge of comfort.' },
  { emoji: '🔒', title: 'Trust & Safety', desc: 'A healthy community demands real accountability and care.' },
  { emoji: '🎨', title: 'Craft Matters', desc: 'Good code and good design deserve equal attention.' },
];

/* ─── Main page ─── */
export default function About() {
  const [heroVisible, setHeroVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .about-page { font-family: 'DM Sans', sans-serif; color: #0f172a; background: #f8fafc; }

        /* ── Hero ── */
        .hero {
          min-height: 88vh;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center;
          padding: 6rem 1.5rem 4rem;
          background: linear-gradient(160deg, #0f172a 0%, #1e293b 55%, #0f172a 100%);
          position: relative; overflow: hidden;
        }
        .hero::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.28) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(99,102,241,0.07) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99,102,241,0.07) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .hero-pill {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(99,102,241,0.18); border: 1px solid rgba(99,102,241,0.35);
          border-radius: 999px; padding: 0.35rem 1rem;
          font-size: 0.78rem; font-weight: 500; color: #a5b4fc;
          letter-spacing: 0.06em; text-transform: uppercase;
          margin-bottom: 1.75rem;
        }
        .hero h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.6rem, 7vw, 5.5rem);
          font-weight: 800; line-height: 1.05;
          color: #f1f5f9;
          max-width: 820px;
          margin-bottom: 1.5rem;
        }
        .hero h1 em { font-style: normal; color: #818cf8; }
        .hero p {
          font-size: clamp(1rem, 2vw, 1.2rem);
          color: #94a3b8; max-width: 560px;
          line-height: 1.75; font-weight: 300;
          margin-bottom: 2.5rem;
        }
        .hero-cta {
          display: inline-flex; gap: 1rem; flex-wrap: wrap; justify-content: center;
        }
        .btn-primary {
          background: #6366f1; color: #fff;
          padding: 0.8rem 2rem; border-radius: 10px;
          font-weight: 600; font-size: 0.95rem;
          text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { background: #4f46e5; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(99,102,241,0.35); }
        .btn-ghost {
          background: transparent; color: #cbd5e1;
          padding: 0.8rem 2rem; border-radius: 10px;
          font-weight: 500; font-size: 0.95rem;
          text-decoration: none; border: 1px solid rgba(203,213,225,0.25); cursor: pointer;
          transition: border-color 0.2s, color 0.2s, transform 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-ghost:hover { border-color: #94a3b8; color: #f1f5f9; transform: translateY(-2px); }

        /* ── Sections ── */
        .section { padding: 6rem 1.5rem; }
        .section-inner { max-width: 1100px; margin: 0 auto; }
        .section-label {
          font-family: 'Syne', sans-serif;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          color: #6366f1; margin-bottom: 0.75rem;
        }
        .section-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.9rem, 4vw, 2.8rem);
          font-weight: 800; line-height: 1.15;
          color: #0f172a; margin-bottom: 1rem;
        }
        .section-sub {
          font-size: 1.05rem; color: #64748b;
          line-height: 1.75; max-width: 560px; font-weight: 300;
        }

        /* ── Stats ── */
        .stats-section { background: #fff; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 2rem; margin-top: 3.5rem;
        }
        .stat-item { text-align: center; }
        .stat-number {
          font-family: 'Syne', sans-serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem);
          font-weight: 800; color: #6366f1; line-height: 1;
          margin-bottom: 0.4rem;
        }
        .stat-label { font-size: 0.88rem; color: #64748b; font-weight: 400; }

        /* ── Mission split ── */
        .mission-section { background: #f8fafc; }
        .mission-split {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 5rem; align-items: center; margin-top: 1rem;
        }
        @media (max-width: 768px) { .mission-split { grid-template-columns: 1fr; gap: 2.5rem; } }
        .mission-visual {
          aspect-ratio: 1;
          max-width: 400px; width: 100%;
          background: linear-gradient(135deg, #6366f1 0%, #818cf8 50%, #a5b4fc 100%);
          border-radius: 24px;
          display: flex; align-items: center; justify-content: center;
          font-size: 5rem; box-shadow: 0 24px 60px rgba(99,102,241,0.3);
          position: relative; overflow: hidden;
        }
        .mission-visual::after {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.2), transparent 60%);
        }
        .mission-text blockquote {
          border-left: 3px solid #6366f1;
          padding-left: 1.25rem;
          font-size: 1.15rem; font-style: italic;
          color: #334155; line-height: 1.75;
          margin: 1.75rem 0; font-weight: 300;
        }

        /* ── Values ── */
        .values-section { background: #0f172a; }
        .values-section .section-title { color: #f1f5f9; }
        .values-section .section-label { color: #818cf8; }
        .values-section .section-sub { color: #94a3b8; }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem; margin-top: 3.5rem;
        }
        .value-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 1.75rem;
          transition: background 0.25s, border-color 0.25s, transform 0.25s;
          cursor: default;
        }
        .value-card:hover {
          background: rgba(99,102,241,0.12);
          border-color: rgba(99,102,241,0.35);
          transform: translateY(-4px);
        }
        .value-emoji { font-size: 2rem; margin-bottom: 0.9rem; display: block; }
        .value-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700; font-size: 1rem;
          color: #f1f5f9; margin-bottom: 0.5rem;
        }
        .value-desc { font-size: 0.875rem; color: #94a3b8; line-height: 1.65; font-weight: 300; }

        /* ── Team ── */
        .team-section { background: #fff; }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem; margin-top: 3.5rem;
        }

        /* ── Timeline ── */
        .timeline-section { background: #f8fafc; }
        .timeline { margin-top: 3rem; position: relative; padding-left: 2rem; }
        .timeline::before {
          content: ''; position: absolute; left: 0; top: 0; bottom: 0;
          width: 2px; background: linear-gradient(to bottom, #6366f1, #a5b4fc, transparent);
        }
        .tl-item { position: relative; margin-bottom: 2.5rem; }
        .tl-dot {
          position: absolute; left: -2.45rem; top: 0.3rem;
          width: 14px; height: 14px; border-radius: 50%;
          background: #6366f1; border: 2px solid #f8fafc;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.25);
        }
        .tl-year {
          font-family: 'Syne', sans-serif;
          font-size: 0.75rem; font-weight: 700;
          color: #6366f1; letter-spacing: 0.08em;
          text-transform: uppercase; margin-bottom: 0.25rem;
        }
        .tl-event {
          font-size: 1rem; font-weight: 500; color: #0f172a; margin-bottom: 0.25rem;
        }
        .tl-detail { font-size: 0.875rem; color: #64748b; font-weight: 300; line-height: 1.6; }

        /* ── CTA band ── */
        .cta-section {
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          padding: 5rem 1.5rem; text-align: center;
        }
        .cta-section h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 800; color: #fff; margin-bottom: 1rem;
        }
        .cta-section p { color: rgba(255,255,255,0.75); font-size: 1.05rem; margin-bottom: 2rem; font-weight: 300; }
        .btn-white {
          background: #fff; color: #4f46e5;
          padding: 0.85rem 2.25rem; border-radius: 10px;
          font-weight: 700; font-size: 0.95rem;
          text-decoration: none; border: none; cursor: pointer;
          display: inline-block;
          transition: transform 0.2s, box-shadow 0.2s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .hero { padding: 5rem 1.25rem 3rem; min-height: 100svh; }
          .hero h1 { font-size: 2.4rem; }
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
          .values-grid { grid-template-columns: 1fr; }
          .team-grid { grid-template-columns: repeat(2, 1fr); }
          .section { padding: 4rem 1.25rem; }
          .mission-visual { max-width: 100%; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
          .team-grid { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>

      <div className="about-page">

        {/* ── HERO ── */}
        <section className="hero">
          <div className="hero-grid" />

          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <span className="hero-pill">✦ Our story</span>
          </div>

          <h1
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s',
            }}
          >
            Built by developers,<br /><em>for developers</em>
          </h1>

          <p
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.75s ease 0.22s, transform 0.75s ease 0.22s',
            }}
          >
            Nexus was born from a simple frustration: too many brilliant developers
            working in isolation. We built the place where that changes.
          </p>

          <div
            className="hero-cta"
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.75s ease 0.35s, transform 0.75s ease 0.35s',
            }}
          >
            <a href="/network" className="btn-primary">Join the community</a>
            <a href="/posts" className="btn-ghost">See discussions</a>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className="section stats-section">
          <div className="section-inner">
            <Reveal>
              <p className="section-label">By the numbers</p>
              <h2 className="section-title">A community that's actually growing</h2>
            </Reveal>
            <div className="stats-grid">
              {[
                { target: 48000, suffix: '+', label: 'Active members' },
                { target: 120, suffix: '+', label: 'Countries represented' },
                { target: 9200, suffix: '+', label: 'Discussions this month' },
                { target: 3400, suffix: '+', label: 'Jobs posted in 2026' },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="stat-item">
                    <div className="stat-number"><Counter target={s.target} suffix={s.suffix} /></div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── MISSION ── */}
        <section className="section mission-section">
          <div className="section-inner">
            <div className="mission-split">
              <Reveal>
                <div className="mission-visual">🚀</div>
              </Reveal>
              <div className="mission-text">
                <Reveal>
                  <p className="section-label">Our mission</p>
                  <h2 className="section-title">Connection is the compounding skill</h2>
                </Reveal>
                <Reveal delay={0.1}>
                  <blockquote>
                    "The best engineers don't succeed alone — they succeed because of the
                    people they learn from, ship with, and lift up."
                  </blockquote>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="section-sub">
                    We exist to reduce the friction between a developer having a problem
                    and finding the exact person who has solved it. Through discussions,
                    networking, and open collaboration — Nexus is where technical growth
                    compounds.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="section values-section">
          <div className="section-inner">
            <Reveal>
              <p className="section-label">What we stand for</p>
              <h2 className="section-title">Our values</h2>
              <p className="section-sub">Not posters on a wall. Decisions we actually make every day.</p>
            </Reveal>
            <div className="values-grid">
              {values.map((v, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <div className="value-card">
                    <span className="value-emoji">{v.emoji}</span>
                    <div className="value-title">{v.title}</div>
                    <div className="value-desc">{v.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section className="section team-section">
          <div className="section-inner">
            <Reveal>
              <p className="section-label">The team</p>
              <h2 className="section-title">People behind Nexus</h2>
              <p className="section-sub">Small, focused, and deeply in love with developer tooling.</p>
            </Reveal>
            <div className="team-grid">
              {team.map((m, i) => (
                <TeamCard key={i} member={m} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="section timeline-section">
          <div className="section-inner">
            <Reveal>
              <p className="section-label">History</p>
              <h2 className="section-title">How we got here</h2>
            </Reveal>
            <div className="timeline">
              {[
                { year: '2022', event: 'The idea', detail: 'Two engineers frustrated by siloed Slack groups decide to build a better place.' },
                { year: '2023 Q1', event: 'Private beta', detail: 'First 500 members. Weekly AMAs. Figma files and pull requests flying everywhere.' },
                { year: '2023 Q4', event: 'Public launch', detail: 'Hit 10 000 members in the first month. Jobs board goes live.' },
                { year: '2024', event: 'Series A', detail: 'Raised $8M to grow the team and build deeper community features.' },
                { year: '2025', event: 'Global expansion', detail: 'Launched in Spanish, Portuguese, and French. 100+ countries reached.' },
                { year: '2026', event: 'Right now', detail: "You're here. The best chapters are still being written." },
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.07}>
                  <div className="tl-item">
                    <div className="tl-dot" />
                    <div className="tl-year">{item.year}</div>
                    <div className="tl-event">{item.event}</div>
                    <div className="tl-detail">{item.detail}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="cta-section">
          <Reveal>
            <h2>Ready to find your people?</h2>
            <p>Join 48 000+ developers already building in the open.</p>
            <a href="/network" className="btn-white">Get started — it's free</a>
          </Reveal>
        </section>

      </div>
    </>
  );
}