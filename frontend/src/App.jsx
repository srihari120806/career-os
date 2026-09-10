import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Code2,
  Compass,
  FileText,
  Flame,
  LayoutDashboard,
  Menu,
  Moon,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Sun,
  Target,
  Trash2,
  TrendingUp,
  UserRound,
  X,
  Zap,
} from "lucide-react";

const nav = [
  ["Dashboard", LayoutDashboard],
  ["My Profile", UserRound],
  ["Master Resume", FileText],
  ["Job Analyzer", BriefcaseBusiness],
  ["Projects", Code2],
  ["Career Roadmap", Target],
];

const samples = {
  "Python Developer": "We are looking for a Python Developer with strong Python and Django experience, REST APIs, SQL and Git. Docker is a plus and knowledge of React is preferred.",
  "Data Analyst": "We are hiring a Data Analyst with strong SQL, Excel, Python, Pandas and Power BI skills. Experience with dashboards and data visualization is preferred.",
  "Frontend Developer": "Frontend Developer needed with JavaScript, TypeScript, React, HTML, CSS and Git. Experience with REST APIs and responsive UI development is required.",
};

const defaultProfile = {
  name: "Srihari",
  headline: "CSE Student • Builder • ERP & Software",
  location: "Chennai, India",
  goal: "Software / ERP career",
};

const defaultResume = "Srihari\nCSE Student\n\nSkills: Python, Django, SQL, Git, C++, JavaScript\nProjects: CareerOS, Weather App, MedAI\nExperience: ERP Project Management Intern\nEducation: B.Tech CSE";

const defaultProjects = [
  { id: 1, name: "CareerOS", tag: "Product", desc: "Career command center with job analysis, resume management and roadmap tracking." },
  { id: 2, name: "MedAI", tag: "AI / Python", desc: "Streamlit medical assistant with configurable symptom and medicine flows." },
  { id: 3, name: "Weather App", tag: "Django", desc: "Real-time weather application powered by OpenWeatherMap." },
];

const defaultRoadmap = [
  { title: "Build foundations", detail: "Python, SQL, Git and core CS", done: true },
  { title: "Ship portfolio", detail: "Polish 2–3 projects and document them", done: true },
  { title: "Target roles", detail: "Analyze jobs and close your biggest skill gaps", done: false },
  { title: "Interview prep", detail: "DSA, projects and behavioral practice", done: false },
  { title: "Land the role", detail: "Apply consistently and track outcomes", done: false },
];

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

function StatCard({ icon: Icon, label, value, helper, trend }) {
  return <article className="stat-card">
    <div className="stat-icon"><Icon size={17} /></div>
    <div className="stat-main"><span>{label}</span><strong>{value}</strong><small>{helper}</small></div>
    {trend && <div className="trend"><TrendingUp size={13} /> {trend}</div>}
  </article>;
}

