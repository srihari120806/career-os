import { useEffect, useMemo, useState } from "react";
import {
  Activity, ArrowRight, BarChart3, BriefcaseBusiness, Check, CheckCircle2, ChevronRight,
  Circle, Code2, Compass, FileText, Flame, LayoutDashboard, Menu, MessageSquare,
  Moon, Plus, Search, Settings2, ShieldCheck, Sparkles, Sun, Target, Trash2,
  TrendingUp, UserRound, X, Zap
} from "lucide-react";

const nav = [
  ["Dashboard", LayoutDashboard, "Overview"],
  ["My Profile", UserRound, "Identity"],
  ["Master Resume", FileText, "Source of truth"],
  ["Job Analyzer", BriefcaseBusiness, "Role intelligence"],
  ["Projects", Code2, "Proof of work"],
  ["Career Roadmap", Target, "Execution plan"],
];

const samples = {
  "Python / Django": "We are looking for a Python Developer with strong Python and Django experience, REST APIs, SQL and Git. Docker is a plus and knowledge of React is preferred.",
  "Data Analyst": "We are hiring a Data Analyst with strong SQL, Excel, Python, Pandas and Power BI skills. Experience with dashboards and data visualization is preferred.",
  "Frontend": "Frontend Developer needed with JavaScript, TypeScript, React, HTML, CSS and Git. Experience with REST APIs and responsive UI development is required."
};

const defaultProfile = { name: "Srihari", headline: "CSE Student • Builder • ERP & Software", location: "Chennai, India", goal: "Software / ERP career", email: "srihari@example.com" };
const defaultResume = "Srihari\nCSE Student • Builder • ERP & Software\nChennai, India\n\nSUMMARY\nComputer Science student building practical software products across Python, Django, AI and ERP domains.\n\nSKILLS\nPython • Django • SQL • C++ • JavaScript • Git • REST APIs • Arduino • MATLAB\n\nPROJECTS\nCareerOS — career command center\nMedAI — configurable medical assistant\nWeather App — Django + OpenWeatherMap\n\nEXPERIENCE\nERP Project Management Intern\n\nEDUCATION\nB.Tech Computer Science Engineering";
const defaultProjects = [
  { id: 1, name: "CareerOS", tag: "Product", desc: "Career command center for role fit, resume intelligence and roadmap execution.", status: "Live" },
  { id: 2, name: "MedAI", tag: "AI / Python", desc: "Configurable Streamlit medical assistant with a focused conversational workflow.", status: "Portfolio" },
  { id: 3, name: "Weather App", tag: "Django", desc: "Real-time forecast experience powered by the OpenWeatherMap API.", status: "Portfolio" },
];
const defaultRoadmap = [
  { title: "Build foundations", detail: "Python, SQL, Git and core CS", done: true, meta: "Core stack" },
  { title: "Ship portfolio", detail: "Polish 2–3 projects and document them", done: true, meta: "Proof of work" },
  { title: "Target roles", detail: "Analyze jobs and close your biggest skill gaps", done: false, meta: "Current focus" },
  { title: "Interview prep", detail: "DSA, projects and behavioral practice", done: false, meta: "Next up" },
  { title: "Land the role", detail: "Apply consistently and track outcomes", done: false, meta: "End goal" },
];

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function useStored(key, fallback) {
  const [value, setValue] = useState(() => {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; } catch { return fallback; }
  });
  useEffect(() => { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);
  return [value, setValue];
}

function Sparkline({ points = [18, 25, 22, 32, 30, 41, 48] }) {
  const max = Math.max(...points); const min = Math.min(...points);
  const coords = points.map((p, i) => `${(i / (points.length - 1)) * 100},${88 - ((p - min) / (max - min || 1)) * 66}`).join(" ");
  return <svg className="sparkline" viewBox="0 0 100 90" preserveAspectRatio="none"><polyline points={coords} fill="none" stroke="currentColor" strokeWidth="2.5" vectorEffect="non-scaling-stroke"/><circle cx="100" cy={88 - ((points[points.length - 1] - min) / (max - min || 1)) * 66} r="2.5" fill="currentColor"/></svg>;
}

