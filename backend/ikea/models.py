from django.db import models

# Create your models here.

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    greeter = models.BooleanField(default=False)
    pins = models.BooleanField(default=False)
    eco = models.BooleanField(default=False)
    customer_service = models.BooleanField(default=False)
    pins_responsible = models.BooleanField(default=False)
    backoffice = models.BooleanField(default=False)
    operative_responsible = models.BooleanField(default=False)
    frontline = models.BooleanField(default=False)
    smalland_1 = models.BooleanField(default=False)
    smalland_2 = models.BooleanField(default=False)
    count_kk = models.BooleanField(default=False)


    def _str_(self):
        return self.first_name