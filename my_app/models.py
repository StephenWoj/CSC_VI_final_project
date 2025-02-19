from django.db import models
from django.contrib.auth.models import User
#from PIL import Image

# Create your models here.
#class Profile(models.Model):
    #user = models.OneToOneField(User, on_delete=models.CASCADE)
    #profile_picture = models.ImageField(default='default.jpg', upload_to='profile_pics/')

    #def __str__(self):
        #return f'{self.user.username} Profile'

#class Task(models.Model):
    #title = models.CharField(max_length=100, null=True)

    #content = models.CharField(max_length=100, null=True)

    #date_posted = models.DateTimeField(auto_now_add=True, null=True)

    #user = models.ForeignKey(User, max_length=10, on_delete=models.CASCADE, null=True)