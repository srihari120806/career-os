from rest_framework import serializers
from .models import Profile, Skill, Project, JobTarget

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class JobTargetSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobTarget
        fields = "__all__"
