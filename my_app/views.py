from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout, update_session_auth_hash
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, ProfileUpdateForm, CreateTask
from .models import Profile, Task
# Create your views here.
def index(request):
    context = {
        "user_authenticated": request.user.is_authenticated,
    }
    return render(request, 'index.html', context)

def about(request):
    return render(request, 'about.html')

def register(request):
    if request.method == 'POST':
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            profile, created = Profile.objects.get_or_create(user=user)
            if not profile.image:
                profile.image = "default.jpg"
                profile.save()
            
            return JsonResponse({'success': True})  
        else:
            return JsonResponse({'success': False, 'error': form.errors.as_text()})
    form = UserRegisterForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return JsonResponse({'success': True, 'redirect_url': '/'})  
        else:
            return JsonResponse({'success': False})  
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})

@login_required
def profile(request):
    if request.method == 'POST':
        form = ProfileUpdateForm(request.POST, request.FILES, instance=request.user.profile)
        username = request.POST.get('username')
        password = request.POST.get('password')

        user = request.user
        user.username = username

        if password:
            user.set_password(password)
            update_session_auth_hash(request, user)  

        if form.is_valid():
            form.save()

        user.save()
        return redirect('profile') 

    else:
        form = ProfileUpdateForm(instance=request.user.profile)

    return render(request, 'users/profile.html', {'form': form})

@login_required
def createTask(request):

    form = CreateTask()

    if request.method == 'POST':
        form = CreateTask(request.POST)

        if form.is_valid():
            task = form.save(commit=False)
            task.user = request.user
            task.save()
            return JsonResponse({"success": True, "message": "Task Created, Go View Your Task In View Current Tasks!"})
            
        return JsonResponse({"success": False, "error": "Form submission failed."})
    
    context = {'form': form,
                "user_authenticated": request.user.is_authenticated,
                }

    return render(request, 'users/create-task.html', context)

@login_required
def viewTask(request):

    current_user = request.user.id

    task = Task.objects.all().filter(user=current_user)

    context = {'task': task}


    return render(request, 'users/view-task.html', context=context)

@login_required
def updateTask(request, pk):

    task = Task.objects.get(id=pk)

    form = CreateTask(instance=task)
    
    if request.method == 'POST':
        form = CreateTask(request.POST, instance=task)
        if form.is_valid():
            form.save()
            
            return JsonResponse({'success': True, 'redirect_url': '/view-task'})
        else:
            return JsonResponse({'success': False, 'error': form.errors.as_json()}, status=400)

    return render(request, 'users/update-task.html', {'form': form, 'task': task})

@login_required
def deleteTask(request, pk):
    task = Task.objects.get(id=pk)

    if request.method == 'POST':
        task.delete()
        
        if request.headers.get('X-Requested-With') == 'XMLHttpRequest':  
            return JsonResponse({'success': True})  
            
        return redirect('/view-task')
        
    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':  
        return JsonResponse({'error': 'Invalid request method'}, status=400)
    
    return render(request, 'users/delete-task.html', {'task': task})

def logout_view(request):
    logout(request)
    return redirect('index')