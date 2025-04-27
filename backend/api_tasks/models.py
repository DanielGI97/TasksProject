from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"

class Task(models.Model):
    
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='tasks',
    )
    
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    completed = models.BooleanField(default=False)
    category = models.ForeignKey(
        Category, 
        on_delete=models.SET_NULL, 
        null=True, 
        related_name='tasks',
    )
    created_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return self.title

class ResetPattern(models.Model):
    RESET_TYPE_CHOICES = [
        ('daily', 'Diario'),
        ('weekly', 'Semanal'),
        ('custom', 'Personalizado'),
    ]
    
    TIME_UNIT_CHOICES = [
        ('days', 'Días'),
        ('weeks', 'Semanas'),
        ('months', 'Meses'),
    ]
    
    task = models.OneToOneField(Task, on_delete=models.CASCADE, related_name='reset_pattern')
    reset_type = models.CharField(max_length=10, choices=RESET_TYPE_CHOICES)
    custom_value = models.PositiveIntegerField(blank=True, null=True)
    time_unit = models.CharField(max_length=10, choices=TIME_UNIT_CHOICES, default='days')
    next_reset_date = models.DateTimeField()
    
    def __str__(self):
        return f"Patrón de reinicio para {self.task.title}"