from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import Usuario_Mang
from PIL import Image
from django.db.models.signals import post_save
from django.utils import timezone

class Usuario(AbstractBaseUser, PermissionsMixin):
    GENDER_CHOICES=(
        ('M','Masculino'),('F','Femenino'),('O','otros')
    )

    email=models.EmailField('Email', unique=True,help_text='Required field from models')
    name = models.CharField('Name', max_length=60)
    last_name=models.CharField('Last name',max_length=60)
    country=models.CharField('Nacionality',max_length=50,blank=True)
    gender=models.CharField('Gender', max_length=1,choices=GENDER_CHOICES,blank=True)
    date_birth=models.DateField('Date of Birth', blank=True,null=True)
    code_reg=models.CharField(max_length=6,blank=True)
    photo=models.ImageField(upload_to='profile',default='default.png')
    is_staff=models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    date_reg=models.DateField('Register Date', default=timezone.now)
    last_mod=models.DateField('Last Modified', auto_now=True)
    objects=Usuario_Mang()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS = ['name','last_name']


    def get_short_name(self):
        return self.name
    def get_full_name(self):
        return self.name + ' ' + self.last_name

    def __str__(self):
        return self.email + '-'+self.name

    class Meta:
        verbose_name='Usuario'
        verbose_name_plural='Usuarios'

def optimize_img(sender, instance, **kwargs):
    if instance.photo:
        photo = Image.open(instance.photo.path)
        photo.save(instance.photo.path,quality=20,optimize=True)



post_save.connect(optimize_img,sender=Usuario)


