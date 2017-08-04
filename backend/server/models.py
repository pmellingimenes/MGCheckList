from django.db import models

class Tarefa(models.Model):
    title = models.CharField(max_length=64)
    completed = models.BooleanField(default=False)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('created',)
