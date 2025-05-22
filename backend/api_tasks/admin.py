from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Category, Task

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'completed', 'created_date')
    list_filter = ('category', 'completed')
    search_fields = ('title', 'description')