from django.urls import path ,include
from rest_framework.routers import DefaultRouter
from api_tasks.views import UserViewSet, tasks_list, register_user, category_list, task_detail

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    #path('user/<str:user_id>', user_content),
    #path('user/<int:user_id>/<int:list_id>', list_content),
    path('tasks/', tasks_list),
    path('task/<int:pk>', task_detail),
    path('register/', register_user),
    path('categories/', category_list),
    path('', include(router.urls)),
]