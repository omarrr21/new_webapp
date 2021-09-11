from django.urls import path
from . import views

app_name='indic_app'
urlpatterns = [
    path('',views.Index.as_view(),name='index'),
    path('about/',views.Aboutus.as_view(),name='about'),
    path('contact/', views.contacto.as_view(), name='contacto'),
]