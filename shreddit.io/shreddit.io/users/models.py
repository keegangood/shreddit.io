from django.db import models
from django.contrib.auth.models import User

from django.db.models.signals import post_save
from django.dispatch import receiver

from PIL import Image

class Profile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar      = models.ImageField(default='default.jpg', upload_to='avatars')

    def __str__(self):
        return f'{self.user.username}\'s profile'

    def save(self):
        super().save()

        img = Image.open(self.avatar.path)
        
        if img.height > 500 or img.width > 500:
            output_size = (500,500)
            img.thumbnail(output_size)
            img.save(self.avatar.path)

@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()

# class CustomUser(AbstractUser):
#     email       = models.EmailField(max_length=50, unique=True)
#     username    = models.CharField(max_length=20, unique=True)
#     date_joined = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.username