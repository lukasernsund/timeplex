from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ('id', 'first_name', 'last_name', 'greeter','pins','eco', 'customer_service', 'pins_responsible', 'backoffice',
                  'operative_responsible', 'frontline', 'smalland_1', 'smalland_2', 'count_kk',)
