from django.urls import path ,include
from rest_framework.routers import DefaultRouter
from api_tasks.views import UserViewSet, tasks_list, register_user, category_list, task_detail

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('tasks/', tasks_list),
    path('task/<int:pk>', task_detail),
    path('register/', register_user),
    path('categories/', category_list),
    path('', include(router.urls)),
]

