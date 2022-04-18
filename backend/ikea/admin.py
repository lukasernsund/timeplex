from django.contrib import admin
from .models import Employee

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'greeter','pins','eco', 'customer_service', 'pins_responsible', 'backoffice',
                  'operative_responsible', 'frontline', 'smalland_1', 'smalland_2', 'count_kk',)

# Register your models here.

admin.site.register(Employee, EmployeeAdmin)