function Dashboard({ setActive, profile, projects, roadmap }) {
  const done = roadmap.filter((x) => x.done).length;
  const readiness = Math.min(95, 58 + done * 7 + Math.min(projects.length, 3) * 2);
  return <div className="page-stack">
    <section className="hero-v2">
      <div className="hero-copy">
        <div className="hero-kicker"><span className="live-dot" /> CAREER COMMAND CENTER</div>
        <h2>Good afternoon, {profile.name.split(" ")[0]}.<br /><span>Let’s make your next move count.</span></h2>
        <p>One workspace for your resume, projects, job fit and career direction.</p>
        <div className="hero-actions">
          <button className="primary" onClick={() => setActive("Job Analyzer")}><Zap size={15} /> Analyze a role</button>
          <button className="ghost-light" onClick={() => setActive("Career Roadmap")}><Compass size={15} /> Open roadmap</button>
        </div>
      </div>
      <div className="readiness-ring" style={{"--p": `${readiness * 3.6}deg`}}>
        <div><strong>{readiness}%</strong><span>Career readiness</span></div>
      </div>
    </section>

    <div className="stats-grid">
      <StatCard icon={Target} label="Readiness" value={`${readiness}%`} helper="Up 8% this month" trend="8%" />
      <StatCard icon={BriefcaseBusiness} label="Roles analyzed" value="12" helper="3 this week" />
      <StatCard icon={Code2} label="Projects" value={projects.length} helper="Portfolio items" />
      <StatCard icon={Flame} label="Momentum" value="7 days" helper="Current streak" />
    </div>

    <div className="content-grid">
      <section className="panel panel-large">
        <div className="panel-heading"><div><span className="eyebrow">YOUR CAREER SIGNALS</span><h3>What needs attention</h3></div><button className="link-button" onClick={() => setActive("Career Roadmap")}>View roadmap <ArrowRight size={14} /></button></div>
        <div className="signal-list">
          <button className="signal-row" onClick={() => setActive("Job Analyzer")}><div className="signal-symbol blue"><BriefcaseBusiness size={16} /></div><div><strong>Analyze your next target role</strong><span>Turn a job description into a skill-gap plan.</span></div><ChevronRight size={17} /></button>
          <button className="signal-row" onClick={() => setActive("Master Resume")}><div className="signal-symbol purple"><FileText size={16} /></div><div><strong>Refresh your master resume</strong><span>Keep one clean source of truth for future applications.</span></div><ChevronRight size={17} /></button>
          <button className="signal-row" onClick={() => setActive("Projects")}><div className="signal-symbol green"><Code2 size={16} /></div><div><strong>Strengthen portfolio proof</strong><span>{Math.max(0, 3 - projects.length)} project slot(s) left for a stronger portfolio.</span></div><ChevronRight size={17} /></button>
        </div>
      </section>

      <section className="panel panel-side">
        <div className="panel-heading"><div><span className="eyebrow">MILESTONES</span><h3>{done}/{roadmap.length} complete</h3></div><Target size={17} /></div>
        <div className="mini-progress"><span style={{ width: `${(done / roadmap.length) * 100}%` }} /></div>
        <div className="milestone-preview">{roadmap.slice(0, 4).map((item, i) => <div className="milestone-line" key={item.title}><span className={item.done ? "check-dot done" : "check-dot"}>{item.done ? <Check size={11} /> : i + 1}</span><div><strong>{item.title}</strong><small>{item.detail}</small></div></div>)}</div>
      </section>

      <section className="panel panel-large activity-panel">
        <div className="panel-heading"><div><span className="eyebrow">RECENT ACTIVITY</span><h3>Your workspace pulse</h3></div><Activity size={17} /></div>
        <div className="activity-grid">
          <div className="activity-card"><span className="activity-label">Last analyzed</span><strong>Python / Django role</strong><small>Good fit • skill gaps identified</small><button onClick={() => setActive("Job Analyzer")}>Open analysis <ArrowRight size={13} /></button></div>
          <div className="activity-card"><span className="activity-label">Resume status</span><strong>Master resume</strong><small>Ready for tailoring</small><button onClick={() => setActive("Master Resume")}>Edit resume <ArrowRight size={13} /></button></div>
          <div className="activity-card accent-card"><span className="activity-label">Next best action</span><strong>Close 2 skill gaps</strong><small>SQL + REST API depth</small><button onClick={() => setActive("Career Roadmap")}>View plan <ArrowRight size={13} /></button></div>
        </div>
      </section>

      <section className="panel panel-side profile-card"><div className="avatar-large">{profile.name.slice(0, 1)}</div><span className="eyebrow">YOUR PROFILE</span><h3>{profile.name}</h3><p>{profile.headline}</p><span className="location">{profile.location}</span><button className="secondary full" onClick={() => setActive("My Profile")}>Manage profile</button></section>
    </div>
  </div>;
}

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
      const response = await fetch(`${API_BASE}/api/analyze-job/`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ job_description: jobDescription, resume_text: resumeText }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The analyzer could not process this job.");
      setResult(data);
    } catch (err) {
      setError(`Could not reach CareerOS API. ${err.message}`);
    } finally { setLoading(false); }
  }

  function clearAnalyzer() { setJobDescription(""); setResumeText(""); setResult(null); setError(""); }
  const resultTitle = result ? (result.match_score >= 80 ? "Strong match" : result.match_score >= 60 ? "Good match" : "Needs improvement") : "";

  return <div className="page-stack">
    <section className="section-hero compact"><div><span className="eyebrow">ANALYZE • IMPROVE • GROW</span><h2>Job Analyzer</h2><p>Paste a role and your current skills. CareerOS turns both into a practical fit score and action plan.</p></div><div className="command-pill"><Sparkles size={14} /> Skill intelligence</div></section>
    <div className="analyzer-workbench">
      <section className="panel workbench-card"><div className="panel-heading"><div><span className="eyebrow">01 • ROLE</span><h3>What are they looking for?</h3></div><BriefcaseBusiness size={17} /></div><textarea className="analyzer-textarea" value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste the complete job description here…"/><div className="quick-row"><span>Try a sample</span>{Object.keys(samples).map((name) => <button key={name} className="chip" onClick={() => setJobDescription(samples[name])}>{name}</button>)}</div></section>
      <section className="panel workbench-card"><div className="panel-heading"><div><span className="eyebrow">02 • YOUR FIT</span><h3>What can you bring?</h3></div><FileText size={17} /></div><textarea className="analyzer-textarea" value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste your resume or list skills: Python, Django, SQL, Git…"/><div className="workbench-actions"><button className="primary" onClick={analyzeJob} disabled={loading}><Search size={15} /> {loading ? "Analyzing…" : "Run fit analysis"}</button><button className="secondary" onClick={clearAnalyzer}>Clear</button></div>{error && <div className="alert"><AlertTriangle size={15} />{error}</div>}</section>
    </div>
    {result && <section className="panel result-v2" aria-live="polite">
      <div className="result-banner"><div className="result-ring" style={{"--score": `${result.match_score * 3.6}deg`}}><div><strong>{result.match_score}%</strong><span>fit score</span></div></div><div className="result-copy"><span className="eyebrow">MATCH RESULT</span><h3>{resultTitle}</h3><p>You match <b>{result.matched_skills.length}</b> of <b>{result.detected_skills.length}</b> detected skills for this role.</p><div className="score-bar"><span style={{ width: `${result.match_score}%` }} /></div></div><div className="result-kpis"><div><strong>{result.matched_skills.length}</strong><span>matched</span></div><div><strong>{result.missing_skills.length}</strong><span>to improve</span></div></div></div>
      <div className="result-columns"><div><h4><CheckCircle2 size={16} /> Strengths</h4><div className="pill-list">{result.matched_skills.length ? result.matched_skills.map(s => <span key={s} className="skill good">{s}</span>) : <span className="muted">No direct matches yet.</span>}</div></div><div><h4><AlertTriangle size={16} /> Skill gaps</h4><div className="pill-list">{result.missing_skills.length ? result.missing_skills.map(s => <span key={s} className="skill gap">{s}</span>) : <span className="skill good">No major gaps detected</span>}</div></div><div><h4><TrendingUp size={16} /> Next moves</h4><ol className="next-moves">{result.recommendations.map((item, i) => <li key={i}>{item}</li>)}</ol></div></div>
    </section>}
  </div>;
}

