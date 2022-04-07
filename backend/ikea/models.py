from django.db import models

# Create your models here.

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    info = models.BooleanField(default=False)
    pins = models.BooleanField(default=False)

    def _str_(self):
        return self.first_name