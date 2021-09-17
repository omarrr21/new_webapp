from django.db import models
import random
from django.conf import settings

User=settings.AUTH_USER_MODEL

# Create your models here.
class Tweet(models.Model):
    #id = models.AutoField(primary_key=True)
    content = models.TextField()
    image=models.FileField(upload_to='media/tweets/',blank=True,null=True)
    #blank== no necesario en el formulario
    #null== no necesario en la base de datos
    user=models.ForeignKey(User, on_delete=models.CASCADE)


    class Meta:
        ordering=['-id']

    def serialize(self):
        return {'id':self.id,
                'content':self.content,
                'likes':random.randint(0,200)
                }