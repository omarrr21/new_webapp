from django.db import models
from django.contrib.auth.models import BaseUserManager

class Usuario_Mang(BaseUserManager, models.Manager):
    def _create_user(self, email, password, is_staff, is_superuser, is_active, **extra_fields):
        user=self.model(email=email,is_staff=is_staff,is_superuser=is_superuser,
                        is_active=is_active,**extra_fields)
        user.set_password(password)
        user.save(using=self.db)
        return user
    def create_user(self,email,password=None,**extra_fields):
        return self._create_user(email,password,False,False,False,**extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        return self._create_user(email, password, True, True, True, **extra_fields)

    def code_validation(self, id_user, codreg):
        if self.filter(id=id_user, code_reg=codreg).exists():
            return True
        else:
            return False