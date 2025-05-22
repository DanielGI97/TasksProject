from django.contrib.auth.models import User
from api_tasks.models import Category, Task
from rest_framework import permissions, viewsets
from api_tasks.serializers import UserSerializer, CategorySerializer, TaskSerializer
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def tasks_list(request,format=None):
    """
    List all code snippets, or create a new snippet.
    """

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    try:
        tasks = Task.objects.filter(user=request.user)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = User.objects.all().order_by('-date_joined')

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status

@api_view(['POST'])
@permission_classes([AllowAny])  # Permite acceso sin autenticación
def register_user(request):
    username = request.data.get('username')
    email = request.data.get('email')
    password = request.data.get('password')

    if not username or not email or not password:
        return Response({'error': 'Todos los campos son obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'El nombre de usuario ya existe.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password)
    return Response({'message': 'Usuario creado correctamente.'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def category_list(request):
    try:
        categories = Category.objects.all()
        categories_serializer = CategorySerializer(categories, many=True)
        return Response(categories_serializer.data)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['PATCH','DELETE'])
@permission_classes([IsAuthenticated])
def task_detail(request, pk):

    try:
        task = Task.objects.get(id=pk, user=request.user)

    except Task.DoesNotExist:
        return Response({'error': 'Tarea no encontrada'}, status=404)
    
    if request.method == 'PATCH':
        serializer = TaskSerializer(task, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    if request.method == 'DELETE':
        task.delete()
        return Response({'message': 'Tarea eliminada correctamente'}, status=204)