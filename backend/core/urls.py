from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ProfileViewSet, SkillViewSet, ProjectViewSet, JobTargetViewSet, analyze_job, health

router = DefaultRouter()
router.register("profiles", ProfileViewSet)
router.register("skills", SkillViewSet)
router.register("projects", ProjectViewSet)
router.register("jobs", JobTargetViewSet)

urlpatterns = [
    path("health/", health),
    path("analyze-job/", analyze_job),
    path("", include(router.urls)),
]
