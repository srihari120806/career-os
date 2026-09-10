import { useState } from "react";
import { LayoutDashboard, UserRound, FileText, BriefcaseBusiness, Code2, Target, Menu, Sparkles, Search, CheckCircle2, AlertTriangle, ArrowRight, Moon, Sun, Zap, TrendingUp, Plus, Trash2, Save } from "lucide-react";

const nav = [
  ["Dashboard", LayoutDashboard], ["My Profile", UserRound], ["Master Resume", FileText],
  ["Job Analyzer", BriefcaseBusiness], ["Projects", Code2], ["Career Roadmap", Target]
];

const samples = {
  "Python Developer": "We are looking for a Python Developer with strong Python and Django experience, REST APIs, SQL and Git. Docker is a plus and knowledge of React is preferred.",
  "Data Analyst": "We are hiring a Data Analyst with strong SQL, Excel, Python, Pandas and Power BI skills. Experience with dashboards and data visualization is preferred.",
  "Frontend Developer": "Frontend Developer needed with JavaScript, TypeScript, React, HTML, CSS and Git. Experience with REST APIs and responsive UI development is required."
};

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function JobAnalyzer() {
  const [jobDescription, setJobDescription] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeJob() {
    setError("");
    if (!jobDescription.trim()) { setError("Paste a job description first."); return; }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/analyze-job/`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_description: jobDescription, resume_text: resumeText })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The analyzer could not process this job.");
      setResult(data);
    } catch (err) {
      setError(`Could not reach CareerOS API. Check the API connection and try again. ${err.message}`);
    } finally { setLoading(false); }
  }

  function clearAnalyzer() { setJobDescription(""); setResumeText(""); setResult(null); setError(""); }

  return <div className="analyzer-page">
    <div className="analyzer-intro">
      <div><p className="eyebrow">ANALYZE • IMPROVE • GROW</p><h2>Job Analyzer <span className="live-chip"><Zap size={11}/> LIVE</span></h2><p>Turn any job description into a clear action plan. See your fit, skill gaps and what to do next.</p></div>
      <div className="analyzer-badge"><Target size={23}/><span>Find your<br/><b>career advantage.</b></span></div>
    </div>
    <div className="analyzer-grid">
      <section className="card analyzer-card glow-card">
        <div className="card-title"><span>JOB DESCRIPTION</span><BriefcaseBusiness size={18}/></div>
        <h3>What does the role require?</h3>
        <textarea className="analyzer-textarea" value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste the full job description here..." />
        <div className="sample-row"><span>Quick start</span>{Object.keys(samples).map(name => <button key={name} className="sample" onClick={() => setJobDescription(samples[name])}>{name}</button>)}</div>
      </section>
      <section className="card analyzer-card glow-card">
        <div className="card-title"><span>YOUR RESUME / SKILLS</span><FileText size={18}/></div>
        <h3>What can you bring?</h3>
        <textarea className="analyzer-textarea" value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste your resume text or list skills: Python, Django, SQL, Git..." />
        <div className="analyzer-actions"><button className="primary analyze-button" onClick={analyzeJob} disabled={loading}><Search size={16}/>{loading ? "Analyzing..." : "Analyze Job"}<ArrowRight size={15}/></button><button className="secondary" onClick={clearAnalyzer}>Reset</button></div>
        {error && <div className="analyzer-error"><AlertTriangle size={16}/>{error}</div>}
      </section>
    </div>
    {result && <section className="card result-card glow-card" aria-live="polite">
      <div className="result-top">
        <div className="result-score"><div><strong>{result.match_score}%</strong><span>Match</span></div></div>
        <div className="result-copy"><p className="eyebrow">MATCH RESULT</p><h3>{result.match_score >= 80 ? "Strong Match" : result.match_score >= 60 ? "Good Match" : "Needs Improvement"}</h3><p>You match {result.matched_skills.length} of {result.detected_skills.length} detected skills in this role.</p><div className="result-bar"><span style={{width: `${result.match_score}%`}}/></div></div>
        <div className="result-stats"><div><strong>{result.matched_skills.length}</strong><span>Matched</span></div><div><strong>{result.missing_skills.length}</strong><span>Missing</span></div></div>
      </div>
      <div className="result-sections">
        <div><h4><CheckCircle2 size={17}/>Matched skills</h4><div className="skill-pills">{result.matched_skills.length ? result.matched_skills.map(skill => <span key={skill} className="skill-pill">{skill}</span>) : <span className="muted">No direct matches yet.</span>}</div></div>
        <div><h4><AlertTriangle size={17}/>Skills to improve</h4><div className="skill-pills">{result.missing_skills.length ? result.missing_skills.map(skill => <span key={skill} className="skill-pill missing">{skill}</span>) : <span className="skill-pill">No major gaps detected</span>}</div></div>
        <div><h4><TrendingUp size={17}/>Recommended next steps</h4><ol className="recommendations">{result.recommendations.map((item, i) => <li key={i}>{item}</li>)}</ol></div>
      </div>
    </section>}
  </div>;
}

function Dashboard({ setActive }) {
  return <>
    <section className="hero"><div><p className="eyebrow">YOUR NEXT MOVE</p><h2>Build a career you're proud of.</h2><p>Track your skills, strengthen your resume, analyze jobs and prepare for interviews — all in one place.</p><button className="primary hero-action" onClick={() => setActive("Job Analyzer")}><Zap size={15}/> Start analyzing</button></div><div className="score"><strong>64%</strong><span>Career readiness</span></div></section>
    <div className="grid">
      <article className="card"><div className="card-title"><span>RESUME</span><FileText size={18}/></div><h3>Master resume</h3><p>Keep one source of truth for your experience and generate tailored versions later.</p><button className="secondary" onClick={() => setActive("Master Resume")}>Open resume <ArrowRight size={14}/></button></article>
      <article className="card"><div className="card-title"><span>SKILLS</span><Code2 size={18}/></div><h3>Skill gap</h3><div className="progress"><span style={{width:"72%"}}/></div><p>72% of your tracked target skills are covered.</p><button className="secondary" onClick={() => setActive("Career Roadmap")}>View roadmap <ArrowRight size={14}/></button></article>
      <article className="card wide"><div className="card-title"><span>JOB ANALYZER</span><BriefcaseBusiness size={18}/></div><h3>See how you match a role</h3><p>Paste a job description and CareerOS will score your fit, identify missing skills and tell you what to improve.</p><button className="primary" onClick={() => setActive("Job Analyzer")}>Analyze a job <ArrowRight size={14}/></button></article>
    </div>
  </>;
}

function Profile() {
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem("careeros-profile") || '{"name":"Srihari","headline":"CSE Student","location":"Chennai","goal":"Software / ERP career"}'));
  const save = () => localStorage.setItem("careeros-profile", JSON.stringify(profile));
  return <section className="card glow-card page-card">
    <div className="card-title"><span>PROFILE</span><UserRound size={18}/></div><h2>My Profile</h2><p>Keep your career identity in one place. Your changes are saved in this browser.</p>
    <div className="form-grid">
      {[["name","Name"],["headline","Headline"],["location","Location"],["goal","Career goal"]].map(([key,label]) => <label key={key}>{label}<input value={profile[key]} onChange={e => setProfile({...profile,[key]:e.target.value})}/></label>)}
    </div>
    <button className="primary" onClick={save}><Save size={15}/> Save profile</button>
  </section>;
}

function MasterResume() {
  const [resume, setResume] = useState(() => localStorage.getItem("careeros-resume") || "Srihari\nCSE Student\n\nSkills: Python, Django, SQL, Git\nProjects: CareerOS, Weather App, MedAI");
  const save = () => localStorage.setItem("careeros-resume", resume);
  return <section className="card glow-card page-card">
    <div className="card-title"><span>MASTER RESUME</span><FileText size={18}/></div><h2>Your master resume</h2><p>Edit your source-of-truth resume here. This stays saved locally until we connect a database.</p>
    <textarea className="analyzer-textarea large-textarea" value={resume} onChange={e => setResume(e.target.value)} />
    <div className="analyzer-actions"><button className="primary" onClick={save}><Save size={15}/> Save resume</button><span className="muted">Tip: keep this version comprehensive.</span></div>
  </section>;
}

function Projects() {
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem("careeros-projects") || '[]'));
  const [name, setName] = useState(""); const [desc, setDesc] = useState("");
  function addProject() { if (!name.trim()) return; const next=[...projects,{id:Date.now(),name,desc}]; setProjects(next); localStorage.setItem("careeros-projects",JSON.stringify(next)); setName("");setDesc(""); }
  function removeProject(id) { const next=projects.filter(p=>p.id!==id);setProjects(next);localStorage.setItem("careeros-projects",JSON.stringify(next)); }
  return <>
    <section className="card glow-card page-card"><div className="card-title"><span>PROJECTS</span><Code2 size={18}/></div><h2>Project portfolio</h2><p>Add projects you want recruiters to see.</p><div className="form-grid"><label>Project name<input value={name} onChange={e=>setName(e.target.value)} placeholder="CareerOS"/></label><label>Description<input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="What did you build?"/></label></div><button className="primary" onClick={addProject}><Plus size={15}/> Add project</button></section>
    <div className="grid">{projects.length ? projects.map(p=><article className="card" key={p.id}><div className="card-title"><span>PROJECT</span><button className="icon-button" onClick={()=>removeProject(p.id)} aria-label="Delete project"><Trash2 size={15}/></button></div><h3>{p.name}</h3><p>{p.desc || "Add a description for this project."}</p></article>) : <article className="card wide"><h3>No projects yet</h3><p>Add your first project above.</p></article>}</div>
  </>;
}

function Roadmap() {
  const initial = [
    ["Build foundations", "Strengthen Python, SQL, Git and core CS", true],
    ["Ship portfolio", "Finish 2–3 polished projects and document them", true],
    ["Target roles", "Analyze job descriptions and close the biggest gaps", false],
    ["Interview prep", "Practice DSA, projects and behavioral questions", false]
  ];
  const [steps, setSteps] = useState(() => JSON.parse(localStorage.getItem("careeros-roadmap") || JSON.stringify(initial)));
  function toggle(i){const next=steps.map((s,idx)=>idx===i?[s[0],s[1],!s[2]]:s);setSteps(next);localStorage.setItem("careeros-roadmap",JSON.stringify(next));}
  const done=steps.filter(s=>s[2]).length;
  return <section className="card glow-card page-card"><div className="card-title"><span>CAREER ROADMAP</span><Target size={18}/></div><h2>Your next milestones</h2><p>{done} of {steps.length} milestones complete.</p><div className="progress"><span style={{width:`${(done/steps.length)*100}%`}}/></div><div className="roadmap-list">{steps.map((s,i)=><button className={s[2]?"roadmap-item done":"roadmap-item"} key={s[0]} onClick={()=>toggle(i)}><span>{s[2]?<CheckCircle2 size={19}/>:<span className="roadmap-number">{i+1}</span>}</span><div><strong>{s[0]}</strong><small>{s[1]}</small></div></button>)}</div></section>;
}

export default function App() {
  const [active, setActive] = useState("Dashboard");
  const [dark, setDark] = useState(true);
  const renderPage = () => {
    if (active === "Job Analyzer") return <JobAnalyzer/>;
    if (active === "My Profile") return <Profile/>;
    if (active === "Master Resume") return <MasterResume/>;
    if (active === "Projects") return <Projects/>;
    if (active === "Career Roadmap") return <Roadmap/>;
    return <Dashboard setActive={setActive}/>;
  };
  return <div className={dark ? "app dark" : "app"}>
    <aside className="sidebar"><div className="brand"><div className="logo"><Sparkles size={18}/></div><span>CareerOS</span><span className="brand-dot"/></div><p className="section-label">WORKSPACE</p>{nav.map(([name, Icon]) => <button key={name} className={active === name ? "nav active" : "nav"} onClick={() => setActive(name)}><Icon size={18}/>{name}</button>)}<div className="sidebar-bottom"><div className="profile-mini"><div className="avatar">S</div><div><strong>Srihari</strong><small>CSE Student</small></div></div></div></aside>
    <main className="main"><header><button className="mobile-menu"><Menu/></button><div><p className="eyebrow">CAREER COMMAND CENTER</p><h1>{active}</h1></div><div className="header-actions"><div className="status"><span/> Career journey active</div><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">{dark ? <Sun size={16}/> : <Moon size={16}/>}</button></div></header>{renderPage()}</main>
  </div>;
}
