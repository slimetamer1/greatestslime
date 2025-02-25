from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    bg_color = models.CharField(max_length=20, default="bg-yellow-400")
    
    def __str__(self):
        return self.content[:50]