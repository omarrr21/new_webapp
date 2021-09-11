from django.urls import path
from . import views

app_name='crono_app'
urlpatterns = [
    path('stopwatch/',views.Cronoview.as_view(),name='cronometro'),
    path('watch/',views.Relojview.as_view(),name='reloj'),
]