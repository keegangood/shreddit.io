from django.urls import path

from . import views

urlpatterns = [
    path('save_progression/', views.save_progression, name='save-progression'),
    path('delete_progression/<int:id>', views.delete_progression, name='delete-progression'),
]