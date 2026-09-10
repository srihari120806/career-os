import { useState } from "react";
import { LayoutDashboard, UserRound, FileText, BriefcaseBusiness, Code2, Target, Menu, Sparkles } from "lucide-react";

const nav = [
  ["Dashboard", LayoutDashboard], ["My Profile", UserRound], ["Master Resume", FileText],
  ["Job Analyzer", BriefcaseBusiness], ["Projects", Code2], ["Career Roadmap", Target]
];

export default function App() {
  const [active, setActive] = useState("Dashboard");
  return <div className="app">
    <aside className="sidebar">
      <div className="brand"><div className="logo"><Sparkles size={18}/></div><span>CareerOS</span></div>
      <p className="section-label">WORKSPACE</p>
      {nav.map(([name, Icon]) => <button key={name} className={active === name ? "nav active" : "nav"} onClick={() => setActive(name)}><Icon size={18}/>{name}</button>)}
      <div className="sidebar-bottom"><div className="profile-mini"><div className="avatar">S</div><div><strong>Srihari</strong><small>CSE Student</small></div></div></div>
    </aside>
    <main className="main">
      <header><button className="mobile-menu"><Menu/></button><div><p className="eyebrow">CAREER COMMAND CENTER</p><h1>{active}</h1></div><div className="status"><span/> Career journey active</div></header>
      <section className="hero"><div><p className="eyebrow">YOUR NEXT MOVE</p><h2>Build a career you're proud of.</h2><p>Track your skills, strengthen your resume, analyze jobs and prepare for interviews — all in one place.</p></div><div className="score"><strong>64%</strong><span>Career readiness</span></div></section>
      <div className="grid">
        <article className="card"><div className="card-title"><span>Resume</span><FileText size={18}/></div><h3>Master resume</h3><p>Keep one source of truth for your experience and generate tailored versions later.</p><button className="primary" onClick={() => setActive("Master Resume")}>Open resume →</button></article>
        <article className="card"><div className="card-title"><span>Skills</span><Code2 size={18}/></div><h3>Skill gap</h3><div className="progress"><span style={{width:"72%"}}/></div><p>72% of your tracked target skills are covered.</p><button className="secondary" onClick={() => setActive("Career Roadmap")}>View roadmap →</button></article>
        <article className="card wide"><div className="card-title"><span>Job Analyzer</span><BriefcaseBusiness size={18}/></div><h3>See how you match a role</h3><p>Paste a job description and CareerOS will score your fit, identify missing skills and tell you what to improve.</p><button className="primary" onClick={() => setActive("Job Analyzer")}>Analyze a job →</button></article>
      </div>
    </main>
  </div>;
}
