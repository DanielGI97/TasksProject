from django.urls import path ,include
from rest_framework.routers import DefaultRouter
from api_tasks.views import UserViewSet, tasks_list, register_user

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('tasks/', tasks_list),
    path('register/', register_user),
    path('', include(router.urls)),
]

