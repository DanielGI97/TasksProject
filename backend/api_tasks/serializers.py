from django.contrib.auth.models import User
from rest_framework import serializers
from api_tasks.models import Task, Category, ResetPattern


class UserSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'tasks', 'email']

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = ['__all__']

class ResetPatternSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResetPattern
        fields = ['__all__']

class TaskSerializer(serializers.ModelSerializer):
    
    user = serializers.StringRelatedField(read_only=True)
    resetpatterns = ResetPatternSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ['__all__']