function Profile({ profile, setProfile }) {
  const [draft, setDraft] = useState(profile);
  function save() { setProfile(draft); localStorage.setItem("careeros-profile", JSON.stringify(draft)); }
  return <div className="page-stack"><section className="section-hero"><div><span className="eyebrow">PROFILE / IDENTITY</span><h2>Make your profile recruiter-ready.</h2><p>Your profile is the narrative layer above your resume and projects.</p></div><ShieldCheck size={28} /></section><section className="panel page-panel"><div className="profile-layout"><div className="identity-block"><div className="avatar-xl">{draft.name.slice(0, 1)}</div><span className="eyebrow">PROFILE PREVIEW</span><h3>{draft.name}</h3><p>{draft.headline}</p><span className="location">{draft.location}</span></div><div className="form-area"><div className="form-grid">{[["name","Full name"],["headline","Headline"],["location","Location"],["goal","Career goal"]].map(([key,label]) => <label key={key}>{label}<input value={draft[key]} onChange={e => setDraft({...draft, [key]: e.target.value})} /></label>)}</div><div className="form-actions"><button className="primary" onClick={save}><Check size={15} /> Save profile</button><span>Saved locally in this browser</span></div></div></div></section></div>;
}

function MasterResume() {
  const [resume, setResume] = useState(() => localStorage.getItem("careeros-resume") || defaultResume);
  const [saved, setSaved] = useState(false);
  function save() { localStorage.setItem("careeros-resume", resume); setSaved(true); setTimeout(() => setSaved(false), 1800); }
  const chars = resume.length;
  return <div className="page-stack"><section className="section-hero"><div><span className="eyebrow">RESUME / SOURCE OF TRUTH</span><h2>Master resume</h2><p>Keep the complete version here. Tailored resumes can branch from this later.</p></div><FileText size={28} /></section><section className="panel page-panel resume-shell"><div className="resume-toolbar"><div><span className="eyebrow">MASTER DOCUMENT</span><strong>CareerOS Resume</strong></div><div className="toolbar-meta">{chars} chars <span /> {saved ? "Saved" : "Ready to edit"}</div></div><textarea className="resume-editor" value={resume} onChange={e => setResume(e.target.value)} /><div className="resume-footer"><span>Suggestion: keep achievements measurable and projects outcome-focused.</span><button className="primary" onClick={save}><Check size={15} /> {saved ? "Saved" : "Save resume"}</button></div></section></div>;
}

