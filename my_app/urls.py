from django.urls import path
from .views import index, about, register, login_view, createTask, viewTask, updateTask, deleteTask, profile, logout_view

urlpatterns = [
    path('', index, name='index'),
    path('about/', about, name='about'),
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('profile/', profile, name='profile'),
    path('create-task/', createTask, name='createTask'),
    path('view-task/', viewTask, name='viewTask'),
    path('update-task/<int:pk>', updateTask, name="updateTask"),
    path('delete-task/<int:pk>', deleteTask, name="deleteTask"),
    path('logout/', logout_view, name='logout'),
]