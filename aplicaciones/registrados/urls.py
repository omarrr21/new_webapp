from django.urls import path
from . import views

app_name='usuarios_app'
urlpatterns = [
    path('register/',views.Registerview.as_view(),name='register'),
    path('verif/<pk>',views.Codeverify.as_view(),name='verification'),
    path('login/', views.Loginview.as_view(), name='login'),
    path('logout/', views.Logoutview.as_view(), name='logoutuser'),
    path('update-pass/', views.Updatepass.as_view(), name='update-pass'),
    path('account/', views.Accountview.as_view(), name='account'),
    path('updt/<pk>', views.Updateallview.as_view(), name='update-all'),
]
