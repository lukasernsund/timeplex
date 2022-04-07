from django.contrib import admin
from .models import Employee

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'info','pins')

# Register your models here.

admin.site.register(Employee, EmployeeAdmin)