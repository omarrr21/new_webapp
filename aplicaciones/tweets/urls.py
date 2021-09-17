from django.urls import path
from . import views

app_name='tweets_app'
urlpatterns = [
    path('', views.home_view, name='home_tweet'),
    path('tweets', views.tweet_list_view, name='tweet_list'),
    path('create-tweet', views.tweet_create_view, name='tweet_create'),

    path('tweets/<int:tweet_id>',views.home_view_details,name='home_det_tweet'),

]