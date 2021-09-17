from django.contrib import admin
from .models import Tweet
# Register your models here.


class Tweet_admin(admin.ModelAdmin):
    search_fields = ['user__name','user__email']
    list_display = ('__str__','id','user')


admin.site.register(Tweet,Tweet_admin)