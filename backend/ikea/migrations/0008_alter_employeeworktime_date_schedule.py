# Generated by Django 4.0.4 on 2022-05-05 09:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ikea', '0007_alter_employeeworktime_date_schedule'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employeeworktime',
            name='date_schedule',
            field=models.CharField(max_length=40),
        ),
    ]