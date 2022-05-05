from django.shortcuts import render
from .models import AllSchedules
from .serializers import AllSchedulesSerializer
from rest_framework import viewsets
from .serializers import EmployeeSerializer
from .serializers import WorktimeSerializer
from .models import Employee
from .models import EmployeeWorktime
from rest_framework.decorators import api_view
import xlwt

from django.http import HttpResponse
from django.contrib.auth.models import User


# Create your views here.

@api_view(['GET'])
def export_users_xls(request):
    print("kärs kod?")
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="users.xls"'

    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Users')


    # Sheet header, first row
    row_num = 0

    font_style = xlwt.XFStyle()
    font_style.font.bold = True

    columns = ['EmployeeID', 'Start time', 'End time' ]

    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    rows = EmployeeWorktime.objects.all().values_list('employeeID', "start_time", "end_time")
    print (rows)
    for row in rows:
        row_num += 1
        for col_num in range(len(row)):
            ws.write(row_num, col_num, row[col_num], font_style)

    wb.save(response)
    print(response)
    return response


class EmployeeView(viewsets.ModelViewSet):
    serializer_class = EmployeeSerializer
    queryset = Employee.objects.all()

class WorktimeView(viewsets.ModelViewSet):
    serializer_class = WorktimeSerializer
    queryset = EmployeeWorktime.objects.all()

class AllSchedulesView(viewsets.ModelViewSet):
    serializer_class = AllSchedulesSerializer
    queryset = AllSchedules.objects.all()

    

