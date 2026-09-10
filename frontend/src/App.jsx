import { useState } from "react";
import { LayoutDashboard, UserRound, FileText, BriefcaseBusiness, Code2, Target, Menu, Sparkles, Search, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";

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
    if (!jobDescription.trim()) {
      setError("Paste a job description first.");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/analyze-job/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ job_description: jobDescription, resume_text: resumeText })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The analyzer could not process this job.");
      setResult(data);
    } catch (err) {
      setError(`Could not reach CareerOS API. Start the Django backend and try again. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  function clearAnalyzer() {
    setJobDescription("");
    setResumeText("");
    setResult(null);
    setError("");
  }

  return <div className="analyzer-page">
    <div className="analyzer-intro">
      <div><p className="eyebrow">ANALYZE • IMPROVE • GROW</p><h2>Job Analyzer</h2><p>Paste a job description and your resume or skills to see your fit, skill gaps and next steps.</p></div>
      <div className="analyzer-badge"><Target size={22}/><span>Turn job descriptions<br/>into opportunities.</span></div>
    </div>
    <div className="analyzer-grid">
      <section className="card analyzer-card">
        <div className="card-title"><span>JOB DESCRIPTION</span><BriefcaseBusiness size={18}/></div>
        <h3>What does the role require?</h3>
        <textarea className="analyzer-textarea" value={jobDescription} onChange={e => setJobDescription(e.target.value)} placeholder="Paste the full job description here..." />
        <div className="sample-row"><span>Try a sample:</span>{Object.keys(samples).map(name => <button key={name} className="sample" onClick={() => setJobDescription(samples[name])}>{name}</button>)}</div>
      </section>
      <section className="card analyzer-card">
        <div className="card-title"><span>YOUR RESUME / SKILLS</span><FileText size={18}/></div>
        <h3>What can you bring?</h3>
        <textarea className="analyzer-textarea" value={resumeText} onChange={e => setResumeText(e.target.value)} placeholder="Paste your resume text or list skills: Python, Django, SQL, Git..." />
        <div className="analyzer-actions"><button className="primary analyze-button" onClick={analyzeJob} disabled={loading}><Search size={16}/>{loading ? "Analyzing..." : "Analyze Job"}</button><button className="secondary" onClick={clearAnalyzer}>Clear</button></div>
        {error && <div className="analyzer-error"><AlertTriangle size={16}/>{error}</div>}
      </section>
    </div>
    {result && <section className="card result-card" aria-live="polite">
      <div className="result-top">
        <div className="result-score"><strong>{result.match_score}%</strong><span>Match</span></div>
        <div className="result-copy"><p className="eyebrow">MATCH RESULT</p><h3>{result.match_score >= 80 ? "Strong Match" : result.match_score >= 60 ? "Good Match" : "Needs Improvement"}</h3><p>You match {result.matched_skills.length} of {result.detected_skills.length} detected skills in this job description.</p><div className="result-bar"><span style={{width: `${result.match_score}%`}}/></div></div>
        <div className="result-stats"><div><strong>{result.matched_skills.length}</strong><span>Matched</span></div><div><strong>{result.missing_skills.length}</strong><span>Missing</span></div></div>
      </div>
      <div className="result-sections">
        <div><h4><CheckCircle2 size={17}/>Matched skills</h4><div className="skill-pills">{result.matched_skills.length ? result.matched_skills.map(skill => <span key={skill} className="skill-pill">{skill}</span>) : <span className="muted">No direct matches yet.</span>}</div></div>
        <div><h4><AlertTriangle size={17}/>Skills to improve</h4><div className="skill-pills">{result.missing_skills.length ? result.missing_skills.map(skill => <span key={skill} className="skill-pill missing">{skill}</span>) : <span className="skill-pill">No major gaps detected</span>}</div></div>
        <div><h4><ArrowRight size={17}/>Recommended next steps</h4><ol className="recommendations">{result.recommendations.map((item, i) => <li key={i}>{item}</li>)}</ol></div>
      </div>
    </section>}
  </div>;
}

function Dashboard({ setActive }) {
  return <>
    <section className="hero"><div><p className="eyebrow">YOUR NEXT MOVE</p><h2>Build a career you're proud of.</h2><p>Track your skills, strengthen your resume, analyze jobs and prepare for interviews — all in one place.</p></div><div className="score"><strong>64%</strong><span>Career readiness</span></div></section>
    <div className="grid">
      <article className="card"><div className="card-title"><span>Resume</span><FileText size={18}/></div><h3>Master resume</h3><p>Keep one source of truth for your experience and generate tailored versions later.</p><button className="primary" onClick={() => setActive("Master Resume")}>Open resume →</button></article>
      <article className="card"><div className="card-title"><span>Skills</span><Code2 size={18}/></div><h3>Skill gap</h3><div className="progress"><span style={{width:"72%"}}/></div><p>72% of your tracked target skills are covered.</p><button className="secondary" onClick={() => setActive("Career Roadmap")}>View roadmap →</button></article>
      <article className="card wide"><div className="card-title"><span>Job Analyzer</span><BriefcaseBusiness size={18}/></div><h3>See how you match a role</h3><p>Paste a job description and CareerOS will score your fit, identify missing skills and tell you what to improve.</p><button className="primary" onClick={() => setActive("Job Analyzer")}>Analyze a job →</button></article>
    </div>
  </>;
}

export default function App() {
  const [active, setActive] = useState("Dashboard");
  return <div className="app">
    <aside className="sidebar"><div className="brand"><div className="logo"><Sparkles size={18}/></div><span>CareerOS</span></div><p className="section-label">WORKSPACE</p>{nav.map(([name, Icon]) => <button key={name} className={active === name ? "nav active" : "nav"} onClick={() => setActive(name)}><Icon size={18}/>{name}</button>)}<div className="sidebar-bottom"><div className="profile-mini"><div className="avatar">S</div><div><strong>Srihari</strong><small>CSE Student</small></div></div></div></aside>
    <main className="main"><header><button className="mobile-menu"><Menu/></button><div><p className="eyebrow">CAREER COMMAND CENTER</p><h1>{active}</h1></div><div className="status"><span/> Career journey active</div></header>{active === "Job Analyzer" ? <JobAnalyzer/> : <Dashboard setActive={setActive}/>}</main>
  </div>;
}
