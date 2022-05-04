from django.shortcuts import render
from .models import AllSchedules
from .serializers import AllSchedulesSerializer
from rest_framework import viewsets
from .serializers import EmployeeSerializer
from .serializers import WorktimeSerializer
from .models import Employee
from .models import EmployeeWorktime


# Create your views here.

class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class WorktimeView(viewsets.ModelViewSet):
    serializer_class = WorktimeSerializer
    queryset = EmployeeWorktime.objects.all()

class AllSchedulesView(viewsets.ModelViewSet):
    serializer_class = AllSchedulesSerializer
    queryset = AllSchedules.objects.all()

