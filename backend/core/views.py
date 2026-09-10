import re

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile, Skill, Project, JobTarget
from .serializers import ProfileSerializer, SkillSerializer, ProjectSerializer, JobTargetSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer


class JobTargetViewSet(viewsets.ModelViewSet):
    queryset = JobTarget.objects.all()
    serializer_class = JobTargetSerializer


SKILL_KEYWORDS = [
    "Python", "Django", "FastAPI", "REST API", "SQL", "PostgreSQL", "MySQL",
    "Java", "C++", "JavaScript", "TypeScript", "React", "Node.js", "HTML", "CSS",
    "Git", "GitHub", "Docker", "AWS", "Azure", "GCP", "Linux", "Android", "Kotlin",
    "Flutter", "Machine Learning", "Deep Learning", "NLP", "TensorFlow", "PyTorch",
    "Pandas", "NumPy", "Scikit-learn", "Power BI", "Tableau", "Excel", "Figma",
]


def _detect_skills(text):
    normalized = text.lower()
    found = []
    for skill in SKILL_KEYWORDS:
        pattern = r"(?<![a-z0-9+#.])" + re.escape(skill.lower()) + r"(?![a-z0-9+#.])"
        if re.search(pattern, normalized):
            found.append(skill)
    return found


@api_view(["GET"])
def health(request):
    return Response({"status": "ok", "service": "CareerOS API"})


@api_view(["POST"])
def analyze_job(request):
    job_description = str(request.data.get("job_description", "")).strip()
    resume_text = str(request.data.get("resume_text", "")).strip()

    if not job_description:
        return Response({"error": "job_description is required."}, status=400)

    required_skills = _detect_skills(job_description)
    candidate_skills = _detect_skills(resume_text)

    if not required_skills:
        return Response({
            "match_score": 0,
            "detected_skills": [],
            "matched_skills": [],
            "missing_skills": [],
            "recommendations": ["Add a fuller job description so CareerOS can identify role requirements."],
        })

    matched_skills = [skill for skill in required_skills if skill in candidate_skills]
    missing_skills = [skill for skill in required_skills if skill not in candidate_skills]
    match_score = round((len(matched_skills) / len(required_skills)) * 100)

    recommendations = [
        f"Add evidence of {skill} through a project, certification, internship, or measurable resume bullet."
        for skill in missing_skills[:5]
    ]
    if not recommendations:
        recommendations = [
            "Tailor your strongest projects to the responsibilities in this role.",
            "Add measurable outcomes to your most relevant resume bullets.",
        ]

    return Response({
        "match_score": match_score,
        "detected_skills": required_skills,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "recommendations": recommendations,
    })
