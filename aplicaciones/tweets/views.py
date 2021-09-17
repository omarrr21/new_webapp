from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect,HttpResponse,Http404,JsonResponse
from .models import Tweet
from .forms import Tweetform
import random
from django.conf import settings

# Create your views here.
def home_view(request, *args,**kwargs):
    print(request.user or None)
    return render(request,'tweets/home_tweet.html',context={},status=200)

def home_view_details(request,tweet_id, *args,**kwargs):


    data = {
        'id': tweet_id,
    }
    status=200
    try:
        obj=Tweet.objects.get(id=tweet_id)
        data['content']=obj.content
    except:
        data['message']='Not found'
        status=404

    return JsonResponse(data, status=status) #json.dumps content_type='application/json'

def tweet_list_view(request,*args,**kwargs):
    qs=Tweet.objects.all()
    tweets_list=[x.serialize() for x in qs]
    data={
        'isUser': False,
        'response':tweets_list
    }
    return JsonResponse(data)

def tweet_create_view(request, *args, **kwargs):
    # print(request.is_ajax())
    user=request.user

    if not request.user.is_authenticated:
        user=None
        if request.is_ajax():
            return JsonResponse({},status=401)
        return redirect(settings.LOGIN_URL)

    form=Tweetform(request.POST or None)
    # print(request.POST)
    next_url=request.POST.get('next') or None
    if form.is_valid():
        obj=form.save(commit=False)
        obj.user=user
        obj.save()
        if request.is_ajax():
            return JsonResponse(obj.serialize(),status=201) #201 es para objetos creados
        if next_url is not None:
            return redirect(next_url)
        form=Tweetform()
    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors,status=400)
    return render(request, 'tweets/form_tweet.html', context={'form':form})