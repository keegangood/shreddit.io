from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user        = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar      = models.ImageField(default='default.jpg', upload_to='avatars')

    def __str__(self):
        return f'{self.user.username}\'s profile'

# class CustomUser(AbstractUser):
#     email       = models.EmailField(max_length=50, unique=True)
#     username    = models.CharField(max_length=20, unique=True)
#     date_joined = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.username