function Projects({ projects, setProjects }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  function addProject() { if (!name.trim()) return; const next = [...projects, { id: Date.now(), name: name.trim(), tag: "Project", desc: desc.trim() }]; setProjects(next); localStorage.setItem("careeros-projects", JSON.stringify(next)); setName(""); setDesc(""); }
  function removeProject(id) { const next = projects.filter(p => p.id !== id); setProjects(next); localStorage.setItem("careeros-projects", JSON.stringify(next)); }
  return <div className="page-stack"><section className="section-hero"><div><span className="eyebrow">PORTFOLIO / PROOF</span><h2>Your project portfolio.</h2><p>Projects turn skills into proof. Keep the strongest work easy to explain.</p></div><button className="primary" onClick={() => document.getElementById("project-name")?.focus()}><Plus size={15} /> Add project</button></section><section className="panel add-project"><div className="form-grid"><label>Project name<input id="project-name" value={name} onChange={e => setName(e.target.value)} placeholder="CareerOS" /></label><label>Description<input value={desc} onChange={e => setDesc(e.target.value)} placeholder="What did you build and why?" /></label></div><button className="secondary" onClick={addProject}><Plus size={15} /> Add to portfolio</button></section><div className="project-grid">{projects.map(p => <article className="project-card" key={p.id}><div className="project-top"><span className="project-tag">{p.tag}</span><button className="icon-button" onClick={() => removeProject(p.id)} aria-label={`Delete ${p.name}`}><Trash2 size={15} /></button></div><div className="project-mark">{p.name.slice(0,1)}</div><h3>{p.name}</h3><p>{p.desc}</p><button className="link-button">View project <ArrowRight size={13} /></button></article>)}</div></div>;
}

