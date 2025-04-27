from django.shortcuts import render
from django.contrib.auth.models import User
from api_tasks.models import Category, Task
from rest_framework import permissions, viewsets
from api_tasks.serializers import UserSerializer, CategorySerializer, TaskSerializer, ResetPatternSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET','POST', 'PUT', 'DELETE'])
def tasks_list(request,format=None):
    """
    List all code snippets, or create a new snippet.
    """
    try:
        tasks = Task.objects.all()
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == 'PUT':
        task = Task.objects.filter(id=id)
        serializer = TaskSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    elif request.method == 'DELETE':
        task = Task.objects.filter(id=id)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    queryset = User.objects.all().order_by('-date_joined')