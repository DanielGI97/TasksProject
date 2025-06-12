from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Task, TaskList

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'completed', 'created_date')
    list_filter = ['completed']
    search_fields = ['title']