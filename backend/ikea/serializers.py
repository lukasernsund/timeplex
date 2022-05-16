from .models import AllSchedules
from rest_framework import serializers
from .models import Employee
from .models import EmployeeWorktime
from .models import EmployeeRequest

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'greeter','pins','eco', 'customer_service', 'pins_responsible', 'backoffice',
                  'operative_responsible', 'frontline', 'smalland_1', 'smalland_2', 'count_kk',)

class WorktimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeWorktime
        fields = ('id', 'employeeID',  'start_time', 'end_time', 'date_schedule' )

class AllSchedulesSerializer(serializers.ModelSerializer):
    class Meta:
        model = AllSchedules
        fields = ('id', 'date',  'name' )

class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeRequest
        fields = ('id', 'employeeID',  'start_time', 'end_time', "description",'date_schedule')
