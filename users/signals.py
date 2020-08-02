from django.db.models.signals import post_save, user_logged_out, user_logged_in
from .models import CustomUser
from django.dispatch import receiver
from models import Profile

# @receiver(post_save, sender=User)
# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_profile(sender, instance, **kwargs):
#     instance.profile.save()

@receiver(user_logged_out)
def add_logout_message(sender, request, user, **kwargs):
    messages.info(request, "Logout successful")

@receiver(user_logged_in)
def add_login_message(sender, request, user, **kwargs):
    messages.info(request, f"You have logged in as {user.username}")