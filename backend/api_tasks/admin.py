from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Category, Task, ResetPattern

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'category', 'completed', 'created_date')
    list_filter = ('category', 'completed')
    search_fields = ('title', 'description')

@admin.register(ResetPattern)
class ResetPatternAdmin(admin.ModelAdmin):
    list_display = ('task', 'reset_type', 'next_reset_date')
    list_filter = ('reset_type', 'time_unit')