# Generated by Django 4.0.4 on 2022-05-04 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ikea', '0003_employeeworktime'),
    ]

    operations = [
        migrations.CreateModel(
            name='AllSchedules',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('name', models.CharField(max_length=50)),
            ],
        ),
    ]