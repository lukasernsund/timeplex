# Generated by Django 4.0.3 on 2022-05-06 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ikea', '0009_merge_20220506_0855'),
    ]

    operations = [
        migrations.AddField(
            model_name='employeerequest',
            name='date_schedule',
            field=models.CharField(default=(2022, 12, 12), max_length=40),
            preserve_default=False,
        ),
    ]