function Roadmap({ roadmap, setRoadmap }) {
  const done = roadmap.filter(x => x.done).length;
  const pct = Math.round((done / roadmap.length) * 100);
  function toggle(index) { const next = roadmap.map((s, i) => i === index ? {...s, done: !s.done} : s); setRoadmap(next); localStorage.setItem("careeros-roadmap", JSON.stringify(next)); }
  return <div className="page-stack"><section className="roadmap-hero"><div><span className="eyebrow">CAREER ROADMAP</span><h2>Build the next chapter in order.</h2><p>Focus on the highest-leverage step instead of trying to fix everything at once.</p></div><div className="roadmap-score"><strong>{pct}%</strong><span>complete</span></div></section><section className="panel roadmap-panel"><div className="roadmap-head"><div><span className="eyebrow">MILESTONES</span><h3>{done} of {roadmap.length} completed</h3></div><div className="mini-progress"><span style={{ width: `${pct}%` }} /></div></div><div className="roadmap-timeline">{roadmap.map((item, i) => <button key={item.title} className={item.done ? "roadmap-card completed" : "roadmap-card"} onClick={() => toggle(i)}><div className="roadmap-node">{item.done ? <Check size={15} /> : <Circle size={15} />}</div><div><span>STEP {String(i + 1).padStart(2, "0")}</span><strong>{item.title}</strong><p>{item.detail}</p></div><ChevronRight size={17} /></button>)}</div></section></div>;
}

function App() {
  const [active, setActive] = useState("Dashboard");
  const [dark, setDark] = useState(true);
  const [profile, setProfile] = useState(() => JSON.parse(localStorage.getItem("careeros-profile") || JSON.stringify(defaultProfile)));
  const [projects, setProjects] = useState(() => JSON.parse(localStorage.getItem("careeros-projects") || JSON.stringify(defaultProjects)));
  const [roadmap, setRoadmap] = useState(() => JSON.parse(localStorage.getItem("careeros-roadmap") || JSON.stringify(defaultRoadmap)));
  const [search, setSearch] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const filteredNav = useMemo(() => search.trim() ? nav.filter(([name]) => name.toLowerCase().includes(search.toLowerCase())) : nav, [search]);
  const page = active === "Job Analyzer" ? <JobAnalyzer /> : active === "My Profile" ? <Profile profile={profile} setProfile={setProfile} /> : active === "Master Resume" ? <MasterResume /> : active === "Projects" ? <Projects projects={projects} setProjects={setProjects} /> : active === "Career Roadmap" ? <Roadmap roadmap={roadmap} setRoadmap={setRoadmap} /> : <Dashboard setActive={setActive} profile={profile} projects={projects} roadmap={roadmap} />;

  function changePage(name) { setActive(name); setSearch(""); setMobileOpen(false); }

  return <div className={dark ? "app dark" : "app"}>
    <aside className={`sidebar ${mobileOpen ? "open" : ""}`}>
      <div className="brand"><div className="brand-mark"><Sparkles size={17} /></div><div><strong>CareerOS</strong><span>Career command center</span></div><span className="online-dot" /></div>
      <div className="side-nav"><span className="nav-caption">WORKSPACE</span>{filteredNav.map(([name, Icon]) => <button key={name} className={active === name ? "nav-item active" : "nav-item"} onClick={() => changePage(name)}><Icon size={17} /><span>{name}</span></button>)}</div>
      <div className="sidebar-bottom"><div className="side-card"><div className="mini-avatar">{profile.name.slice(0,1)}</div><div><strong>{profile.name}</strong><small>{profile.goal}</small></div><Settings2 size={15} /></div><div className="side-note"><ShieldCheck size={13} /><span>Your workspace is private</span></div></div>
    </aside>
    {mobileOpen && <button className="backdrop" onClick={() => setMobileOpen(false)} aria-label="Close navigation" />}
    <main className="main">
      <header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)}><Menu size={19} /></button><div><span className="eyebrow">CAREEROS / {active.toUpperCase()}</span><h1>{active}</h1></div></div><div className="topbar-right"><div className="global-search"><Search size={15} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Jump to a workspace…" />{search && <button onClick={() => setSearch("")}><X size={13} /></button>}</div><div className="status-chip"><span /> Active</div><button className="theme-toggle" onClick={() => setDark(!dark)} aria-label="Toggle theme">{dark ? <Sun size={16} /> : <Moon size={16} />}</button></div></header>
      {page}
    </main>
  </div>;
}

export default App;
