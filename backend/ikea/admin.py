from django.contrib import admin
from .models import Employee
from .models import EmployeeWorktime
from import_export import resources


class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'greeter','pins','eco', 'customer_service', 'pins_responsible', 'backoffice',
                  'operative_responsible', 'frontline', 'smalland_1', 'smalland_2', 'count_kk',)

class WorktimeAdmin(admin.ModelAdmin):
    list_display = ('employeeID','start_time', 'end_time')
# Register your models here.

admin.site.register(Employee, EmployeeAdmin)
admin.site.register(EmployeeWorktime, WorktimeAdmin)
