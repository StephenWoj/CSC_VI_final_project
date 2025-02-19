from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Task

class RegisterForm(forms.ModelForm):
        password = forms.CharField(widget=forms.PasswordInput)
        confirm_password = forms.CharField(widget=forms.PasswordInput)
    
        class Meta:
            model = User
            fields = ('username', 'email', 'password')
    
        def clean(self):
            cleaned_data = super().clean()
            password = cleaned_data.get("password")
            confirm_password = cleaned_data.get("confirm_password")
            if password != confirm_password:
                raise forms.ValidationError("Passwords do not match")
            return cleaned_data

class CreateTask(forms.ModelForm):
    class Meta:

        model = Task
        fields = ['title', 'content']
        exclude = ['user',]