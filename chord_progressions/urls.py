from django.urls import path

from . import views

urlpatterns = [
    path('save-progression/', views.save_progression, name='save-progression'),
    path('delete-progression/<int:id>', views.delete_progression, name='delete-progression'),
    path('update/', views.update, name='update-progression')
]