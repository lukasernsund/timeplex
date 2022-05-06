from django.contrib import admin

from .models import AllSchedules
from .models import Employee
from .models import EmployeeWorktime
from .models import EmployeeRequest

class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'greeter','pins','eco', 'customer_service', 'pins_responsible', 'backoffice',
                  'operative_responsible', 'frontline', 'smalland_1', 'smalland_2', 'count_kk',)

class WorktimeAdmin(admin.ModelAdmin):
    list_display = ('employeeID','start_time', 'end_time', 'date_schedule')

class AllSchedulesAdmin(admin.ModelAdmin):
    list_display = ('date','name')

class RequestAdmin(admin.ModelAdmin):
    list_display = ('employeeID','start_time', 'end_time',"description")
# Register your models here.

admin.site.register(Employee, EmployeeAdmin)
admin.site.register(EmployeeWorktime, WorktimeAdmin)
admin.site.register(AllSchedules, AllSchedulesAdmin)
admin.site.register(EmployeeRequest, RequestAdmin)
