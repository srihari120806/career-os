from django.contrib import admin
from .models import Profile, Skill, Project, JobTarget

admin.site.register([Profile, Skill, Project, JobTarget])
