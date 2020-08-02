from django.conf import settings
from django.db import models
from django.utils import timezone
from users.models import CustomUser

class ChordProgression(models.Model):
    creator         = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    created_at      = models.DateTimeField(auto_now_add=True)
    edited_at       = models.DateTimeField(null=True, blank=True)
    progression     = models.CharField(max_length=10000)
    chord_names     = models.CharField(max_length=10000)

    def __str__(self):
        return self.chord_names