function StatCard({ icon: Icon, label, value, delta, detail, points }) {
  return <article className="stat-card">
    <div className="stat-head"><span className="stat-icon"><Icon size={16}/></span><span className="stat-label">{label}</span>{delta && <span className="stat-delta"><TrendingUp size={11}/> {delta}</span>}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-foot"><span>{detail}</span>{points && <Sparkline points={points}/>}</div>
  </article>;
}

function Topbar({ active, setActive, dark, setDark, mobileOpen, setMobileOpen }) {
  const [query, setQuery] = useState("");
  function submit(e) { e.preventDefault(); const hit = nav.find(([name]) => name.toLowerCase().includes(query.toLowerCase())); if (hit) { setActive(hit[0]); setQuery(""); } }
  return <header className="topbar">
    <div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileOpen(v => !v)}><Menu size={18}/></button><div><span className="eyebrow">CAREEROS / WORKSPACE</span><h1>{active}</h1></div></div>
    <div className="topbar-right">
      <form className="global-search" onSubmit={submit}><Search size={15}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Jump to a workspace…"/><kbd>⌘ K</kbd></form>
      <div className="status-chip"><span/> All systems healthy</div>
      <button className="theme-toggle" onClick={() => setDark(!dark)}>{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>
    </div>
  </header>;
}

