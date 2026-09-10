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

@api_view(["GET"])
def health(request):
    return Response({"status": "ok", "service": "CareerOS API"})
