from django.contrib import admin
from .models import Profile, Task
# Register your models here.
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'image']

admin.site.register(Profile, ProfileAdmin)

admin.site.register(Task)