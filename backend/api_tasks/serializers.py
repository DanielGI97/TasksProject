from django.contrib.auth.models import User
from rest_framework import serializers
from api_tasks.models import Task, Category
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


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
            validate_email(username_or_email)
            # Es un email válido, buscar por email
            try:
                user = User.objects.get(email=username_or_email)
            except User.DoesNotExist:
                pass  # No existe usuario con ese email
        except ValidationError:
            # No es email válido, buscar por username
            try:
                user = User.objects.get(username=username_or_email)
            except User.DoesNotExist:
                pass  # No existe usuario con ese username
        
        if not user:
            raise serializers.ValidationError("Usuario no encontrado.")

        # Autenticar con el usuario encontrado
        authenticated_user = authenticate(username=user.username, password=password)

        if not authenticated_user:
            raise serializers.ValidationError("Credenciales inválidas.")

        # Actualizar attrs para que el padre use los datos correctos
        attrs['username'] = user.username
        data = super().validate(attrs)
        return data