function Dashboard({ setActive, profile, projects, roadmap, setRoadmap }) {
  const done = roadmap.filter(x => x.done).length;
  const readiness = Math.min(96, 56 + done * 7 + Math.min(projects.length, 4) * 3);
  const next = roadmap.findIndex(x => !x.done);
  const completion = Math.round((done / roadmap.length) * 100);
  const toggleNext = () => { if (next >= 0) setRoadmap(roadmap.map((r, i) => i === next ? {...r, done: true} : r)); };
  return <div className="page-stack">
    <section className="hero-goat">
      <div className="hero-gridline" />
      <div className="hero-copy">
        <div className="hero-kicker"><span className="live-dot"/> CAREER OPERATING SYSTEM <b>v2.0</b></div>
        <h2>Good afternoon, {profile.name.split(" ")[0]}.<br/><span>Build leverage, not just a resume.</span></h2>
        <p>CareerOS turns your skills, proof of work and target roles into one execution system — so every hour compounds.</p>
        <div className="hero-actions"><button className="primary" onClick={() => setActive("Job Analyzer")}><Zap size={15}/> Analyze target role</button><button className="ghost-light" onClick={() => setActive("Career Roadmap")}><Compass size={15}/> Continue roadmap</button></div>
        <div className="hero-meta"><span><ShieldCheck size={13}/> Personal workspace</span><span><Activity size={13}/> Live progress</span><span><Sparkles size={13}/> Intelligent workflow</span></div>
      </div>
      <div className="hero-readiness"><div className="readiness-orbit orbit-one"/><div className="readiness-orbit orbit-two"/><div className="readiness-core"><small>READINESS</small><strong>{readiness}<sup>%</sup></strong><span>top trajectory</span></div></div>
    </section>

    <div className="stats-grid">
      <StatCard icon={Target} label="Career readiness" value={`${readiness}%`} delta="8%" detail="stronger than last month" points={[39, 44, 43, 51, 56, 62, readiness]}/>
      <StatCard icon={BriefcaseBusiness} label="Roles analyzed" value="12" detail="3 this week" points={[2, 3, 5, 5, 7, 9, 12]}/>
      <StatCard icon={Code2} label="Proof of work" value={projects.length} detail="portfolio projects" points={[1, 1, 2, 2, 2, 3, projects.length]}/>
      <StatCard icon={Flame} label="Momentum" value="7 days" delta="active" detail="current build streak" points={[1, 2, 3, 3, 4, 6, 7]}/>
    </div>

    <div className="dashboard-columns">
      <section className="panel career-map-panel">
        <div className="panel-heading"><div><span className="eyebrow">CAREER INTELLIGENCE</span><h3>Your leverage map</h3></div><button className="icon-button"><Settings2 size={15}/></button></div>
        <div className="leverage-layout"><div className="radar-wrap"><div className="radar"><div className="radar-ring r1"/><div className="radar-ring r2"/><div className="radar-ring r3"/><div className="radar-line l1"/><div className="radar-line l2"/><div className="radar-shape"/><span className="radar-dot d1"/><span className="radar-dot d2"/><span className="radar-dot d3"/><span className="radar-dot d4"/><span className="radar-label rl1">Skills</span><span className="radar-label rl2">Resume</span><span className="radar-label rl3">Projects</span><span className="radar-label rl4">Roles</span></div></div>
          <div className="signal-bars"><div className="signal-bar"><div><span>Technical breadth</span><b>82</b></div><i><em style={{width:'82%'}}/></i></div><div className="signal-bar"><div><span>Proof of work</span><b>{Math.min(92, projects.length * 28)}</b></div><i><em style={{width:`${Math.min(92, projects.length * 28)}%`}}/></i></div><div className="signal-bar"><div><span>Role clarity</span><b>71</b></div><i><em style={{width:'71%'}}/></i></div><div className="signal-bar"><div><span>Interview readiness</span><b>58</b></div><i><em style={{width:'58%'}}/></i></div></div></div>
      </section>

      <section className="panel next-panel">
        <div className="panel-heading"><div><span className="eyebrow">NEXT BEST ACTION</span><h3>One move today</h3></div><Zap size={17}/></div>
        <div className="next-focus"><div className="focus-icon"><BriefcaseBusiness size={18}/></div><span className="focus-tag">CURRENT PRIORITY</span><h4>Find your highest-value target role</h4><p>Use Job Analyzer to compare a real role against your current skills and expose the exact gaps worth closing.</p><button className="primary full" onClick={() => setActive("Job Analyzer")}>Start role analysis <ArrowRight size={14}/></button></div>
        <div className="quick-actions"><button onClick={() => setActive("Master Resume")}><FileText size={14}/> Resume</button><button onClick={() => setActive("Projects")}><Code2 size={14}/> Projects</button><button onClick={() => setActive("Career Roadmap")}><Target size={14}/> Roadmap</button></div>
      </section>

      <section className="panel timeline-panel">
        <div className="panel-heading"><div><span className="eyebrow">EXECUTION TIMELINE</span><h3>{done}/{roadmap.length} milestones complete</h3></div><button className="link-button" onClick={() => setActive("Career Roadmap")}>Open full plan <ArrowRight size={13}/></button></div>
        <div className="timeline-track">{roadmap.map((r, i) => <div className={r.done ? 'timeline-step complete' : i === next ? 'timeline-step current' : 'timeline-step'} key={r.title}><div className="timeline-node">{r.done ? <Check size={12}/> : i + 1}</div><div><span>{r.meta}</span><strong>{r.title}</strong><small>{r.detail}</small></div></div>)}</div>
        <div className="timeline-footer"><div className="mini-progress"><span style={{width:`${completion}%`}}/></div><span>{completion}% complete</span><button className="secondary" onClick={toggleNext} disabled={next < 0}>{next >= 0 ? 'Mark next done' : 'Complete'}</button></div>
      </section>

      <section className="panel copilot-panel">
        <div className="panel-heading"><div><span className="eyebrow">CAREER COPILOT</span><h3>Your strategy layer</h3></div><MessageSquare size={16}/></div>
        <div className="copilot-message"><span className="copilot-avatar"><Sparkles size={13}/></span><div><strong>Current read</strong><p>Your biggest upside is turning projects into stronger evidence. CareerOS recommends pairing each project with a measurable result and the stack used.</p></div></div>
        <button className="copilot-prompt" onClick={() => setActive('Projects')}>How do I make my projects recruiter-ready? <ArrowRight size={13}/></button>
        <button className="copilot-prompt" onClick={() => setActive('Job Analyzer')}>What should I learn for my target role? <ArrowRight size={13}/></button>
      </section>
    </div>
  </div>;
}

