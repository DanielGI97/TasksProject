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
    ) #required
    
    title = models.CharField(max_length=200) #required
    description = models.TextField(blank=True, null=True) #not required, i have to delete this field.
    completed = models.BooleanField(default=False) #required
    category = models.ForeignKey(
        Category.name,
        on_delete=models.SET_NULL, 
        null=True,
        related_name='tasks',
    ) #not required
    created_date = models.DateTimeField(auto_now_add=True) #required
    last_date_updated = models.DateField(blank=True, null=True) #not required
    reset_interval = models.IntegerField(blank=True, null=True) #not required
    next_date_update = models.DateField(blank=True, null=True) #not required
    
    def __str__(self):
        return self.title