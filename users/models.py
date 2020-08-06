from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils.translation import gettext_lazy as _
from os import path

import PIL


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, password, **extra_fields)


def get_upload_path(instance, filename):
    upload_path = path.join(f"profile_images/{instance.email}/", filename)
    print("UPLOAD PATH", upload_path)
    return upload_path


class CustomUser(AbstractUser):
    username = None

    # _('verbose_name') translates the verbose_name into the user's language
    email = models.EmailField(_("email address"), unique=True)

    profile_image = models.ImageField(
        _("profile image"),
        default="profile_images/default.jpg",
        upload_to=get_upload_path,
    )
    date_joined = models.DateField(_("date joined"), auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        return self.email


# class Profile(models.Model):
#     user        = models.OneToOneField(User, on_delete=models.CASCADE)
#     avatar      = models.ImageField(default='default.jpg', upload_to='avatars')

#     def __str__(self):
#         return f'{self.user.username}\'s profile'

#     def save(self, *args, **kwargs):
#         super().save()

#         img = Image.open(self.avatar.path)

#         if img.height > 500 or img.width > 500:
#             output_size = (500,500)
#             img.thumbnail(output_size)
#             img.save(self.avatar.path)

# @receiver(post_save, sender=User)
# def create_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)

# @receiver(post_save, sender=User)
# def save_profile(sender, instance, **kwargs):
#     instance.profile.save()

# class CustomUser(AbstractUser):
#     email       = models.EmailField(max_length=50, unique=True)
#     username    = models.CharField(max_length=20, unique=True)
#     date_joined = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return self.username
