from django.db import models

class Profile(models.Model):
    name = models.CharField(max_length=120)
    headline = models.CharField(max_length=200, blank=True)
    email = models.EmailField(blank=True)
    location = models.CharField(max_length=120, blank=True)
    bio = models.TextField(blank=True)
    target_role = models.CharField(max_length=160, blank=True)
    github = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Skill(models.Model):
    name = models.CharField(max_length=80, unique=True)
    level = models.PositiveSmallIntegerField(default=50)
    category = models.CharField(max_length=80, blank=True)

class Project(models.Model):
    title = models.CharField(max_length=160)
    description = models.TextField()
    technologies = models.JSONField(default=list)
    url = models.URLField(blank=True)
    featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class JobTarget(models.Model):
    title = models.CharField(max_length=160)
    company = models.CharField(max_length=160, blank=True)
    description = models.TextField()
    match_score = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