function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState(""); const [resumeText, setResumeText] = useState(""); const [result, setResult] = useState(null); const [loading, setLoading] = useState(false); const [error, setError] = useState("");
  async function analyzeJob() {
    setError(""); if (!jobDescription.trim()) { setError("Paste a job description first."); return; } setLoading(true);
    try { const res = await fetch(`${API_BASE}/api/analyze-job/`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({job_description:jobDescription,resume_text:resumeText})}); const data = await res.json(); if (!res.ok) throw new Error(data.error || 'Analysis failed'); setResult(data); }
    catch (err) { setError(`Could not reach CareerOS API. ${err.message}`); } finally { setLoading(false); }
  }
  const title = result ? result.match_score >= 80 ? 'Strong match' : result.match_score >= 60 ? 'Good match' : 'Needs improvement' : '';
  return <div className="page-stack">
    <section className="section-hero goat-section"><div><span className="eyebrow">ROLE INTELLIGENCE / ENGINE</span><h2>See exactly where you stand.</h2><p>Compare a real job against your current evidence. Get a fit score, skill gaps and a practical next-action stack.</p></div><div className="command-pill"><Sparkles size={14}/> deterministic skill intelligence</div></section>
    <div className="analyzer-workbench goat-workbench">
      <section className="panel workbench-card"><div className="step-index">01</div><div className="panel-heading"><div><span className="eyebrow">TARGET ROLE</span><h3>What does the role demand?</h3></div><BriefcaseBusiness size={17}/></div><textarea className="analyzer-textarea" value={jobDescription} onChange={e=>setJobDescription(e.target.value)} placeholder="Paste the complete job description…"/><div className="quick-row"><span>Load sample</span>{Object.keys(samples).map(n=><button className="chip" key={n} onClick={()=>setJobDescription(samples[n])}>{n}</button>)}</div></section>
      <section className="panel workbench-card"><div className="step-index">02</div><div className="panel-heading"><div><span className="eyebrow">YOUR EVIDENCE</span><h3>What can you bring?</h3></div><FileText size={17}/></div><textarea className="analyzer-textarea" value={resumeText} onChange={e=>setResumeText(e.target.value)} placeholder="Paste your resume or list your skills…"/><div className="workbench-actions"><button className="primary" onClick={analyzeJob} disabled={loading}><Search size={15}/>{loading?'Analyzing…':'Run fit analysis'}</button><button className="secondary" onClick={()=>{setJobDescription('');setResumeText('');setResult(null);setError('')}}>Clear</button></div>{error&&<div className="alert"><Circle size={14}/>{error}</div>}</section>
    </div>
    {result&&<section className="panel result-goat" aria-live="polite"><div className="result-header"><div className="result-score-block"><div className="result-orb" style={{'--score':`${result.match_score*3.6}deg`}}><div><strong>{result.match_score}%</strong><span>fit score</span></div></div><div><span className="eyebrow">DECISION LAYER</span><h3>{title}</h3><p>{result.matched_skills.length} of {result.detected_skills.length} detected skills matched.</p></div></div><div className="result-kpis"><div><small>MATCHED</small><strong>{result.matched_skills.length}</strong></div><div><small>GAPS</small><strong>{result.missing_skills.length}</strong></div><div><small>CONFIDENCE</small><strong>{result.detected_skills.length ? 'High':'—'}</strong></div></div></div><div className="result-divider"/><div className="result-columns"><div><h4><CheckCircle2 size={16}/> Your advantages</h4><div className="pill-list">{result.matched_skills.length?result.matched_skills.map(s=><span className="skill good" key={s}>{s}</span>):<span className="muted">No direct matches yet.</span>}</div></div><div><h4><TrendingUp size={16}/> Close these gaps</h4><div className="pill-list">{result.missing_skills.length?result.missing_skills.map(s=><span className="skill gap" key={s}>{s}</span>):<span className="skill good">No major gaps detected</span>}</div></div><div><h4><Zap size={16}/> Next-action stack</h4><ol className="next-moves">{result.recommendations.map((r,i)=><li key={i}><span>{i+1}</span>{r}</li>)}</ol></div></div></section>}
  </div>;
}

