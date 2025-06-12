from django.db import models
from django.contrib.auth.models import User
# Create your models here.

'''
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Categories"
'''

class TaskList(models.Model):
    
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='tasks_list',
    ) #required
    
    title = models.CharField(max_length=200, null=True) #required
    created_date = models.DateTimeField(auto_now_add=True) #required
    last_task_updated = models.DateField(blank=True, null=True) #not required
    
    def __str__(self):
        return f"{self.title} - {self.user.username}"

class Task(models.Model):
    
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='tasks',
    ) #required
    
    task_list = models.ForeignKey(
        TaskList,
        on_delete=models.CASCADE,
        related_name='tasks',
        blank=True,
        null=True
    )

    title = models.CharField(max_length=200) #required
    completed = models.BooleanField(default=False) #required
    created_date = models.DateTimeField(auto_now_add=True) #required
    last_date_updated = models.DateField(blank=True, null=True) #not required
    reset_interval = models.IntegerField(blank=True, null=True) #not required
    next_date_update = models.DateField(blank=True, null=True) #not required
    
    def __str__(self):
        return f"{self.title} - {'✓' if self.completed else '○'}"
    
    class Meta:
        ordering = ['-created_date']

    def mark_completed(self):
        """Marcar como completada y establecer fecha de completado"""
        self.completed = True  
        self.save()