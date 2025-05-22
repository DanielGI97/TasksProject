from django.contrib.auth.models import User
from rest_framework import serializers
from api_tasks.models import Task, Category
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate


class UserSerializer(serializers.ModelSerializer):
    tasks = serializers.PrimaryKeyRelatedField(many=True, queryset=Task.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'tasks', 'email']

class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Task
        fields = '__all__'


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        username_or_email = attrs.get("username")
        password = attrs.get("password")

        # Intenta obtener el usuario por email si no existe por username
        try:
            user = User.objects.get(email=username_or_email)
            username = user.username
        except User.DoesNotExist:
            username = username_or_email

        user = authenticate(username=username, password=password)

        if not user:
            raise serializers.ValidationError("Credenciales inválidas.")

        data = super().validate(attrs)
        return data