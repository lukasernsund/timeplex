from importlib.util import find_spec
from django.shortcuts import render
from .models import AllSchedules
from .serializers import AllSchedulesSerializer
from rest_framework import viewsets
from .serializers import EmployeeSerializer
from .serializers import WorktimeSerializer
from .models import Employee
from .models import EmployeeWorktime
from .models import EmployeeRequest
from .serializers import RequestSerializer
from rest_framework.decorators import api_view
from datetime import date
from datetime import datetime
import time

import xlwt

from django.http import HttpResponse
from django.contrib.auth.models import User


# Create your views here.

@api_view(['GET'])
def export_users_xls(request, date):
    print("Inne i funktion")
    time.sleep(0.1)
    response = HttpResponse(content_type='application/ms-excel')
    response['Content-Disposition'] = 'attachment; filename="users.xls"'

    wb = xlwt.Workbook(encoding='utf-8')
    ws = wb.add_sheet('Users')


    # Sheet header, first row
    row_num = 0

    font_style = xlwt.XFStyle()
    font_style.font.bold = True

    columns = ['Employee Name', 'Start time', 'End time', 'request start time', 'request end time','request description']

    for col_num in range(len(columns)):
        ws.write(row_num, col_num, columns[col_num], font_style)

    # Sheet body, remaining rows
    font_style = xlwt.XFStyle()

    # Tar fram en lista med alla employeeID som jobbar ett visst datum som heter employeeIdList
    employee_id_var = EmployeeWorktime.objects.filter(date_schedule = date).values_list('employeeID')
    employeeIdList=[]
    for index in employee_id_var:
        index= index[0]
        employeeIdList.append(index)
    print("EmployeeIdList", employeeIdList)

    #Tar fram en lista med alla namn som jobbar den dagen som heter nameList
    nameList =[]
    for foreignId in employeeIdList:
        first_name = Employee.objects.filter(id = foreignId).values_list("first_name")
        print("namn",first_name)
        nameList.append(first_name)
    print("nameList", nameList)

    # Skapar en lista med object som innehåller ID, startTid och slutTid
    dateRows = EmployeeWorktime.objects.filter(date_schedule = date).values_list("employeeID","start_time", "end_time")
    # print("Filtrerad lista:", dateRows)
    dateRows_requests = EmployeeRequest.objects.filter(date_schedule = date).values_list("start_time", "end_time", "description")
    counter = 0
    for row in dateRows:
        row_num += 1
        for col_num in range(len(row)):
            if col_num == 0:
                ws.write(row_num, col_num, nameList[counter][0], font_style)
                counter += 1
                print("räknare", counter)
            else:
                ws.write(row_num, col_num, row[col_num], font_style)

    counter=0
    row_num=1

    for row in dateRows_requests:
        
        startCol = 3
        plusCol = len(row)
        for col_num in range(startCol,startCol+plusCol):
            ws.write(row_num, col_num, row[col_num-3], font_style)
        row_num += 1

    
    wb.save(response)
    print("response:", response)
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

class RequestView(viewsets.ModelViewSet):
    serializer_class = RequestSerializer
    queryset = EmployeeRequest.objects.all()
    