function Profile({ profile, setProfile }) {
  const [draft,setDraft]=useState(profile); const save=()=>setProfile(draft);
  return <div className="page-stack"><section className="section-hero"><div><span className="eyebrow">IDENTITY / PROFILE</span><h2>Build a profile that tells a sharper story.</h2><p>These details shape the narrative layer above your resume and projects.</p></div><ShieldCheck size={28}/></section><section className="panel page-panel"><div className="profile-layout"><div className="identity-block"><div className="avatar-xl">{draft.name.slice(0,1)}</div><span className="eyebrow">LIVE PREVIEW</span><h3>{draft.name}</h3><p>{draft.headline}</p><span className="location">{draft.location}</span><span className="profile-goal">{draft.goal}</span></div><div className="form-area"><div className="form-grid">{[['name','Full name'],['headline','Headline'],['location','Location'],['goal','Career goal'],['email','Email']].map(([key,label])=><label key={key}>{label}<input value={draft[key]||''} onChange={e=>setDraft({...draft,[key]:e.target.value})}/></label>)}</div><div className="form-actions"><button className="primary" onClick={save}><Check size={15}/> Save profile</button><span>Persisted locally on this device</span></div></div></div></section></div>;
}

function MasterResume() {
  const [resume,setResume]=useState(()=>localStorage.getItem('careeros-resume')||defaultResume); const [saved,setSaved]=useState(false); const save=()=>{localStorage.setItem('careeros-resume',resume);setSaved(true);setTimeout(()=>setSaved(false),1600)};
  const sections = resume.split(/\n\n/).filter(Boolean).length;
  return <div className="page-stack"><section className="section-hero"><div><span className="eyebrow">SOURCE OF TRUTH / RESUME</span><h2>One master resume. Infinite tailored moves.</h2><p>Maintain the comprehensive version here. Future tailoring can branch from this foundation.</p></div><FileText size={28}/></section><section className="panel resume-shell"><div className="resume-toolbar"><div><span className="eyebrow">MASTER DOCUMENT</span><strong>CareerOS / Master Resume</strong></div><div className="toolbar-meta"><span>{resume.length} characters</span><i/ ><span>{sections} sections</span></div></div><textarea className="resume-editor" value={resume} onChange={e=>setResume(e.target.value)}/><div className="resume-footer"><span>{saved?'✓ Saved just now':'Autosave foundation • manual commit'}</span><button className="primary" onClick={save}><Check size={15}/> Save master resume</button></div></section><section className="resume-insights"><div className="resume-insight"><Sparkles size={15}/><div><strong>Signal density</strong><span>Lead with outcomes, not task lists.</span></div></div><div className="resume-insight"><ShieldCheck size={15}/><div><strong>Source integrity</strong><span>Keep one canonical version before tailoring.</span></div></div><div className="resume-insight"><TrendingUp size={15}/><div><strong>Next upgrade</strong><span>Add measurable impact to your project bullets.</span></div></div></section></div>;
}

function Projects({projects,setProjects}) {
  const [name,setName]=useState(''); const [desc,setDesc]=useState(''); const [tag,setTag]=useState('Product');
  function add(){if(!name.trim())return;setProjects([...projects,{id:Date.now(),name,desc,tag,status:'Portfolio'}]);setName('');setDesc('');}
  function remove(id){setProjects(projects.filter(p=>p.id!==id));}
  return <div className="page-stack"><section className="section-hero"><div><span className="eyebrow">PROOF OF WORK / PORTFOLIO</span><h2>Make your work impossible to ignore.</h2><p>Projects are evidence. Show what you built, why it matters and the stack behind it.</p></div><Code2 size={28}/></section><section className="panel add-project"><div className="panel-heading"><div><span className="eyebrow">NEW PROJECT</span><h3>Add a proof unit</h3></div><Plus size={17}/></div><div className="form-grid project-form"><label>Project name<input value={name} onChange={e=>setName(e.target.value)} placeholder="CareerOS"/></label><label>Category<input value={tag} onChange={e=>setTag(e.target.value)} placeholder="Product / AI / Django"/></label><label className="form-wide">Description<input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What did you build, and what changed because of it?"/></label></div><button className="primary" onClick={add}><Plus size={15}/> Add project</button></section><div className="project-grid">{projects.map((p,index)=><article className="project-card goat-project" key={p.id}><div className="project-top"><span className="project-tag">{p.tag}</span><button className="icon-button" onClick={()=>remove(p.id)}><Trash2 size={15}/></button></div><div className="project-number">0{index+1}</div><div className="project-mark"><Code2 size={18}/></div><span className="project-status"><i/> {p.status}</span><h3>{p.name}</h3><p>{p.desc||'Add a stronger explanation of your project impact.'}</p><button className="link-button">Open project brief <ArrowRight size={13}/></button></article>)}</div></div>;
}

