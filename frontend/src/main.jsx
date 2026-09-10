import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";

const genericProfile = {
  name: "Your Name",
  headline: "CSE Student • Builder • Software & ERP",
  location: "Your City, India",
  goal: "Software / ERP career",
  email: "you@example.com",
};

const genericResume = `Your Name
CSE Student • Builder • Software & ERP
Your City, India

SUMMARY
Computer Science student building practical software products across Python, Django, AI and ERP domains.

SKILLS
Python • Django • SQL • C++ • JavaScript • Git • REST APIs

PROJECTS
CareerOS — career command center
MedAI — configurable medical assistant
Weather App — Django + OpenWeatherMap

EXPERIENCE
ERP Project Management Intern

EDUCATION
B.Tech Computer Science Engineering`;

// Keep the public demo free of personal identity data while preserving any non-demo user edits.
try {
  const storedProfile = JSON.parse(localStorage.getItem("careeros-profile") || "null");
  if (!storedProfile || storedProfile.name === "Srihari") {
    localStorage.setItem("careeros-profile", JSON.stringify(genericProfile));
  }
  const storedResume = localStorage.getItem("careeros-resume") || "";
  if (!storedResume || storedResume.includes("Srihari")) {
    localStorage.setItem("careeros-resume", genericResume);
  }
} catch {
  localStorage.setItem("careeros-profile", JSON.stringify(genericProfile));
  localStorage.setItem("careeros-resume", genericResume);
}

import("./App").then(({ default: App }) => {
  createRoot(document.getElementById("root")).render(
    <BrowserRouter><App /></BrowserRouter>
  );
});