function Roadmap({roadmap,setRoadmap}) {
  const done=roadmap.filter(r=>r.done).length; const pct=Math.round(done/roadmap.length*100); const current=roadmap.findIndex(r=>!r.done);
  function toggle(i){setRoadmap(roadmap.map((r,idx)=>idx===i?{...r,done:!r.done}:r));}
  return <div className="page-stack"><section className="roadmap-hero goat-roadmap"><div className="roadmap-head"><div><span className="eyebrow">EXECUTION SYSTEM / ROADMAP</span><h2>Turn ambition into a sequence.</h2><p>Every milestone is a lever. Finish the current one, then unlock the next.</p></div><div className="roadmap-score"><strong>{pct}%</strong><span>complete</span></div></div></section><section className="panel roadmap-panel"><div className="roadmap-topline"><div><span className="eyebrow">MASTER PLAN</span><h3>{done} of {roadmap.length} milestones complete</h3></div><div className="roadmap-meter"><span style={{width:`${pct}%`}}/></div></div><div className="roadmap-list">{roadmap.map((r,i)=><button key={r.title} className={r.done?'roadmap-card completed':i===current?'roadmap-card current':'roadmap-card'} onClick={()=>toggle(i)}><div className="roadmap-node">{r.done?<Check size={13}/>:i+1}</div><div><span>{r.meta}</span><strong>{r.title}</strong><p>{r.detail}</p></div><ChevronRight size={16}/></button>)}</div></section></div>;
}

export default function App(){
  const [active,setActive]=useState('Dashboard'); const [dark,setDark]=useState(true); const [mobileOpen,setMobileOpen]=useState(false);
  const [profile,setProfile]=useStored('careeros-profile',defaultProfile); const [projects,setProjects]=useStored('careeros-projects',defaultProjects); const [roadmap,setRoadmap]=useStored('careeros-roadmap',defaultRoadmap);
  const page=useMemo(()=>{if(active==='Job Analyzer')return <JobAnalyzer/>;if(active==='My Profile')return <Profile profile={profile} setProfile={setProfile}/>;if(active==='Master Resume')return <MasterResume/>;if(active==='Projects')return <Projects projects={projects} setProjects={setProjects}/>;if(active==='Career Roadmap')return <Roadmap roadmap={roadmap} setRoadmap={setRoadmap}/>;return <Dashboard setActive={setActive} profile={profile} projects={projects} roadmap={roadmap} setRoadmap={setRoadmap}/>},[active,profile,projects,roadmap]);
  useEffect(()=>setMobileOpen(false),[active]);
  return <div className={dark?'app dark':'app'}><aside className={mobileOpen?'sidebar open':'sidebar'}><div className="brand"><div className="brand-mark"><Sparkles size={17}/></div><div><strong>CareerOS</strong><span>Personal career OS</span></div><i className="online-dot"/></div><div className="side-nav"><span className="nav-caption">WORKSPACE</span>{nav.map(([name,Icon,sub])=><button key={name} className={active===name?'nav-item active':'nav-item'} onClick={()=>setActive(name)}><span className="nav-ico"><Icon size={16}/></span><span className="nav-copy"><b>{name}</b><small>{sub}</small></span>{active===name&&<ChevronRight size={14}/>}</button>)}</div><div className="sidebar-bottom"><div className="side-card"><div className="mini-avatar">{profile.name.slice(0,1)}</div><div><strong>{profile.name}</strong><small>{profile.headline}</small></div><UserRound size={14}/></div><div className="side-note"><ShieldCheck size={12}/> Local-first workspace</div></div></aside>{mobileOpen&&<button className="backdrop" aria-label="Close navigation" onClick={()=>setMobileOpen(false)}/>}<main className="main"><Topbar active={active} setActive={setActive} dark={dark} setDark={setDark} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>{page}</main></div>;
}
